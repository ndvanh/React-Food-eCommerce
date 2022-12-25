import axios from "axios"
import axiosClient from "./AxiosClient"

export interface MenuItem {
    _id: null,
    menuType: string,
    imgMenu : any,
}

const menuAPI = {
  // GET lấy danh sách menu
 getMenuItem() : Promise<MenuItem[]>{
    const url = '/api/menu'
    return axiosClient.get(url)
   },
   // POST thêm menu
 addMenuItem(data:any) {
    const url = 'http://localhost:8080/api/menu'
    return axios.post(url,data)
 },
  // PATCH cập nhật menu
  updateMenuItem(data:any,id:string) {
   const url = `http://localhost:8080/api/menu/${id}`
   return axios.patch(url,data)
},
 // DELETE xóa menu
 delMenuItem(data: any) {
  const url = `/api/menu/delete/${data}`
  return axiosClient.delete(url)
 }, 
}
export default menuAPI