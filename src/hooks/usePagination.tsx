import { useState } from "react"

const usePagination = () => {
    const [pageNum,setPageNum] = useState(1) // số page req ?page=
    const [pageSum,setPageSum] = useState(0) // tổng số page
    const changePage = (num : number) =>{
        if(num < 1) setPageNum(1)
        else if(num > pageSum) setPageNum(pageSum)
          else { 
            setPageNum(num)
            window.scrollTo({
              top:0, 
              behavior : 'smooth'
            })
        }
    }
    return {pageNum,pageSum,changePage,setPageSum}
}
export default usePagination