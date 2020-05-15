import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdAdd, MdRemove } from 'react-icons/md';
import Actions from '~/components/MenuActions';
import api from '~/services/api';
import history from '~/services/history';

import {
  DataTransmission,
  SourseDestiny,
  LabelData,
  DivLabel,
  Mensagem,
  DivHead,
  DivButons,
  OpenButton,
  CloseBotton,
} from './styles';

function TransmissionList({ transmissios, setTransmissios }) {
  useEffect(() => {
    function load() {
      if (transmissios.length > 0) {
        setTransmissios(
          transmissios.map((item, index) => {
            return {
              ...item,
              checked: false,
              index,
            };
          })
        );
      }
    }
    load();
  }, []);

  const handleChange = (index) => {
    setTransmissios(
      transmissios.map((item) => {
        if (item.index === index) {
          item.checked = !item.checked;
        }
        return item;
      })
    );
  };

  async function handleDelete(aux_transmisao) {
    try {
      await api.delete(`transmissions/${aux_transmisao.id}`);
      toast.success('Transmissão excluida com sucesso!');
      setTransmissios();

      setTransmissios(
        transmissios.filter((item, index) => {
          if (item.index !== aux_transmisao.index) {
            delete item.checked;
            delete item.index;
            return {
              ...item,
              checked: false,
              index,
            };
          }
        })
      );
    } catch (error) {
      toast.warn(error.response.data.error);
    }
  }

  function confirmDelete(aux_transmisao) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir a transmissão?',
      buttons: [
        {
          label: 'Excluir',
          onClick: () => {
            handleDelete(aux_transmisao);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  return transmissios.length <= 0 ? (
    <Mensagem>
      <h1>Não foi encontrado nenhuma Transmissão</h1>
    </Mensagem>
  ) : (
    transmissios.map((item) => (
      <DataTransmission key={item.id} in={item.checked} collapsedHeight={240}>
        <DivButons>
          <Actions
            Edit={() => history.push(`/transmission/update/${item.id}`)}
            Delete={() => confirmDelete(item)}
          />
          {item.checked ? (
            <CloseBotton type="button" onClick={() => handleChange(item.index)}>
              <MdRemove color="#fff" size={16} />
            </CloseBotton>
          ) : (
            <OpenButton type="button" onClick={() => handleChange(item.index)}>
              <MdAdd color="#fff" size={16} />
            </OpenButton>
          )}
        </DivButons>
        <SourseDestiny>
          <DivHead>
            <h3>Origem</h3>
          </DivHead>
          <DivHead>
            <h3>Destino</h3>
          </DivHead>
        </SourseDestiny>
        <LabelData>1 – Forma de envio</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.tech_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.tech_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>2 – Servidor (ambiente/Nome/IP)</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.server_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.server_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>
          3 – Caminho / PATH (Diretório / FS / Data Set, etc)
        </LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.directory_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.directory_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>
          4 – Usuário executor do Processo Control-M(Ambiente Distribuído)
        </LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.user_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.user_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>5 – Máscara do arquivo</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.mask_archive_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.mask_archive_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>6 – Tam. Registro / DCB / ???CYL</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.size_register_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.size_register_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>7 – Identificação:Node (Connect) / Site (Pelican)</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.node_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.node_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>8 - Aplicação(XFB) / Process Name (CD)</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.application_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.application_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>
          9 -Agente solução no ARS e responsável pelo diretório/Manutenção
        </LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.solution_agent_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.solution_agent_for}</p>
          </DivLabel>
        </SourseDestiny>
        <LabelData>10 – Aplicação do processo</LabelData>
        <SourseDestiny>
          <DivLabel>
            <p>{item.process_in}</p>
          </DivLabel>
          <DivLabel>
            <p>{item.process_for}</p>
          </DivLabel>
        </SourseDestiny>
      </DataTransmission>
    ))
  );
}

TransmissionList.propTypes = {
  transmissios: PropTypes.array.isRequired,
  setTransmissios: PropTypes.func.isRequired,
};

export default TransmissionList;
