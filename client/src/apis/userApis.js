import axios from 'axios';

export const auth = async (data) => {
  return axios
    .post('http://localhost:6060/api/auth/', { email: data.email })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const signup = async (data) => {
  return axios
    .post('http://localhost:6060/api/auth/register', data)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      return res.data;
    })
    .catch((err) => err.response.data);
};

export const login = async (data) => {
  return axios
    .post('http://localhost:6060/api/auth/sign', data)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('token', token);
      return res.data;
    })
    .catch((err) => err.response.data);
};
