import axios from "axios"
import axiosClient from "./AxiosClient"

export interface Order{
    _id: null,
    userName : string,
    phoneNumber : number,
    userAddress : string,
    paymentMethods : string,
    productDetails : string,
    totalPrice : number,
    status : boolean,
    createdAt:string,
    updatedAt:string
  }
export interface OrderRes{
  pageSum:number,
  data : Order[]
  }
const paymentAPI = {
  // GET lấy tất cả đơn hàng
 getAllOrder : () : Promise<Order[]>  => {
      const url = '/api/order'
      return axiosClient.get(url)
  },
  // GET lấy đơn hàng với phân trang
 getPageOrder : (num : number) : Promise<OrderRes>  => {
  const url = `/api/order?page=${num}`
  return axiosClient.get(url)
},
 // GET lấy danh sách đơn hàng theo tên người dùng
 getOrderByName : (data:string | undefined) : Promise<Order[]>  => {
  const url = `/api/order/${data}`
  return axiosClient.get(url)
},
 // POST thêm đơn hàng
 addOrder : (data:any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/order`
  return axios.post(url,data)
},
// PATCH cập nhật đơn hàng
 updateOrder(data:any,id:string) {
  const url = `${process.env.REACT_APP_API_URL}/api/order/${id}`
  return axios.patch(url,data)
},
// DELETE xóa đơn hàng 
 delOrder(data: any) {
  const url = `/api/order/delete/${data}`
  return axiosClient.delete(url)
}, 
}
export default paymentAPI