import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentContaienr, MainContainer, Note } from '../../components/Containers';
import { useTranslation } from 'react-i18next';
import { InfoHeadContainer, InfoInputContainer } from './InfoStyle';
import PrimaryButton from '../../components/PrimaryButton';
import { FormWrapper } from '../../components/Sign/StyledComponents';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { updateUser } from '../../apis/userApis';
import { styled } from 'styled-components';
import { errorOption, successOption } from '../../utils/toastOptions';
import createUpdateObject from '../../utils/createUpdateObject';

const StyeledToast = styled(ToastContainer)`
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
`;

const Info = () => {
  // !! Hooks !!
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState({ ...JSON.parse(localStorage.getItem('user')), password: '' });

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);

  // !! Handlers !!
  const handleSubmit = async (e) => {
    e.preventDefault();
    const oldUser = JSON.parse(localStorage.getItem('user'));
    const data = createUpdateObject(user, oldUser);
    if (data) {
      const res = await updateUser(data);
      if (res.status == 'success') {
        setUser({ ...res.data, password: '' }); // update the user in the state variable
        localStorage.setItem('user', JSON.stringify(res.data)); //update user in localstorage
        toast.success(t('toast_updatedSuccess'), successOption());
      } else {
        toast.error(res.message, errorOption());
      }
    } else {
      toast.error('you have to edit the your info first', errorOption());
    }
  };

  const handleTyping = (e) => {
    const propName = e.currentTarget.id; // dont't forget to store the data used in the update state function that comes from event before use it.
    const propValue = e.currentTarget.value;
    setUser((prev) => ({ ...prev, [propName]: propValue }));
  };

  return (
    <MainContainer>
      <img src='images/cover3.png' alt='cover' className='cover' />
      <ContentContaienr>
        <FormWrapper onSubmit={handleSubmit}>
          <InfoHeadContainer>{t('info_title')}</InfoHeadContainer>
          <InfoInputContainer>
            <label className='input-title' htmlFor='email'>
              {t('login_email')}
            </label>
            <input type='email' id='email' value={user.email} onChange={handleTyping} className='email' />
            <label className='input-title' htmlFor='password'>
              {t('login_pass')}
            </label>
            <input
              type='password'
              id='password'
              value={user.password}
              onChange={handleTyping}
              className='pass-input'
            />
            <label className='input-title' htmlFor='name'>
              {t('complete_name')}
            </label>
            <input type='text' id='name' value={user.name} onChange={handleTyping} className='username' />

            <label className='input-title' htmlFor='phone'>
              {t('complete_phone')}
            </label>
            <input type='text' id='phone' value={user.phone} onChange={handleTyping} className='phone' />

            <label className='input-title' htmlFor='birthYear'>
              {t('complete_year')}
            </label>
            <input
              type='text'
              id='birthYear'
              value={user.birthYear}
              onChange={handleTyping}
              className='year'
            />
          </InfoInputContainer>
          <PrimaryButton>{t('info_primary')}</PrimaryButton>
        </FormWrapper>
      </ContentContaienr>
      <StyeledToast />
    </MainContainer>
  );
};

export default Info;
