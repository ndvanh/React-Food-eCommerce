import { useContext } from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { useBack } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"
import { formatVND } from "../../../utils/formatVND"

const OrderDetail = () => {
  const {order} : any = useContext(FoodContext)
  const {backToPrev} = useBack()
  return (
    <section className='text-maintext'>
        <div className='flex justify-between'>
          <h1 className='text-[30px] md:text-[25px] font-semibold text-maincolor'>Chi tiết đơn hàng</h1>
          <div>
            <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
          </div>
        </div>
        <div>
            <ol className='list-decimal ml-5 mt-10'> 
                <li className='py-3'>Tên khách hàng: <b>{order?.userName}</b></li>
                <li className='py-3'>Số điện thoại khách hàng: <b>{order?.phoneNumber}</b></li>
                <li className='py-3'>Địa chỉ khách hàng: <b>{order?.userAddress}</b></li>
                <li className='py-3'>Phương thức thanh toán: <b>{order?.paymentMethods === 'the' ? 'Thanh toán bằng thẻ' : 'Thanh toán bằng tiền mặt'}</b></li>
                <li className='py-3'>Danh sách sản phẩm: <b>{order?.productDetails}</b></li>
                <li className='py-3'>Tổng tiền đơn hàng: <b>{formatVND(order?.totalPrice)}</b></li>
                <li className='py-3'>Trạng thái thanh toán: <b>{order?.status === false ? 'Chưa thanh toán' : 'Đã thanh toán'}</b></li>
                <li className='py-3'>Đơn hàng ngày: <b>{convertDate(order?.createdAt)}</b></li>
                <li className='py-3'>Ngày thay đổi gần nhất: <b>{convertDate(order?.updatedAt)}</b></li>
            </ol>
        </div>
    </section>
  )
}
export default OrderDetail