import React, { useEffect, useRef, useState } from 'react';
import { NoteArea } from './HomeStyle';
import PrimaryButton from '../../components/PrimaryButton';

const HomeNoteArea = ({ note, onClose, onAdd, onEdit, open, isEdit }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const [title, setTittle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setTittle(note.title);
    setContent(note.content);
  }, [note]);

  // !! Handlers !!

  const handleSubmit = () => {
    if (isEdit) {
      onEdit(note._id, { content, title });
    } else {
      onAdd({ content, title });
    }
  };

  const handleTypingTitle = () => {
    setTittle(titleRef.current.value);
  };

  const handleTypingContent = () => {
    setContent(contentRef.current.value);
  };

  return (
    <NoteArea open={open}>
      <small className='close-icon' onClick={onClose}>
        X
      </small>
      <input
        type='text'
        name='title'
        className='title'
        placeholder='Enter Title....'
        value={title}
        onChange={handleTypingTitle}
        ref={titleRef}
      />
      <textarea className='content' value={content} onChange={handleTypingContent} ref={contentRef} />
      <PrimaryButton onClick={handleSubmit}>{isEdit ? 'Edit Note' : 'Add Note'}</PrimaryButton>
    </NoteArea>
  );
};

export default HomeNoteArea;
