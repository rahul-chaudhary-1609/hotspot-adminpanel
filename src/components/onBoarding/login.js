import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from 'react-redux'
import { Formik, Field, useFormik } from 'formik';
import { withRouter } from 'react-router-dom'
import { Col, Row, Button, Form, FormGroup, Label, Alert } from 'reactstrap';
import { loginValidation } from '../../utils/validation';
import '../../css/login.css'
import messages from '../../utils/messages'



const initialValues = {
    email: "",
    password: ""
}

const onSubmit = values => {
    console.log(values);

}

function Login({
    adminLogin,
    history,
    ...props
}) {


    const formik = useFormik({
        initialValues,
        validationSchema: loginValidation,
        onSubmit
    })

    console.log(formik.touched);

    return (
        <>
            <div className="h-100 admin-gradient admin-login">

                <Row className="h-100 no-gutters">
                    <Col lg="12" md="12" className="h-100 d-flex bg-white blue-bg justify-content-center align-items-center">
                        <Col lg="6" md="10" sm="12" className="mx-auto admin-app app-login-box">
                            <div className="bg-white h-screen text-base font-body">
                                <div className="w-full flex flex-wrap">
                                    <div className="w-full md:w-1/2 flex items-center justify-center">
                                        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-16 lg:px-32">
                                            <a href="/" className="flex justify-center">
                                                <img src={require('../../assets/img/logo.png')} alt="" />
                                            </a>
                                            <div className="login-module">
                                                <h1 className="font-bold text-center md:text-4xl lg:text-5xl text-teal-250">Welcome Back</h1>
                                                <p className="text-gray-200 text-center text-base">Login to your account</p>

                                                <form
                                                    className="flex flex-col pt-3 md:pt-8"
                                                    onSubmit={formik.handleSubmit}
                                                >
                                                    <div className="flex flex-col pt-4">
                                                        <label for="email" className="text-base text-gray-200">Email Address</label>
                                                        <div className=" relative w-full mt-1">
                                                            <div className=" absolute inset-y-0 left-0 flex items-center pl-3">
                                                                <svg viewBox="0 0 20 20" className="mail w-6 h-6 fill-current text-gray-200">
                                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                                </svg>
                                                            </div>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                onBlur={formik.handleBlur}
                                                                placeholder="your@email.com"
                                                                value={formik.values.email}
                                                                onChange={formik.handleChange}
                                                                className="bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-3 text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12"
                                                            />
                                                            {formik.touched.email && formik.errors.email ? <div className="email-validate">{formik.errors.email}</div> : null}

                                                            <div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col pt-4">
                                                        <label for="password" className="text-base text-gray-200">Password</label>
                                                        <div className="relative mt-1">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                                                <svg viewBox="0 0 20 20" className="lock-closed w-6 h-6 fill-current text-gray-200"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                                                            </div>
                                                            <input
                                                                type="password"
                                                                id="password"
                                                                placeholder="******"
                                                                name="password"
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.password}
                                                                onChange={formik.handleChange}
                                                                className="bg-blue-100 appearance-none border-0 rounded-full w-full py-2 px-3 text-gray-200 text-base pl-12 mt-1 leading-tight focus:outline-none focus:shadow-outline h-12"
                                                            />
                                                            {formik.touched.password && formik.errors.password ? <div className="email-validate">{formik.errors.password}</div> : null}

                                                        </div>
                                                    </div>

                                                    <input
                                                        type="submit"
                                                        value="Login"
                                                        className="bg-red-700 text-white font-semibold text-lg hover:bg-red-600 p-2 mt-8 h-12 rounded-full"
                                                        id="submit"
                                                        name="submit"
                                                    />
                                                </form>
                                                <div className="text-center pt-8 pb-12">
                                                    <a href="#" id="forgotPassword" className="underline text-gray-200" >Forgot password</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 min-h-screen bg-gray-100 justify-center items-center hidden md:flex">
                                        <img src={require("../../assets/img/work-time-amico.png")} alt="" className="" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        // adminLogin : (userCred) => dispatch(login(userCred))
    }
}


const mapStateToProps = state => {
    return {
        ...state
    }
}

// export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))
export default (withRouter(Login))

