import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { MdArrowBack, MdDescription, MdAdd } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import history from '~/services/history';
import Listing from './Listing';
import Systems from '~/enums/EnumSystems';

import {
  Container,
  HeaderPage,
  Header,
  DataJob,
  DivHead,
  DivNameSystem,
  DivLabel,
  Mensagem,
  AddButton,
  BackButton,
  TransmissionButton,
} from './styles';

function TransmissionList() {
  const { id } = useParams();

  const [job, setJob] = useState({});
  const [transmissios, setTransmissios] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => (state.auth ? state.auth.token : ''));

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
        setLoading(true);
        const response = await api.get(`transmissionsjobs/${id}`);
        const data = response.data.job;
        const aux_system = Systems.find(
          (option) => option.value === data.system
        );

        setJob({
          id: data.id,
          name: data.name,
          system: aux_system.label,
          description: data.description,
        });

        setTransmissios(data.Transmissions);
        setLoading(false);
      } catch (error) {
        treatmentError(error);
      }
    }
    loadJobs();
  }, [id, treatmentError]);

  async function handleTransmissao() {
    if (transmissios.length < 1) {
      toast.warn('Job não possui transmissão');
      return;
    }

    try {
      axios({
        url: `http://localhost:3333/transmissionstemplate/${job.id}`,
        method: 'GET',
        responseType: 'blob', // important
        headers: {
          Authorization: `Baerer ${token}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `Docmento_de_transmissão_${job.name}.docx`
        );
        document.body.appendChild(link);
        link.click();
      });
    } catch (error) {
      treatmentError(error);
    }
  }

  return (
    <Container>
      {loading ? (
        <HeaderPage>
          <h1>Gerenciando Transmissões de Job</h1>
          <Mensagem>
            <h1>Carregando...</h1>
          </Mensagem>
        </HeaderPage>
      ) : (
        <div>
          <HeaderPage>
            <Header>
              <h1>Gerenciando Transmissões de Job</h1>
              <div>
                <BackButton
                  title="VOLTAR"
                  IconButton={MdArrowBack}
                  type="button"
                  onClick={() => {
                    history.push('/jobs/list');
                  }}
                />
                <AddButton
                  title="CADASTRAR"
                  loading={loading}
                  IconButton={MdAdd}
                  type="button"
                  onClick={() => {
                    history.push(`/transmission/store/${job.id}`);
                  }}
                />
                <TransmissionButton
                  title=".DOCX"
                  IconButton={MdDescription}
                  type="button"
                  onClick={handleTransmissao}
                  disabled={!(transmissios.length > 0)}
                />
              </div>
            </Header>
            <DataJob>
              <DivHead>
                <h3>Dados da Etapa</h3>
              </DivHead>
              <DivNameSystem>
                <DivLabel>
                  <strong>Nome do Job:</strong>
                  <p>{job.name}</p>
                </DivLabel>
                <DivLabel>
                  <strong>Sistema:</strong>
                  <p>{job.system}</p>
                </DivLabel>
              </DivNameSystem>
              <DivLabel>
                <strong>Descrição:</strong>
                <p>{job.description}</p>
              </DivLabel>
            </DataJob>
          </HeaderPage>
          <Listing
            transmissios={transmissios}
            setTransmissios={setTransmissios}
          />
        </div>
      )}
    </Container>
  );
}

export default TransmissionList;
