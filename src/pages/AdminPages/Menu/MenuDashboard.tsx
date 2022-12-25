import { SearchIcon } from "@chakra-ui/icons"
import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { useState,useEffect,useRef, useContext, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import menuAPI, { MenuItem } from "../../../api/menuAPI"
import { FoodContext } from "../../../context/FoodContext/FoodContext"

const MenuDashboard = () => {
  const {setMenuItem} : any = useContext(FoodContext)
  const toast = useToast()
  const {isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const [menu,setMenu] = useState<MenuItem[]>([])
  const [menuId,setMenuId] = useState()
  useEffect(() =>{
    const getMenuItem = async () => {
      try{
         const response = await menuAPI.getMenuItem()
         setMenu(response)
      }
      catch(err){
        console.log('Không thể lấy danh sách menu',err)
      }
    }
    getMenuItem()
  },[])
  const getMenuId = (menuId : any) => {
    setMenuId(menuId)
    onOpen()
  }
  const deleteMenu = async () => {
    try{
      await menuAPI.delMenuItem(menuId)
      setMenu(menu.filter(item=>item._id !== menuId))
      toast({
        position: 'top',
          title: 'Thành công',
          description: "Xóa thực đơn thành công",
          status: 'success',
          duration: 5000,
          isClosable: true,
      })
      onClose()
    }
    catch(err){
      console.log('Xóa menu không thành công',err)
      toast({
        position: 'top',
          title: 'Có lỗi',
          description: "Xóa thực đơn không thành công",
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
          <Link to='/admin/admin-thucdon/them' className='bg-maincolor text-white py-2 px-2 rounded-[5px] cursor-pointer hover:brightness-90 duration-200'>Thêm thực đơn</Link>  
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
            placeholder='Tìm menu...' 
            className='cursor-pointer text-maintext' 
            htmlSize={25} width='auto'
            focusBorderColor='#ff5e57'
            value = {input}
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
                            Tên thực đơn
                      </th>
                        <th scope="col" className="py-3 px-6">
                            Ảnh thực đơn
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
                    {menu.filter(item => {
                      if(input === '') return item
                      else if (item.menuType.toLowerCase().includes(input.toLowerCase())) return item
                      return null
                    }).map((item,index)=>(
                      <tr className="border-b" key={item._id}>
                        <td className="py-2 px-6 font-medium whitespace-nowrap">{index+1}</td>
                        <td className="py-2 px-6">{item.menuType}</td>
                        <td className="py-2 px-6">
                          <img className='h-[50px] w-[50px] object-cover rounded-[10px]' src={item.imgMenu} alt={item.menuType} loading='lazy'/>
                        </td>
                        <td className="py-2 px-6">
                          <Link to='/admin/admin-thucdon/capnhat' className="font-medium text-blue-600 hover:underline">
                            <span onClick={()=>setMenuItem(item)}>Sửa</span>
                          </Link>
                        </td>
                        <td className="py-2 px-6">
                          <span onClick={()=>getMenuId(item._id)} className="font-medium text-blue-600 hover:underline cursor-pointer">Xóa</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>
      </section>
      <div>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='text-maintext'>
          <ModalHeader>Xóa thực đơn</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            Bạn muốn xóa thực đơn này?
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' onClick={deleteMenu}>Xóa</Button>
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
export default MenuDashboard