import { styled } from 'styled-components';
import { InputContainer } from '../../components/Sign/StyledComponents';
import { Note } from '../../components/Containers';

export const InfoHeadContainer = styled(Note)`
  background-color: ${({ theme }) => theme.fill2};
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.pinky_white_text};
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
`;

export const InfoInputContainer = styled(InputContainer)`
  background-color: ${({ theme }) => theme.fill2};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);

  border-radius: 1rem;
  padding: 2rem 3rem;
  input {
    background-color: ${({ theme }) => theme.fill3};
    color: ${({ theme }) => theme.text_white};
  }
  .input-title {
    color: ${({ theme }) => theme.text_light};
  }
`;
