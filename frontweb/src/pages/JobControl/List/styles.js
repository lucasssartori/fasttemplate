import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0px auto;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin-top: 25px;

  h1 {
    color: #03022e;
  }

  form {
    input {
      width: 300px;
      height: 36px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      padding-left: 40px;
      ::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
      }
    }
  }
`;

export const Options = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AddButton = styled(Button)`
  width: 142px;
  height: 36px;
  padding: 0px 15px;
`;

export const ContentTable = styled.div`
  border-radius: 4px;
  width: auto;
  max-width: 1200px;
  margin-top: 25px;
`;

export const Table = styled.div`
  width: 100%;
  max-width: 1200px;
  strong {
    font-size: 16px;
    line-height: 19px;
    color: #444444;
  }
`;

export const TextTable = styled.p`
  font-size: 16px;
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
  margin-bottom: 21px;
`;

export const TableRow = styled.div`
  width: auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 57px;
  margin-bottom: 21px;
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

  .delivery_system {
    border-radius: 15px;
    width: min-content;
    padding: 4px 12px 2px 12px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    p:first-child {
      margin-right: 4px;
    }
  }

  .STC {
    background-color: #dff0df;
    p {
      font-size: 14px;
      color: #2ca42b;
    }
  }
  .SAC {
    background-color: #bad2ff;
    p {
      font-size: 14px;
      color: #4d85ee;
    }
  }
`;

export const DivActions = styled.div`
  width: auto;
  max-width: 50px;
  flex: 1;
  display: flex;
  justify-content: center;
`;
