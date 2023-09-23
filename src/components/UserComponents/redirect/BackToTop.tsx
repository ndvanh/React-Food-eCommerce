import { useState,useEffect } from "react"

const BackToTop = () => {
  const [isVisible,setIsVisible] = useState(false)
  useEffect(() =>{
    const toggleVisible = () => {
      const scrollTop  = document.documentElement.scrollTop
      if (scrollTop > 350){
        setIsVisible(true)
      } 
      else if (scrollTop <= 350){
        setIsVisible(false)
      }
    }
    document.addEventListener('scroll', toggleVisible)
    return () => {
     document.removeEventListener('scroll', toggleVisible)
    }
  })
  const backToTop = () => {
    window.scrollTo({
        top :0, 
        behavior: 'smooth'
    })
  }
  return (
   <>
    {isVisible && <div onClick={backToTop} className='fixed bottom-8 right-8 bg-[#e58e26] rounded-full z-20 animate-fadeBtn cursor-pointer'>
    <i className="fa-solid fa-chevron-up p-4 text-white"></i>
    </div>}
   </>
  )
}
export default BackToTop