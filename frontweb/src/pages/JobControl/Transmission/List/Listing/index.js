import React from 'react';
import PropTypes from 'prop-types';

import {
  DataTransmission,
  SourseDestiny,
  LabelData,
  DivLabel,
  Mensagem,
  DivHead,
} from './styles';

function TransmissionList({ transmissios }) {
  return transmissios.length <= 0 ? (
    <Mensagem>
      <h1>Não foi encontrado nenhuma Transmissão</h1>
    </Mensagem>
  ) : (
    transmissios.map((item) => (
      <DataTransmission key={item.id}>
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
};

export default TransmissionList;
