import HighchartsReact from "highcharts-react-official"
import Highcharts from 'highcharts'
import { useEffect, useMemo, useState } from "react"
import paymentAPI, { Order } from "../../api/paymentAPI"
import productAPI, { ProdItem } from "../../api/productAPI"
import userAPI, { UserAcc } from "../../api/userAPI"
import { formatVND } from "../../utils/formatVND"

const AdminDashBoard = () => {
  const [userList,setUserList] = useState<UserAcc[]>([])
  const [orderList,setOrderList] = useState<Order[]>([])
  const [prodList,setProdList] = useState<ProdItem[]>([])
  useEffect(() =>{
    const getAllUser = async () => {
      try{
         const response = await userAPI.getAllUser()
         setUserList(response)
      }
      catch(err){
        console.log(err)
      }
    }
    getAllUser()
    const getAllOrder = async () => {
      try{
         const response = await paymentAPI.getAllOrder()
         setOrderList(response)
      }
      catch(err){
        console.log(err)
      }
    }
    getAllOrder()
    const getSaleProd = async () => {
      try{
         const response = await productAPI.getProdItem()
         setProdList(response)
      }
      catch(err){
        console.log(err)
      }
    }
    getSaleProd()
  },[])
  const calculateTotal = useMemo(() => {
    const priceSum = orderList.filter(item => item.status === true).reduce((a : number,b : any) => {
       const totalPrice = b.totalPrice
       return a + totalPrice
     },0)
     return priceSum
   },[orderList])
  const saleOffProdList = prodList.filter(item => item.saleOff === 'khuyen-mai')
  const statisticOrder = orderList.filter(item => item.status === true)
  const paidOrder = statisticOrder.map(item => {return {name:item.userName,y:item.totalPrice}})
  const statisticPmMethod = [
  { 
    name:'Thanh toán thẻ',
    y:orderList.filter(item => item.status === true && item.paymentMethods === 'the').length
  },
  { 
    name:'Thanh toán tiền mặt',
    y:orderList.filter(item => item.status === true && item.paymentMethods === 'tien-mat').length
  },
  ] 
  const orderOptions = {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Thống kê đơn hàng',
  },
  series: [{
    name: 'Tổng đơn',
    colorByPoint: true,
    data: paidOrder
  }]
}
  const pmmethodOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Phương thức TT',
    },
    series: [{
      name: '',
      data: statisticPmMethod
    }]
  }
  return (
    <section>
      <div className='grid grid-cols-4 gap-5 text-maintext lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Tổng đơn hàng
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{statisticOrder.length}</span>
        </div>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Tổng doanh thu
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{formatVND(calculateTotal)}</span>
        </div>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Tổng người dùng
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{userList.length}</span>
        </div>
        <div className='shadow-md'>
          <span className='text-maincolor text-[25px] bg-footercolor w-full block py-3 pl-3 border-b-[1px] border-solid border-maincolor'>
            Sản phẩm Sale
          </span>
          <span className='font-semibold text-[18px] block py-3 ml-3'>{saleOffProdList.length}</span>
        </div>
      </div>
      <div className='mt-10 flex justify-between 2xl:block'>
        <div>
          <HighchartsReact highcharts={Highcharts} options={orderOptions}/>
        </div>
        <div>
          <HighchartsReact highcharts={Highcharts} options={pmmethodOptions}/>
        </div>
      </div>
    </section>
  )
}
export default AdminDashBoard