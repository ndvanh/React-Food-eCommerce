import { SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useState,useEffect,useRef, useContext, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import paymentAPI, { Order } from "../../../api/paymentAPI"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { usePagination } from "../../../hooks"
import { convertDate } from "../../../utils/convertDate"
import { formatVND } from "../../../utils/formatVND"
import { CSVLink } from 'react-csv'
import { Pagination } from "../../../components/Common"

const OrderDashboard = () => {
  const {setOrder} : any = useContext(FoodContext)
  const {pageNum,pageSum,changePage,setPageSum} = usePagination()
  const toast = useToast()
  const {isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [orderList,setOrderList] = useState<Order[]>([])
  const [allOrder,setAllOrder] = useState<Order[]>([])
  const [orderId,setOrderId] = useState()
  useEffect(() =>{
    const getOrder = async () => {
      try{
         const response = await paymentAPI.getPageOrder(pageNum)
         setOrderList(response.data)
         setPageSum(response.pageSum)
         const allResponse = await paymentAPI.getAllOrder()
         setAllOrder(allResponse)
      }
      catch(err){
        console.log('Không thể lấy danh sách đơn hàng',err)
      }
    }
    getOrder()
  },[pageNum, setPageSum])
  const getOrderId = (orderId : any) => {
    setOrderId(orderId)
    onOpen()
  }
  const deleteOrder = async () => {
    try{
      await paymentAPI.delOrder(orderId)
      setOrderList(orderList.filter(item=>item._id !== orderId ))
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Xóa đơn hàng thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
      })
      onClose()
    }
    catch(err){
      console.log('Xóa đơn hàng không thành công',err)
      toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Xóa đơn hàng không thành công",
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
    { label: "Địa chỉ", key: "userAddress" },
    { label: "Phương thức TT", key: "paymentMethods" },
    { label: "Danh sách SP", key: "productDetails" },
    { label: "Tổng thanh toán", key: "totalPrice" },
    { label: "Trạng thái TT", key: "status" },
    { label: "Ngày mua", key: "createdAt" },
    { label: "Ngày sửa đổi", key: "updatedAt" },
  ]
  return (
    <section>
      <div className='flex justify-between items-center mb-7 md:block'>
        <span className='text-maincolor text-[16px]'>Ấn vào tên để xem chi tiết đơn hàng</span>
        <div className='md:mt-5 flex xl:block'>
          <div className='bg-[#1ba466] xl:w-[112px] text-white py-2 px-2 rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>
            <CSVLink data={allOrder} headers={headers} filename={'Đơn-hàng'}>Xuất Excel <i className="fa-solid fa-file-excel"></i></CSVLink >
          </div>
         <div className='ml-5 xl:ml-0 xl:mt-5'>
          <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='#fa983a' />}
              />
              <Input 
                type='search' 
                variant='outline' 
                placeholder='Tìm đơn hàng...' 
                className='cursor-pointer text-maintext' 
                htmlSize={30} width='auto'
                focusBorderColor='#fa983a'
                onChange={handleInputChange}
                />
            </InputGroup>
         </div>
        </div>
      </div>
      <section>      
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-maintext">
                <thead className="text-xs text-white uppercase bg-maincolor">
                    <tr>
                      <th scope="col" className="py-3 px-6 w-[5%]">
                            STT
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Tên
                        </th>
                        <th scope="col" className="py-3 px-6">
                            SĐT
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Địa chỉ
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Tổng tiền
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Trạng thái
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Ngày tạo
                        </th>
                        <th scope="col" className="py-3 px-6">
                              Chỉnh sửa lần cuối
                         </th>
                        <th scope="col" className="py-3 px-6 w-[5%]">
                            Sửa
                        </th>
                        {/* <th scope="col" className="py-3 px-6 w-[5%]">
                            Xóa
                        </th> */}
                    </tr>
                </thead>
                  <tbody>
                    {orderList.filter(item => {
                      if(input === '') return item
                      else if (item.userName.toLowerCase().includes(input.toLowerCase())) return item
                      return null
                    }).map((item,index)=>(
                     <tr className="border-b" key={item._id}>
                        <td className="py-2 px-6 font-medium whitespace-nowrap">{index+1}</td>
                        <td onClick={()=>setOrder(item)} className="py-2 px-6 hover:text-maincolor hover:underline cursor-pointer">
                          <Link to={`/admin/admin-donhang/${item._id}`}>
                            {item.userName}
                          </Link>
                        </td>
                        <td className="py-2 px-6">{item.phoneNumber}</td>
                        <td className="py-2 px-6">{item.userAddress}</td>
                        <td className="py-2 px-6">{formatVND(item.totalPrice)}</td>
                        <td className="py-2 px-6 text-center">{item.status === false ? 
                        <i title="Chưa thanh toán" className="fa-solid fa-circle-xmark text-red-400 text-[16px]"></i> : 
                        <i title="Đã thanh toán" className="fa-solid fa-circle-check text-green-400 text-[16px]"></i>}</td>
                        <td className="py-2 px-6">{convertDate(item.createdAt)}</td>
                        <td className="py-2 px-6">{convertDate(item.updatedAt)}</td>
                        <td className="py-2 px-6">
                          <Link to='/admin/admin-donhang/capnhat' className="font-medium text-blue-600 hover:underline">
                            <span onClick={()=>setOrder(item)}>Sửa</span>
                          </Link>
                        </td>
                        {/* <td className="py-2 px-6">
                            <span onClick={()=>getOrderId(item._id)} className="font-medium text-blue-600 hover:underline cursor-pointer">Xóa</span>
                        </td> */}
                     </tr>
                    ))}
                  </tbody>
              </table>
          </div>
      </section>
      <Pagination pageSum={pageSum} pageNum={pageNum} changePage={changePage}/>
      <div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='text-maintext'>
          <ModalHeader>Xóa đơn hàng</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            Bạn muốn xóa đơn hàng này?
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={deleteOrder}>Xóa</Button>
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
export default OrderDashboard