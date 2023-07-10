import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MainContainer } from '../../components/Containers';

const Info = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);

  return (
    <MainContainer>
      <img src='images/cover3.png' alt='cover' className='cover' />
    </MainContainer>
  );
};

export default Info;
