import axios from 'axios';

export const createnote = async (data) => {
  const token = localStorage.getItem('token');
  return axios
    .post('http://localhost:6060/api/notes/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const getnotes = async (data) => {
  const token = localStorage.getItem('token');
  return axios
    .get(
      'http://localhost:6060/api/notes/',
      { filter: data.filter, userId: data.userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
