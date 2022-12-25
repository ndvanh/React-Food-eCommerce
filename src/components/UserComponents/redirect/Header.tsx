import { useEffect, useState } from 'react'
import PCNav from './PCNav'
import TabLetMobileNav from './TabLetMobileNav'

const Header = () => {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () =>{
      setBrowserWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])
  return (
    <>
    {browserWidth >= 859 ? <PCNav/> : <TabLetMobileNav/>}
    </>
  )
}
export default Header