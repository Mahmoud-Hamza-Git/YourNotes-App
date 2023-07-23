import axios from 'axios';

export const auth = async (data) => {
  return axios
    .post('https://your-notes-api.onrender.com/api/auth/', { email: data.email })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const signup = async (data) => {
  return axios
    .post('https://your-notes-api.onrender.com/api/auth/register', data)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      return res.data;
    })
    .catch((err) => err.response.data);
};

export const login = async (data) => {
  return axios
    .post('https://your-notes-api.onrender.com/api/auth/sign', data)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      return res.data;
    })
    .catch((err) => err.response.data);
};

export const updateUser = async (data) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post('https://your-notes-api.onrender.com/api/users/update-user', data, config);
    console.log(res.data, '✅');
    return res.data;
  } catch (error) {
    console.log(error.response.data, '❌');
    return error.response.data;
  }
};
