import { useForm } from "react-hook-form"
import { ChangeEvent, useContext,useEffect,useState} from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import menuAPI, { MenuItem } from "../../../api/menuAPI"
import { useToast } from "@chakra-ui/react"
import productAPI from "../../../api/productAPI"
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useBack } from "../../../hooks/index"

const UpdateProduct = () => {
  const toast = useToast()
  const [anh,setAnh] = useState<any>('')
  const [menu,setMenu] = useState<MenuItem[]>([])
  const [checked,setChecked] = useState<string>()
  const {prodItem,setProdItem} : any = useContext(FoodContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const {backToPrev} = useBack()
  useEffect(() =>{
    const getMenuItem = async () => {
      try{
         const response = await menuAPI.getMenuItem()
         setMenu(response)
      }
      catch(err){
        console.log('Không thể lấy danh sách sản phẩm',err)
      }
    }
    getMenuItem()
  },[])
  const handleUpdateChange = (e : any) => {
    setProdItem((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleAnh = (e : ChangeEvent<HTMLInputElement>) => {
    setAnh(e.target.files![0])
  }
  const handleRadio = (e : any) => {
    setChecked(e)
  }
  const onSubmit = async () => {
    try{
      const formData = new FormData() 
      formData.append('prodName', prodItem.prodName)
      formData.append('prodType', prodItem.prodType)
      formData.append('prodImg', anh)
      formData.append('prodPrice', prodItem.prodPrice)
      formData.append('prodDetail', prodItem.prodDetail)
      formData.append('quantity', prodItem.quantity)
      formData.append('saleOff', checked!)
      await productAPI.updateProduct(formData,prodItem._id)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Sửa sản phẩm thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
   }
   catch(err){
     console.log('Không sửa được sản phẩm',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Sửa sản phẩm không thành công",
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
      Sửa sản phẩm
    </h1>
    <div>
      <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
    </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className='py-4'>
        <label htmlFor="prodName" className='text-maintext'>Tên sản phẩm:</label> <br/>
        <input 
         {...register('prodName',{required:true,maxLength:250 })} 
          onChange={handleUpdateChange} 
          type='text' 
          name="prodName" 
          id='prodName'
          value= {prodItem?.prodName} 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.prodName?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên sản phẩm</span>}
        {errors.prodType?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Tên sản phẩm dưới 250 kí tự</span>}
      </fieldset> 
      <fieldset className='py-4'>
        <label htmlFor="prodType" className='text-maintext'>Loại sản phẩm:</label> <br/>
        <select  
        //  {...register('prodType',{required:true})} 
          onChange={handleUpdateChange} 
          name="prodType" 
          id='prodType' 
          defaultValue='Chọn'
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'>
          <option hidden disabled>Chọn</option>
          {menu.map((item,index)=>(
            <option key={item._id} value={item.menuType}>{item.menuType}</option>
          ))}
        </select>  
        {/* {errors.prodType?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy chọn loại sản phẩm</span>} */}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="prodImg" className='text-maintext'>Ảnh sản phẩm:</label> <br/>
        <input 
          onChange={handleAnh} 
          type='file' 
          name="prodImg" 
          id='prodImg' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="prodPrice" className='text-maintext'>Giá sản phẩm:</label> <br/>
        <input 
         {...register('prodPrice',{required:true})} 
          onChange={handleUpdateChange} 
          type='text' 
          name="prodPrice" 
          id='prodPrice' 
          value= {prodItem?.prodPrice} 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.prodPrice?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập giá sản phẩm</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="prodDetail" className='text-maintext'>Chi tiết sản phẩm:</label> <br/>
        <textarea 
         {...register('prodDetail',{required:true,maxLength:500})} 
          onChange={handleUpdateChange} 
          name="prodDetail" 
          id='prodDetail' 
          value= {prodItem?.prodDetail} 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.prodDetail?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập mô tả sản phẩm</span>}
        {errors.prodType?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Mô tả sản phẩm dưới 500 kí tự</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="quantity" className='text-maintext'>Số lượng sản phẩm:</label> <br/>
        <input 
         {...register('quantity',{required:true})} 
          onChange={handleUpdateChange} 
          type='number' 
          name="quantity" 
          id='quantity' 
          value= {prodItem?.quantity}
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.quantity?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập số lượng sản phẩm</span>}
      </fieldset>
      <fieldset className='py-4 text-maintext'>
        <label htmlFor="saleOff" className='text-maintext'>Trạng thái khuyến mãi:</label> <br/>
        <RadioGroup onChange={handleRadio} defaultValue={prodItem?.saleOff}>
          <Radio value='khuyen-mai' colorScheme='orange'>Khuyến mãi</Radio>
          <Radio value='khong-khuyen-mai' className='ml-5' colorScheme='orange'>Không khuyến mãi</Radio>
        </RadioGroup>
      </fieldset>
        <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Sửa</button>
    </form>
   </section>
  )
}
export default UpdateProduct