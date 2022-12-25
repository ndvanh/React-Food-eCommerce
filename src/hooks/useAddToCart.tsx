import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import {CartItem } from "../api/productAPI"

const useAddToCart = () => {
  const [cartList,setCartList] = useState<CartItem[]>(()=>{
    // @ts-ignore
    const savedProduct = JSON.parse(localStorage.getItem('product_list'))
    return savedProduct || []
  })
  const toast = useToast()
  const handleAddToCart = (product : CartItem) => {
    setCartList((prev) => {
      if(cartList.some(item=> item._id === product._id)) {
        return [...prev]
      }
      else {
        localStorage.setItem('product_list',JSON.stringify([...prev,product]))
        return [...prev,product]
      }
    })
    if (cartList.some(item=> item._id === product._id)) {
      toast({
        position: 'top',
          title: 'Sản phẩm đã tồn tại',
          description: "Đã có trong giỏ hàng",
          status: 'warning',
          duration: 2000,
          isClosable: true,
        })
    }
    else {
      toast({
        position: 'top',
          title: 'Thêm thành công',
          description: "Sản đã thêm vào giỏ hàng",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
    }
    
  } 
  const [prodQuantity,setProdQuantity] = useState<number[]>([1])
  const handleChangeQuantity = (value:number) => setProdQuantity((prev) => [...prev, value])
 return {handleAddToCart,cartList,setCartList,prodQuantity,handleChangeQuantity}
}
export default useAddToCart