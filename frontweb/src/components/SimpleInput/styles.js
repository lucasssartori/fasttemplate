import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: row;

    input {
      border: 1px solid #cccccc;
      border-radius: 4px;
      width: 100%;
      height: 38px;
      padding: 0 10px;

      ::placeholder {
        color: #dddddd;
      }
    }

    span {
      position: absolute;
      margin-left: 6px;
      padding-top: 3px;
    }
  }

  label {
    font-size: 12px;
    line-height: 19px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  span {
    font-size: 12px;
    color: #f64c75;
    align-self: flex-start;
    margin-top: 5px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;
