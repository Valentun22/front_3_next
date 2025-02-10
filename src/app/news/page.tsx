import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {Footer} from "@/components/FooterComponent/FooterComponent";
import {AllNewsComponent} from "@/components/AllNewsComponent/AllNewsComponent";

const SignboardPage = () => {
  return (

      <div>
          <Header/>
          <AllNewsComponent/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;