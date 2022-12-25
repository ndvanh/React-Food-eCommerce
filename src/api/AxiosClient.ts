import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
   'content-type': 'application/json',
 },
// paramsSerializer : (params: Record<string, string>) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config : AxiosRequestConfig) => {
return config;
},  (error) => {
  // Handle errors
   throw error
})

axiosClient.interceptors.response.use((response : AxiosResponse) => {
  if (response && response.data) {
    return response.data
 }
  return response
}, (error) => {
// Handle errors
 throw error
})
export default axiosClient

