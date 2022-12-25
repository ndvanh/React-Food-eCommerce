import { useState,useEffect, useContext} from "react"
import { useParams} from "react-router-dom"
import productAPI from "../../../api/productAPI"
import { formatVND } from "../../../utils/formatVND"
import { Link } from "react-router-dom"
import { useBack } from "../../../hooks/index"
import { FoodContext } from "../../../context/FoodContext/FoodContext"

const initialProdState = {
  prodName: '',
  prodType : '',
  prodImg : '',
  prodPrice : 0,
  prodDetail : '',
  saleOff:true,
  createdAt:''
}
const ProductDetail = () => {
  const {handleAddToCart} : any = useContext(FoodContext)
  const {backToPrev} = useBack()
  const {food_name} = useParams()
  const [product,setProduct] = useState(initialProdState)
  useEffect(() =>{
    const getProductItem = async () => {
      try{
         const response = await productAPI.getProdByName(food_name)
         setProduct(response)
         }
      catch(err){
        console.log('Không thể lấy ra sản phẩm',err)
      }
    }
    getProductItem()
  },[food_name])
  return (
    <section className='mt-8 max-w-[1200px] m-auto lg:px-5'>
        <div className='mb-6 text-maintext flex justify-between'>
          <span className='text-[18px] font-semibold'>
            <Link className='hover:text-maincolor duration-300' to='/'>Cloud Food</Link> &gt; 
            <Link className='hover:text-maincolor duration-300' to={`/thuc-don/${product.prodType}`}>{product.prodType}</Link> &gt; 
            {food_name} 
          </span>
          <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
        </div>
        <div className='flex lg:block'>
          <div className='h-[420px] flex-1'>
            {product.prodImg && <img className='h-full w-full object-cover rounded-[10px] cursor-pointer' src={product.prodImg} alt={product.prodName} loading='lazy' />}
          </div>
          <div className='text-maintext ml-6 px-5 border-l-[1px] border-text2 flex-[2_2_0%] flex flex-col'>
            < div className='border-b-[1px] border-[#ffb8b8]'>
              <h3 className='text-[40px] md:text-[30px] sm:text-[25px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{product.prodName}</h3>
              <span className='text-[28px] md:text-[25px] sm:text-[18px] text-maincolor font-bold py-2 block'>{formatVND(product.prodPrice)}</span>
          </div>
          <div className='mt-3 '>
              <span className='text-[20px] font-semibold'>Mô tả món ăn: </span>
              <p className='text-[16px] py-1'>{product.prodDetail}</p>
          </div>
          <div className='mt-1'>
              <span className='text-[20px] font-semibold'>Danh mục: <Link to={`/thuc-don/${product.prodType}`} className='hover:text-maincolor duration-300 text-[16px] font-[400]'>{product.prodType}</Link> </span>
           </div>
          <div className='mt-1'>
              <span className='text-[20px] font-semibold'>Khuyến mãi: <b className='text-[16px] font-[400]'>{product.saleOff === true ? 'đang khuyến mãi' : 'không khuyến mãi'}</b> </span>
           </div>
           <div className='mt-10'>
              <button onClick={()=>handleAddToCart(product)} type='button' className='py-2 px-5 bg-maincolor text-white font-semibold rounded-[10px] hover:brightness-90 duration-200'>
              Thêm vào giỏ hàng
              <i className="fa-solid fa-cart-shopping ml-2"></i>
              </button>
          </div>
          </div>
      </div>
      </section> 
  )
}
export default ProductDetail