import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  margin: 20px auto;
`;

export const HeaderPage = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  h1 {
    color: #03022e;
  }
`;

export const DataJob = styled.div`
  margin-top: 25px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
`;

export const DivLabel = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  margin: 10px;

  label {
    font-size: 12px;
    line-height: 19px;
    font-weight: bold;
    color: #999999;
  }

  p {
    font-size: 12px;
    line-height: 19px;
    margin-left: 5px;
    color: #444444;
  }
`;

export const DivNameSystem = styled.div`
  display: flex;
  flex-direction: row;
`;

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
