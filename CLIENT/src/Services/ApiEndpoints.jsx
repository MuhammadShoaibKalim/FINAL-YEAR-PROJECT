import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:7000',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteUser = (url) => instance.delete(url);

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    console.log('interceptor request error:', error);
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log('intercpert reponse',response)
    return response;
  }, function (error) {
    console.log('intercpert reponse',error)
    if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
    }
    return Promise.reject(error);
  });