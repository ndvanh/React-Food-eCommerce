import { SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useState,useEffect,useRef, useContext, ChangeEvent } from "react"
import { CSVLink } from "react-csv"
import { Link } from "react-router-dom"
import userAPI, { UserAcc } from "../../../api/userAPI"
import { LoginContext } from "../../../context/LoginContext/LoginContext"
import { usePanigation } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"

const UserDashboard = () => {
  const {setUserInfo} : any = useContext(LoginContext)
  const {pageNum,pageSum,changePage,setPageSum} = usePanigation()
  const toast = useToast()
  const {isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [userList,setUserList] = useState<UserAcc[]>([])
  const [allUser,setAllUser] = useState<UserAcc[]>([])
  const [userId,setUserId] = useState()
  useEffect(() =>{
    const getUserList = async () => {
      try{
         const response = await userAPI.getPageUser(pageNum)
         setUserList(response.data)
         setPageSum(response.pageSum)
         const allResponse = await userAPI.getAllUser()
         setAllUser(allResponse)
      }
      catch(err){
        console.log('Không thể lấy danh sách người dùng',err)
      }
    }
    getUserList()
  },[pageNum, setPageSum])
  const getUserId = (userId : any) => {
    setUserId(userId)
    onOpen()
  }
  const deleteContact = async () => {
    try{
      await userAPI.delUser(userId)
      setUserList(userList.filter(item=>item._id !== userId ))
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Xóa người dùng thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
      })
      onClose()
    }
    catch(err){
      console.log('Xóa người dùng không thành công',err)
      toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Xóa người dùng không thành công",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      onClose()
    }
  }
  const [input,setInput] =useState('')
  const handleInputChange = (e : ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const headers = [
    { label: "Mã", key: "_id" },
    { label: "Tên người dùng", key: "userName" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Email", key: "userMail" },
    { label: "Mật khẩu", key: "userPassword" },
    { label: "Ngày đăng ký", key: "createdAt" },
    { label: "Ngày sửa đổi", key: "updatedAt" },
  ]
  return (
    <section>
      <div className='float-right mb-7 flex md:block md:float-none'>
        <div className='bg-[#1ba466] xl:w-[112px] text-white py-2 px-2 rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>
          <CSVLink data={allUser} headers={headers} filename={'Danh sách - người dùng'}>Xuất Excel <i className="fa-solid fa-file-excel"></i></CSVLink >
        </div>
        <div className='ml-5 xl:ml-0 xl:mt-5'>
          <InputGroup>
            <InputLeftElement pointerEvents='none' children={<SearchIcon color='#ff5e57' />}
            />
            <Input 
              type='search' 
              variant='outline' 
              placeholder='Tìm người dùng...' 
              className='cursor-pointer text-maintext' 
              htmlSize={30} width='auto'
              focusBorderColor='#ff5e57'
              onChange={handleInputChange}
              />
            </InputGroup>
        </div>
      </div>
      <section className='clear-right'>      
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-maintext">
                <thead className="text-xs text-white uppercase bg-maincolor">
                    <tr>
                        <th scope="col" className="py-3 px-6 w-[5%]">
                              STT
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Tên người dùng
                         </th>
                          <th scope="col" className="py-3 px-6">
                              SĐT
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Email
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Ngày đăng ký
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Mật khẩu
                         </th>
                         <th scope="col" className="py-3 px-6 w-[5%]">
                              Sửa
                         </th>
                         <th scope="col" className="py-3 px-6 w-[5%]">
                              Xóa
                         </th>
                    </tr>
                </thead>
                  <tbody>
                    {userList.filter(item => {
                      if(input === '') return item
                      else if (item.userName.toLowerCase().includes(input.toLowerCase())) return item
                      return null
                    }).map((item,index)=>(
                     <tr className="border-b" key={item._id}>
                        <td className="py-2 px-6 font-medium whitespace-nowrap">{index+1}</td>
                        <td className="py-2 px-6">{item.userName}</td>
                        <td className="py-2 px-6">{item.phoneNumber}</td>
                        <td className="py-2 px-6">{item.userMail}</td>
                        <td className="py-2 px-6">{convertDate(item.createdAt)}</td>
                        <td className="py-2 px-6">{item.userPassword}</td>
                        <td className="py-2 px-6">
                          <Link to='/admin/admin-nguoidung/capnhat' className="font-medium text-blue-600 hover:underline">
                            <span onClick={()=>setUserInfo(item)}>Sửa</span>
                          </Link>
                        </td>
                        <td className="py-2 px-6">
                            <span onClick={()=>getUserId(item._id)} className="font-medium text-blue-600 hover:underline cursor-pointer">Xóa</span>
                        </td>
                     </tr>
                    ))}
                  </tbody>
              </table>
          </div>
      </section>
      <div className='mt-10 flex justify-center'>    
        <nav className='text-[16px] cursor-pointer'>
        <ul className="inline-flex items-center -space-x-px">
          <li onClick={()=>changePage(pageNum-1)} className='px-1'>
            <span className="block px-3 py-2 ml-0 text-maintext hover:text-maincolor duration-200" style={pageNum === 1 ? {cursor:'not-allowed'} : {}}>
          <i className="fa-solid fa-chevron-left"></i>
            </span>
          </li>
          {[...Array(pageSum)].map((item,index)=>(
            <li onClick={()=>changePage(index+1)} key={index} className='px-1'>
              <span className="px-3 py-1 text-maintext hover:text-maincolor duration-200" 
               style={pageNum === index +1 ? {color: 'white',backgroundColor:'#ff5e57',borderRadius:'5px'} : {}}>{index+1}</span>
              </li>
            ))}
          <li onClick={()=>changePage(pageNum+1)} className='px-1'>
            <span className="block px-3 py-2 text-maintext hover:text-maincolor duration-200 " style={pageNum === pageSum  ? {cursor:'not-allowed'} : {}}>
            <i className="fa-solid fa-chevron-right"></i>
            </span>
          </li>
        </ul>
        </nav>
      </div>
      <div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='text-maintext'>
          <ModalHeader>Xóa người dùng</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            Bạn muốn xóa người dùng này?
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={deleteContact}>Xóa</Button>
              <Button colorScheme='orange' mr={3} ml={2} onClick={onClose}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </div>
    </section>
  )
}
export default UserDashboard