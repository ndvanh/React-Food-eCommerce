import { useContext } from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { useBack } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"

const NewsDetailInfo = () => {
  const {newsItem} : any = useContext(FoodContext)
  const {backToPrev} = useBack()
  return (
    <section className='text-maintext'>
        <div className='flex justify-between'>
          <h1 className='text-[30px] md:text-[25px] font-semibold text-maincolor'>Chi tiết bài đăng</h1>
          <div>
            <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
          </div>
        </div>
        <div>
            <ol className='list-decimal ml-5 mt-10'> 
              <li className='py-3'>Tiêu đề: <b>{newsItem?.newsTitle}</b></li>
              <li className='py-3'>Ảnh: 
                <img className='h-[100px] w-[100px] object-cover rounded-[10px]' src={newsItem?.imgNews} alt={newsItem?.newsTitle} loading='lazy'/>
              </li>
              <li className='py-3'>Người đăng: <b>{newsItem?.editor}</b></li>
              <li className='py-3'>Nội dung bài đăng: <b>{newsItem?.newsContent}</b></li>
              <li className='py-3'>Đăng ngày: <b>{convertDate(newsItem?.createdAt)}</b></li>
              <li className='py-3'>Ngày thay đổi gần nhất: <b>{convertDate(newsItem?.updatedAt)}</b></li>
            </ol>
        </div>
    </section>
  )
}
export default NewsDetailInfo