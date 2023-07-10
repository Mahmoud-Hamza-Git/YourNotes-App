import { styled } from 'styled-components';

export const SignContainer = styled.div`
  background-image: url('/images/cover1.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const SignWrapper = styled.div`
  width: 80%;
  min-width: 70rem;
  display: flex;
  justify-content: center;
  min-height: 50rem;
  border-radius: 1rem;
  @media (max-width: 500px) {
    min-width: 60rem;
  }
`;

export const SignContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50%;
  background-color: #fff;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
  text-align: center;

  .tail {
    user-select: none;
  }

  .tail {
    font-size: 1.5rem;
    font-weight: 500;
    p {
      color: ${({ theme }) => theme.gray};
    }
    .link {
      color: ${({ theme }) => theme.pink};
      text-decoration: none;
      font-size: 1.8rem;
    }
  }
`;

export const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 2rem;
  text-align: center;

  .form-title {
    user-select: none;
    font-size: 4rem;
    color: ${({ theme }) => theme.pink};
  }
  .form-title span {
    font-size: 4.5rem;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;

  input {
    outline: none;
    border: none;
    box-shadow: 0 0 2px ${({ theme }) => theme.gray};
    border-radius: 2px;
    padding: 0.8rem 1rem;
    width: 100%;
  }

  input:focus {
    box-shadow: 0 0 5px ${({ theme }) => theme.gray};
  }

  .input-title {
    user-select: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.gray};
  }
`;
