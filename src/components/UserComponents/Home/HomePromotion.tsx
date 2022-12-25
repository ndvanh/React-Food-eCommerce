import { useState,useEffect, useContext } from "react"
import productAPI, { ProdItem } from "../../../api/productAPI"
import { formatVND } from "../../../utils/formatVND"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import { Link } from "react-router-dom"
import { FoodContext } from "../../../context/FoodContext/FoodContext"

const HomePromotion = () => {
  const {handleAddToCart} : any = useContext(FoodContext)
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
      {proFood?.filter(item=>item.saleOff === true).map((item,index)=>(
        <SwiperSlide key={item._id}>
        <div className='border-[1px] rounded-[10px] p-3 shadow-md flex flex-col justify-between'>
        <Link to={`/thuc-don/${item.prodType}/${item.prodName}`}>
          <div className='relative pt-[100%] lg:pt-[80%] md:pt-[60%]'>
            <img className='absolute top-0 left-0 h-full w-full object-cover rounded-[10px] cursor-pointer' src={item.prodImg} alt={item.prodName} loading='lazy' />
          </div>
        </Link>
        <div className='text-maintext flex-1 mt-2'>
        <Link to={`/thuc-don/${item.prodType}/${item.prodName}`}>
          <h3 className='text-[20px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{item.prodName}</h3>
        </Link> 
          <p className='text-[15px] py-1 overflow-hidden whitespace-nowrap text-ellipsis'>{item.prodDetail}</p>
        </div>
        <div className='flex-1'>
        <span className='text-[25px] text-[#ff5e57] font-bold py-2 block'>{formatVND(item.prodPrice)}</span>
          <button onClick={()=>handleAddToCart(item)} className='w-full py-2 bg-[#ff5e57] text-white font-semibold rounded-[10px] hover:brightness-90 duration-200'>
            Thêm vào giỏ hàng
            <i className="fa-solid fa-cart-shopping ml-2"></i>
          </button>
        </div>
      </div>
      </SwiperSlide>
      ))}
       </Swiper>
      </section> 
  )
}
export default HomePromotion