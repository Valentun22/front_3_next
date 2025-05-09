import React, {FC} from 'react'
import {VenueInfo} from "@/components/VenuesComponent/venue-info-component/VenueInfo";
import {Footer} from "@/components/Footer/FooterComponent";

interface IProps{
    name: string;
}

const SignboardPage: FC<IProps> = ({name}) => {
  return (
      <div>
          <VenueInfo name={name}/>
          <Footer/>
      </div>
  )
}
export default SignboardPage;