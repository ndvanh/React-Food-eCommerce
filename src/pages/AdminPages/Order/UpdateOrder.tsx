import { useForm } from "react-hook-form"
import { useContext,useState} from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { useToast } from "@chakra-ui/react"
import paymentAPI from "../../../api/paymentAPI"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useBack } from "../../../hooks/index"

const UpdateOrder = () => {
  const toast = useToast()
  const [checked,setChecked] = useState<string>()
  const {order,setOrder} : any = useContext(FoodContext)
  const {register,handleSubmit,formState:{errors} } = useForm()
  const {backToPrev} = useBack()
  const handleUpdateChange = (e : any) => {
    setOrder((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleRadio = (e : any) => {
    setChecked(e)
  }
  const onSubmit = async () => {
    try{
      const data = {
        userName : order.userName,
        phoneNumber : order.phoneNumber,
        userAddress : order.userAddress,
        paymentMethods : checked!,
        productDetails : order.productDetails,
        totalPrice : order.totalPrice,
        status : order.status
      }
      await paymentAPI.updateOrder(data,order._id)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Sửa đơn hàng thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
   }
   catch(err){
     console.log('Không sửa được đơn hàng',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Sửa đơn hàng không thành công",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
   }
}
  return (
    <section>
      <div className='flex justify-between'>
        <h1 className='text-[35px] md:text-[30px] sm:text-[25px]  overflow-hidden relative font-semibold text-maincolor'>
          Sửa đơn hàng
        </h1>
        <div>
          <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='py-4'>
          <label htmlFor="userName" className='text-maintext'>Tên khách hàng:</label> <br/>
          <input 
          {...register('userName',{required:true,})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="userName" 
            id='userName'
            value= {order?.userName} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
          {errors.userName?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên khách hàng</span>}
        </fieldset> 
        <fieldset className='py-4'>
          <label htmlFor="phoneNumber" className='text-maintext'>SĐT khách hàng:</label> <br/>
          <input 
          {...register('phoneNumber',{required:true,})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="phoneNumber" 
            id='phoneNumber'
            value= {order?.phoneNumber} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
          {errors.phoneNumber?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập SĐT khách hàng</span>}
        </fieldset>
        <fieldset className='py-4'>
          <label htmlFor="userAddress" className='text-maintext'>Địa chỉ giao hàng:</label> <br/>
          <input 
          {...register('userAddress',{required:true,})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="userAddress" 
            id='userAddress'
            value= {order?.userAddress} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
          {errors.userAddress?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập địa chỉ giao hàng</span>}
        </fieldset>
        <fieldset className='py-4'>
          <label htmlFor="status" className='text-maintext'>Trạng thái thanh toán:</label> <br/>
          <input 
          {...register('status',{required:true,})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="status" 
            id='status'
            value= {order?.status} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
          {errors.status?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập TTTT</span>}
        </fieldset>
        <fieldset className='py-4'>
          <label htmlFor="productDetails" className='text-maintext'>Danh sách sản phẩm:</label> <br/>
          <textarea 
          {...register('productDetails',{required:true,})} 
            onChange={handleUpdateChange} 
            name="productDetails" 
            id='productDetails'
            value= {order?.productDetails} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
          {errors.productDetails?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập danh sách sản phẩm</span>}
        </fieldset>
        <fieldset className='py-4'>
          <label htmlFor="totalPrice" className='text-maintext'>Tổng tiền đơn hàng:</label> <br/>
          <input 
          {...register('totalPrice',{required:true,})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="totalPrice" 
            id='totalPrice'
            value= {order?.totalPrice} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
          {errors.totalPrice?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tổng tiền</span>}
        </fieldset>
        <fieldset className='py-4 text-maintext'>
          <label htmlFor="paymentMethods" className='text-maintext'>Phương thức thanh toán:</label> <br/>
          <RadioGroup onChange={handleRadio} defaultValue={order?.paymentMethods}>
            <Radio value='tien-mat' colorScheme='orange'>Thanh toán tiền mặt</Radio>
            <Radio value='the' className='ml-5' colorScheme='orange'>Thanh toán bằng thẻ</Radio>
          </RadioGroup>
        </fieldset>
          <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Sửa</button>
      </form>
   </section>
  )
}
export default UpdateOrder