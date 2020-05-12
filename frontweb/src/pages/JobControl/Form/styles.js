import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  width: 900px;
  margin: 20px auto;
`;

export const HeaderPage = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    color: #03022e;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const BackButton = styled(Button)`
  width: 112px;
  padding: 0 15px;
  margin-right: 16px;
  background: #cccccc;
`;

export const SaveButton = styled(Button)`
  width: 112px;
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
