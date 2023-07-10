import React, { useRef } from 'react';
import PrimaryButton from '../../../components/PrimaryButton';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { successOption, errorOption } from '../../../utils/toastOptions';
import { FormWrapper, InputContainer } from '../../../components/Sign/StyledComponents';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { auth } from '../../../apis/userApis';
const StyeledToast = styled(ToastContainer)`
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
`;

const SignUpForm = () => {
  const pass1Ref = useRef(null);
  const pass2ref = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const authMutation = useMutation(auth, {
    onSuccess: (data) => {
      console.log(data, '✅');
      if (data.status == 'success') {
        navigate('/signup/complete', {
          state: { password: pass1Ref.current.value, email: emailRef.current.value },
        });
      } else {
        toast.error(data.message, errorOption());
      }
    },
  });

  // Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass1Ref.current.value.length < 6 || pass2ref.current.value.length < 6) {
      toast.error('Password have to be at least 6 characters', errorOption());
    } else if (pass1Ref.current.value != pass2ref.current.value) {
      toast.error('UnMatched Passwords', errorOption(2000));
    } else {
      authMutation.mutate({ email: emailRef.current.value });
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <h1 className='form-title'>{t('sign_title')}</h1>
      <InputContainer>
        <label className='input-title' htmlFor='email1'>
          {t('sign_email')}
        </label>
        <input type='email' id='email1' className='email' required ref={emailRef} />
        <label className='input-title' htmlFor='pass1'>
          {t('sign_pass')}
        </label>
        <input type='password' id='pass1' className='pass-input' required ref={pass1Ref} />

        <label className='input-title' htmlFor='confirm-pass1'>
          {t('sign_confirm')}
        </label>
        <input type='password' id='confirm-pass1' className='pass-input' required ref={pass2ref} />
      </InputContainer>
      <PrimaryButton>
        {authMutation.isLoading && 'Loading..'}
        {!authMutation.isLoading && t('sign_primary')}
        {!authMutation.isLoading && (i18n.language == 'en' ? <BsArrowRight /> : <BsArrowLeft />)}
      </PrimaryButton>
      <StyeledToast />
    </FormWrapper>
  );
};

export default SignUpForm;
