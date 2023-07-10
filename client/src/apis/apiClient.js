import axios from 'axios';

// Create a custom Axios instance
const apiClient = axios.create();

// Add a request interceptor to include the stored 'jwt' cookie in each request
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the stored 'jwt' cookie and add it to the request headers
    const jwt = getStoredJwt();
    if (jwt) {
      config.headers.Cookie = `jwt=${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to store and update the 'jwt' cookie received from each response
apiClient.interceptors.response.use(
  (response) => {
    // Extract the 'jwt' cookie from the response headers
    const cookies = response.headers['set-cookie'];
    const jwtCookie = extractJwtCookie(cookies);

    // Store the received 'jwt' cookie
    if (jwtCookie) {
      storeJwt(jwtCookie);
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to store the 'jwt' cookie
const storeJwt = (jwt) => {
  document.cookie = `jwt=${jwt}; path=/;`;
};

// Function to retrieve the 'jwt' cookie
const getStoredJwt = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('jwt=')) {
      return cookie.substring(4);
    }
  }
  return null;
};

// Function to extract the 'jwt' cookie from the response headers
const extractJwtCookie = (cookies) => {
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('jwt=')) {
      return cookie.split(';')[0].substring(4);
    }
  }
  return null;
};

export default apiClient;
