import * as Yup from 'yup';

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const registrationScehma = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(8).matches(passwordRules, 'Password must contain one letter or number'),
    confirmPassword: Yup.string().required('Password is Required').oneOf([Yup.ref('password'), null], "Passwords must match"),
});

export const loginScehma = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
})