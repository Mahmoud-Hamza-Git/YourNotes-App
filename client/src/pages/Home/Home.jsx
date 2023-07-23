import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCircle } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { ContentContaienr, NotesContainer, Note, MainContainer } from '../../components/Containers';
import { HomeHeadContainer, NoteAreaOverlay, OpenBtn, TailContainer, Filter, FilterTail } from './HomeStyle';
import HomeNoteArea from './HomeNoteArea';
import {
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  changeStatusRequest,
  updateNoteRequest,
  deleteCompletedRequest,
} from '../../apis/notesApis';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { errorOption } from '../../utils/toastOptions';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
const StyeledToast = styled(ToastContainer)`
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
`;

const Home = () => {
  // !! Hooks !!
  const createAreaRef = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [areaOpen, setAreaOpen] = useState();
  const [isEdit, setIsEdit] = useState(0);
  const [filterIndex, setFilterIndex] = useState(1);
  const [notesCount, setNotesCount] = useState(0);
  const [selectedNote, setSelectedNote] = useState({ content: '', title: '' });
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);

  // !! Functions !!
  async function get() {
    let res;
    if (filterIndex === 2) {
      res = await getNotesRequest('active');
    } else if (filterIndex === 3) {
      res = await getNotesRequest('completed');
    } else {
      res = await getNotesRequest();
    }
    setNotes(res.data);
    setNotesCount(res.data.length);
  }

  // !! Queries !!
  // GET Notes
  useEffect(() => {
    get();
  }, [filterIndex]);

  // !! HANDLERS !!

  const addNoteKeyDown = async (e) => {
    if (e.key == 'Enter' && createAreaRef.current.value) {
      e.currentTarget.blur(); // remove focus and it will call the addNoteBlur to add the new note
    }
  };

  const addNoteBlur = async () => {
    if (createAreaRef.current.value) {
      const res = await createNoteRequest({ content: createAreaRef.current.value }); // save the note to the server
      if (res.status == 'success') {
        createAreaRef.current.value = ''; // clear the entering area
        // update the state
        setNotes((prev) => {
          return [res.data, ...prev];
        });
      } else {
        toast.error(res.message, errorOption());
      }
    }
  };

  const addNote = async (data) => {
    const res = await createNoteRequest({
      content: data.content,
      title: data.title,
    });
    if (res.status == 'success') {
      setNotes((prev) => {
        return [res.data, ...prev];
      });
      setSelectedNote({ content: '', title: '' });
      setAreaOpen(0); // close area
    } else {
      toast.error(res.message, errorOption());
    }
  };

  const toggleActive = async (id) => {
    setNotes((prev) => {
      return prev.map((note) => {
        if (note._id === id) {
          changeStatusRequest(id, note.active ? 0 : 1);
          return { ...note, active: !note.active };
        } else {
          return note;
        }
      });
    });
  };

  const deleteNote = (id) => {
    setNotes((prev) => {
      deleteNoteRequest(id);
      return prev.filter((item) => item._id != id);
    });
  };

  const deleteCompleted = async () => {
    const res = await deleteCompletedRequest();
    console.log(res.data, 'done❌');
    get();
  };

  const updateNote = async (id, data) => {
    if (data.content) {
      const res = await updateNoteRequest(id, { content: data.content, title: data.title });
      setNotes((prev) => prev.map((note) => (note._id === id ? res.data : note)));
      setAreaOpen(0); // close area
    }
  };

  const handleCloseArea = () => {
    setAreaOpen(0); // close area
  };

  const handleOpenArea = (index) => {
    if (index != undefined) {
      setSelectedNote((prev) => notes[index]);
      setIsEdit(1);
    } else {
      setIsEdit(0);
      setSelectedNote({ content: '', title: '' });
    }
    setAreaOpen(1); // open area
  };

  return (
    <MainContainer>
      <img src='images/cover3.png' alt='cover' className='cover' />
      <ContentContaienr>
        <HomeHeadContainer>
          <input
            type='text'
            name='entering'
            className='entering'
            placeholder={t('home_inputPlaceholder')}
            onBlur={addNoteBlur}
            onKeyDown={addNoteKeyDown}
            ref={createAreaRef}
          />
          <OpenBtn onClick={() => handleOpenArea()}>{t('home_primaryOpen')}</OpenBtn>
        </HomeHeadContainer>
        <NotesContainer>
          {notes.length != 0 &&
            notes.map((note, i) => (
              <Note key={i} crossed={!note.active}>
                {note.active ? (
                  <BsCircle className='active' onClick={toggleActive.bind(null, note._id)} />
                ) : (
                  <AiFillCheckCircle className='checked' onClick={toggleActive.bind(null, note._id)} />
                )}
                <div type='text' name='entering' className='entering old' onClick={() => handleOpenArea(i)}>
                  {note.title ? note.title : note.content}
                </div>
                <ImCross className='cross' onClick={() => deleteNote(note._id)} />
              </Note>
            ))}

          <TailContainer>
            <small className='statistics'>
              {notesCount} {t('home_notesLeft')}
            </small>
            <FilterTail index={filterIndex}>
              <button onClick={setFilterIndex.bind(null, 1)}>{t('home_all')}</button>
              <button onClick={setFilterIndex.bind(null, 2)}>{t('home_active')}</button>
              <button onClick={setFilterIndex.bind(null, 3)}>{t('home_completed')}</button>
            </FilterTail>
            <button className='clear-btn' onClick={deleteCompleted}>
              {t('home_deleteCompleted')}
            </button>
          </TailContainer>
        </NotesContainer>
        <Filter index={filterIndex}>
          <button onClick={setFilterIndex.bind(null, 1)}>{t('home_all')}</button>
          <button onClick={setFilterIndex.bind(null, 2)}>{t('home_active')}</button>
          <button onClick={setFilterIndex.bind(null, 3)}>{t('home_completed')}</button>
        </Filter>
      </ContentContaienr>
      <HomeNoteArea
        note={selectedNote}
        onClose={handleCloseArea}
        open={areaOpen}
        onAdd={addNote}
        isEdit={isEdit}
        onEdit={updateNote}
      />
      <NoteAreaOverlay onClick={handleCloseArea} open={areaOpen} />
      <StyeledToast />
    </MainContainer>
  );
};

export default Home;
