import * as yup from 'yup'; // for everything
// const loginValidation = () => {
//     return yup.object().shape({
//         username: yup.string().required('Username is required').trim(),
//         password: yup.string().required('Password is required').trim(),
//     })
// }
// export {
//     loginValidation
// }

export const loginValidation = () => {

    return yup.object({
        email: yup.string().email('Invalid email format').required('email is required').trim(),
        password: yup.string().required('Password is required').trim(),
    })

}
