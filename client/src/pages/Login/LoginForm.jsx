import React, { useRef } from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { successOption, errorOption } from '../../utils/toastOptions';
import { FormWrapper, InputContainer } from '../../components/Sign/StyledComponents';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { login } from '../../apis/userApis';
import { useMutation } from 'react-query';

const StyeledToast = styled(ToastContainer)`
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
`;

const LoginForm = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logMutation = useMutation(login, {
    onSuccess: (data) => {
      if (data.status == 'success') {
        localStorage.setItem('user', JSON.stringify(data?.data));
        toast.success(t('toast_loggSuccess'), successOption());
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(data.message, errorOption());
      }
    },
  });

  //

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    logMutation.mutate({ email: emailRef.current.value, password: passRef.current.value });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1 className='form-title'>{t('login_title')}</h1>
      <InputContainer>
        <label className='input-title' htmlFor='email2'>
          {t('login_email')}
        </label>
        <input type='email' id='email2' className='email' required ref={emailRef} />
        <label className='input-title' htmlFor='pass2'>
          {t('login_pass')}
        </label>
        <input type='password' id='pass2' className='pass-input' required ref={passRef} />
      </InputContainer>
      <PrimaryButton>
        {logMutation.isLoading && 'Loading..'}
        {!logMutation.isLoading && t('login_primary')}
      </PrimaryButton>
      <StyeledToast />
    </FormWrapper>
  );
};

export default LoginForm;
