import { useContext } from "react"
import { Link } from "react-router-dom"
import { ProdItem } from "../../../api/productAPI"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { formatVND } from "../../../utils/formatVND"
interface productList {
    productList: ProdItem[]
}
export const ProductCard = ({productList} : productList ) => {
  const {handleAddToCart} : any = useContext(FoodContext)
  return (
    <>
      {productList?.map((item,index)=>(
        <div className='border-[1px] rounded-[10px] p-3 shadow-md flex flex-col justify-between' key={item._id}>
        <Link to={`/thuc-don/${item.prodType}/${item.prodName}`}>
          <div className='relative pt-[100%]'>
            <img className='absolute top-0 left-0 h-full w-full object-cover rounded-[10px] cursor-pointer' src={item.prodImg} alt={item.prodName} loading='lazy' />
          </div>
        </Link>
        <div className='text-maintext flex-1 mt-2'>
        <Link to={`/thuc-don/${item.prodType}/${item.prodName}`}>
          <h3 className='text-[20px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{item.prodName}</h3>
        </Link> 
          <p className='text-[15px] py-1 text-sec-line'>{item.prodDetail}</p>
        </div>
        <div className='flex-1'>
        <span className='text-[25px] text-maincolor font-bold py-2 block'>{formatVND(item.prodPrice)}</span>
          <button onClick={()=>handleAddToCart(item)} className='w-full py-2 bg-maincolor text-white font-semibold rounded-[10px] hover:brightness-90 duration-200'>
            Thêm vào giỏ hàng
            <i className="fa-solid fa-cart-shopping ml-2"></i>
          </button>
        </div>
      </div>
      ))}
       </>   
  )
}
export default ProductCard