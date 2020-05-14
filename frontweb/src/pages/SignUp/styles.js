import styled from 'styled-components';
import { lighten } from 'polished';
import { Form as Unform } from '@unform/web';
import Colors from '~/components/Colors';

import Button from '~/components/Button';

export const Form = styled(Unform)`
  margin-top: 30px;
  width: 300px;
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    padding-bottom: 8px;
  }

  input {
    height: 45px;
    background: #ffffff;
    border: 1px solid ${Colors.BorderColor};
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 10px;

    &::placeholder {
      color: #cccccc;
    }
  }
`;

export const SighInButton = styled(Button)`
  height: 45px;
  background: ${Colors.ButtomGreen};
  border-radius: 4px;
  font-size: 16px;
  color: #ffffff;
  border: 0px;
  transition: background 0.2s;

  &:hover {
    background: ${lighten(0.18, Colors.ButtomGreen)};
  }
`;

export const RegisterButton = styled(Button)`
  height: 45px;
  background: ${Colors.PrimaryColor};
  border-radius: 4px;
  font-size: 16px;
  color: #ffffff;
  border: 0px;
  transition: background 0.2s;

  &:hover {
    background: ${lighten(0.18, Colors.PrimaryColor)};
  }
`;

export const DivButton = styled.div`
  margin-top: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;
