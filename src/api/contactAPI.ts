import axios from "axios"
import axiosClient from "./AxiosClient"

export interface ContactItem{
    _id: null,
    nameCt : string,
    emailCt : string,
    contentCt : string,
    createdAt:string,
    updatedAt:string
  }
export interface ContactRes{
  pageSum:number,
  data : ContactItem[]
  }
const contactAPI = {
//   // GET lấy tất cả liên hệ
//  getAllNews : () : Promise<ContactItem[]>  => {
//       const url = '/api/contact'
//       return axiosClient.get(url)
//   },
  // GET lấy liên hệ với phân trang
 getPageContact : (num : number) : Promise<ContactRes>  => {
  const url = `/api/contact?page=${num}`
  return axiosClient.get(url)
},
 // POST thêm liên hệ
 addContact : (data:ContactItem) => {
  const url = `${process.env.REACT_APP_API_URL}/api/contact`
  return axios.post(url,data)
},
// PATCH cập nhật liên hệ
 updateContact(data:ContactItem,id:string) {
  const url = `${process.env.REACT_APP_API_URL}/api/contact/${id}`
  return axios.patch(url,data)
},
// DELETE xóa liên hệ 
 delContact(data: any) {
  const url = `/api/contact/delete/${data}`
  return axiosClient.delete(url)
}, 
}
export default contactAPI