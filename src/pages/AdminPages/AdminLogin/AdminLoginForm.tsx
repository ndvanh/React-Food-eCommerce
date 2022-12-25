import {Button,Flex,FormControl,FormLabel,Heading,Input,Stack,Image, useToast,} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import adminAPI, { AdminAcc } from '../../../api/adminAPI'
import { LoginContext } from '../../../context/LoginContext/LoginContext'

const AdminLoginForm = () => {
  const {adminAcc,setAdminAcc} : any = useContext(LoginContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const navigate = useNavigate()
  const toast = useToast()
  const initialState : AdminAcc = {
    adminAccount : '',
    adminPassword : '',
  }
  const [account,setAccount] = useState<AdminAcc>(initialState)
  const handleInputData = (e : any) => {
    setAccount((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const onSubmit = async () => {
    try{
        const resAccount =  await adminAPI.loginAdmin(account)
        if (resAccount) {
            const loginAcc = {
               adminAccount:resAccount.data.adminAccount, 
            }
            setAdminAcc(loginAcc)
            localStorage.setItem('admin_account',JSON.stringify(loginAcc))
        }
        toast({
        position: 'top',
        title: 'Thành công',
        description: "Đăng nhập thành công",
        status: 'success',
        duration: 5000,
        isClosable: true,
        })
        navigate('/admin')
    }
    catch(err : any){
    if(err.response.status === 401) {
        console.log('Đăng nhập không thành công',err)
        toast({
        position: 'top',
            title: 'Không thành công',
            description: "Tài khoản hoặc mật khẩu không chính xác",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })
    }
    else {
        console.log('Đăng nhập không thành công',err)
        toast({
        position: 'top',
        title: 'Có lỗi',
        description: "Có lỗi xảy ra trong quá trình đăng nhập",
        status: 'error',
        duration: 5000,
        isClosable: true,
        })
    }
    }
}
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          {adminAcc ? 
            <div className='text-maintext flex items-center flex-col'>
            <h2 className='text-[30px] sm:text-[25px] py-6'>Đăng nhập thành công</h2>
            <Link to='/admin'>
              <span className='bg-maincolor text-white p-3 rounded-full'>Về trang admin</span>
            </Link>
          </div> : 
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'4xl'} className='text-maincolor'>Đăng nhập Admin CF</Heading>
              <form onSubmit={handleSubmit(onSubmit)} className='text-maintext'>
                  <FormControl id="email">
                    <FormLabel>Tài khoản</FormLabel>
                    <Input {...register('adminAccount',{required:true,})} onChange={handleInputData} type="text" focusBorderColor='#ff5e57' />
                    {errors.adminAccount?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tài khoản của bạn</span>}
                  </FormControl>
                  <FormControl id="password" mt={5}>
                    <FormLabel>Mật khẩu</FormLabel>
                    <Input {...register('adminPassword',{required:true,minLength:6,})} onChange={handleInputData} type="password" focusBorderColor='#ff5e57' />
                    {errors.adminPassword?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập mật khẩu</span>}
                    {errors.adminPassword?.type === 'minLength' && <span className="text-[#ee5253] mt-1 block">Mật khẩu phải lớn hơn 6 kí tự</span>}
                  </FormControl>
                  <Stack spacing={4} mt={5}>
                    <Button type='submit' bg={'#ff5e57'} color={'white'} _hover={{bg: '',}}>Đăng nhập</Button>
                  </Stack>
                </form> 
            </Stack>
          }
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
  )
}
export default AdminLoginForm
