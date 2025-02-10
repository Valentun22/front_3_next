import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {Footer} from "@/components/FooterComponent/FooterComponent";
import ProfileComponent from "@/components/ProfileComponent/ProfileComponent";

const SignboardPage = () => {
  return (

      <div>
          <Header/>
          <ProfileComponent/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;