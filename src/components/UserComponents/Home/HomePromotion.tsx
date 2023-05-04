import { useState,useEffect } from "react"
import productAPI, { ProdItem } from "../../../api/productAPI"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import ProductItem from "../Food/ProductItem"

const HomePromotion = () => {
  const [proFood,setProFood] = useState<ProdItem[]>([])
  useEffect(() =>{
    const getPromoItem = async () => {
      try{
         const response = await productAPI.getProdItem()
         setProFood(response)
      }
      catch(err){
        console.log('Ko the lay danh sach san pham khuyen mai',err)
      }
    }
    getPromoItem()
  },[])
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth)
  const [productRes, setProductRes] = useState(4)
  useEffect(() => {
    const handleResize = () =>{
      setBrowserWidth(window.innerWidth)
    }
    if(browserWidth <= 1023) setProductRes(2)
    else setProductRes(4)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[browserWidth])
  return (
    <section className='mt-10 lg:px-5'>
      <h1 className='text-[40px] md:text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor after:h-[2px] after:w-full after:bg-text2 after:absolute after:ml-[30px] after:top-[58%]'>Khuyến mãi đặc biệt</h1>
      <Swiper
        slidesPerView={productRes}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      {proFood?.filter(item=>item.saleOff === 'khuyen-mai').map((item)=>(
        <SwiperSlide key={item._id}>
          <ProductItem product={item} />
        </SwiperSlide>
      ))}
       </Swiper>
      </section> 
  )
}
export default HomePromotion