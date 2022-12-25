import { useToast } from "@chakra-ui/react"
import { useState, ChangeEvent, useContext} from "react"
import {useForm} from "react-hook-form"
import newsAPI from "../../../api/newsAPI"
import { LoginContext } from "../../../context/LoginContext/LoginContext"
import { useBack } from "../../../hooks/index"

interface initNewsItem {
    _id: null,
    newsTitle: string,
    imgNews : string,
    newsContent : string,
    editor : string,
}
const AddNews = () => {
  const {adminAcc} : any = useContext(LoginContext)
  const toast = useToast()
  const {register,handleSubmit,formState:{errors}} = useForm()
  const initialState : initNewsItem = {
    _id: null,
    newsTitle: '',
    imgNews : '',
    newsContent : '',
    editor : '',
  }
  const [news,setNews] = useState<initNewsItem>(initialState)
  const [anh,setAnh] = useState<any>('')
  const {backToPrev} = useBack()
  const handleAddChange = (e : any) => {
    setNews((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleAnh = (e : ChangeEvent<HTMLInputElement>) => {
    setAnh(e.target.files![0])
  }
  const onSubmit = async () => {
      try{
        const formData = new FormData() 
        formData.append('newsTitle', news.newsTitle)
        formData.append('imgNews', anh)
        formData.append('newsContent', news.newsContent)
        formData.append('editor', adminAcc.adminAccount)
        await newsAPI.addNews(formData)
        toast({
          position: 'top',
            title: 'Thành công',
            description: "Thêm tin tức thành công",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
     }
     catch(err){
       console.log('Không thêm được tin mới',err)
       toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Thêm tin tức không thành công",
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
      Thêm tin tức
    </h1>
    <div>
      <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
    </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className='py-4'>
        <label htmlFor="newsTitle" className='text-maintext'>Tiêu đề:</label> <br/>
        <input 
         {...register('newsTitle',{required:true,maxLength:250})} 
          onChange={handleAddChange} 
          type='text' 
          name="newsTitle" 
          id='newsTitle' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.newsTitle?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tiêu đề tin tức</span>}
        {errors.newsTitle?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Tiêu đề tin tức dưới 250 kí tự</span>}
      </fieldset> 
      <fieldset className='py-4'>
        <label htmlFor="imgNews" className='text-maintext'>Ảnh tin tức:</label> <br/>
        <input 
         {...register('imgNews',{required:true})} 
          onChange={handleAnh} 
          type='file' 
          name="imgNews" 
          id='imgNews' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.imgNews?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy chọn ảnh tin tức</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="newsContent" className='text-maintext'>Nội dung:</label> <br/>
        <textarea 
         {...register('newsContent',{required:true})} 
          onChange={handleAddChange} 
          name="newsContent" 
          id='newsContent' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.newsContent?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập nội dung tin tức</span>}
      </fieldset>
      <fieldset className='py-4'>
        <span className='text-maintext'>Người đăng: <b>{adminAcc.adminAccount}</b></span> <br/>
      </fieldset> 
      <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Thêm</button>
    </form>
   </section>
  )
}
export default AddNews
