import Popular from "../components/Popular";
import UserFav from "../components/UserFav";
import OnABudget from "../components/OnABudget";
import Healthy from "../components/Healthy";
import { useCookies } from 'react-cookie';

import React from 'react'

function Home() {
  const [cookies, setCookies] = useCookies(["access_token"])

  return (
    <div>
        {!cookies.access_token ? (
          <></>
        ) : (
          <UserFav />
        )
        }
        <Popular />
        <Healthy />
        <OnABudget />
    </div>
  )
}

export default Home