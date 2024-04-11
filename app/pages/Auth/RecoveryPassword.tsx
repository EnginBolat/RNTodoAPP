import React from "react"
import { SafeAreaView, View, Text } from "react-native"
import { ErrorText, PrimaryButton, PrimaryInput, PrimaryTitle } from "../../component"
import { Formik } from "formik"
import * as Yup from 'yup';
import { useNavigation } from "@react-navigation/native";

const RecoveryPassword = () => {
    const navigation = useNavigation<any>();

    const RecoveryPasswordScheme = Yup.object().shape({
        password: Yup.string().required('Required'),
        password2: Yup.string().required('Required'),
    });

    function handleSubmit(values: any) {
        navigation.navigate('Home');
    }

    return <SafeAreaView className="flex flex-1">
        <PrimaryTitle title="Create New Password" />
        <Text className="mb-4 text-gray-700 p-3">Make sure the passwords you enter are correct at this stage. After entering both passwords, re-enter them for verification purposes. Once you've completed these steps, your password will be successfully updated, and you'll be able to access your account. If you have any questions or need assistance, please don't hesitate to contact us.</Text>
        <Formik
            initialValues={{
                password: '',
                password2: '',
            }}
            validationSchema={RecoveryPasswordScheme}
            onSubmit={values => handleSubmit(values)}
        >
            {({ handleChange, errors, touched, handleSubmit, values }) => (
                <View className="flex flex-1 w-full p-3">
                    <PrimaryInput
                        placeHolder="Password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        keyboardType="default"
                        secureText={true}
                    />
                    <View className="py-1" />

                    {errors.password && touched.password ? <ErrorText title={errors.password} /> : null}
                    <View className={`${errors.password && touched.password ? "py-0" : "py-1"} `} />
                    <PrimaryInput
                        placeHolder="Re-Password"
                        value={values.password2}
                        onChangeText={handleChange('password2')}
                        keyboardType="default"
                        secureText={true}
                    />
                    {errors.password2 && touched.password2 ? <ErrorText title={errors.password2} /> : null}
                    <View className={`${errors.password2 && touched.password2 ? "py-0" : "py-1"} `} />
                    <PrimaryButton
                        title="Sign In"
                        onPress={handleSubmit}
                    />
                </View>
            )}
        </Formik>
    </SafeAreaView>
}

export default RecoveryPassword;