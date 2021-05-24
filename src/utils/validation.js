import * as yup from 'yup'; // for everything

export const loginValidation = () => {

    return yup.object({
        email: yup.string().email('Invalid email format').required('email is required').trim(),
        password: yup.string().required('Password is required').trim(),
    })

}

export const forgetpasswordValidation = () => {

    return yup.object({
        email: yup.string().email('Invalid Email address format').required('Email address is required').trim(),
    })

}

export const newpasswordValidation = () => {

    return yup.object({
        password: yup
            .string()
            .required("Please Enter your password")
            .test(
                "regex",
                "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
                val => {
                    let regExp = new RegExp(
                        "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                    );
                    // console.log(regExp.test(val), regExp, val);
                    return regExp.test(val);
                }
            )

        // password: yup.string().required('Password is required').matches(
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        // ).trim()
        ,
        confirmpassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match').trim(),
    })

}

export const OTPvalidation = () => {

    return yup.object({
        otp: yup.string()
            .required('OTP is required')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(4, 'Must be exactly 4 digits')
            .max(4, 'Must be exactly 4 digits')
    })

}
