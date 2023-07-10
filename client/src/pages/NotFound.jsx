import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Container404 = styled.div`
  background: #fff;
  font-family: 'Arvo', serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 1rem;

  .error {
    font-size: 8rem;
  }

  .gif {
    background-image: url(/images/404.gif);
    min-height: 40rem;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .btn {
    color: #fff;
    font-size: 1.8rem;
    padding: 0.8rem 1.6rem;
    background: #39ac31;
    border-radius: 1rem;
    text-decoration: none;
  }

  p {
    font-size: 3.5rem;
    color: #3f3d3d;
  }
  @media (max-width: 800px) {
    .gif {
      background-size: cover;
    }
  }
`;

const NotFound = () => {
  return (
    <Container404>
      <div className='gif'>
        <h1 className='error'>404</h1>
      </div>

      <div className='content'>
        <p>Look like you're lost</p>
        <Link className='btn' to='/'>
          Go to Home
        </Link>
      </div>
    </Container404>
  );
};

export default NotFound;
