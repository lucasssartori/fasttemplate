import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdArrowBack, MdDescription } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import Listing from './Listing';

import {
  Container,
  HeaderPage,
  Header,
  DataJob,
  DivNameSystem,
  DivLabel,
  Mensagem,
  BackButton,
  TransmissionButton,
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

  async function handleTransmissao() {
    try {
      await api.get(`transmissionstemplate/${job.id}`).then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute(
          'download',
          `Docmento_de_transmissão_${job.name}.docx`
        ); // any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    } catch (error) {
      toast.warn(error.response.data.error);
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
        <>
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
                <TransmissionButton
                  title="Transmissão"
                  IconButton={MdDescription}
                  type="button"
                  onClick={handleTransmissao}
                />
              </div>
            </Header>
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
