import { useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import productAPI, { ProdItem, initProdList } from "../../../api/productAPI"
import { ProductCard } from "../../../components/UserComponents/Food"
import { Select } from "@chakra-ui/react"
import { usePagination } from "../../../hooks/index"
import { Pagination } from "../../../components/Common"

const FoodType = () => {
  const [productByType,setProductByType] = useState<ProdItem[]>(initProdList)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selected, setSelected] = useState()
  const {pageNum,pageSum,changePage,setPageSum} = usePagination()
  const {food_type} = useParams()
  useEffect(() => {
    const getFoodType = async () => {
      try{
         const response = await productAPI.getPageByType(food_type,pageNum)
         setProductByType(response.data)
         setPageSum(response.pageSum)
         setIsLoaded(true)
      }
      catch(err){
        console.log('Không thể lấy danh sách sản phẩm',err)
      }
    }
    getFoodType()
  },[food_type, pageNum, setPageSum])
  const handleChange = (e: any) => {
    if(e.target.value === 'prices-up'){
      const pricesGoUp = productByType.sort((a,b)=>a.prodPrice - b.prodPrice)
      setSelected(e.target.value)
      setProductByType(pricesGoUp)
    }
    else if(e.target.value === 'prices-down') {
      const pricesGoDown = productByType.sort((a,b)=>b.prodPrice - a.prodPrice)
      setSelected(e.target.value)
      setProductByType(pricesGoDown)
    }
  }
return (
  <section className='mt-10 lg:px-5'>
    <div className='mb-8 ml-2 inline-block w-[200px]'>
      <Select placeholder='Sắp xếp theo' 
       borderColor='#ff5e57'
       focusBorderColor='#ff5e57'
       color='#576574'
       className='cursor-pointer'
       value = {selected}
       onChange = {handleChange}
       >
        <option key='prices-up' value='prices-up'>Giá tăng dần</option>
        <option key='prices-down' value='prices-down'>Giá giảm dần</option>
      </Select>
    </div>
    <div className='grid grid-cols-4 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
      <ProductCard productList={productByType} isLoaded={isLoaded}/>
    </div> 
    <Pagination pageSum={pageSum} pageNum={pageNum} changePage={changePage}/>
  </section> 
  )
}
export default FoodType