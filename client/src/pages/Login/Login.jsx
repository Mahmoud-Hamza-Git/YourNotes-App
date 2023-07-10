import React, { useEffect } from 'react';
import SignLogo from '../../components/Sign/SignLogo';
import LoginForm from './LoginForm';
import { SignContent, SignWrapper } from '../../components/Sign/StyledComponents';
import { SignContainer } from '../../components/Sign/StyledComponents';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);

  const { t } = useTranslation();

  return (
    <SignContainer>
      <SignWrapper>
        <SignLogo />
        <SignContent>
          <LoginForm />
          <div className='tail'>
            <p>{t('login_tail')}</p>
            <Link to='/signup' className='link'>
              {t('login_sign')}
            </Link>
          </div>
        </SignContent>
      </SignWrapper>
    </SignContainer>
  );
};

export default Login;
