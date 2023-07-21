import React, { useEffect } from 'react';
import CompleteSignUpForm from './CompleteSignUpForm';
import SignUpLogo from '../../../components/Sign/SignLogo';
import SecondaryButton from '../../../components/SecondaryButton';
import { BsArrowLeft } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignContainer, SignContent, SignWrapper } from '../../../components/Sign/StyledComponents';
import { useTranslation } from 'react-i18next';
import StyledLink from '../../../components/StyledLink';

const CompleteSign = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);
  
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <SignContainer>
      <SignWrapper>
        <SignUpLogo />
        <SignContent>
          <CompleteSignUpForm starterdata={location.state} />
          <StyledLink to={'/signup'}>
            <SecondaryButton>
              {t('complete_secondary')} <BsArrowLeft />
            </SecondaryButton>
          </StyledLink>
          <div className='tail'>
            <p>{t('sign_tail')}</p>
            <StyledLink to='/login' className='link'>
              {t('sign_login')}
            </StyledLink>
          </div>
        </SignContent>
      </SignWrapper>
    </SignContainer>
  );
};

export default CompleteSign;
