import { useContext, useEffect, useState } from "react"
import paymentAPI, { Order } from "../../../api/paymentAPI"
import { LoginContext } from "../../../context/LoginContext/LoginContext"
import { useBack } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"
import { formatVND } from "../../../utils/formatVND"

const UserInfo = () => {
  const {backToPrev} = useBack()
  const {userAcc} : any = useContext(LoginContext)
  const [orderList,setOrderList] = useState<Order[]>([])
  useEffect(() =>{
    const getOrderListByName = async () => {
      try{
         const response = await paymentAPI.getOrderByName(userAcc.userName)
         setOrderList(response)
      }
      catch(err){
        console.log('Không thể lấy danh sách đơn hàng',err)
      }
    }
    getOrderListByName()
  },[userAcc.userName])
  return (
    <section className='max-w-[1200px] m-auto lg:px-5'>
      <div className='flex justify-end'>
          <span className='text-[16px] cursor-pointer mt-5' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
      </div>
      <div>
        <h2 className='text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor'>Thông tin cá nhân</h2>
        <div className='flex'>
          <div>
            <img 
              title= {userAcc?.userName}
              className='h-[100px] w-[100px] rounded-full border-[3px] border-solid border-maincolor' 
              src='https://static.vecteezy.com/system/resources/previews/005/559/915/original/cute-penguin-waving-hand-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg' 
              alt={userAcc?.userName}/>
          </div>
          <div className='ml-5'>
            <span className='text-maintext'>Tên: <b>{userAcc?.userName}</b></span>
            <span className='text-maintext block mt-4'>Số điện thoại người dùng: <b>{userAcc?.phoneNumber}</b></span>
            <span className='text-maintext block my-4'>Email người dùng: <b>{userAcc?.userMail}</b></span>
          </div>
        </div>
      </div>
      <hr/>
      <div>
        <h2 className='text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor'>Danh sách đơn hàng</h2>
        <div>
          {orderList.length === 0 ?
            <span className='text-maintext'>Bạn không có đơn hàng nào</span> :
          <div>
          {orderList.map((item)=>(
              <div key={item._id}>
                <div className='flex text-maintext items-center justify-between py-5 md:flex-col md:px-10'>
                  <span className='text-[14px] flex-1'>{item.productDetails}</span>
                  <span className='text-[14px] flex-1 ml-10 block'>Ngày đặt: {convertDate(item.createdAt)}</span> 
                  <span className='text-[14px] flex-1'>Tổng cộng: {formatVND(item.totalPrice)}</span> 
                  <span className='text-[14px] flex-1'>Trạng thái thanh toán: {item.status === false ? 'Chưa thanh toán' : 'Đã thanh toán'}</span> 
                </div>
                <hr/>
              </div>
            ))}
          </div>
          }
        </div>
      </div>
    </section>
  )
}
export default UserInfo