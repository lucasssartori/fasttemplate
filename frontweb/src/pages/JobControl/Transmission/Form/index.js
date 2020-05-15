import React, { useRef, useEffect, useState } from 'react';
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
import Technologies from '~/enums/EnumTechnologies';

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

function TransmissionForm() {
  const formRef = useRef(null);

  const { id, jobid } = useParams();
  const [titleForm, setTitle] = useState('');
  const [transmission, setTransmission] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadTransmission() {
      try {
        if (id) {
          setLoading(true);
          setTitle('Edição de Transmissão');
          const response = await api.get(`transmissions/${id}`);

          const data = response.data.transmission;
          const aux_tech_in = Technologies.find(
            (option) => option.value === data.tech_in
          );
          const aux_tech_for = Technologies.find(
            (option) => option.value === data.aux_tech_for
          );

          setTransmission(
            data.map((item) => {
              delete item.tech_in;
              delete item.tech_for;
              return {
                ...item,
                tech_in: aux_tech_in.value,
                tech_for: aux_tech_for.value,
              };
            })
          );

          setLoading(false);
        } else {
          setTitle('Cadastro de Transmissão');
        }
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(signOut());
        } else {
          toast.error(error.response.data.error);
        }
      }
    }
    loadTransmission();
  }, [id, dispatch]);

  async function handleSubmitAdd(data) {
    const aux_transmission = transmission;
    delete aux_transmission.id;

    if (ObjetcEqual(aux_transmission, data)) {
      toast.warn('Não houve alteração da Transmissão!');
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
    } catch (errors) {
      const validationErrors = {};
      if (errors instanceof Yup.ValidationError) {
        errors.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.warn(errors.response.data.error);
      }
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
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="job"
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

export default TransmissionForm;
