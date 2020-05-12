import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;

  button {
    justify-content: center;
    align-items: center;
    border: none;
    background: #0040ff;
    border-radius: 5px;
    font-size: 14px;
    padding: 0 10px;
    padding-top: 10px;
    padding-bottom: 6px;
    color: #fff;

    box-shadow: 4px 4px 4px #bbb;
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.4;
      box-shadow: none;
    }
    &:active {
      box-shadow: none;
    }
  }

  span {
    font-size: 10px;
    padding: 0 10px;
    color: #666666;
  }
`;
