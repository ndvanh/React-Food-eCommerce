import { Skeleton } from "@chakra-ui/react"
import { ProdItem } from "../../../api/productAPI"
import ProductItem from "./ProductItem"
import _ from "lodash"
interface productList {
    productList: ProdItem[],
    isLoaded: boolean
}

export const ProductCard = ({productList, isLoaded} : productList ) => {
  return (
    <>
      {productList?.map((item, index)=>(
         <Skeleton isLoaded={isLoaded} fadeDuration={2} key={!_.isNil(item._id) ? item._id : index}>
            <ProductItem product={item} key={item._id} />
         </Skeleton>
      ))}
    </>
  )
}
export default ProductCard