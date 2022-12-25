import { useForm } from "react-hook-form"
import { ChangeEvent, useContext,useState} from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import menuAPI from "../../../api/menuAPI"
import { useToast } from "@chakra-ui/react"
import { useBack } from "../../../hooks/index"

const UpdateMenu = () => {
  const toast = useToast()
  const [anh,setAnh] = useState<any>('')
  const {menuItem,setMenuItem} : any = useContext(FoodContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const {backToPrev} = useBack()
  const handleUpdateChange = (e : ChangeEvent<HTMLInputElement>) => {
    setMenuItem((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleAnh = (e : ChangeEvent<HTMLInputElement>) => {
    setAnh(e.target.files![0])
  }
  const onSubmit = async () => {
    try{
      const formData = new FormData() 
      formData.append('menuType', menuItem.menuType)
      formData.append('imgMenu', anh)
      await menuAPI.updateMenuItem(formData,menuItem._id)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Sửa thực đơn thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
   }
   catch(err){
     console.log('Không sửa được menu',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Sửa thực đơn không thành công",
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
      Sửa thực đơn
    </h1>
    <div>
      <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
    </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className='py-4'>
        <label htmlFor="menuType" className='text-maintext'>Tên thực đơn:</label> <br/>
        <input 
         {...register('menuType',{
          required:true,
          maxLength:50
         })} 
          value = {menuItem?.menuType}
          onChange={handleUpdateChange} 
          type='text' 
          name="menuType" 
          id='menuType' 
          className='p-1 focus:outline-none border-[1px] text-black  w-[70%] md:w-full mt-1'/>
        {errors.menuType?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên thực đơn</span>}
        {errors.menuType?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Tên thực đơn dưới 50 kí tự</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="imgMenu" className='text-maintext'>Ảnh thực đơn:</label> <br/>
        <input 
         {...register('imgMenu',{
          // required:true,
         })}
          onChange={handleAnh} 
          type='file' 
          name="imgMenu" 
          id='imgMenu' 
          className='p-1 focus:outline-none border-[1px] text-black  w-[70%] md:w-full mt-1'/>
        {/* {errors.imgMenu?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy chọn ảnh</span>} */}
      </fieldset>
        <button  type='submit' className='bg-maincolor h-[40px] w-[120px] text-white rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Sửa</button>
    </form>
   </section>
  )
}
export default UpdateMenu