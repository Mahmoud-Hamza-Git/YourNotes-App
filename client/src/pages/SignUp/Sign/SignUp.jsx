import React, { useEffect } from 'react';
import SignLogo from '../../../components/Sign/SignLogo';
import SignUpForm from './SignUpForm';
import { SignContent, SignWrapper } from '../../../components/Sign/StyledComponents';
import { SignContainer } from '../../../components/Sign/StyledComponents';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
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
          <SignUpForm />
          <div className='tail'>
            <p>{t('sign_tail')}</p>
            <Link to='/login' className='link'>
              {t('sign_login')}
            </Link>
          </div>
        </SignContent>
      </SignWrapper>
    </SignContainer>
  );
};

export default SignUp;
