import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import Select from '~/components/ReactSelect';
import ObjetcEqual from '~/util/ObjetcEqual';
import Technologies from '~/enums/EnumTechnologies';
import AgenteSolution from '~/enums/EnumAgenteSolution';

import {
  Container,
  HeaderPage,
  BackButton,
  SaveButton,
  ContentForm,
  Mensagem,
  DivData,
  DivHead,
  DivFild,
} from './styles';

function TransmissionForm() {
  const formRef = useRef(null);

  const { id, job_id } = useParams();
  const [titleForm, setTitle] = useState('');
  const [transmission, setTransmission] = useState({});
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
            (option) => option.value === data.tech_for
          );

          delete data.tech_in;
          delete data.tech_for;
          data.tech_in = aux_tech_in.value;
          data.tech_for = aux_tech_for.value;

          setTransmission(data);

          setLoading(false);
        } else {
          setTitle('Cadastro de Transmissão');
        }
      } catch (error) {
        treatmentError(error);
      }
    }
    loadTransmission();
  }, [id, treatmentError]);

  async function handleSubmitAdd(data) {
    setLoadingStore(true);
    const aux_transmission = transmission;

    delete aux_transmission.id;
    delete aux_transmission.job_id;
    delete aux_transmission.JobId;

    if (ObjetcEqual(aux_transmission, data)) {
      toast.warn('Não houve alteração da Transmissão!');
      return;
    }

    formRef.current.setErrors({});

    try {
      const schema = Yup.object().shape({
        tech_in: Yup.string().required('Campo é obrigatório'),
        tech_for: Yup.string().required('Campo é obrigatório'),
        server_in: Yup.string().required('Campo é obrigatório'),
        server_for: Yup.string().required('Campo é obrigatório'),
        directory_in: Yup.string().required('Campo é obrigatório'),
        directory_for: Yup.string().required('Campo é obrigatório'),
        user_in: Yup.string().required('Campo é obrigatório'),
        user_for: Yup.string().required('Campo é obrigatório'),
        mask_archive_in: Yup.string().required('Campo é obrigatório'),
        mask_archive_for: Yup.string().required('Campo é obrigatório'),
        size_register_in: Yup.string().required('Campo é obrigatório'),
        size_register_for: Yup.string().required('Campo é obrigatório'),
        node_in: Yup.string().required('Campo é obrigatório'),
        node_for: Yup.string().required('Campo é obrigatório'),
        application_in: Yup.string().required('Campo é obrigatório'),
        application_for: Yup.string().required('Campo é obrigatório'),
        solution_agent_in: Yup.string().required('Campo é obrigatório'),
        solution_agent_for: Yup.string().required('Campo é obrigatório'),
        process_in: Yup.string().required('Campo é obrigatório'),
        process_for: Yup.string().required('Campo é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        tech_in,
        tech_for,
        server_in,
        server_for,
        directory_in,
        directory_for,
        user_in,
        user_for,
        mask_archive_in,
        mask_archive_for,
        size_register_in,
        size_register_for,
        node_in,
        node_for,
        application_in,
        application_for,
        solution_agent_in,
        solution_agent_for,
        process_in,
        process_for,
      } = data;

      if (id) {
        await api.put(`transmissions/${id}`, {
          job_id: transmission.job_id,
          tech_in,
          tech_for,
          server_in,
          server_for,
          directory_in,
          directory_for,
          user_in,
          user_for,
          mask_archive_in,
          mask_archive_for,
          size_register_in,
          size_register_for,
          node_in,
          node_for,
          application_in,
          application_for,
          solution_agent_in,
          solution_agent_for,
          process_in,
          process_for,
        });

        toast.success('Transmissão atualizado com sucesso!');
        history.goBack();
      } else {
        await api.post('transmissions', {
          job_id,
          tech_in,
          tech_for,
          server_in,
          server_for,
          directory_in,
          directory_for,
          user_in,
          user_for,
          mask_archive_in,
          mask_archive_for,
          size_register_in,
          size_register_for,
          node_in,
          node_for,
          application_in,
          application_for,
          solution_agent_in,
          solution_agent_for,
          process_in,
          process_for,
        });

        toast.success('Transmissão cadastrada com sucesso!');
        setLoadingStore(false);
        history.goBack();
      }
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
              history.goBack();
            }}
            loading={loadingStore}
          />
          <SaveButton
            title="SALVAR"
            IconButton={MdSave}
            type="submit"
            form="transmission"
            loading={loadingStore}
          />
        </div>
      </HeaderPage>
      {loading ? (
        <Mensagem>
          <h1>Carregando Transmissão...</h1>
        </Mensagem>
      ) : (
        <ContentForm>
          <Form
            initialData={transmission}
            ref={formRef}
            id="transmission"
            onSubmit={handleSubmitAdd}
          >
            <DivData>
              <DivHead>
                <h3>Origem</h3>
              </DivHead>
              <DivHead>
                <h3>Destino</h3>
              </DivHead>
            </DivData>
            <DivData>
              <DivFild>
                <Select
                  label="1 – Forma de envio"
                  name="tech_in"
                  options={Technologies}
                  placeholder="CONNETC"
                />
              </DivFild>
              <DivFild>
                <Select
                  label="1 – Forma de envio"
                  name="tech_for"
                  options={Technologies}
                  placeholder="CONNETC"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="2 – Servidor (ambiente/Nome/IP)"
                  name="server_in"
                  placeholder="Mainframe MG"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="2 – Servidor (ambiente/Nome/IP)"
                  name="server_for"
                  placeholder="SERPW01"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="3 – Caminho / PATH (Diretório / FS / Data Set, etc)"
                  name="directory_in"
                  placeholder="N/A"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="3 – Caminho / PATH (Diretório / FS / Data Set, etc)"
                  name="directory_for"
                  placeholder="/USXXX/STC/MIGRADOR"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="4 – Usuário executor do Processo Control-M(Ambiente Distribuído)"
                  name="user_in"
                  placeholder="CDTLMMG"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="4 – Usuário executor do Processo Control-M(Ambiente Distribuído)"
                  name="user_for"
                  placeholder="CDTLMMG"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="5 – Máscara do arquivo"
                  name="mask_archive_in"
                  placeholder="#TC0.A001D.DXXX.CGSXXXXX.FINAL.D&DT"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="5 – Máscara do arquivo"
                  name="mask_archive_for"
                  placeholder="EXTRATOR-XXXXXXXXX-R1-DDMMAA.TXT"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="6 – Tam. Registro / DCB / ???CYL"
                  name="size_register_in"
                  placeholder="LRECL=200"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="6 – Tam. Registro / DCB / ???CYL"
                  name="size_register_for"
                  placeholder="200 bytes"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="7 – Identificação:Node (Connect) / Site (Pelican)"
                  name="node_in"
                  placeholder="TLMMG"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="7 – Identificação:Node (Connect) / Site (Pelican)"
                  name="node_for"
                  placeholder="N/A"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="8 - Aplicação(XFB) / Process Name (CD)"
                  name="application_in"
                  placeholder="#TC0S0XX"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="8 - Aplicação(XFB) / Process Name (CD)"
                  name="application_for"
                  placeholder="#TC0S0XX"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Select
                  label="9 -Agente solução no ARS  e  responsável pelo diretório/Manutenção"
                  name="solution_agent_in"
                  options={AgenteSolution}
                  placeholder="OP_STCVOZ_N2_ACC"
                />
              </DivFild>
              <DivFild>
                <Select
                  label="9 -Agente solução no ARS  e  responsável pelo diretório/Manutenção"
                  name="solution_agent_for"
                  options={AgenteSolution}
                  placeholder="OP_STCVOZ_N2_ACC"
                />
              </DivFild>
            </DivData>
            <DivData>
              <DivFild>
                <Input
                  label="10 – Aplicação do processo"
                  name="process_in"
                  placeholder="STC"
                />
              </DivFild>
              <DivFild>
                <Input
                  label="10 – Aplicação do processo"
                  name="process_for"
                  placeholder="USUÁRIO"
                />
              </DivFild>
            </DivData>
          </Form>
        </ContentForm>
      )}
    </Container>
  );
}

export default TransmissionForm;
