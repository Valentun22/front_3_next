"use client";

import { useEffect, useState } from "react";
import css from "./WarningComponent.module.css";
import Link from "next/link";

const WarningModal = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem("userAcceptedWarnings");
        if (hasAccepted !== "true") {
            setShowModal(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("userAcceptedWarnings", "true");
        setShowModal(false);
    };

    const handleExit = () => {
        localStorage.setItem("userAcceptedWarnings", "false"); // Записуємо false, щоб при поверненні модалка знову з'явилася
    };

    if (!showModal) return null;

    return (
        <div className={css.boxSize}>
            <div className={css.boxWarning}>
                <div className={css.boxWarningText}>
                    <h2>Увага!</h2>
                    <p>Запускаючи цей додаток, ви погоджуєтесь, що вам є 18 років.</p>
                    <p>Адміністрація застерігає вас бути обережними і не зустрічатися з незнайомими людьми в небезпечних чи
                        невідомих вам місцях.</p>
                </div>
                <div className={css.buttonBox}>
                    <div className={`${css.buttonBoxOne} ${css.buttonBoxSize}`}>
                        <button onClick={handleAccept}>
                            Погоджуюсь
                        </button>
                    </div>

                    <div className={`${css.buttonBoxTwo} ${css.buttonBoxSize}`}>
                        <Link href="https://www.google.com.ua/?hl=uk" className={css.buttonTwoLink}>
                            <button onClick={handleExit}>
                                Вихід
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WarningModal;