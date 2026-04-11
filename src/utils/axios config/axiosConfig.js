import axios from 'axios';
import {baseURL} from '../constants/constants';

const accessToken =  sessionStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
  credentials: 'include',
  timeout:'300000'
});

export default axiosInstance