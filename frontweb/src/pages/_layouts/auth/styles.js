import styled from 'styled-components';

import Colors from '~/components/Colors';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, ${Colors.PrimaryColor}, #151515);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  height: max-content;
  width: 100%;
  max-width: 360px;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  padding-bottom: 30px;

  a {
    color: #0040ff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }

  img {
    width: 85px;
    height: 100px;
  }
`;
