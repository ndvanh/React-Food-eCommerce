import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import contactAPI, { ContactItem } from "../../../api/contactAPI"
import { useBack } from "../../../hooks"

const AddContact = () => {
  const {backToPrev} = useBack()
  const { register,handleSubmit,formState:{errors} } = useForm()
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const toast = useToast()
  const initialState: ContactItem = {
    _id: null,
    nameCt : '',
    emailCt : '',
    contentCt : '',
    createdAt:'',
    updatedAt:''
  }
  const [contact,setContact] = useState<ContactItem>(initialState)
  const handleAddChange = (e : any) => {
    setContact((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const onSubmit = async () => {
    try{
     await contactAPI.addContact(contact)
     toast({
      position: 'top',
        title: 'Thành công',
        description: "Thêm liên hệ thành công",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
   }
   catch(err){
     console.log('Không thêm được thông tin liên hệ của khách hàng',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Thêm liên hệ không thành công",
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
        Thêm liên hệ
      </h1>
      <div>
        <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
      </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className='py-4'>
        <label htmlFor="nameCt" className='text-maintext'>Tên liên hệ:</label> <br/>
        <input 
         {...register('nameCt',{required:true,})} 
          onChange={handleAddChange} 
          type='text' 
          name="nameCt" 
          id='nameCt' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.nameCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên liên hệ</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="emailCt" className='text-maintext'>Email liên hệ:</label> <br/>
        <input 
         {...register('emailCt',{required:true,pattern: emailRegex,})}
          onChange={handleAddChange} 
          type='text' 
          name="emailCt" 
          id='emailCt' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.emailCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập email liên hệ</span>}
        {errors.emailCt?.type === 'pattern' && <span className="text-[#ee5253] mt-1 block">Email không đúng định dạng</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="contentCt" className='text-maintext'>Lời nhắn:</label> <br/>
        <textarea 
          {...register('contentCt',{required:true,})}
          onChange={handleAddChange} 
          name="contentCt" 
          id='contentCt' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.contentCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy để lại lời nhắn</span>}
      </fieldset>
        <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Thêm</button>
    </form>
   </section>
  )
}
export default AddContact