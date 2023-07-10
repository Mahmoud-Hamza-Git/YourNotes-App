import { styled } from 'styled-components';

export const SwitchDirection = styled.div`
  flex-direction: row;
`;
// export const SwitchAlign = styled.div`
//   align-items: start;
// `;
export const SwitchPositionPass = styled.div`
  & > *:last-child {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 5px;
  }
`;
export const SwitchPosition = styled.div`
  right: 4rem;
`;
