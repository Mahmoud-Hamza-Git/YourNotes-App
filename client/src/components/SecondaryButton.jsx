import React from 'react';
import { styled } from 'styled-components';
import { Button as btn } from './PrimaryButton';

const Button = styled(btn)`
  background-color: ${({ theme }) => theme.gray};
  &:hover {
    background-color: ${({ theme }) => theme.gray_shade};
  }
`;
const SecondaryButton = ({ children }) => {
  return <Button>{children}</Button>;
};

export default SecondaryButton;
