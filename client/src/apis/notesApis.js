import axios from 'axios';

export const createNoteRequest = async (data) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post('https://your-notes-api.onrender.com/api/notes', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getNotesRequest = async (filter) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `https://your-notes-api.onrender.com/api/notes/?filter=${filter}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const deleteNoteRequest = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`https://your-notes-api.onrender.com/api/notes/delete/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const updateNoteRequest = async (id, data) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(`https://your-notes-api.onrender.com/api/notes/${id}`, data, config);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const changeStatusRequest = async (id, isActive) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `https://your-notes-api.onrender.com/api/notes/status/${id}/?active=${isActive}`,
      null,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const deleteCompletedRequest = async () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(
      'https://your-notes-api.onrender.com/api/notes/delete-completed',
      config
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
// export const changeStatusRequest = async (id, isActive) => {
//   const token = localStorage.getItem('token');
//   const config = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   try {
// const response = await fetch(`https://your-notes-api.onrender.com/api/notes/status/${id}/?active=${isActive}`, config);
// const data = await response.json();
// return data;
//   } catch (error) {
//     console.log(error.response.data);
//     return error.response.data;
//   }
// };
