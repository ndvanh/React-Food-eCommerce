import { Select } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import productAPI, { ProdItem, initProdList } from "../../../api/productAPI"
import { ProductCard } from "../../../components/UserComponents/Food"
import { usePagination } from "../../../hooks/index"
import { Pagination } from "../../../components/Common"

const FoodMenuDefault = () => {
  const [productList, setProductList] = useState<ProdItem[]>(initProdList)
  const [isLoaded, setIsLoaded] = useState(false)
  const { pageNum, pageSum, setPageSum, changePage} = usePagination()
  useEffect(() => {
    const getMenuItem = async () => {
      try {
        const response = await productAPI.getPageItem(pageNum)
        setProductList(response.data)
        setPageSum(response.pageSum)
        setIsLoaded(true)
      } catch (err) {
        console.log("Không thể lấy danh sách sản phẩm", err)
      }
    }
    getMenuItem()
  }, [pageNum, setPageSum])
  const [selected, setSelected] = useState()
  const handleChange = (e: any) => {
    if (e.target.value === "prices-up") {
      const pricesGoUp = productList.sort((a, b) => a.prodPrice - b.prodPrice)
      setSelected(e.target.value)
      setProductList(pricesGoUp)
    } else if (e.target.value === "prices-down") {
      const pricesGoDown = productList.sort(
        (a, b) => b.prodPrice - a.prodPrice
      )
      setSelected(e.target.value)
      setProductList(pricesGoDown)
    }
  }
  return (
    <section className="mt-10 lg:px-5">
      <div className="mb-8 ml-2 inline-block w-[200px]">
        <Select
          placeholder="Sắp xếp theo"
          borderColor="#fa983a"
          focusBorderColor="#fa983a"
          color="#576574"
          className="cursor-pointer"
          value={selected}
          onChange={handleChange}
        >
          <option key="prices-up" value="prices-up">
            Giá tăng dần
          </option>
          <option key="prices-down" value="prices-down">
            Giá giảm dần
          </option>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        <ProductCard productList={productList} isLoaded={isLoaded} />
      </div>
      <Pagination pageSum={pageSum} pageNum={pageNum} changePage={changePage}/>
    </section>
  )
}
export default FoodMenuDefault
