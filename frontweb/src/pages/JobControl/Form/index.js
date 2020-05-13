import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import { MdArrowBack, MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
  DivData,
  DivDescription,
} from './styles';
import Input from '~/components/SimpleInput';
import TextArea from '~/components/TextArea';
import Select from '~/components/ReactSelect';
import Systems from '~/enums/EnumSystems';

import api from '~/services/api';
import history from '~/services/history';

function JobControlForm() {
  const formRef = useRef(null);

  const { id } = useParams();
  const [titleForm, setTitle] = useState();
  const [job, setJob] = useState();
  const [system_form, setSystem] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        if (id) {
          setTitle('Edição de Job');
          const response = await api.get(`jobs/${id}`);

          const data = response.data.job;
          const returnSystem = Systems.find(
            (option) => option.value === response.data.job.system
          );

          setJob({
            id: data.id,
            name: data.name,
            system: returnSystem.value,
            description: data.description,
          });

          setSystem(returnSystem);
        } else {
          setTitle('Cadastro de Job');
        }
      } catch (error) {
        setTitle('Cadastro de Job');
      }
    }
    loadJobs();
  }, [id]);

  async function handleSubmitAdd(data) {
    try {
      formRef.current.setErrors({});
      console.log(job);
      console.log(data);

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

      console.log(description);

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
                value={system_form}
                onChange={(e) => setSystem(e)}
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
    </Container>
  );
}

export default JobControlForm;
