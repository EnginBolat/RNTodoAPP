import React from "react";
import { View } from "react-native";
import { ErrorText, PrimaryButton, PrimaryInput } from "../../component";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
    const EmailScheme = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    async function handleSubmit(value: any) {
        console.log(`Email: ${value.email}`);
    }

    return <View className="flex flex-1">
        <Formik
            initialValues={{ email: '' }}
            validationSchema={EmailScheme}
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
                    <PrimaryButton
                        title="Sign In"
                        onPress={handleSubmit}
                    />
                </View>
            )}
        </Formik>
    </View>
}

export default ForgotPassword;