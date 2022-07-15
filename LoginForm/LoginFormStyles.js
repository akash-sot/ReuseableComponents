import styled from "styled-components";

export const Container = styled.form`
  text-align: center;
  width: 30rem;
  img {
    width: 20rem;
    margin-bottom: 1rem;
  }

  .loginForm {
    background-color: #ffffff;
    padding: 3rem;
    text-align: left;
    margin-bottom: 1rem;
    h3 {
      color: gray;
    }
    .Fields {
      width: 100%;
      text-align: left;
      margin-top: 1.5rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  font-size: 20px;
  text-align: center;
  color: red;
`