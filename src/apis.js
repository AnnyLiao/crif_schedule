import axios from 'axios';

const reportAPI = axios.create({
    baseURL: 'http://23.98.38.82:5000'
})

export const getAllList = data => reportAPI.get(`/task/list?page=${data.page}&limit=${data.limit}`);
export const getexpList = data => reportAPI.get(`/task/list?page=${data.page}&limit=${data.limit}&uniform_nu=${data.uni}`);
export const getScope = () => reportAPI.get('/crif_scope');
export const redo = data => reportAPI.get(`/rerunTask?uuid=${data.uuid}`);
export const submit = data => reportAPI.get(`/task/submit?uniform_nu=${data.uni}&company_name=${data.company}&client_id=${data.clientId}&crif_scope_id=${data.scope}`);