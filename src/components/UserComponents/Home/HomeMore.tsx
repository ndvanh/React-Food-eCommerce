import { Link } from 'react-router-dom'

const HomeMore = () => {
  return (
    <section className='mt-10 lg:px-5'>
      <h1 className='text-[40px] md:text-[30px] sm:text-[25px] py-5 overflow-hidden relative font-semibold text-maincolor after:h-[2px] after:w-full after:bg-text2 after:absolute after:ml-[30px] after:top-[58%]'>Khám phá thêm</h1>
      <div className='grid grid-cols-2 md:grid-cols-1 gap-2'>
       <Link to='/tin-tuc'>
       <div className='relative overflow-hidden bg-black cursor-pointer'>
        <img alt='combo' src='https://i.pinimg.com/originals/7a/36/74/7a3674a4dbe754fd1b7c15d30dec3128.png' className='opacity-60 h-[300px] md:h-[150px] w-full object-cover hover:scale-105 duration-500' />
          <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-footercolor text-[30px] font-semibold'>Tin tức</span>
        </div>
       </Link>
        <div className='relative overflow-hidden bg-black cursor-pointer'>
        <img alt='combo' src='https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/650083255/phone-picture-of-food.jpg?quality=82&strip=1' className='opacity-60 h-[300px] md:h-[150px] w-full object-cover hover:scale-105 duration-500' />
          <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-footercolor text-[30px] font-semibold'>
            <a href='https://github.com/ndvanh' target="_blank" rel="noopener noreferrer">Tải ứng dụng</a>
          </span>
        </div>
      </div>
    </section>
  )
}
export default HomeMore