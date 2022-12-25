import { Link } from 'react-router-dom'

const HomeBG = () => {
  return (
    <section className="h-[calc(100vh-68px)] flex items-center justify-start bg-black relative lg:px-5">
      <div className="absolute top-0 left-0 w-full h-full bg-fixed bg-[url('https://images.deliveryhero.io/image/fd-my/LH/ubls-hero.jpg')] bg-no-repeat bg-cover bg-center opacity-40" />
      <div className=' relative max-w-[1200px] w-full m-auto md:px-5'>
        <div className='text-[60px] font-bold text-maincolor'>
            <h1 className='text-[60px] uppercase md:text-[35px]'>Thức ăn ngay</h1>
            <h1 className='text-[60px] md:text-[35px] uppercase'>Cho cơn đói tức thì</h1>
            <p className='text-[20px] text-white mt-5'>Menu đa dạng và phong phú, có rất nhiều sự lựa chọn cho bạn, gia đình và bạn bè.</p>
        </div>
        <div className='mt-10 text-white'>
            <button className='bg-maincolor px-3 py-2 rounded-full capitalize'><Link to='/thuc-don'>khám phá menu</Link></button>
        </div>
        <div className='mt-10'>
          <span className=' mr-10'>
            <i className="fa-brands fa-facebook text-[20px] text-maintext bg-white p-2 rounded-full cursor-pointer hover:bg-maincolor duration-200 hover:text-white"></i>
            </span>
          <span className=' mr-10'>
            <i className="fa-brands fa-square-instagram text-[20px] text-maintext bg-white p-2 rounded-full cursor-pointer hover:bg-maincolor duration-200 hover:text-white"></i>
            </span>
          <span className=' mr-10'>
            <i className="fa-brands fa-tiktok text-[20px] text-maintext bg-white p-2 rounded-full cursor-pointer hover:bg-maincolor duration-200 hover:text-white"></i>
            </span>
        </div>
      </div>
    </section>
  )
}
export default HomeBG