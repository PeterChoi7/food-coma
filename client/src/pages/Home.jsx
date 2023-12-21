import Popular from "../components/Popular";
import UserFav from "../components/UserFav";
import OnABudget from "../components/OnABudget";
import Healthy from "../components/Healthy";

import React from 'react'

function Home() {
  return (
    <div>
        <Popular />
        <Healthy />
        <OnABudget />
        <UserFav />
    </div>
  )
}

export default Home