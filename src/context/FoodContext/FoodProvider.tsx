import { useState } from 'react'
import { ContactItem } from '../../api/contactAPI'
import { MenuItem } from '../../api/menuAPI'
import { NewsItem } from '../../api/newsAPI'
import { Order } from '../../api/paymentAPI'
import { ProdItem } from '../../api/productAPI'
import { useAddToCart } from '../../hooks'
import { FoodContext } from './FoodContext'

const FoodProvider = ({children}:any)  => {
  const [menuItem,setMenuItem] = useState<MenuItem>()
  const [prodItem,setProdItem] = useState<ProdItem>()
  const [newsItem,setNewsItem] = useState<NewsItem>()
  const [contactItem,setContactItem] = useState<ContactItem>()
  const [order,setOrder] = useState<Order>()
  const {handleAddToCart,cartList,setCartList,prodQuantity,handleChangeQuantity} = useAddToCart()
  const foodValue : any = {
    menuItem,setMenuItem,
    prodItem,setProdItem,
    newsItem,setNewsItem,
    contactItem,setContactItem,
    cartList,setCartList,handleAddToCart,
    prodQuantity,handleChangeQuantity,
    order,setOrder
  }
  return (
    <FoodContext.Provider value={foodValue}>
        {children}
    </FoodContext.Provider>
  )
}
export default FoodProvider