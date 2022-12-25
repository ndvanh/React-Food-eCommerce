import { HomeBG, HomeCategory, HomeMore, HomePromotion } from "../../components/UserComponents/Home"

const Home = ()  => {
  return (
    <>
      <HomeBG/>
      <section className='max-w-[1200px] m-auto'>
       <HomeCategory/>
       <HomePromotion/>
       <HomeMore/>
      </section>
    </>
  )
}
export default Home