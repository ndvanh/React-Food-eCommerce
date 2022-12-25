import {useForm} from "react-hook-form"
import {useContext} from "react"
import {useToast} from "@chakra-ui/react"
import {useBack} from "../../../hooks/index"
import userAPI from "../../../api/userAPI"
import { LoginContext } from "../../../context/LoginContext/LoginContext"

const UpdateUser = () => {
  const toast = useToast()
  const {userInfo,setUserInfo} : any = useContext(LoginContext)
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const { register,handleSubmit,formState:{errors} } = useForm()
  const {backToPrev} = useBack()
  const handleUpdateChange = (e : any) => {
    setUserInfo((prev : any) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const onSubmit = async () => {
    try{
      await userAPI.updateUser(userInfo,userInfo._id)
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Sửa người dùng thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
   }
   catch(err){
     console.log('Không sửa được người dùng',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Sửa người dùng không thành công",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
   }
}
  return (
    <section>
        <div className='flex justify-between'>
            <h1 className='text-[35px] md:text-[30px] sm:text-[25px]  overflow-hidden relative font-semibold text-maincolor'>Sửa người dùng</h1>
            <div>
                <span className='text-[16px] cursor-pointer' onClick={backToPrev}><i className="fa-solid fa-chevron-left"></i> Quay lại</span>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='py-4'>
                <label htmlFor="userName" className='text-maintext'>Tên người dùng:</label> <br/>
                <input 
                {...register('userName',{required:true})} 
                onChange={handleUpdateChange} 
                type='text' 
                name="userName" 
                id='userName'
                value={userInfo?.userName} 
                className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
                {errors.userName?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên người dùng</span>}
            </fieldset> 
            <fieldset className='py-4'>
                <label htmlFor="phoneNumber" className='text-maintext'>Số điện thoại:</label> <br/>
                <input 
                {...register('phoneNumber',{required:true})} 
                onChange={handleUpdateChange} 
                type='text' 
                name="phoneNumber" 
                id='phoneNumber'
                value={userInfo?.phoneNumber} 
                className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
                {errors.phoneNumber?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập SĐT người dùng</span>}
            </fieldset> 
            <fieldset className='py-4'>
                <label htmlFor="userMail" className='text-maintext'>Email người dùng:</label> <br/>
                <input 
                {...register('userMail',{required:true,pattern: emailRegex,})} 
                onChange={handleUpdateChange} 
                type='text' 
                name="userMail" 
                id='userMail'
                value={userInfo?.userMail} 
                className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
                {errors.userMail?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập email người dùng</span>}
                {errors.userMail?.type === 'pattern' && <span className="text-[#ee5253] mt-1 block">Email không đúng định dạng</span>}
            </fieldset>
            <fieldset className='py-4'>
                <label htmlFor="userPassword" className='text-maintext'>Mật khẩu:</label> <br/>
                <input 
                {...register('userPassword',{required:true,minLength:6})} 
                onChange={handleUpdateChange} 
                type='text' 
                name="userPassword" 
                id='userPassword'
                value={userInfo?.userPassword} 
                className='p-1 focus:outline-none border-[1px] text-black w-[70%] md:w-full mt-1'/>
                {errors.userPassword?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập mật khẩu người dùng</span>}
                {errors.userPassword?.type === 'minLength' && <span className="text-[#ee5253] mt-1 block">Mật khẩu tối thiểu 6 kí tự</span>}
            </fieldset>
            <button  type='submit' className='bg-maincolor text-white h-[40px] w-[120px] rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Sửa</button>
        </form>
   </section>
  )
}
export default UpdateUser