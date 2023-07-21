import { Note } from '../../components/Containers';

import { styled } from 'styled-components';
import { Button } from '../../components/PrimaryButton';

export const OpenBtn = styled(Button)`
  width: fit-content;
`;

export const HomeHeadContainer = styled(Note)`
  border: none;
  border-radius: 1rem;
`;

export const NoteArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rem;
  min-width: 30rem;
  width: 60%;
  min-height: 40rem;
  z-index: 2;
  background-color: ${({ theme }) => theme.fill2};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);

  display: ${({ open }) => {
    return open ? 'flex' : 'none';
  }};

  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3rem 5rem;

  .close-icon {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    font-weight: 700;
    padding: 0.1rem 0.6rem;
    border-radius: 1rem;
    color: ${({ theme }) => theme.fill2};
    background-color: ${({ theme }) => theme.pink};
  }

  .title,
  .content {
    width: 100%;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.fill3};
    padding: 1.5rem 2rem;
    color: ${({ theme }) => theme.text_content};
    border: 1px solid ${({ theme }) => theme.text_light};
    outline: none;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    resize: none;
  }
  .title {
    font-size: 2rem;
    padding: 1rem 2rem;
    font-weight: 500;
    height: 5rem;
    letter-spacing: 1px;
    overflow-wrap: normal;
  }
  .content {
    font-size: 1.8rem;
    min-height: 15rem;
    flex-grow: 1;
  }
`;

export const NoteAreaOverlay = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100vh;
  width: 100%;
  background-color: #0000006c;
`;
