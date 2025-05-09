"use client";

import css from './HomePage.module.css';
import {FC} from "react";
import Image from "next/image";
import img2 from '../../img/img2.png'
import img3 from '../../img/img3.png'
import img4 from '../../img/img4.png'
import img5 from '../../img/img5.png'
import img6 from '../../img/img6.png'
import img7 from '../../img/img7.png'
import img8 from '../../img/img8.png'
import img9 from '../../img/img9.png'
import img10 from '../../img/img10.png'
import img11 from '../../img/img11.png'
import {useRouter} from "next/navigation";

const HomePage: FC = () => {
    const router = useRouter();

    return (
    <div>
                {/*Article One*/}
        <div className={`${css.articleOne} ${css.flex}`}>
            <div className={css.boxOneArticleOne}>
                <div className={css.boxOneInfoBackground}>
                    <Image src={img4} alt={"img"}/>
                </div>
                <div className={css.boxOneInfo}>
                    <h2>Заклади на будь-який вибір</h2>
                    <Image src={img3} alt={"img"}/>
                    <h4>Швидко й легко знайти всі необхідні контакти закладів</h4>
                </div>
                <button onClick={() => router.push("/signboard")}>Пошук закладів</button>
            </div>

            <div className={css.boxTwoArticleOne}>
                <Image src={img2} alt={"img"}/>
            </div>
        </div>

                 {/*Article Two*/}
        <div id="about-section" className={`${css.articleTwo} ${css.flex}`}>
            <div className={css.boxOneArticleTwo}>
                <div className={css.boxOneArticleTwoInfo}>
                    <h2>Про нас</h2>
                    <Image src={img3} alt={"img"}/>
                    <h3>Уявіть собі систему, де вся необхідна інформація знаходиться на відстані витягнутої руки. Вам не доведеться блукати лабіринтами меню чи витрачати час на пошук потрібних контактів. Це все про наш сайт.</h3>
                    <button onClick={() => router.push("/contacts")}>Контакти</button>
                </div>
            </div>
            <div className={css.boxTwoArticleTwo}>
                <div className={css.boxTwoArticleTwoImgBox}>
                    <Image className={css.boxTwoArticleTwoImgOne} src={img5} alt={"img"}/>
                    <Image className={css.boxTwoArticleTwoImgTwo} src={img6} alt={"img"}/>
                    <div className={css.boxTwoArticleTwoImgBoxBackground}>
                        <Image className={css.boxTwoArticleTwoImgThree} src={img4} alt={"img"}/>
                        <Image className={css.boxTwoArticleTwoImgFour} src={img7} alt={"img"}/>
                    </div>
                </div>
            </div>
        </div>

                   {/*Article Three*/}
        <div className={css.articleThree}>
            <div className={`${css.boxOneArticleThree} ${css.flex}`}>
                <div className={css.boxOneArticleThreeInfo}>
                        <h2>Чому обирати саме нас</h2>
                    <div className={css.boxOneArticleThreeInfoImg}>
                        <Image src={img8} alt={"img"}/>
                    </div>
                </div>
            </div>
            <div className={`${css.boxTwoArticleThree} ${css.flex}`}>
                <div className={css.boxTwoArticleThreeImgDots}>
                    <Image className={css.boxTwoArticleThreeImgDots} src={img4} alt={"img"}/>
                </div>
                <div className={`${css.articleThreeInfoBox} ${css.flex}`}>
                    <div className={css.articleThreeInfoBoxSize}>
                        <Image src={img9} alt={"img"}/>
                        <h3>Все в одному місці</h3>
                        <h4>Контакти закладів та опис про них – все зібрано в одному місці для вашої зручності.</h4>
                    </div>
                    <div className={css.articleThreeInfoBoxSize}>
                        <Image src={img10} alt={"img"}/>
                        <h3>Економія часу</h3>
                        <h4>Знайдіть потрібну інформацію за лічені секунди та присвятіть час більш важливим справам.</h4>
                    </div>
                    <div className={css.articleThreeInfoBoxSize}>
                        <Image src={img11} alt={"img"}/>
                        <h3>Простота та ефективність</h3>
                        <h4>Сайт розроблений таким чином, щоб легко з нею розібратися. Мінімум кліків – максимум результату.</h4>
                    </div>
                </div>
                <div className={css.boxTwoArticleThreeImgDots}>
                    <Image src={img4} alt={"img4"}/>
                </div>
            </div>
        </div>

    </div>
    );
};

export {HomePage};

