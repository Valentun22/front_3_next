import css from "./Contacts.module.css";
import img12 from "@/img/img12.png";
import img13 from "@/img/img13.jpg";
import Image from "next/image";

const ContactsComponent = () => {
  return(
    <div className={css.page}>
        <div className={`${css.pageTitle} ${css.flex}`}>
            <h1>Контакти</h1>
        </div>
        <div className={css.boxInfo}>
            <div className={`${css.boxOne} ${css.between}`}>
                <div className={`${css.imgBox} ${css.flex}`}>
                    <Image src={img13} alt="Logo" layout="intrinsic" />
                </div>
                <div className={css.contactsBox}>
                    <div  className={`${css.contactsInfo} ${css.contactsInfoName}`}>
                        <h2>Віталій Марчук</h2>
                    </div>
                    <div className={css.contactsInfo}>
                        <h3>Місто проживання:</h3>
                        <h3>Електронна адреса:</h3>
                        <h3>Номер телефону:</h3>
                        <h3>Telegram:</h3>
                        <h3>Instagram:</h3>
                        <h3>Facebook:</h3>
                    </div>
                </div>
            </div>
            <div className={`${css.boxTwo} ${css.between}`}>
                <div className={`${css.imgBox} ${css.flex}`}>
                    <Image src={img12} alt="Logo" layout="intrinsic" />
                </div>
                <div className={css.contactsBox}>
                    <div className={`${css.contactsInfo} ${css.contactsInfoName}`}>
                        <h2>OKTEN школа програмування</h2>
                    </div>
                    <div className={css.contactsInfo}>
                        <h3>Місто проживання:</h3>
                        <h3>Електронна адреса:</h3>
                        <h3>Номер телефону:</h3>
                        <h3>Telegram:</h3>
                        <h3>Instagram:</h3>
                        <h3>Facebook:</h3>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
export {ContactsComponent}