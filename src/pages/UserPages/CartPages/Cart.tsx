import {NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper, useToast} from '@chakra-ui/react'
import { useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { CartItem} from '../../../api/productAPI'
import { FoodContext } from '../../../context/FoodContext/FoodContext'
import { useBack } from '../../../hooks'
import { formatVND } from '../../../utils/formatVND'

const Cart = () => {
  const {backToPrev} = useBack()
  const toast = useToast()
  const {cartList,setCartList} : any = useContext(FoodContext)
  const removeLocalProd = (item : CartItem) => {
    const newProductList = cartList.filter((prod : CartItem) => prod._id !== item._id)
    localStorage.setItem('product_list',JSON.stringify(newProductList))
    setCartList(newProductList)
    toast({
      position: 'top',
        title: 'Xóa thành công',
        description: "Đã xóa sản phẩm",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
  }
  const removeAllLocalProd = () => {
    localStorage.removeItem('product_list')
    window.location.reload()
  }
  const [prodQuantity,setProdQuantity] = useState<number>(1)
  const handleQuantity = (quality : any) => setProdQuantity(quality)
  const handleChangeQuantity = (prod : CartItem) => {
    const newProdList = cartList.map((item : CartItem) => {
      if(prod._id === item._id) {
        return {...item,qty : prodQuantity}
      }
      else return {...item}
    })
    setCartList(newProdList)
  }
  const calculateTotal = () => {
   localStorage.setItem('product_list',JSON.stringify(cartList))
   const priceSum = cartList.reduce((a : number,b : any) => {
      const totalPrice = b.prodPrice * (b.qty || 1)
      return a + totalPrice
    },0)
    return priceSum
  }
  return (
    <section className='max-w-[1200px] m-auto lg:px-5'>
      <h1 className='text-[40px] md:text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor after:h-[2px] after:w-full after:bg-text2 after:absolute after:ml-[30px] after:top-[58%]'>Giỏ hàng</h1>
      <div className='flex justify-end'>
        <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
      </div>
        {cartList.length === 0 ? 
          <span className='text-[16px]'>Hiện tại chưa có sản phẩm nào trong giỏ hàng</span> : 
          <div>
            {cartList.map((item : CartItem)=>(
           <div key={item._id}>
             <div className='flex text-maintext items-center justify-between py-5 md:flex-col md:px-10'>
              <img src={item.prodImg} alt={item.prodName} className='h-[120px] md:h-[200px] w-[120px] md:w-[50%] rounded-[10px] object-cover' />
              <span className='text-[20px] flex-1 ml-[60px] md:ml-0 md:py-3'>Tên: {item.prodName}</span>
              <span className='text-[18px] ml-10 md:ml-0 flex-1 md:pb-3'>Giá: {formatVND(item.prodPrice)}</span>
              <div onClick={()=>handleChangeQuantity(item)}>
              <NumberInput value={item.qty} onChange={handleQuantity} defaultValue={1} size='md' maxW={32} min={1} max={item.quantity} focusBorderColor='#fa983a'>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper/>
                  <NumberDecrementStepper/>
                </NumberInputStepper>
              </NumberInput>
              </div> 
              <span className='text-[18px] ml-10 md:ml-0 md:pb-3'>Tổng cộng: {formatVND(item.prodPrice*(item.qty || 1))}</span> 
              <span onClick={()=>removeLocalProd(item)} className='text-[16px] text-blue-600 hover:underline cursor-pointer ml-[60px] md:ml-0 md:py-3'>Xóa</span>
            </div>
            <hr/>
          </div>
        ))}
        <div className='flex flex-col items-end text-maintext mt-5'>
          <span onClick={removeAllLocalProd} className='font-semibold text-[16px] text-blue-600 hover:underline cursor-pointer'>Xóa tất cả</span>
          <span className='text-[20px] py-5 font-semibold ml-10 md:ml-0 md:pb-3'>Tổng tiền: {formatVND(calculateTotal())}</span>
          <Link to='/thanh-toan'>
            <button className='w-[180px] mt-3 py-2 bg-maincolor text-white font-semibold rounded-[10px] hover:brightness-90 duration-200'>Mua hàng</button>
          </Link>
        </div> 
       </div>  
      }
    </section>
  )
}
export default Cart