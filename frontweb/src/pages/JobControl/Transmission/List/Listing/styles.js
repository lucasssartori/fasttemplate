import styled from 'styled-components';
import { Collapse } from '@material-ui/core';
import { lighten } from 'polished';

import Colors from '~/components/Colors';

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

export const DataTransmission = styled(Collapse)`
  width: 900px;
  margin-top: 25px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 5px 5px 5px #bbbbbb;
`;

export const DivButons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DivActions = styled.div`
  display: flex;
`;

export const OpenButton = styled.button`
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 0;
  border-radius: 3px;
  padding: 0 3px;
  background: #6b9f60;

  &:hover {
    background: ${lighten(0.18, '#6B9F60')};
  }
`;

export const CloseBotton = styled.button`
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 3px;
  margin-left: 5px;
  border: 0;
  border-radius: 3px;
  background: #ee4d64;

  &:hover {
    background: ${lighten(0.18, '#ee4d64')};
  }
`;

export const SourseDestiny = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DivLabel = styled.label`
  display: flex;
  flex: 3;
  align-items: center;
  padding: 3px;
  border-radius: 5px;
  border: 1px solid #dddddd;
  background: #eeeeee;
  margin: 10px;

  p {
    font-size: 10px;
    line-height: 19px;
    margin-left: 5px;
    color: #444444;
  }
`;
export const LabelData = styled.h6`
  text-justify: center;
  font-size: 10px;
  line-height: 19px;
  margin-left: 12px;
  color: #444444;
`;

export const DivHead = styled.label`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: ${Colors.PrimaryColor};
  padding: 6px 0px;
  margin: 10px;
  box-shadow: 5px 5px 5px #bbbbbb;

  h3 {
    font-size: 14px;
    color: #dddddd;
  }
`;
