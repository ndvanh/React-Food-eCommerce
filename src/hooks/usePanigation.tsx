import { useState } from "react"

const usePanigation = () => {
    const [pageNum,setpageNum] = useState(1) // số page req ?page=
    const [pageSum,setPageSum] = useState(0) // tổng số page
    const changePage = (num : number) =>{
        if(num < 1) setpageNum(1)
        else if(num > pageSum) setpageNum(pageSum)
          else { 
            setpageNum(num)
            window.scrollTo({
              top:0, 
              behavior : 'smooth'
            })
        }
    }
    return {pageNum,pageSum,changePage,setPageSum}
}
export default usePanigation