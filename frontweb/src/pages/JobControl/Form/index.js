import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import History from '~/services/history';
import Input from '~/components/SimpleInput';
import TextArea from '~/components/TextArea';
import Select from '~/components/ReactSelect';
import ObjetcEqual from '~/util/ObjetcEqual';
import Systems from '~/enums/EnumSystems';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
  DivData,
  DivDescription,
  Mensagem,
  InformationParse,
} from './styles';

function JobControlForm() {
  const formRef = useRef(null);

  const { id } = useParams();
  const [titleForm, setTitle] = useState('');
  const [job, setJob] = useState({});
  const [name_parse, setName] = useState('');
  const [system_parse, setSystem] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading_store, setLoadingStore] = useState(false);
  const [parse_information, setParseInformation] = useState('');
  const [transmisions, settransmissions] = useState([]);

  const dispatch = useDispatch();

  const treatmentError = useCallback(
    (error) => {
      function treatment() {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            dispatch(signOut());
          } else if (error.response.data) {
            toast.error(error.response.data.error);
          }
        } else {
          toast.error('Erro inesperado do sistema!');
        }
      }
      treatment();
    },
    [dispatch]
  );

  useMemo(async () => {
    if (!id && name_parse !== '' && system_parse !== '') {
      const response = await api.get(`jobparse`, {
        params: {
          name: name_parse,
          system: system_parse,
        },
      });

      settransmissions(response.data.transmissions);

      if (response.data.transmissions.length > 0) {
        if (response.data.transmissions.length > 1) {
          setParseInformation(
            `Foram encontradas ${response.data.transmissions.length} transmissões para serem importadas.`
          );
        } else {
          setParseInformation(
            `Foi encontrada ${response.data.transmissions.length} transmissão para ser importada.`
          );
        }
      } else {
        setParseInformation(`Não foi encontrado transmissões para esta etapa.`);
      }
    }
  }, [id, name_parse, system_parse]);

  useEffect(() => {
    async function loadJobs() {
      try {
        if (id) {
          setLoading(true);
          setTitle('Edição de Job');
          const response = await api.get(`jobs/${id}`);

          const data = response.data.job;
          const aux_system = Systems.find(
            (option) => option.value === response.data.job.system
          );

          setJob({
            id: data.id,
            name: data.name,
            system: aux_system.value,
            description: data.description,
          });
          setLoading(false);
        } else {
          setTitle('Cadastro de Job');
        }
      } catch (error) {
        treatmentError(error);
      }
    }
    loadJobs();
  }, [id, treatmentError]);

  async function handleSubmitAdd(data) {
    setLoadingStore(true);
    const aux_job = job;
    delete aux_job.id;

    if (ObjetcEqual(aux_job, data)) {
      toast.warn('Não houve alteração no Job!');
      return;
    }

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .min(8, 'Nome deve possuir 8 caracteres')
          .max(8, 'Nome deve possuir 8 caracteres')
          .required('O nome é obrigatório'),
        system: Yup.string()
          .required('O sistema é obrigatório')
          .typeError('Sistema inválido'),
        description: Yup.string().required('A descrição é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, system, description } = data;

      if (id) {
        await api.put(`jobs/${id}`, {
          name,
          system,
          description,
        });

        toast.success('Job atualizado com sucesso!');
        History.push('/jobs/list');
      } else {
        await api.post('jobs', {
          name,
          system,
          description,
        });

        toast.success('Job cadastrado com sucesso!');
        History.push('/jobs/list');
      }
      setLoadingStore(false);
    } catch (errors) {
      const validationErrors = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        treatmentError(errors);
      }
      setLoadingStore(false);
    }
  }

  return (
    <Container>
      <HeaderPage>
        <h1>{titleForm}</h1>
        <div>
          <BackButton
            title="VOLTAR"
            IconButton={MdArrowBack}
            type="button"
            onClick={() => {
              History.push('/jobs/list');
            }}
            loading={loading_store}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="job"
            loading={loading_store}
          />
        </div>
      </HeaderPage>
      {loading ? (
        <Mensagem>
          <h1>Carregando Job...</h1>
        </Mensagem>
      ) : (
        <ContentForm>
          <Form
            initialData={job}
            ref={formRef}
            id="job"
            onSubmit={handleSubmitAdd}
          >
            <DivData>
              <div>
                <Input
                  label="Nome do Job"
                  name="name"
                  placeholder="Informe o nome do Job"
                  onBlur={(e) => setName(e.target.value)}
                  onKeyUp={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </div>
              <div>
                <Select
                  label="Sistema"
                  name="system"
                  options={Systems}
                  placeholder="Informe o sistema"
                  onChange={(e) => setSystem(e.value)}
                />
              </div>
            </DivData>
            <DivDescription>
              <TextArea
                label="Descrição do Job"
                name="description"
                placeholder="Informe uma descrição para o Job"
              />
            </DivDescription>
          </Form>
          {!id && parse_information && (
            <InformationParse>
              <div className={transmisions.length > 0 ? 'sucess' : 'error'}>
                <h1>{parse_information}</h1>
              </div>
            </InformationParse>
          )}
        </ContentForm>
      )}
    </Container>
  );
}

export default JobControlForm;
