import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCircle } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { ContentContaienr, NotesContainer, Note, MainContainer } from '../../components/Containers';
import { HomeHeadContainer, NoteArea, NoteAreaOverlay, OpenBtn } from './HomeStyle';
import PrimaryButton from '../../components/PrimaryButton';
import {
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  changeStatusRequest,
  updateNoteRequest,
} from '../../apis/notesApis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { errorOption } from '../../utils/toastOptions';

const Home = () => {
  // !! Hooks !!
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [areaOpen, setAreaOpen] = useState();
  const [selectedNote, setSelectedNote] = useState({ content: '', title: '' });

  const createAreaRef = useRef();
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, []);

  // !! Queries !!
  // GET Notes
  useEffect(() => {
    async function get() {
      const res = await getNotesRequest();
      setNotes(res.data);
    }
    get();
  }, []);

  // !! HANDLERS !!

  const addNoteKeyDown = async (e) => {
    if (e.key == 'Enter' && createAreaRef.current.value) {
      e.currentTarget.blur(); // remove focus and it will call the addNoteBlur to add the new note
    }
  };

  const addNoteBlur = async () => {
    if (createAreaRef.current.value) {
      const res = await createNoteRequest({ content: createAreaRef.current.value }); // save the note to the server
      createAreaRef.current.value = ''; // clear the entering area
      // update the state
      setNotes((prev) => {
        return [res.data, ...prev];
      });
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

  const updateNote = (e, id) => {
    if (e.currentTarget.value) {
      updateNoteRequest(id, { content: e.currentTarget.value });
    }
  };

  const handleTyping = (e, id) => {
    const newValue = e.currentTarget.value;
    setNotes((prev) => prev.map((note) => (note._id === id ? { ...note, content: newValue } : note)));
  };

  const handleCloseArea = async () => {
    setAreaOpen(0); // close area
  };

  const handleOpenArea = (index) => {
    if (index != undefined) {
      setSelectedNote(notes[index]);
    } else {
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
            placeholder='Write a note...'
            onBlur={addNoteBlur}
            onKeyDown={addNoteKeyDown}
            ref={createAreaRef}
          />
          <OpenBtn onClick={() => handleOpenArea()}>open</OpenBtn>
        </HomeHeadContainer>
        <NotesContainer>
          {notes.length != 0 &&
            notes.map((note, i) => (
              <Note key={i}>
                {note.active ? (
                  <BsCircle className='active' onClick={toggleActive.bind(null, note._id)} />
                ) : (
                  <AiFillCheckCircle className='checked' onClick={toggleActive.bind(null, note._id)} />
                )}
                <div type='text' name='entering' className='entering' onClick={() => handleOpenArea(i)}>
                  {note.title ? note.title : note.content}
                </div>
                <ImCross className='cross' onClick={() => deleteNote(note._id)} />
              </Note>
            ))}
        </NotesContainer>
      </ContentContaienr>
      <NoteArea open={areaOpen}>
        <small className='close-icon' onClick={handleCloseArea}>
          X
        </small>
        <textarea
          type='text'
          name='title'
          className='title'
          placeholder='Enter Title....'
          defaultValue={selectedNote.title}
          onChange={handleTyping}
          rows='1'
        />
        <textarea className='content' defaultValue={selectedNote.content} />
        <PrimaryButton onClick={handleCloseArea}>Add Note</PrimaryButton>
      </NoteArea>
      <NoteAreaOverlay onClick={handleCloseArea} open={areaOpen} />
      <ToastContainer />
    </MainContainer>
  );
};

export default Home;
