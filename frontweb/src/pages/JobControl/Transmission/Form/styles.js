import styled from 'styled-components';

import Button from '~/components/Button';
import Colors from '~/components/Colors';

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

export const SourseDestiny = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DivData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const DivHead = styled.div`
  width: 100%;
  max-width: 405px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${Colors.PrimaryColor};
  padding: 6px 0px;
  box-shadow: 5px 5px 5px #bbbbbb;

  h3 {
    font-size: 14px;
    color: #dddddd;
  }
`;

export const DivFild = styled.div`
  flex: 1;
  width: 100%;
  max-width: 405px;
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
