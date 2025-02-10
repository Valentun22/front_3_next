import React from 'react'
import {Header} from "@/components/HeaderComponent/Header";
import {Footer} from "@/components/FooterComponent/FooterComponent";
import {ContactsComponent} from "@/components/ContactsComponent/ContactsComponent";

const SignboardPage = () => {
  return (
      <div>
          <Header/>
          <ContactsComponent/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;