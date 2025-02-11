import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {Footer} from "@/components/FooterComponent/FooterComponent";
import {SignboardComponent} from "@/components/SignboardComponent/SignboardComponent";

const SignboardPage = () => {
  return (

      <div>
          <Header/>
          <SignboardComponent/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;