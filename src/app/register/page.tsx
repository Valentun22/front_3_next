import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {Footer} from "@/components/FooterComponent/FooterComponent";
import {RegisterComponent} from "@/components/RegisterComponent/RegisterComponent";

const SignboardPage = () => {
  return (

      <div>
          <Header/>
          <RegisterComponent/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;