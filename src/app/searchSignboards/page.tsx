import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {Footer} from "@/components/FooterComponent/FooterComponent";
import {ContactsComponent} from "@/components/ContactsComponent/ContactsComponent";
import {SearchSignboardsComponents} from "@/components/SearchSignboardsComponents/SearchSignboardsComponents";

const SignboardPage = () => {
  return (

      <div>
          <Header/>
          <SearchSignboardsComponents/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;