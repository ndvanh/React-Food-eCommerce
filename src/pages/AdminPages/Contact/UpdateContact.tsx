import {useForm} from "react-hook-form"
import {useContext} from "react"
import {FoodContext} from "../../../context/FoodContext/FoodContext"
import {useToast} from "@chakra-ui/react"
import {useBack} from "../../../hooks/index"
import contactAPI from "../../../api/contactAPI"

const UpdateContact = () => {
  const toast = useToast()
  const {contactItem,setContactItem} : any = useContext(FoodContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const {backToPrev} = useBack()
  const handleUpdateChange = (e : any) => {
    setContactItem((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const onSubmit = async () => {
    try{
      await contactAPI.updateContact(contactItem,contactItem._id)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Sửa liên hệ thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
   }
   catch(err){
     console.log('Không sửa được liên hệ',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Sửa liên hệ không thành công",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
   }
}
  return (
    <section>
        <div className='flex justify-between'>
            <h1 className='text-[35px] md:text-[30px] sm:text-[25px]  overflow-hidden relative font-semibold text-maincolor'>Sửa liên hệ</h1>
            <div>
                <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className='py-4'>
            <label htmlFor="nameCt" className='text-maintext'>Tên liên hệ:</label> <br/>
            <input 
            {...register('nameCt',{required:true})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="nameCt" 
            id='nameCt'
            value={contactItem?.nameCt} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
            {errors.nameCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên liên hệ</span>}
        </fieldset> 
        <fieldset className='py-4'>
            <label htmlFor="emailCt" className='text-maintext'>Email:</label> <br/>
            <input 
            {...register('emailCt',{required:true})} 
            onChange={handleUpdateChange} 
            type='text' 
            name="emailCt" 
            id='emailCt'
            value={contactItem?.emailCt} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
            {errors.emailCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập email liên hệ</span>}
        </fieldset> 
        <fieldset className='py-4'>
            <label htmlFor="contentCt" className='text-maintext'>Nội dung:</label> <br/>
            <textarea 
            {...register('contentCt',{required:true})} 
            onChange={handleUpdateChange} 
            name="contentCt" 
            id='contentCt' 
            value={contactItem?.contentCt} 
            className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
            {errors.contentCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập nội dung liên hệ</span>}
        </fieldset>
            <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Sửa</button>
        </form>
   </section>
  )
}
export default UpdateContact