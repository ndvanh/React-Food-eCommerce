import { useContext } from "react"
import { Link } from "react-router-dom"
import { formatVND } from "../../../utils/formatVND"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { ProdItem } from "../../../api/productAPI"

interface productItem {
  product: ProdItem
}
const ProductItem = ({product} : productItem) => {
  const {handleAddToCart} : any = useContext(FoodContext)
  return (
   <>
     <div className='border-[1px] rounded-[10px] p-3 shadow-md flex flex-col justify-between' key={product._id}>
        <Link to={`/thuc-don/${product.prodType}/${product.prodName}`}>
          <div className='relative pt-[100%]'>
            <img className='absolute top-0 left-0 h-full w-full object-cover rounded-[10px] cursor-pointer' src={product.prodImg} alt={product.prodName} loading='lazy' />
          </div>
        </Link>
        <div className='text-maintext flex-1 mt-2'>
        <Link to={`/thuc-don/${product.prodType}/${product.prodName}`}>
          <h3 className='text-[20px] font-semibold overflow-hidden whitespace-nowrap text-ellipsis'>{product.prodName}</h3>
        </Link> 
          <p className='text-[15px] py-1 text-sec-line'>{product.prodDetail}</p>
        </div>
        <div className='flex-1'>
          <span className='text-[25px] text-maincolor font-bold py-2 block'>{formatVND(product.prodPrice)}</span>
          <button onClick={()=>handleAddToCart(product)} className='w-full py-2 bg-maincolor text-white font-semibold rounded-[10px] hover:brightness-90 duration-200'>
            Thêm vào giỏ hàng
            <i className="fa-solid fa-cart-shopping ml-2"></i>
          </button>
        </div>
      </div>
   </>
  )
}

export default ProductItem