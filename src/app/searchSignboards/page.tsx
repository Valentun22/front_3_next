import React from 'react'
import {Footer} from "@/components/Footer/FooterComponent";
import {SearchSignboardsComponents} from "@/components/search-venue-component/SearchSignboardsComponents";

const SignboardPage = () => {
  return (

      <div>
          <SearchSignboardsComponents/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;