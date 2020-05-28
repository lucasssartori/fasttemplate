import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';
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
} from './styles';

function JobControlForm() {
  const formRef = useRef(null);

  const { id } = useParams();
  const [titleForm, setTitle] = useState('');
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingStore, setLoadingStore] = useState(false);

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
          name: name.toUpperCase(),
          system,
          description,
        });

        toast.success('Job atualizado com sucesso!');
        history.push('/jobs/list');
      } else {
        await api.post('jobs', {
          name: name.toUpperCase(),
          system,
          description,
        });

        toast.success('Job cadastrado com sucesso!');
        history.push('/jobs/list');
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
              history.push('/jobs/list');
            }}
            loading={loadingStore}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="job"
            loading={loadingStore}
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
                />
              </div>
              <div>
                <Select
                  label="Sistema"
                  name="system"
                  options={Systems}
                  placeholder="Informe o sistema"
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
        </ContentForm>
      )}
    </Container>
  );
}

export default JobControlForm;
