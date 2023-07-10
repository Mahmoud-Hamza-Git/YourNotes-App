import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCircle } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { ContentContaienr, NotesContainer, Note, MainContainer } from '../../components/Containers';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { getnotes } from '../../apis/notesApis';
const HomeHeadContainer = styled(Note)`
  border: none;
  border-radius: 1rem;
`;

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);

  const { data, isLoading, status } = useQuery('notes', () => {
    getnotes({ userId: user._id });
  });
  if (status == 'success') {
    console.log(data, '✅');
  }

  return (
    <MainContainer>
      <img src='images/cover3.png' alt='cover' className='cover' />
      <ContentContaienr>
        <HomeHeadContainer>
          <AiFillCheckCircle className='checked' />
          <input
            type='text'
            name='entering'
            id='entering'
            className='entering'
            placeholder='Write a note...'
          />
        </HomeHeadContainer>
        <NotesContainer>
          <Note>
            <AiFillCheckCircle className='checked' />
            <input type='text' name='entering' id='entering' className='entering' placeholder='A note' />
            <ImCross className='cross' />
          </Note>
          <Note>
            <AiFillCheckCircle className='checked' />
            <input type='text' name='entering' id='entering' className='entering' placeholder='A note' />
            <ImCross className='cross' />
          </Note>
          <Note>
            <AiFillCheckCircle className='checked' />
            <input type='text' name='entering' id='entering' className='entering' placeholder='A note' />
            <ImCross className='cross' />
          </Note>
          <Note>
            <AiFillCheckCircle className='checked' />
            <input type='text' name='entering' id='entering' className='entering' placeholder='A note' />
            <ImCross className='cross' />
          </Note>
          <Note>
            <AiFillCheckCircle className='checked' />
            <input type='text' name='entering' id='entering' className='entering' placeholder='A note' />
            <ImCross className='cross' />
          </Note>
          <Note>
            <AiFillCheckCircle className='checked' />
            <input type='text' name='entering' id='entering' className='entering' placeholder='A note' />
            <ImCross className='cross' />
          </Note>
        </NotesContainer>
      </ContentContaienr>
    </MainContainer>
  );
};

export default Home;
