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
  }

  label {
    font-size: 12px;
    line-height: 19px;
    font-weight: bold;
  }

  span.icon {
    font-size: 12px;
    line-height: 19px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
      inset 0 -1px 0 rgba(16, 22, 26, 0.1);
    background-color: #f5f8fa;
    background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.8),
      hsla(0, 0%, 100%, 0)
    );
  }

  span.icon:hover {
    background-color: #eb5;
  }

  span.icon:disabled {
    box-shadow: none;
    background: rgba(206, 217, 224, 0.5);
  }

  .error {
    font-size: 12px;
    color: #f64c75;
    align-self: flex-start;
    margin-top: 5px;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;
