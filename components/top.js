import React, { useState } from "react";
import Modal from "react-modal";
import Head from "next/head";
import SignIn from "./signin";
import SignUp from "./signup";
import Link from "next/link";
import Layout from "./layout";
import Clock from "react-live-clock";
import render from "react";
//import { useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "./auth/index";
import {
    Navbar,
    Nav,
    NavItem,
    MenuItem,
    NavDropdown,
} from "../node_modules/react-bootstrap";
import { useRouter } from "next/router";

let modal1IsOpen, setModal1IsOpen, modal2IsOpen, setModal2IsOpen;

function Top() {
    [modal1IsOpen, setModal1IsOpen] = useState(false);
    [modal2IsOpen, setModal2IsOpen] = useState(false);
    const router = useRouter();
    return (
        <Layout>
            <div className="top-body">
                <Nav className="justify-content-end nav" justify="true">
                    <div className="logo name">CodeStats</div>

                    <Link href="/">
                        <a className="home">
                            <div>Home</div>
                        </a>
                    </Link>
                    <Link href="/Events/events">
                        <a className="nav-event">
                            <div>Events</div>
                        </a>
                    </Link>
                    <Link href="/resources/display">
                        <a className="resources">
                            <div>Resources</div>
                        </a>
                    </Link>
                    <Link href="/discussion/discuss">
                        <a className="discussion">
                            <div>Discussion</div>
                        </a>
                    </Link>
                    <Link href="/Articles/Articles">
                        <a className="articles">
                            <div>Articles</div>
                        </a>
                    </Link>

                    {isAuthenticated() && (
                        <a className="login">
                            <div
                                onClick={() => {
                                    signout(() => {
                                        router.push("/");
                                    });
                                }}
                            >
                                Sign Out{" "}
                            </div>
                        </a>
                    )}

                    {!isAuthenticated() && (
                        <span>
                            <a
                                onClick={() => setModal1IsOpen(true)}
                                className="login"
                            >
                                <div>Sign In</div>
                            </a>

                            <Modal
                                ariaHideApp={false}
                                id="center"
                                isOpen={modal1IsOpen}
                                onRequestClose={() => setModal1IsOpen(false)}
                                style={{
                                    overlay: {
                                        background: "black",
                                        opacity: "0.5",
                                    },
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
                            ariaHideApp={false}
                                id="center"
                                isOpen={modal2IsOpen}
                                onRequestClose={() => setModal2IsOpen(false)}
                                style={{
                                    overlay: {
                                        background: "black",
                                        opacity: "0.5",
                                    },
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
                                className="signup"
                            >
                                <div>Sign Up</div>
                            </a>
                        </span>
                    )}
                    <div className="clock">
                        <NavItem>
                            <Clock
                                format={"HH:mm:ss"}
                                ticking={true}
                                timezone={"Asia/Kolkata"}
                            />
                        </NavItem>
                    </div>
                </Nav>
            </div>
        </Layout>
    );
}


export const showLogin = ()=>{
    setModal1IsOpen(true);
}
export const hideLogin = ()=>{
    console.log(modal1IsOpen);
    setModal2IsOpen(false);
    setModal1IsOpen(false);
}

export default Top;
