import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import Listing from './Listing';

import {
  Container,
  HeaderPage,
  DataJob,
  DivNameSystem,
  DivLabel,
  Mensagem,
} from './styles';

function TransmissionList() {
  const { id } = useParams();

  const [job, setJob] = useState({});
  const [transmissios, setTransmissios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);
        const response = await api.get(`transmissionsjobs/${id}`);
        setJob(response.data.transmissionsJobs);
        setTransmissios(response.data.transmissionsJobs.Transmissions);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    loadJobs();
  }, [id]);

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
        <>
          <HeaderPage>
            <h1>Gerenciando Transmissões de Job</h1>
            <DataJob>
              <DivNameSystem>
                <DivLabel>
                  <label>Nome do Job:</label>
                  <p>{job.name}</p>
                </DivLabel>
                <DivLabel>
                  <label>Sistema:</label>
                  <p>{job.system}</p>
                </DivLabel>
              </DivNameSystem>
              <DivLabel>
                <label>Descrição:</label>
                <p>{job.description}</p>
              </DivLabel>
            </DataJob>
          </HeaderPage>
          <Listing transmissios={transmissios} />
        </>
      )}
    </Container>
  );
}

export default TransmissionList;
