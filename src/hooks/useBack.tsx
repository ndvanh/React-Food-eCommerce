import { useNavigate } from "react-router-dom"

const useBack = () => {
  const navigate = useNavigate()
  const backToPrev =() => navigate(-1) 
  return {backToPrev}
}
export default useBack