import axios from 'axios';

export const createCancelToken = () => axios.CancelToken.source();
