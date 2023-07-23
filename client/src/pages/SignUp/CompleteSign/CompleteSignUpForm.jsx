import React, { useRef } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FormWrapper, InputContainer } from '../../../components/Sign/StyledComponents';
import { styled } from 'styled-components';
import PrimaryButton from '../../../components/PrimaryButton';
import { successOption, errorOption } from '../../../utils/toastOptions';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { signup } from '../../../apis/userApis';

const StyeledToast = styled(ToastContainer)`
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
`;

const SignUpForm = ({ starterdata }) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const yearRef = useRef(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const signMutation = useMutation(signup, {
    onSuccess: (data) => {
      if (data.status == 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        toast.success(t('toast_signupSuccess'), successOption());
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        toast.error(data.message, errorOption());
      }
    },
  });

  //

  // Handlers
  const handleSignUp = (e) => {
    e.preventDefault();
    signMutation.mutate({
      ...starterdata,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      birthYear: yearRef.current.value,
    });
  };

  return (
    <FormWrapper onSubmit={handleSignUp}>
      <h1 className='form-title'>{t('complete_title')}</h1>
      <InputContainer>
        <label className='input-title' htmlFor='username1'>
          {t('complete_name')}
        </label>
        <input type='text' id='username1' className='username' required ref={nameRef} />

        <label className='input-title' htmlFor='phone1'>
          {t('complete_phone')}
        </label>
        <input type='text' id='phone1' className='phone' required ref={phoneRef} />

        <label className='input-title' htmlFor='year1'>
          {t('complete_year')}
        </label>
        <input type='text' id='year1' className='year' required ref={yearRef} />
      </InputContainer>
      <PrimaryButton>
        {signMutation.isLoading && 'Loading..'}
        {!signMutation.isLoading && t('complete_primary')}
        {!signMutation.isLoading && (i18n.language == 'en' ? <BsArrowRight /> : <BsArrowLeft />)}
      </PrimaryButton>
      <StyeledToast />
    </FormWrapper>
  );
};

export default SignUpForm;
