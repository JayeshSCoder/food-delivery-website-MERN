import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = ({showLogin, setShowLogin}) => {

  const [category, setCategory] = useState("All");



  return (
    <div className = {showLogin===true ? "" : "block-scroll"}>
      <Header/>
      <ExploreMenu  category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
