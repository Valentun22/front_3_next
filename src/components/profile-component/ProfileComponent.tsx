import css from "./ProfileComponent.module.css";
import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";

export default async function ProfileComponent() {
    const session = await getServerSession(authConfig);
    return(
        <div className={css.page}>
            {session?.user?.image &&
                <img src={session?.user?.image} alt="img"/>}

            <h1>Profile: {session?.user?.name}</h1>
            <br/>
            <h2>Email: {session?.user?.email}</h2>
        </div>
    )
}
