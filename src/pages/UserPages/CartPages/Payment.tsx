import { ChangeEvent, useContext, useMemo, useState,  } from "react"
import { useForm } from "react-hook-form"
import { CartItem } from "../../../api/productAPI"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { useBack } from "../../../hooks"
import { formatVND } from "../../../utils/formatVND"
import { Radio, RadioGroup, useToast } from '@chakra-ui/react'
import { LoginContext } from "../../../context/LoginContext/LoginContext"
import paymentAPI from "../../../api/paymentAPI"

interface initOrder {
    _id: null,
    userName : string,
    phoneNumber : string,
    userAddress : string,
    paymentMethods : string,
    productDetails : string,
    totalPrice : string,
    status : string,
}
const Payment = () => {
  const {backToPrev} = useBack()
  const toast = useToast()
  const {userAcc} : any = useContext(LoginContext)
  const {cartList} : any = useContext(FoodContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const initialState : initOrder = {
    _id:null,
    userName : '',
    phoneNumber : '',
    userAddress : '',
    paymentMethods : '',
    productDetails : '',
    totalPrice : '',
    status : '',
  }
  const [checkOut,setCheckOut] = useState<initOrder>(initialState)
  const handleAddChange = (e : ChangeEvent<HTMLInputElement>) => {
    setCheckOut((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const calculateTotal = useMemo(() => {
    const priceSum = cartList.reduce((a : number,b : any) => {
      const totalPrice = b.prodPrice * (b.qty || 1)
      return a + totalPrice
    },0)
    return priceSum
  },[cartList])
  const [checked,setChecked] = useState<string>()
  const handleRadio = (e : any) => {
    setChecked(e)
  }
  const prodDetail = cartList.map((item : CartItem) => `${item.prodName} x ${item.qty || 1}`).toString()
  const onSubmit = async () => {
    try{
      const data = {
        userName : userAcc.userName,
        phoneNumber : checkOut.phoneNumber,
        userAddress : checkOut.userAddress,
        paymentMethods : checked!,
        productDetails : prodDetail,
        totalPrice : calculateTotal,
        status : 'false'
      }
      await paymentAPI.addOrder(data)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Thêm đơn hàng thành công, chờ shipper tới thôi!",
          status: 'success',
          duration: 8000,
          isClosable: true,
        })
      localStorage.removeItem('product_list')
      window.location.reload()  
   }
   catch(err){
     console.log('Không thêm được đơn hàng mới',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Thêm đơn hàng không thành công",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
   }
}
  return (
    <section className='max-w-[1200px] m-auto lg:px-5'>
     <h1 className='text-[40px] md:text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor after:h-[2px] after:w-full after:bg-text2 after:absolute after:ml-[30px] after:top-[58%]'>Thanh toán</h1>
     <div className='flex justify-end'>
        <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
      </div>
      <div className='flex md:block'>
        <div className='flex-1 border-r-[1px] border-text2 pr-5'>
          <span className='text-[25px] sm:text-[20px] font-semibold text-maincolor'>
              Sản phẩm
          </span>
          {cartList.map((item : CartItem)=>(
            <div key={item._id}>
              <div className='flex text-maintext items-center justify-between py-5 md:flex-col md:px-10'>
                <img src={item.prodImg} alt={item.prodName} className='h-[80px] w-[80px] md:w-[50%] rounded-[10px] object-cover' />
                <span className='text-[20px] flex-1 ml-5 md:ml-0 md:py-3'>{item.prodName} x {item.qty || 1}</span>
                <span className='text-[18px] ml-10 md:ml-0 md:pb-3'>Tổng cộng: {formatVND(item.prodPrice*(item.qty || 1))}</span> 
              </div>
              <hr/>
            </div>
          ))}
          <span className='text-[20px] float-right text-maintext py-5 font-semibold'>Tổng thanh toán: {formatVND(calculateTotal)}</span>
        </div>    
        <div className='flex-1 ml-8'>
          <span className='text-[25px] sm:text-[20px] font-semibold text-maincolor'>
            Thông tin người mua
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
           <span className='text-maintext'>Tên: <b>{userAcc?.userName}</b></span>
           <span className='text-maintext block mt-4'>Email: <b>{userAcc?.userMail}</b></span>
            <fieldset className='py-4'>
              <label htmlFor="phoneNumber" className='text-maintext'>Số điện thoại:</label> <br/>
              <input 
              {...register('phoneNumber',{required:true,})} 
                onChange={handleAddChange} 
                type='text' 
                name="phoneNumber" 
                id='phoneNumber' 
                className='p-1 focus:outline-none border-[1px] text-black w-full mt-1'/>
              {errors.phoneNumber?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập SĐT</span>}
            </fieldset>
            <fieldset className='py-4'>
              <label htmlFor="userAddress" className='text-maintext'>Địa chỉ:</label> <br/>
              <input 
              {...register('userAddress',{required:true,})} 
                onChange={handleAddChange} 
                type='text' 
                name="userAddress" 
                id='userAddress' 
                className='p-1 focus:outline-none border-[1px] text-black w-full mt-1'/>
              {errors.userAddress?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập địa chỉ</span>}
            </fieldset>
            <fieldset className='py-4 text-maintext'>
              <label htmlFor="saleOff">Phương thức thanh toán:</label> <br/>
              <RadioGroup onChange={handleRadio} className='mt-3'>
                <Radio value='tien-mat' colorScheme='orange'>Thanh toán tiền mặt</Radio>
                <Radio value='the' className='ml-5' colorScheme='orange'>Thanh toán bằng thẻ</Radio>
              </RadioGroup>
            </fieldset>
            <button  type='submit' className='bg-maincolor float-right mt-5 text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Thanh toán</button>
          </form>
        </div>     
      </div>
    </section>
  )
}
export default Payment