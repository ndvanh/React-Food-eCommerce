import { useForm } from "react-hook-form"
import { ChangeEvent, useContext,useState} from "react"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { useToast } from "@chakra-ui/react"
import { useBack } from "../../../hooks/index"
import newsAPI from "../../../api/newsAPI"

const UpdateNews = () => {
  const toast = useToast()
  const [anh,setAnh] = useState<any>('')
  const {newsItem,setNewsItem} : any = useContext(FoodContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const {backToPrev} = useBack()
  const handleUpdateChange = (e : any) => {
    setNewsItem((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleAnh = (e : ChangeEvent<HTMLInputElement>) => {
    setAnh(e.target.files![0])
  }
  const onSubmit = async () => {
    try{
      const formData = new FormData() 
        formData.append('newsTitle', newsItem.newsTitle)
        formData.append('imgNews', anh)
        formData.append('newsContent', newsItem.newsContent)
        formData.append('editor', newsItem.editor)
      await newsAPI.updateNews(formData,newsItem._id)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Sửa tin tức thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
   }
   catch(err){
     console.log('Không sửa được tin tức',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Sửa tin tức không thành công",
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
      Sửa tin tức
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
          onChange={handleUpdateChange} 
          type='text' 
          name="newsTitle" 
          id='newsTitle'
          value={newsItem?.newsTitle} 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.newsTitle?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tiêu đề tin tức</span>}
        {errors.newsTitle?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Tiêu đề tin tức dưới 250 kí tự</span>}
      </fieldset> 
      <fieldset className='py-4'>
        <label htmlFor="imgNews" className='text-maintext'>Ảnh tin tức:</label> <br/>
        <input 
          onChange={handleAnh} 
          type='file' 
          name="imgNews" 
          id='imgNews' 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="newsContent" className='text-maintext'>Nội dung:</label> <br/>
        <textarea 
         {...register('newsContent',{required:true})} 
          onChange={handleUpdateChange} 
          name="newsContent" 
          id='newsContent' 
          value={newsItem?.newsContent} 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.newsContent?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập nội dung tin tức</span>}
      </fieldset>
      <fieldset className='py-4'>
        <label htmlFor="editor" className='text-maintext'>Người đăng:</label> <br/>
        <input 
         {...register('editor',{required:true,maxLength:50})} 
          onChange={handleUpdateChange} 
          type='text' 
          name="editor" 
          id='editor' 
          value={newsItem?.editor} 
          className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
        {errors.editor?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên người đăng</span>}
        {errors.editor?.type === 'maxLength' && <span className="text-[#ee5253] mt-1 block">Tên người đăng dưới 50 kí tự</span>}
      </fieldset>
        <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Sửa</button>
    </form>
   </section>
  )
}
export default UpdateNews