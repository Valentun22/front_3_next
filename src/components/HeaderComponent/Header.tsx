import css from './Header.module.css';
import {FC} from "react";
import Link from "next/link";
import Image from 'next/image';
import img1 from '../../img/img1.png'

const Header: FC = async () => {
    return (
        <div className={`${css.Header} ${css.flex}`}>
            <div className={css.logoBox}>
              <Link href={"#"}>
                  <Image src={img1} alt={"Logo"} layout="intrinsic"/>
              </Link>
            </div>

            <div className={`${css.infoBlock} ${css.flex}`}>
                    <button>Про нас</button>
                    <button>Головна</button>
                    <button>Пошук</button>
                    <button>Новини</button>
            </div>

            <div className={`${css.flex} ${css.boxAuth}`}>
                    <button className={css.buttonOne}>Sign in</button>
                    <button className={css.buttonTwo}>Register</button>
            </div>
        </div>
    );
};

export {Header};