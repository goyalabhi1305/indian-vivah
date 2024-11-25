import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const baseUrl = process.env.EXPO_PUBLIC_REACT_APP_BASE_URL

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
}

const returnAxiosInstance = async () => {
  const token = await getToken();
  console.log({ token });
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'x-app-type': 'SvRequest',
      'authorization': 'Bearer ' + token,
    },
    withCredentials: true,
  });
}

const get = async (route, signal) => {
  const controller = new AbortController();
  const { signal: abortSignal } = controller;

  if (signal) {
    signal.addEventListener('abort', () => {
      controller.abort();
    });
  }

  try {
    const axiosInstance = await returnAxiosInstance();
    return axiosInstance.get(route, {
      signal: abortSignal
    });
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
}

const post = async (route, body) => {
  try {
    const axiosInstance = await returnAxiosInstance();
    return axiosInstance.post(route, body);
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
}

const formSubmit = async (route, body) => {
  try {
    const axiosInstance = await returnAxiosInstance();
    return axiosInstance.post(route, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        console.log({ progressEvent });
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${percentCompleted}%`);
      }
    });
  } catch (error) {
    console.error('Error in formSubmit request:', error);
    throw error;
  }
}

const execute = async (route) => {
  try {
    const axiosInstance = await returnAxiosInstance();
    return axiosInstance.get(route);
  } catch (error) {
    console.error('Error in execute request:', error);
    throw error;
  }
}

export default execute;
export { get, post, formSubmit };
