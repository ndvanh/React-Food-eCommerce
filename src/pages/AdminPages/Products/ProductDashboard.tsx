import { SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useState,useEffect,useRef, useContext, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import productAPI, { ProdItem } from "../../../api/productAPI"
import { FoodContext } from "../../../context/FoodContext/FoodContext"
import { usePanigation } from "../../../hooks"
import { formatVND } from "../../../utils/formatVND"

const ProductDashboard = () => {
  const {setProdItem} : any = useContext(FoodContext)
  const {pageNum,pageSum,changePage,setPageSum} = usePanigation()
  const toast = useToast()
  const {isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [productList,setProductList] = useState<ProdItem[]>([])
  const [productId,setProductId] = useState()
  useEffect(() =>{
    const getProdItem = async () => {
      try{
         const response = await productAPI.getPageItem(pageNum)
         setProductList(response.data)
         setPageSum(response.pageSum)
      }
      catch(err){
        console.log('Không thể lấy danh sách sản phẩm',err)
      }
    }
    getProdItem()
  },[pageNum, setPageSum])
  const getProductId = (prodId : any) => {
    setProductId(prodId)
    onOpen()
  }
  const deleteProduct = async () => {
    try{
      await productAPI.delProduct(productId)
      setProductList(productList.filter(item=>item._id !== productId ))
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Xóa sản phẩm thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
      })
      onClose()
    }
    catch(err){
      console.log('Xóa sản phẩm không thành công',err)
      toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Xóa sản phẩm không thành công",
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
  return (
    <section>
      <div className='flex justify-between items-center mb-7 md:block'>
        <div>
          <Link to='/admin/admin-sanpham/them' className='bg-maincolor text-white py-2 px-2 rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Thêm sản phẩm</Link>  
        </div>
        <div className='md:mt-5'>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='#ff5e57' />}
          />
          <Input 
            type='search' 
            variant='outline' 
            placeholder='Tìm sản phẩm...' 
            className='cursor-pointer text-maintext' 
            htmlSize={30} width='auto'
            focusBorderColor='#ff5e57'
            onChange={handleInputChange}
            />
          </InputGroup>
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
                              Tên sản phẩm
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Loại sản phẩm
                         </th>
                          <th scope="col" className="py-3 px-6">
                              Ảnh sản phẩm
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Giá sản phẩm
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Số lượng
                         </th>
                         <th scope="col" className="py-3 px-6">
                              Khuyến mãi
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
                    {productList.filter(item => {
                      if(input === '') return item
                      else if (item.prodName.toLowerCase().includes(input.toLowerCase())) return item
                      return null
                    }).map((item,index)=>(
                     <tr className="border-b" key={item._id}>
                        <td className="py-2 px-6 font-medium whitespace-nowrap">{index+1}</td>
                        <td onClick={()=>setProdItem(item)} className="py-2 px-6 hover:text-maincolor hover:underline">
                          <Link to={`/admin/admin-sanpham/${item._id}`}>{item.prodName}</Link>
                        </td>
                        <td className="py-2 px-6">{item.prodType}</td>
                        <td className="py-2 px-6">
                        <img className='h-[50px] w-[50px] object-cover rounded-[10px]' src={item.prodImg} alt={item.prodType} loading='lazy'/>
                        </td>
                        <td className="py-2 px-6">{formatVND(item.prodPrice)}</td>
                        <td className="py-2 px-6">{item.quantity}</td>
                        <td className="py-2 px-6 text-center">{item.saleOff === 'khuyen-mai' ? 
                         <i title="Khuyến mãi" className="fa-solid fa-circle-check text-green-400 text-[16px] mr-5"></i> : 
                         <i title="Không khuyến mãi" className="fa-solid fa-circle-xmark text-red-400 text-[16px] mr-5"></i>}</td>
                        <td className="py-2 px-6">
                          <Link to='/admin/admin-sanpham/capnhat' className="font-medium text-blue-600 hover:underline">
                            <span onClick={()=>setProdItem(item)}>Sửa</span>
                          </Link>
                        </td>
                        <td className="py-2 px-6">
                            <span onClick={()=>getProductId(item._id)} className="font-medium text-blue-600 hover:underline cursor-pointer">Xóa</span>
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
          <ModalHeader>Xóa sản phẩm</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            Bạn muốn xóa sản phẩm này?
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={deleteProduct}>Xóa</Button>
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
export default ProductDashboard