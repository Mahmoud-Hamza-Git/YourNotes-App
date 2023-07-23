import { styled } from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 6.5rem);
  margin-top: 6.5rem;
  background-color: ${({ theme }) => theme.fill1};
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;

  padding-top: 5%;

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 20rem;
    user-select: none;
  }
`;

export const ContentContaienr = styled.div`
  width: 65rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  z-index: 1;

  @media (max-width: 750px) {
    width: 90%;
  }
`;

export const HeadContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  min-height: 5rem;
  background-color: ${({ theme }) => theme.fill2};
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

export const NotesContainer = styled.div`
  width: 100%;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.fill2};
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
`;

export const Note = styled(HeadContainer)`
  border-bottom: 1px solid ${({ theme }) => theme.text_light};
  &:last-child {
    border-bottom: none;
  }
  .entering {
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 2rem;
    min-height: 3rem;
    max-height: 10rem;
    padding: 1rem;
    border: none;
    color: ${({ theme, crossed }) => (!crossed ? theme.text_content : theme.crossed_text)};
    text-decoration: ${({ crossed }) => (!crossed ? 'none' : 'line-through')};
    background-color: ${({ theme }) => theme.fill2};
    letter-spacing: 1px;
  }
  .entering:focus {
    outline: none;
  }
  .checked {
    font-size: 2.5rem;
    border: 3px solid ${({ theme }) => theme.pink};
    border-radius: 50%;
    background-color: #fff;
    color: ${({ theme }) => theme.pink};
    min-width: 2.5rem;
    min-height: 2.5rem;
    cursor: pointer;
  }
  .active {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.pink};
    cursor: pointer;
  }
  .cross {
    color: ${({ theme }) => theme.text_content};
    min-width: 2rem;
    min-height: 2rem;
    cursor: pointer;
  }
`;
