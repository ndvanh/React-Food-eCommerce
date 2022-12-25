import { useToast } from "@chakra-ui/react"
import { useState, ChangeEvent } from "react"
import menuAPI, { MenuItem } from "../../../api/menuAPI"
import {useForm} from "react-hook-form"
import { useBack } from "../../../hooks/index"

const AddMenu = () => {
  const toast = useToast()
  const {backToPrev} = useBack()
  const { register,handleSubmit,formState:{errors} } = useForm()
  const initialState: MenuItem = {
    _id:null,
    menuType: '',
    imgMenu: '',
  }
  const [type,setType] = useState<MenuItem>(initialState)
  const [anh,setAnh] = useState<any>('')
  const handleAddChange = (e : ChangeEvent<HTMLInputElement>) => {
    setType((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleAnh = (e : ChangeEvent<HTMLInputElement>) => {
    setAnh(e.target.files![0])
  }
  const onSubmit = async () => {
      try{
        const formData = new FormData() 
        formData.append('menuType', type.menuType)
        formData.append('imgMenu', anh)
        await menuAPI.addMenuItem(formData)
        toast({
          position: 'top',
            title: 'Thành công',
            description: "Thêm thực đơn thành công",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
     }
     catch(err){
       console.log('Không thêm được menu mới',err)
       toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Thêm thực đơn không thành công",
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
        Thêm thực đơn
      </h1>
      <div>
        <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
      </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className='py-4'>
        <label htmlFor="menuType" className='text-maintext'>Tên thực đơn:</label> <br/>
        <input 
         {...register('menuType',{required:true,maxLength:50})} 
          onChange={handleAddChange} 
          type='text' 
          name="menuType" 
          id='menuType' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.menuType?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên thực đơn</span>}
        {errors.menuType?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Tên thực đơn dưới 50 kí tự</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="imgMenu" className='text-maintext'>Ảnh thực đơn:</label> <br/>
        <input 
         {...register('imgMenu',{required:true,})} 
          onChange={handleAnh} 
          type='file' 
          name="imgMenu" 
          id='imgMenu' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.imgMenu?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy chọn ảnh</span>}
      </fieldset>
        <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Thêm</button>
    </form>
   </section>
  )
}
export default AddMenu
