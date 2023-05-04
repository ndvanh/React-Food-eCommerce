import { ProdItem } from "../../../api/productAPI"
import ProductItem from "./ProductItem"
interface productList {
    productList: ProdItem[]
}
export const ProductCard = ({productList} : productList ) => {
  return (
    <>
      {productList?.map((item)=>(
        <ProductItem product={item} key={item._id} />
      ))}
       </>   
  )
}
export default ProductCard