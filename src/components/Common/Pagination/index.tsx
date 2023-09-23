interface props {
  pageSum: number,
  pageNum: number,
  changePage: Function
}
const Pagination = ({ pageSum, pageNum, changePage } : props) => {
  return (
    <div className='mt-10 flex justify-center'>
      <nav className='text-[16px] cursor-pointer'>
        <ul className="inline-flex items-center -space-x-px">
          <li onClick={()=>changePage(pageNum - 1)} className='px-1'>
            <span className="block px-3 py-2 ml-0 text-maintext hover:text-maincolor duration-200" style={pageNum === 1 ? {cursor:'not-allowed'} : {}}>
            <i className="fa-solid fa-chevron-left"></i>
            </span>
          </li>
          {[...Array(pageSum)].map((item,index)=> (
            <li onClick={()=>changePage(index + 1)} key={index} className='px-1'>
            <span className="px-3 py-1 text-maintext hover:text-maincolor duration-200" 
            style={pageNum === index +1 ? {color: 'white',backgroundColor:'#fa983a',borderRadius:'5px'} : {}}>{index+1}</span>
          </li>
          ))}
          <li onClick={()=>changePage(pageNum + 1)} className='px-1'>
            <span className="block px-3 py-2 text-maintext hover:text-maincolor duration-200 " style={pageNum === pageSum  ? {cursor:'not-allowed'} : {}}>
            <i className="fa-solid fa-chevron-right"></i>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination