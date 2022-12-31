import axios from "axios"
import axiosClient from "./AxiosClient"

export interface ProdItem{
    _id: null,
    prodName: string,
    prodType : string,
    prodImg : string,
    prodPrice : number,
    prodDetail : string,
    quantity : number,
    saleOff:string,
    createdAt:string,
  }
export interface CartItem extends ProdItem{
    qty : number
  }
export interface ProdRes{
  pageSum:number,
  data : ProdItem[]
  }
// type ContextType = { typeMenu: string }
const productAPI = {
  // GET lấy tất cả sp
 getProdItem : () : Promise<ProdItem[]>  => {
      const url = '/api/product'
      return axiosClient.get(url)
  },
  // GET lấy sp với phân trang
 getPageItem : (num : number) : Promise<ProdRes>  => {
    const url = `/api/product?page=${num}`
    return axiosClient.get(url)
 },
 // GET lấy sp theo loại sp
 getProdByType : (data:string | undefined) : Promise<ProdItem[]>  => {
    const url = `/api/product/${data}`
    return axiosClient.get(url)
 },
 // GET lấy sp theo loại sp với phân trang 
 getPageByType : (data:string | undefined , num:number) : Promise<ProdRes>  => {
  const url = `/api/product/${data}?page=${num}`
  return axiosClient.get(url)
 },
 // GET lấy sp theo tên sp
 getProdByName : (data:string | undefined) : Promise<ProdItem>  => {
  const url = `/api/product/food/${data}`
  return axiosClient.get(url)
},
 // POST thêm sp
 addProduct : (data:any) => {
  const url = `${process.env.REACT_APP_API_URL}/api/product`
  return axios.post(url,data)
},
// PATCH cập nhật sp
updateProduct(data:any,id:string) {
  const url = `${process.env.REACT_APP_API_URL}/api/product/${id}`
  return axios.patch(url,data)
},
// PATCH cập nhật số lượng
updateQuantity(data:CartItem[]) {
  const url = `${process.env.REACT_APP_API_URL}/api/product/quantity`
  return axios.patch(url,data)
},
// DELETE xóa sp
delProduct(data: any) {
 const url = `/api/product/delete/${data}`
 return axiosClient.delete(url)
}, 
}
export default productAPI