import Head from "next/head";
import {useRouter} from "next/router"
import styles from "./nav.module.css";
import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";

import { signout, isAuthenticated } from "../auth/index";
import Clock from "react-live-clock";
import SignIn from "../login/signin";
import SignUp from "../login/signup";
import Link from "next/link";
import Modal from "react-modal";

let modal1IsOpen, setModal1IsOpen, modal2IsOpen, setModal2IsOpen;

function Navbar() {
    const router = useRouter();
    const [menuopen, setmenuopen] = useState(false);
    const [classname, setclassname] = useState("topnav");
    [modal1IsOpen, setModal1IsOpen] = useState(false);
    [modal2IsOpen, setModal2IsOpen] = useState(false);

    const handleClick = () => {
        if (menuopen) {
            setmenuopen(false);
            setclassname("topnav");
        } else {
            setmenuopen(true);
            setclassname("topnav responsive");
        }
    };
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
            </Head>
            <div className="top2">
                <div className="name logo">CodeStats</div>
                <div className={styles.clock}>
                    <Clock
                        format={"HH:mm:ss"}
                        ticking={true}
                        timezone={"Asia/Kolkata"}
                    />
                </div>
                
                <div className={classname} id="myTopnav">
                    {isAuthenticated() && (
                        <div>
                            <a
                                onClick={() => {
                                    signout(() => {
                                        setModal1IsOpen(false);
                                        router.push("/");
                                    });
                                }}
                                className={styles.login}
                            >
                                Sign Out
                            </a>
                        </div>
                    )}
                    {!isAuthenticated() && (
                        <div>
                            <a
                                onClick={() => setModal1IsOpen(true)}
                                className={styles.login}
                            >
                                Sign In
                            </a>

                            <Modal
                                id="center"
                                isOpen={modal1IsOpen}
                                onRequestClose={() => setModal1IsOpen(false)}
                                style={{
                                    overlay: { background: "rgba(0, 0, 0, 0.75)" },
                                    content: {
                                        background: "black",
                                        width: "450px",
                                        top: "70px",
                                        height: "600px",
                                        borderStyle: "none",
                                        overflow: "hidden",
                                        opacity: "1",
                                        borderRadius: "15px",
                                        padding: "0px",
                                    },
                                }}
                            >
                                <SignIn />
                            </Modal>
                            <Modal
                                id="center"
                                isOpen={modal2IsOpen}
                                onRequestClose={() => setModal2IsOpen(false)}
                                style={{
                                    overlay: { background: "rgba(0, 0, 0, 0.75)" },
                                    content: {
                                        background: "black",
                                        width: "450px",
                                        top: "70px",
                                        height: "600px",
                                        borderStyle: "none",
                                        overflow: "hidden",
                                        opacity: "1",
                                        borderRadius: "15px",
                                        padding: "0px",
                                    },
                                }}
                            >
                                <SignUp />
                            </Modal>
                            <a
                                onClick={() => setModal2IsOpen(true)}
                                className={styles.signup}
                            >
                                Sign Up
                            </a>
                            <a className="icon" onClick={(e)=>e.preventDefault()}>
                                <HamburgerMenu
                                    isOpen={menuopen}
                                    menuClicked={() => handleClick()}
                                    width={30}
                                    height={15}
                                    strokeWidth={5}
                                    rotate={0}
                                    color="#4388e2"
                                    borderRadius={0}
                                    animationDuration={0.5}
                                />
                            </a>
                        </div>
                    )}
                    <Link href="/Events/events">
                        <a>Events</a>
                    </Link>
                    <Link href="/resources/display">
                        <a>Resources</a>
                    </Link>
                    <a className={styles.dropdown}>
                        Discussion
                        <div className={styles.dropdown_content}>
                            <span>
                                <Link href="/discussion/ask_question">
                                    <div>Ask question</div>
                                </Link>
                            </span>
                            <span>
                                <Link href="/discussion/top_discussion">
                                    <div>Top discussions</div>
                                </Link>
                            </span>
                        </div>
                    </a>
                    <a className={styles.dropdown}>
                        Articles
                        <div className={styles.dropdown_content}>
                            <span>
                                <Link href="/Articles/Write_article">
                                    <div>Write article</div>
                                </Link>
                            </span>
                            <span>
                                <Link href="/Articles/Articles">
                                    <div>Article list</div>
                                </Link>
                            </span>
                        </div>
                    </a>

                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default Navbar;

export const showLogin = () => {
    setModal1IsOpen(true);
  };
  export const hideLogin = () => {
    console.log(modal1IsOpen);
    setModal2IsOpen(false);
    setModal1IsOpen(false);
  };
  
