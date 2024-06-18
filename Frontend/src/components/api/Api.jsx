import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers['Content-Type'] = 'multipart/form-data'
    config.headers.token = `Bearer ${token}`;

   
    return config
})

api.interceptors.response.use((response) => {
    return response
})

export default api