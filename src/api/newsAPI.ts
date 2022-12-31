import axios from "axios"
import axiosClient from "./AxiosClient"

export interface NewsItem{
    _id: null,
    newsTitle : string,
    imgNews : string,
    newsContent : string,
    editor: string,
    createdAt:string,
    updatedAt:string
  }
export interface NewsRes{
  pageSum:number,
  data : NewsItem[]
  }
const newsAPI = {
  // GET lấy tất cả bài tin
 getAllNews : () : Promise<NewsItem[]>  => {
      const url = '/api/news'
      return axiosClient.get(url)
  },
  // GET lấy tin tức với phân trang
 getPageNews : (num : number) : Promise<NewsRes>  => {
  const url = `/api/news?page=${num}`
  return axiosClient.get(url)
},
 // GET lấy tin tức theo title 
 getNewsByTitle : (data:string | undefined) : Promise<NewsItem>  => {
  const url = `/api/news/${data}`
  return axiosClient.get(url)
 },
 // POST thêm tin tức
 addNews : (data:any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/news`
  return axios.post(url,data)
},
// PATCH cập nhật tin tức
updateNews(data:any,id:string) {
  const url = `${process.env.REACT_APP_API_URL}/api/news/${id}`
  return axios.patch(url,data)
},
// DELETE xóa tin 
delNews(data: any) {
 const url = `/api/news/delete/${data}`
 return axiosClient.delete(url)
}, 
}
export default newsAPI