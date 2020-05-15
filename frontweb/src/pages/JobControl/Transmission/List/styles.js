import styled from 'styled-components';
import { lighten } from 'polished';
import Button from '~/components/Button';

export const Container = styled.div`
  width: 900px;
  margin: 20px auto;
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

export const HeaderPage = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;

  h1 {
    font-weight: normal;
    font-size: 18px;
    color: #03022e;
  }

  div {
    display: flex;
    justify-content: space-between;
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
  background: #eeeeee;
  margin: 10px;

  strong {
    font-size: 12px;
    line-height: 19px;
    color: #03022e;
  }

  p {
    font-size: 14px;
    line-height: 19px;
    margin-left: 5px;
    color: #444444;
  }
`;

export const DivNameSystem = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DivHead = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #003344;
  padding: 6px 0px;
  margin: 10px;
  box-shadow: 5px 5px 5px #bbbbbb;

  h3 {
    font-size: 14px;
    color: #fab000;
  }
`;

export const BackButton = styled(Button)`
  height: 36px;
  padding: 0 15px;
  margin-right: 16px;
  background: #cccccc;
`;

export const TransmissionButton = styled(Button)`
  height: 36px;
  padding: 0 15px;
  background: #0040ff;
`;
