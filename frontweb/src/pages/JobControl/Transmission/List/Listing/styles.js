import styled from 'styled-components';

export const Mensagem = styled.div`
  width: auto;
  margin-top: 20px;
  max-width: 1200px;
  display: flex;
  align-items: center;
  padding: 25px;
  border-radius: 5px;
  background: #fff;
  h1 {
    font-size: 15px;
    color: #666666;
  }
`;

export const DataTransmission = styled.div`
  margin-top: 25px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
`;

export const SourseDestiny = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DivLabel = styled.label`
  display: flex;
  flex: 3;
  align-items: center;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  margin: 10px;

  p {
    font-size: 10px;
    line-height: 19px;
    margin-left: 5px;
    color: #444444;
  }
`;
export const LabelData = styled.h6`
  text-justify: center;
  font-size: 10px;
  line-height: 19px;
  margin-left: 12px;
  color: #444444;
`;

export const DivHead = styled.label`
  display: flex;
  flex: 3;
  align-items: center;
  justify-content: center;
  padding: 3px;
  margin: 10px;

  h3 {
    font-size: 14px;
    line-height: 19px;
    margin-left: 12px;
    color: #444444;
  }
`;
