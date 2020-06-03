import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  width: 900px;
  margin: 20px auto;
`;

export const HeaderPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 900px;
  margin-bottom: 20px;

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

export const BackButton = styled(Button)`
  width: 112px;
  height: 36px;
  padding: 0 15px;
  margin-right: 16px;
  background: #cccccc;
`;

export const SaveButton = styled(Button)`
  width: 112px;
  height: 36px;
  padding: 0 15px;
  background: #6b9f60;
`;

export const ContentForm = styled.div`
  width: 900px;
  border-radius: 6px;
  background-color: #fff;
  padding: 26px 30px;
`;

export const DivData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  > div {
    flex: 1;
    width: 100%;
    max-width: 405px;
  }
`;

export const DivDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Mensagem = styled.div`
  width: auto;
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

export const InformationParse = styled.div`
  display: flex;
  flex: 1;

  div {
    display: flex;
    flex: 1;
    height: 0px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-top: 10px;
  }

  div.error {
    height: 30px;
    background-color: #fab0b0;
    h1 {
      font-weight: normal;
      font-size: 12px;
      color: #de3b3b;
    }
  }

  div.sucess {
    height: 30px;
    flex: 1;
    background-color: #dff0df;
    h1 {
      font-weight: normal;
      font-size: 12px;
      color: #2ca42b;
    }
  }
`;
