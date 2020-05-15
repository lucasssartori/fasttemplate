import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button.attrs((props) => ({
  disabled: props.loading,
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;

  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  border: 0;
  box-shadow: 4px 4px 4px #bbb;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    p {
      margin-left: 10px;
    }
  }

  &[disabled] {
    justify-content: center;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:active {
    box-shadow: none;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
