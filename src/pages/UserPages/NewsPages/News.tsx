import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
import newsAPI, { NewsItem, initNewsList } from "../../../api/newsAPI"
import { usePagination } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"
import { Skeleton } from "@chakra-ui/react"
import _ from "lodash"
import { Pagination } from "../../../components/Common"

const News = () => {
  const [news,setNews] = useState<NewsItem[]>(initNewsList)
  const [isLoaded, setIsLoaded] = useState(false)
  const {pageNum, pageSum, setPageSum, changePage} = usePagination()
  useEffect(() => {
    const getMenuItem = async () => {
      try{
         const response = await newsAPI.getPageNews(pageNum)
         setNews(response.data)
         setPageSum(response.pageSum)
         setIsLoaded(true)
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
        {news.map((item,index) =>(
          <Skeleton isLoaded={isLoaded} fadeDuration={2} key={!_.isNil(item._id) ? item._id : index}>
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
          </Skeleton>
        ))}
      </div>
      <Pagination pageSum={pageSum} pageNum={pageNum} changePage={changePage}/>
    </section>
  )
}
export default News