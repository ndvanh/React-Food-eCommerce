import { Select } from "@chakra-ui/react"
import { useState,useEffect } from "react"
import productAPI, { ProdItem, initProdList } from "../../api/productAPI"
import { ProductCard } from "../../components/UserComponents/Food"

const Promotion = () => {
  const [proFood,setProFood] = useState<ProdItem[]>(initProdList)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() =>{
    const getPromoItem = async () => {
      try{
         const response = await productAPI.getProdItem()
         setProFood(response)
         setIsLoaded(true)
      }
      catch(err){
        console.log('Ko the lay danh sach san pham khuyen mai',err)
      }
    }
    getPromoItem()
  },[])
  const [selected, setSelected] = useState()
  const handleChange = (e: any) => {
    if(e.target.value === 'prices-up'){
      const pricesGoUp = proFood.sort((a,b)=>a.prodPrice - b.prodPrice)
      setSelected(e.target.value)
      setProFood(pricesGoUp)
    }
    else if(e.target.value === 'prices-down') {
      const pricesGoDown = proFood.sort((a,b)=>b.prodPrice - a.prodPrice)
      setSelected(e.target.value)
      setProFood(pricesGoDown)
    }
  }
  const filProdPromotion = proFood.filter(item=>item.saleOff === 'khuyen-mai')
  return (
    <section className='max-w-[1200px] m-auto lg:px-5'>
      <h1 className='text-[40px] md:text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor after:h-[2px] after:w-full after:bg-text2 after:absolute after:ml-[30px] after:top-[58%]'>Khuyến mãi cực lớn</h1>
      <div className='mb-8 ml-2 inline-block w-[200px]'>
        <Select placeholder='Sắp xếp theo'
        borderColor='#fa983a'
        focusBorderColor='#fa983a'
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
        <ProductCard productList={filProdPromotion} isLoaded={isLoaded}/>
       </div>   
      </section> 
  )
}
export default Promotion