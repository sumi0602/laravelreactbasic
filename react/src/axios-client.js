
import axios from "axios";
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    withXSRFToken: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken'
});
axiosClient.interceptors.request.use((config) => {
    if (localStorage.token != undefined) {
        config.headers['Authorization'] = `Bearer ${localStorage.token}`
    }
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;

});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    try {
      return error;
    } catch (e) {
        console.error(e)
    }
}
);

export default axiosClient;