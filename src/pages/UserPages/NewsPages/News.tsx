import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import newsAPI, { NewsItem } from "../../../api/newsAPI"
import { usePanigation } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"

const News = () => {
  const [news,setNews] = useState<NewsItem[]>([])
  const {pageNum,pageSum,changePage,setPageSum} = usePanigation()
  useEffect(() =>{
    const getMenuItem = async () => {
      try{
         const response = await newsAPI.getPageNews(pageNum)
         setNews(response.data)
         setPageSum(response.pageSum)
      }
      catch(err){
        console.log('Không thể lấy danh sách tin tức',err)
      }
    }
    getMenuItem()
  },[pageNum, setPageSum])
  return (
    <section className='max-w-[1200px] m-auto lg:px-5'>
      <h1 className='text-[40px] md:text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor after:h-[2px] after:w-full after:bg-text2 after:absolute after:ml-[30px] after:top-[58%]'>Tin tức mới nhất</h1>
      <div className='grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1'>
        {news.map(item =>(
          <div className='border-[1px] rounded-[10px] p-3 shadow-md flex flex-col' key={item._id}>
            <div className='relative pt-[80%]'>
              <img className='absolute top-0 left-0 h-full w-full object-cover rounded-[10px]' src={item.imgNews} alt={item.newsTitle} loading='lazy' />
            </div>
            <div className='text-maintext mt-2 flex-1'>
              <h3 className='text-[20px] font-semibold text-sec-line'>{item.newsTitle}</h3>
              <span className='text-[15px] py-1 text-sec-line'>{convertDate(item.createdAt)}</span>
            </div>
            <div className=''>
              <Link to={`/tin-tuc/${item.newsTitle}`} className='w-full py-2 cursor-pointer text-maincolor text-center block font-semibold rounded-[10px] hover:brightness-90 duration-200'>
                Xem thêm
              </Link>
            </div>
       </div>
        ))}
      </div>
      <div className='mt-10 flex justify-center'>    
     <nav className='text-[16px] cursor-pointer'>
      <ul className="inline-flex items-center -space-x-px">
        <li onClick={()=>changePage(pageNum-1)} className='px-1'>
          <span className="block px-3 py-2 ml-0 text-maintext hover:text-maincolor duration-200" style={pageNum === 1 ? {cursor:'not-allowed'} : {}}>
          <i className="fa-solid fa-chevron-left"></i>
          </span>
        </li>
        {[...Array(pageSum)].map((item,index)=>(
          <li onClick={()=>changePage(index+1)} key={index} className='px-1'>
          <span className="px-3 py-1 text-maintext hover:text-maincolor duration-200" 
          style={pageNum === index +1 ? {color: 'white',backgroundColor:'#ff5e57',borderRadius:'5px'} : {}}>{index+1}</span>
        </li>
        ))}
        <li onClick={()=>changePage(pageNum+1)} className='px-1'>
          <span className="block px-3 py-2 text-maintext hover:text-maincolor duration-200 " style={pageNum === pageSum  ? {cursor:'not-allowed'} : {}}>
          <i className="fa-solid fa-chevron-right"></i>
          </span>
        </li>
      </ul>
    </nav>
   </div>
    </section>
  )
}
export default News