import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

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

  .react-select__placeholder {
    color: #dddddd;
  }
`;
