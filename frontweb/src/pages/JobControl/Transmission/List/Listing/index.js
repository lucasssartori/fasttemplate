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
  Mensagem,
  DivHeader,
  DivHead,
  DivButons,
  DivActions,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const aux = transmissios.filter(
        (item) => item.index !== aux_transmisao.index
      );

      setTransmissios(
        aux.map((item, index) => {
          delete item.checked;
          delete item.index;
          return {
            ...item,
            checked: false,
            index,
          };
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
    transmissios.map((item, index) => (
      <DataTransmission key={item.id} in={item.checked} collapsedHeight={245}>
        <DivButons>
          {item.checked ? (
            <DivActions>
              <Actions
                Edit={() => history.push(`/transmission/update/${item.id}`)}
                Delete={() => confirmDelete(item)}
              />
              <CloseBotton
                type="button"
                onClick={() => handleChange(item.index)}
              >
                <MdRemove color="#fff" size={16} />
              </CloseBotton>
            </DivActions>
          ) : (
            <OpenButton type="button" onClick={() => handleChange(item.index)}>
              <MdAdd color="#fff" size={16} />
            </OpenButton>
          )}
        </DivButons>
        <DivHeader>
          <h2>Transmissão {index + 1} </h2>
        </DivHeader>
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
          <div className={item.tech_in === null ? 'criticized' : 'normalize'}>
            <p>{item.tech_in}</p>
          </div>
          <div className={item.tech_for === null ? 'criticized' : 'normalize'}>
            <p>{item.tech_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>2 – Servidor (ambiente/Nome/IP)</LabelData>
        <SourseDestiny>
          <div className={item.server_in === null ? 'criticized' : 'normalize'}>
            <p>{item.server_in}</p>
          </div>
          <div
            className={item.server_for === null ? 'criticized' : 'normalize'}
          >
            <p>{item.server_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>
          3 – Caminho / PATH (Diretório / FS / Data Set, etc)
        </LabelData>
        <SourseDestiny>
          <div
            className={item.directory_in === null ? 'criticized' : 'normalize'}
          >
            <p>{item.directory_in}</p>
          </div>
          <div
            className={item.directory_for === null ? 'criticized' : 'normalize'}
          >
            <p>{item.directory_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>
          4 – Usuário executor do Processo Control-M(Ambiente Distribuído)
        </LabelData>
        <SourseDestiny>
          <div className={item.user_in === null ? 'criticized' : 'normalize'}>
            <p>{item.user_in}</p>
          </div>
          <div className={item.user_for === null ? 'criticized' : 'normalize'}>
            <p>{item.user_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>5 – Máscara do arquivo</LabelData>
        <SourseDestiny>
          <div
            className={
              item.mask_archive_in === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.mask_archive_in}</p>
          </div>
          <div
            className={
              item.mask_archive_for === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.mask_archive_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>6 – Tam. Registro / DCB / ???CYL</LabelData>
        <SourseDestiny>
          <div
            className={
              item.size_register_in === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.size_register_in}</p>
          </div>
          <div
            className={
              item.size_register_for === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.size_register_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>7 – Identificação:Node (Connect) / Site (Pelican)</LabelData>
        <SourseDestiny>
          <div className={item.node_in === null ? 'criticized' : 'normalize'}>
            <p>{item.node_in}</p>
          </div>
          <div className={item.node_for === null ? 'criticized' : 'normalize'}>
            <p>{item.node_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>8 - Aplicação(XFB) / Process Name (CD)</LabelData>
        <SourseDestiny>
          <div
            className={
              item.application_in === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.application_in}</p>
          </div>
          <div
            className={
              item.application_for === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.application_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>
          9 -Agente solução no ARS e responsável pelo diretório/Manutenção
        </LabelData>
        <SourseDestiny>
          <div
            className={
              item.solution_agent_in === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.solution_agent_in}</p>
          </div>
          <div
            className={
              item.solution_agent_for === null ? 'criticized' : 'normalize'
            }
          >
            <p>{item.solution_agent_for}</p>
          </div>
        </SourseDestiny>
        <LabelData>10 – Aplicação do processo</LabelData>
        <SourseDestiny>
          <div
            className={item.process_in === null ? 'criticized' : 'normalize'}
          >
            <p>{item.process_in}</p>
          </div>
          <div
            className={item.process_for === null ? 'criticized' : 'normalize'}
          >
            <p>{item.process_for}</p>
          </div>
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
