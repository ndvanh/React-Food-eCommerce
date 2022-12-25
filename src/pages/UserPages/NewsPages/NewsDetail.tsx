import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import newsAPI, { NewsItem } from "../../../api/newsAPI"
import { useBack} from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"

const initialProdState = {
    _id: null,
    newsTitle : '',
    imgNews : '',
    newsContent : '',
    editor: '',
    createdAt:'',
    updatedAt:'',
  }
 const NewsDetail = () => {
  const {backToPrev} = useBack()  
  const {news_title} = useParams()
  const [newsByTitle,setNewsByTitle] = useState<NewsItem>(initialProdState)
  useEffect(() =>{
    const getNews = async () => {
      try{
         const response = await newsAPI.getNewsByTitle(news_title)
         setNewsByTitle(response)
      }
      catch(err){
        console.log('Không thể lấy danh sách tin tức',err)
      }
    }
    getNews()
  },[news_title])
  return (
    <section className='max-w-[1200px] m-auto text-maintext lg:px-5'>
        <div className='py-5'>
            <h1 className='text-[40px] md:text-[30px] sm:text-[25px] font-semibold'>{newsByTitle.newsTitle}</h1>
            <div className='mt-5'>
                <span className='text-[15px] py-1'>{`Đăng vào: ${convertDate(newsByTitle.createdAt)}`}</span>
                <span className='text-[16px] cursor-pointer float-right' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
            </div>
            <span className='text-[16px] hover:underline text-maincolor'>Người đăng: {newsByTitle.editor}</span>
        </div>
        <div className='relative pt-[50%]'>
            {newsByTitle.imgNews && <img className='absolute top-0 left-0 h-full w-full object-cover rounded-[10px]' src={newsByTitle.imgNews} alt={newsByTitle.newsTitle} loading='lazy' />}
        </div>
        <div className='mt-5'>{newsByTitle.newsContent}</div>
    </section>
  )
}
export default NewsDetail