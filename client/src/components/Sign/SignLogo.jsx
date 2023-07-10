import React from 'react';
import { styled } from 'styled-components';

const LogoWrapper = styled.div`
  background-image: url('/images/cover2.png');
  background-position: center;
  background-repeat: repeat-x;
  width: 50%;
  padding: 6rem 4em;
  .content {
    background-color: #ffffff2a;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content h2 {
    color: #fff;
    font-size: 3rem;
    user-select: none;
  }

  .content span {
    font-size: 3.5rem;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;
const SignLogo = () => {
  return (
    <LogoWrapper>
      <div className='content'>
        <img src='/images/logo.png' alt='logo' />
        <h2>
          <span className='big-letter'>Y</span>our <span className='big-letter'>N</span>otes
        </h2>
      </div>
    </LogoWrapper>
  );
};

export default SignLogo;
