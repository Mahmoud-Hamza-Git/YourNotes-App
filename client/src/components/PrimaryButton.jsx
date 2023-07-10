import React from 'react';
import { styled } from 'styled-components';

export const Button = styled.button`
  width: 100%;
  color: #fff;
  background-color: ${({ theme }) => theme.pink};
  border-radius: 5px;
  font-size: 2rem;
  padding: 8px;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.pink_shade};
  }
`;

const PrimaryButton = ({ children }) => {
  return <Button>{children}</Button>;
};

export default PrimaryButton;
