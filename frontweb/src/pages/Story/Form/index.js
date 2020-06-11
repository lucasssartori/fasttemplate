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
import ObjetcEqual from '~/util/ObjetcEqual';

import Input from '~/components/SimpleInput';
import TextArea from '~/components/TextArea';
import Select from '~/components/ReactSelect';
import UiInputRadio from '~/components/UiInputRadio';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
  Mensagem,
} from './styles';

function HistoryForm() {
  const formRef = useRef(null);

  const { id } = useParams();
  const [titleForm, setTitle] = useState('');
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(false);
  const [loading_store, setLoadingStore] = useState(false);

  const options_yes_or_no = [
    { value: 'SIM', label: 'Sim' },
    { value: 'NAO', label: 'Não' },
  ];

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
    async function loadStory() {
      try {
        if (id) {
          setLoading(true);
          setTitle('Edição de Historias');
          const response = await api.get(`stories/${id}`);

          const data = response.data.story;

          setStory(data);
          setLoading(false);
        } else {
          setTitle('Cadastro de Historias');
        }
      } catch (error) {
        treatmentError(error);
      }
    }
    loadStory();
  }, [id, treatmentError]);

  async function handleSubmitAdd(data) {
    setLoadingStore(true);
    const aux_story = story;
    delete aux_story.id;

    if (ObjetcEqual(aux_story, data)) {
      toast.warn('Não houve alteração na história!');
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
        await api.put(`stories/${id}`, {
          name,
          system,
          description,
        });

        toast.success('Historia atualizada com sucesso!');
        history.push('/stories/list');
      } else {
        await api.post('stories', {
          name,
          system,
          description,
        });

        toast.success('Historia cadastrada com sucesso!');
        history.push('/stories/list');
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
              history.push('/stories/list');
            }}
            loading={loading_store}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="story"
            loading={loading_store}
          />
        </div>
      </HeaderPage>
      {loading ? (
        <Mensagem>
          <h1>Carregando História...</h1>
        </Mensagem>
      ) : (
        <ContentForm>
          <Form
            initialData={story}
            ref={formRef}
            id="story"
            onSubmit={handleSubmitAdd}
          >
            <Input
              label="Historia:"
              name="story"
              placeholder="Informe a historia"
            />

            <Input
              label="Projeto:"
              name="project"
              placeholder="Informe o projeto"
            />
            <Input
              label="Desenvolvedor:"
              name="development"
              placeholder="Informe o nome do desenvolvedor"
            />
            <Input
              label="RN:"
              name="num_rn"
              placeholder="Informe o número do RN:"
            />
            <Input
              label="Squad:"
              name="noma_squad"
              placeholder="Informe a Squad:"
            />
            <Input
              label="Sprint:"
              name="num_sprint"
              placeholder="Informe o número da sprint:"
            />
            <h3>Performance</h3>
            <UiInputRadio
              name="massive_update"
              label="O processo realiza atualização massiva?"
              options={options_yes_or_no}
            />

            <label>
              Processo realiza atualização de bases corporativas/multi empresa?
            </label>
            <h3>Impacto Macros</h3>
            <label>Processo altera telas já existentes no sistema?</label>
            <h3>Carga</h3>
            <label>
              Caso possua processo de carga foi previsto volumetria?
            </label>
            <h3>Liga Desliga</h3>
            <label>Será necessário solução de liga e desliga?</label>
            <h3>SOA</h3>
            <label>Será necessário roteamento de requisições do SOA?</label>
            <label>
              Como será feito o roteamento de eventos? (DDD, UF, empresa...
              Outros)
            </label>
            <h3>Implantação</h3>
            <label>
              A US precisa implantar junto a outros sistemas? Esta previsto
              implantação conjunta?
            </label>
          </Form>
        </ContentForm>
      )}
    </Container>
  );
}

export default HistoryForm;
