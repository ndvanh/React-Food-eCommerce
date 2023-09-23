import {Container,Flex,Box,Heading,Text,Button,VStack,HStack,Wrap,WrapItem,FormControl,FormLabel,Input,InputGroup,Textarea, useToast,} from '@chakra-ui/react';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form';
import contactAPI, { ContactItem } from '../../api/contactAPI';
import {useState} from 'react';

const Contact = () => {
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
        title: 'Đã gửi liên hệ',
        description: "Chúng tôi sẽ liên hệ lại với bạn sau",
        status: 'success',
        duration: 8000,
        isClosable: true,
      })
   }
   catch(err){
     console.log('Không thêm được thông tin liên hệ của khách hàng',err)
     toast({
      position: 'top',
        title: 'Có lỗi',
        description: "Gửi liên hệ không thành công",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
   }
}
  return (
   <section>
    <Container maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box className='bg-maincolor' color="white" borderRadius="lg" m={{ sm: 4, md: 16, lg: 10 }} p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Liên hệ với chúng tôi</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                    Yum Yum - Contact us
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        variant="ghost"
                        color="white"
                        _hover={{ border: '2px solid white' }}
                        leftIcon={<PhoneIcon color="white"/>}
                        >
                        +84-912345678
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        variant="ghost"
                        color="white"
                        _hover={{ border: '2px solid white' }}
                        leftIcon={<EmailIcon color="white"/>}
                        >
                        yumyum9@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        variant="ghost"
                        color="white"
                        _hover={{ border: '2px solid white' }}
                        leftIcon={<ChatIcon color="white"/>}
                        >
                        235 HQV, Bắc Từ Liêm, Hà Nội
                      </Button>
                    </VStack>
                  </Box>
                  <HStack mt={{ lg: 10, md: 10 }} spacing={5} alignItems="flex-start"> {/* justifyContent='space-around' */}
                  <span className=''>
                    <i className="fa-brands fa-facebook text-[20px] text-maintext bg-white p-2 rounded-full cursor-pointer duration-200"></i>
                    </span>
                  <span className=''>
                    <i className="fa-brands fa-square-instagram text-[20px] text-maintext bg-white p-2 rounded-full cursor-pointer duration-200"></i>
                    </span>
                  <span className=''>
                    <i className="fa-brands fa-tiktok text-[20px] text-maintext bg-white p-2 rounded-full cursor-pointer duration-200"></i>
                    </span>
                  </HStack>
                </Box>
              </WrapItem>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" borderRadius="lg" paddingY={1}>
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel className='text-maintext'>Tên của bạn</FormLabel>
                        <InputGroup borderColor="#E0E1E7">                         
                          <Input {...register('nameCt',{required:true,})} onChange={handleAddChange} type="text" size="md" focusBorderColor='#fa983a'/>
                        </InputGroup>
                          {errors.nameCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập tên của bạn</span>}
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel className='text-maintext'>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <Input {...register('emailCt',{required:true,pattern: emailRegex,})} onChange={handleAddChange} type="text" size="md" focusBorderColor='#fa983a'/>
                        </InputGroup>
                          {errors.emailCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy nhập email của bạn</span>}
                          {errors.emailCt?.type === 'pattern' && <span className="text-[#ee5253] mt-1 block">Email không đúng định dạng</span>}
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel className='text-maintext'>Để lại lời nhắn</FormLabel>
                        <Textarea
                         {...register('contentCt',{required:true,})}
                         onChange={handleAddChange}
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="nội dung"
                          focusBorderColor='#fa983a'
                        />
                        {errors.contentCt?.type === 'required' && <span className="text-[#ee5253] mt-1 block">Hãy để lại lời nhắn</span>}
                      </FormControl>
                      <FormControl id="name">
                        <Button variant="solid" className='w-full' bg="#fa983a" color="white" type='submit' _hover={{}}>Gửi đi</Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </form>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
    <div>
       <iframe className='w-full' title='bản đồ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1510.0924829887485!2d105.78437742566359!3d21.04640556750465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab32f7dc4ff3%3A0x400598609478904c!2zMjM1IEhvw6BuZyBRdeG7kWMgVmnhu4d0LCBD4buVIE5odeG6vywgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1667356342243!5m2!1svi!2s"  height="450"   loading="lazy" ></iframe>
    </div>
   </section>
  );
}
export default Contact