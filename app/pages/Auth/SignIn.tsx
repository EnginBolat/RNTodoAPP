import React from "react"
import { Formik } from 'formik';
import * as Yup from 'yup';

import { ErrorText, PrimaryButton, PrimaryInput, PrimaryTitle } from "../../component";
import { View, Text, TouchableOpacity } from "react-native"

interface SignInModel {
    email: string;
    password: string;
}

const SignIn = () => {
    const SignInScheme = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    async function handleSubmit(value: SignInModel) {
        console.log(`Email: ${value.email}\nPassword: ${value.password}`);
    }

    return <View className="flex flex-1 justify-center items-center p-3">
        <PrimaryTitle title="Welcome!" style="m-3 mb-5 font-bold text-2xl w-full" />
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={SignInScheme}
            onSubmit={values => handleSubmit(values)}
        >
            {({ handleChange, errors, touched, handleSubmit, values }) => (
                <View className="w-full">
                    <PrimaryInput
                        value={values.email}
                        placeHolder="Email"
                        onChangeText={handleChange('email')}
                        keyboardType="email-address"
                    />
                    {errors.email && touched.email ? <ErrorText title={errors.email} /> : null}
                    <View className={`${errors.email && touched.email ? "py-0" : "py-1"} `} />
                    <PrimaryInput
                        value={values.password}
                        placeHolder="Password"
                        onChangeText={handleChange('password')}
                        keyboardType="default"
                        secureText={true}
                    />
                    {errors.password && touched.password ? <ErrorText title={errors.password} /> : null}
                    <View className={`${errors.password && touched.password ? "py-0" : "py-1"} `} />
                    <PrimaryButton
                        title="Sign In"
                        onPress={handleSubmit}
                    />
                </View>
            )}
        </Formik>
        <TouchableOpacity onPress={() => { console.log('Clicked'); }} className="pt-5">
            <Text className="text-black underline">Forgot Password?</Text>
        </TouchableOpacity>
    </View>
}

export default SignIn;