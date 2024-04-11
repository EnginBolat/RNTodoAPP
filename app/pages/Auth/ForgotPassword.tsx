import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { ErrorText, PrimaryButton, PrimaryInput, PrimaryTitle } from "../../component";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {

    const navigation = useNavigation<any>();

    const EmailScheme = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
    });

    async function handleSubmit(value: any) {
        console.log(`Email: ${value.email}`);
        navigation.navigate('VerifyCodeOTP');
    }

    return <SafeAreaView className="flex flex-1">
        <View className="flex flex-1 m-2 mt-5">
            <PrimaryTitle title="Recovery Password" style="text-2xl text-black font-semibold" />
            <Text className="mb-5 mt-2 text-gray-500">Need to reset your password? No problem! Just enter your email below, and we'll guide you through the process</Text>
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
                        <View className={`${errors.email && touched.email ? "py-0" : "py-1"} `} />
                        <PrimaryButton
                            title="Send Recovery Mail"
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        </View>
    </SafeAreaView>
}

export default ForgotPassword;