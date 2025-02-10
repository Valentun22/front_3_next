"use client";

import css from './Header.module.css';
import { FC } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import img1 from '../../img/img1.png';
import Link from "next/link";
import {NavigationLogin} from "@/components/HeaderComponent/NavigationLogin/NavigationLogin";

const Header: FC = () => {
    const router = useRouter();

    return (
        <div className={`${css.Header} ${css.flex}`}>
            <div className={css.logoBox}>
                <Link href={"#"}>
                    <Image src={img1} alt="Logo" layout="intrinsic" />
                </Link>
            </div>

            <div className={`${css.infoBlock} ${css.flex}`}>
                <button onClick={() => router.push("/#about-section")}>Про нас</button>
                <button onClick={() => router.push("/")}>Головна</button>
                <button onClick={() => router.push("/searchSignboards")}>Пошук</button>
                <button onClick={() => router.push("/news")}>Новини</button>
            </div>

            <NavigationLogin navLinks={[]} />
        </div>

    );
};

export { Header };