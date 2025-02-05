import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {VenueInfo} from "@/components/VenueInfoComponent/VenueInfo";
import {Footer} from "@/components/FooterComponent/FooterComponent";

const SignboardPage = () => {
  return (
      <div>
          <Header/>
          <VenueInfo/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;