import React from 'react'
import Banner from '../component/Banner'
import Content from '../component/Content'
import Gallery from '../component/Gallery'
import Facilities from '../component/Facilities'


const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Content></Content>
        <Facilities></Facilities>
        <Gallery></Gallery>
    </div>
  )
}

export default Home