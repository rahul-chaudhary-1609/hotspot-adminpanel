import React, {useState}from "react";
import { Formik} from 'formik';
import { withRouter } from 'react-router-dom'
import { Col, Row, Button, Form, FormGroup, Label } from 'reactstrap';
import { loginValidation } from '../../utils/validation'

function ForgotPassword({
    ...props
}) {
 
    function handleLogin(values) {
    }


    return (
        <>
            <div className="h-100 admin-gradient admin-login">
                <Row className="h-100 no-gutters">
                    <Col lg="12" md="12" className="h-100 d-flex bg-white blue-bg justify-content-center align-items-center">
                        <Col lg="6" md="10" sm="12" className="mx-auto admin-app app-login-box">
                            <div>
                                <Formik
                                    validationSchema={loginValidation}
                                    initialValues={{ username: "", password: "" }}
                                    onSubmit={(values) => handleLogin(values)}
                                >
                                    {({
                                        handleSubmit,
                                        isSubmitting
                                    }) => (<>
                                        <div className="bg-white h-screen text-base font-body">
                                            <div className="w-full flex flex-wrap">
                                                <div className="w-full md:w-1/2 flex items-center justify-center">
                                                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-16 lg:px-32">
                                                        <a href="/" className="flex justify-center">
                                                            <img src={require('../../assets/img/logo.png')} alt="" />
                                                        </a>
                                                        <div >
                                                            <h1 className="font-bold text-center md:text-4xl lg:text-5xl text-teal-250">Forgot Password</h1>
                                                            <p className="text-gray-200 text-center text-base">Enter your registered email address</p>
                                                            <form action="" className="pt-3 md:pt-8 flex flex-col" onsubmit="event.preventDefault();">
                                                                <label for="yourEmail" className="text-base text-gray-200">Email Address</label>
                                                                <div className=" relative w-full mt-1">
                                                                    <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
                                                                        <svg viewBox="0 0 20 20" className="mail w-6 h-6 fill-current text-gray-200">
                                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                                        </svg>
                                                                    </div>
                                                                    <input type="email" id="yourEmail" placeholder="your@email.com" className="bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-3 text-gray-200 text-base pl-12  leading-tight focus:outline-none focus:shadow-outline h-12" />
                                                                </div>
                                                                <input type="submit" value="Send Link" className="bg-red-700 text-white font-semibold text-lg hover:bg-red-600 p-2 mt-8 h-12 rounded-full" id="sentLink" />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 min-h-screen bg-gray-100 justify-center items-center hidden md:flex">
                                                    <img src={require("../../assets/img/work-time-amico.png")} alt="" className="" />
                                                </div></div></div>
                                    </>
                                        )
                                    }
                                </Formik>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default (withRouter(ForgotPassword))

