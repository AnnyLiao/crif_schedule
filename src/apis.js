import axios from 'axios';

const reportAPI = axios.create({
    baseURL: 'http://23.98.38.82:5000'
})

export const getAllList = data => reportAPI.get(`/task/list?page=${data.page}&limit=${data.limit}`);
export const getexpList = data => reportAPI.get(`/task/list?page=${data.page}&limit=${data.limit}&uniform_nu=${data.uni}`);