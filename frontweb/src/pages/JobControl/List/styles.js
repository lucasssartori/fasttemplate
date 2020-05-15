import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin-top: 25px;
  margin-bottom: 25px;

  h1 {
    font-weight: normal;
    font-size: 18px;
    color: #03022e;
  }

  form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    input {
      height: 36px;
      width: 300px;
      margin: 0px;
      padding-left: 30px;
    }
  }
`;

export const Options = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ClearButton = styled(Button)`
  width: fit-content;
  height: 36px;
  padding: 0px 10px;
  margin-left: 10px;
  background: #ee4d64;
`;

export const AddButton = styled(Button)`
  width: 142px;
  height: 36px;
  padding: 0px 15px;
  background: #6b9f60;
`;

export const ContentTable = styled.div`
  border-radius: 4px;
  width: auto;
  max-width: 1200px;
`;

export const Table = styled.div`
  width: 100%;
  max-width: 1200px;
  strong {
    font-size: 14px;
    line-height: 19px;
    color: #444444;
  }
`;

export const TextTable = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #666666;
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

export const Header = styled.div`
  width: auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  padding: 0 25px;
  margin-bottom: 15px;
`;

export const TableRow = styled.div`
  width: auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  margin-bottom: 15px;
  padding: 0 25px;
  border-radius: 5px;
  background: #fff;
`;

export const DivID = styled.div`
  width: auto;
  max-width: 92px;
  flex: 1;
`;

export const DivName = styled.div`
  width: auto;
  max-width: 230px;
  flex: 1;
`;

export const DivSystem = styled.div`
  width: auto;
  max-width: 170px;
  flex: 1;

  .job_system {
    border-radius: 4px;
    width: max-content;
    padding: 4px 12px 4px 12px;
    font-weight: bold;

    p:first-child {
      margin-right: 4px;
    }
  }

  .STC_VOZ {
    background-color: #f0f0df;
    p {
      font-size: 12px;
      color: #c1bc35;
    }
  }
  .STC_DADOS {
    background-color: #dff0df;
    p {
      font-size: 12px;
      color: #2ca42b;
    }
  }
  .SISRAF {
    background-color: #fab0b0;
    p {
      font-size: 12px;
      color: #de3b3b;
    }
  }
  .SAC {
    background-color: #bad2ff;
    p {
      font-size: 12px;
      color: #4d85ee;
    }
  }
`;

export const DivDescription = styled.div`
  width: auto;
  max-width: 600px;
  flex: 1;
`;

export const DivActions = styled.div`
  width: auto;
  max-width: 50px;
  flex: 1;
  display: flex;
  justify-content: center;
`;
