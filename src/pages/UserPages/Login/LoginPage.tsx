import {Flex,Box,FormControl,FormLabel,Input,Stack,Button,Heading,useColorModeValue, useToast, Text,} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import userAPI, { LoginAcc } from '../../../api/userAPI'
import { LoginContext } from '../../../context/LoginContext/LoginContext'
import { signInWithGoogle } from '../../../service/firebase'

const LoginPage = () => {
  const {userAcc,setUserAcc} : any = useContext(LoginContext)
  const { register,handleSubmit,formState:{errors} } = useForm()
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const toast = useToast()
  const initialState : LoginAcc = {
    userMail : '',
    userPassword : '',
  }
  const [account,setAccount] = useState<LoginAcc>(initialState)
  const handleInputData = (e : any) => {
    setAccount((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const onSubmit = async () => {
    try{
     const resAccount = await userAPI.loginUser(account)
     if (resAccount) {
      const loginAcc = {
        userName:resAccount.data.userName,
        phoneNumber:resAccount.data.phoneNumber,
        userMail:resAccount.data.userMail
      }
      setUserAcc(loginAcc)
      localStorage.setItem('user_account',JSON.stringify(loginAcc))
     }
     toast({
      position: 'top',
        title: 'Thành công',
        description: "Đăng nhập thành công",
        status: 'success',
        duration: 5000,
        isClosable: true,
     })
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
    <Flex minH={'100vh'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      {userAcc ?
      <div className='text-maintext flex items-center flex-col'>
        <h2 className='text-[30px] sm:text-[25px] py-6'>Đăng nhập thành công</h2>
        <Link to='/thuc-don'>
          <span className='bg-maincolor text-white p-3 rounded-full'>Bắt đầu mua hàng</span>
        </Link>
      </div> :
      <Stack spacing={8} mt={10} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} className='text-maincolor'>Đăng nhập CloudFood</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'2xl'} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)} className='text-maintext'>
              <FormControl id="email">
                <FormLabel>Địa chỉ email</FormLabel>
                <Input {...register('userMail',{required:true,pattern: emailRegex,})} onChange={handleInputData} type="text" focusBorderColor='#ff5e57' />
                {errors.userMail?.type === 'required' && <span className="text-maincolor mt-1 block">Hãy nhập email của bạn</span>}
                {errors.userMail?.type === 'pattern' && <span className="text-maincolor mt-1 block">Email không đúng định dạng</span>}
              </FormControl>
              <FormControl id="password" mt={5}>
                <FormLabel>Mật khẩu</FormLabel>
                <Input {...register('userPassword',{required:true,minLength:6})} onChange={handleInputData} type="password" focusBorderColor='#ff5e57' />
                {errors.userPassword?.type === 'required' && <span className="text-maincolor mt-1 block">Hãy nhập mật khẩu</span>}
                {errors.userPassword?.type === 'minLength' && <span className="text-maincolor mt-1 block">Mật khẩu phải lớn hơn 6 kí tự</span>}
              </FormControl>
              <Stack spacing={4}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Link to='/dang-ky' className='text-blue-600 mt-8'>Chưa có tài khoản? Đăng ký ngay</Link>
                </Stack>
                <Button type='submit' bg={'#ff5e57'} color={'white'} _hover={{bg: '',}}>Đăng nhập</Button>
              </Stack>
            </form>
          </Stack>
          <Text fontSize='sm' align='center' m={2} color='#576574'>hoặc</Text>
          <Stack>
            <Button type='button' colorScheme='twitter' _hover={{bg: '',}} onClick={signInWithGoogle}>
              Đăng nhập với Google <i className="fa-brands fa-google text-[20px] ml-1"></i>
            </Button>
          </Stack>
        </Box>
      </Stack>}
    </Flex>
  )
}
export default LoginPage