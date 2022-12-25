import { useEffect, useMemo, useState } from "react"
import paymentAPI, { Order } from "../../api/paymentAPI"
import userAPI, { UserAcc } from "../../api/userAPI"
import { formatVND } from "../../utils/formatVND"

const AdminDashBoard = () => {
  const [userList,setUserList] = useState<UserAcc[]>([])
  const [orderList,setOrderList] = useState<Order[]>([])
  useEffect(() =>{
    const getAllUser = async () => {
      try{
         const response = await userAPI.getAllUser()
         setUserList(response)
      }
      catch(err){
        console.log(err)
      }
    }
    getAllUser()
    const getAllOrder = async () => {
      try{
         const response = await paymentAPI.getAllOrder()
         setOrderList(response)
      }
      catch(err){
        console.log(err)
      }
    }
    getAllOrder()
  },[])
  const calculateTotal = useMemo(() => {
    const priceSum = orderList.filter(item => item.status === true).reduce((a : number,b : any) => {
       const totalPrice = b.totalPrice
       return a + totalPrice
     },0)
     return priceSum
   },[orderList])
  return (
    <section>
      <div className='grid grid-cols-5 gap-5 text-maintext'>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Tổng đơn hàng
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{orderList.length}</span>
        </div>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Tổng doanh thu
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{formatVND(calculateTotal)}</span>
        </div>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Tổng người dùng
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{userList.length}</span>
        </div>
      </div>
    </section>
  )
}
export default AdminDashBoard