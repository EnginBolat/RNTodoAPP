import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, RecoveryPassword, SignIn, VerifyCodeOTP } from '../pages';


function AuthStack() {
    const AuthStack = createNativeStackNavigator();

    const defaultOptions = {
        headerBackTitleVisible: false,
        headerTintColor: 'black',
        headerTitle: "",
        headerStyle: { backgroundColor: 'transparent' },
    }


    return (
        <AuthStack.Navigator initialRouteName='SignIn'>
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={defaultOptions}
            />
            <AuthStack.Screen
                name="VerifyCodeOTP"
                component={VerifyCodeOTP}
                options={defaultOptions}
            />
            <AuthStack.Screen
                name="RecoveryPassword"
                component={RecoveryPassword}
                options={defaultOptions}
            />
        </AuthStack.Navigator>
    );
}

export default AuthStack;