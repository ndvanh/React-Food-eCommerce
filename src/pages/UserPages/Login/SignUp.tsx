import {Flex,Box,FormControl,FormLabel,Input,Stack,Button,Heading,useColorModeValue, useToast,} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import userAPI, { UserAcc } from '../../../api/userAPI';

const SignUp = () => {
  const { register,handleSubmit,formState:{errors} } = useForm()
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const toast = useToast()
  const initialState : UserAcc = { 
    _id: null,
    userName : '',
    phoneNumber : 1,
    userMail : '',
    userPassword : '',
    createdAt:'',
    updatedAt:''
  }
  const [user,setUser] = useState<UserAcc>(initialState)
  const handleAddChange = (e : any) => {
    setUser((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const onSubmit = async () => {
    try{
      await userAPI.addUser(user)
      toast({
      position: 'top',
        title: 'Thành công',
        description: "Đăng ký tài khoản thành công",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch(err : any){
      if(err.response.status === 409) {
        console.log('Không đăng ký được tài khoản mới',err)
        toast({
        position: 'top',
          title: 'Đăng ký không thành công',
          description: "Email đã tồn tại, bạn hãy thử email khác",
          status: 'error',
          duration: 8000,
          isClosable: true,
        })
      }
      else {
        console.log('Không đăng ký được tài khoản mới',err)
        toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Đăng ký tài khoản mới không thành công",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }
  return (
    <Flex align={'center'} justify={'center'} minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} mb={20} py={5} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} className='text-maincolor'>Đăng ký tài khoản YumYum</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'2xl'} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)} className='text-maintext'>
              <FormControl id="name">
                <FormLabel>Tên người dùng</FormLabel>
                <Input {...register('userName',{required:true,})} onChange={handleAddChange} type="text" focusBorderColor='#fa983a' />
                {errors.userName?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên của bạn</span>}
              </FormControl>
              <FormControl id="phone" mt={5}>
                <FormLabel>Số điện thoại</FormLabel>
                <Input {...register('phoneNumber',{required:true,})} onChange={handleAddChange} type="text" focusBorderColor='#fa983a' />
                {errors.phoneNumber?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập SĐT của bạn</span>}
              </FormControl>
              <FormControl id="email" mt={5}>
                <FormLabel>Địa chỉ email</FormLabel>
                <Input {...register('userMail',{required:true,pattern: emailRegex,})} onChange={handleAddChange} type="text" focusBorderColor='#fa983a' />
                {errors.userMail?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập email của bạn</span>}
                {errors.userMail?.type === 'pattern' && <span className="text-[#ee5253] mt-1 block">Email không đúng định dạng</span>}
              </FormControl>
              <FormControl id="password" mt={5}>
                <FormLabel>Mật khẩu</FormLabel>
                <Input {...register('userPassword',{required:true,minLength:6})} onChange={handleAddChange} type="password" focusBorderColor='#fa983a' />
                {errors.userPassword?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập mật khẩu</span>}
                {errors.userPassword?.type === 'minLength' && <span className="text-[#ee5253] mt-1 block">Mật khẩu phải lớn hơn 6 kí tự</span>}
              </FormControl>
              <Stack spacing={4}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Link to='/dang-nhap' className='text-blue-600 mt-8'>Đã có tài khoản? Đăng nhập ngay</Link>
                </Stack>
                <Button type='submit' bg={'#fa983a'} color={'white'} _hover={{bg: '',}}>Đăng ký</Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default SignUp