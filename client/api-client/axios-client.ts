import axios, { AxiosError, AxiosResponse } from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error: AxiosError) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // 401, 403, 500
        return Promise.reject(error.response?.data); // should be error response body
    }
);

export default axiosClient;
