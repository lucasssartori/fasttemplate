import styled from 'styled-components';

import { TextArea as TArea } from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: row;

    span {
      position: absolute;
      margin-left: 6px;
      padding-top: 3px;
    }
  }

  label {
    font-size: 14px;
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

export const TextArea = styled(TArea)`
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 100%;
  padding: 10px 10px;
  font: 14px 'Roboto', sans-serif;

  ::placeholder {
    color: #dddddd;
  }
`;
