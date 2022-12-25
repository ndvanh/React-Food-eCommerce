import { useContext } from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { useBack } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"
import { formatVND } from "../../../utils/formatVND"

const ProductDetailInfo = () => {
  const {prodItem} : any = useContext(FoodContext)
  const {backToPrev} = useBack()
  return (
    <section className='text-maintext'>
        <div className='flex justify-between'>
          <h1 className='text-[30px] md:text-[25px] font-semibold text-maincolor'>Chi tiết sản phẩm</h1>
          <div>
            <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
          </div>
        </div>
        <div>
            <ol className='list-decimal ml-5 mt-10'> 
              <li className='py-3'>Tên sản phẩm: <b>{prodItem?.prodName}</b></li>
              <li className='py-3'>Loại sản phẩm: <b>{prodItem?.prodType}</b></li>
              <li className='py-3'>Ảnh: 
                <img className='h-[100px] w-[100px] object-cover rounded-[10px]' src={prodItem?.prodImg} alt={prodItem?.prodName} loading='lazy'/>
              </li>
              <li className='py-3'>Giá sản phẩm: <b>{formatVND(prodItem?.prodPrice)}</b></li>
              <li className='py-3'>Mô tả sản phẩm: <b>{prodItem?.prodDetail}</b></li>
              <li className='py-3'>Số lượng: <b>{prodItem?.quantity}</b></li>
              <li className='py-3'>Trạng thái khuyến mãi: <b>{prodItem?.saleOff === true ? 'Đang khuyến mãi' : 'Không khuyến mãi'}</b></li>
              <li className='py-3'>Đăng ngày: <b>{convertDate(prodItem?.createdAt)}</b></li>
              <li className='py-3'>Ngày thay đổi gần nhất: <b>{convertDate(prodItem?.updatedAt)}</b></li>
            </ol>
        </div>
    </section>
  )
}
export default ProductDetailInfo