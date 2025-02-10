"use client"

import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import css from './NavigationLogin.module.css';

type NavLink = {
    label: string;
    href: string;
}
type Props = {
    navLinks: NavLink[];
};

const NavigationLogin = ({ navLinks }: Props) => {
    const pathname = usePathname();
    const session = useSession();
    const router = useRouter();

    return (
        <>
            {navLinks.map((link) =>{
                const isActive = pathname === link.href;

                return(
                    <Link
                        key={link.label}
                        href={link.href}
                        className={isActive ? "active" : ""}
                    ></Link>
                )
            })}
            {session?.data && (
                    <div className={css.boxAuthLogo}>
                        <button className={`${css.buttonOne} ${css.buttonOneProf}`} onClick={() => router.push("/profile")}>Профіль
                        </button>
                    </div>
                    )}

                    {session?.data ?
                        <div className={`${css.flex} ${css.boxAuthLogo} ${css.boxAuthLogoOut}`}>
                            <button className={`${css.buttonTwo} ${css.buttonTwoProf}`} onClick={() => signOut({callbackUrl: '/'})}>
                                Sign Out
                            </button>
                        </div> :

                        <div className={`${css.flex} ${css.boxAuth}`}>
                            <button className={css.buttonOne} onClick={() => router.push("/api/auth/signin")}>Sign in
                            </button>
                            <button className={css.buttonTwo} onClick={() => router.push("/register")}>Register
                            </button>
                        </div>
                    }
                </>
            );
};
export {NavigationLogin};