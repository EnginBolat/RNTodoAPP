import React, { useState, useRef } from "react";
import { TextInput, View, Text, SafeAreaView } from "react-native";
import { PrimaryButton, PrimaryTitle } from "../../component";
import { useNavigation } from "@react-navigation/native";

const VerifyCodeOTP = () => {

    const navigation = useNavigation<any>();

    async function handleOnPress() {
        navigation.navigate("RecoveryPassword");
    }

    return (
        <SafeAreaView className="flex flex-1">
            <PrimaryTitle title="OTP" style="text-2xl text-black font-semibold px-3 pt-3" />
            <View className="flex flex-1 p-3 items-center justify-center">
                <Text className="mb-12 text-gray-700">
                    Your password reset request has been received. Please check your email (ex*****@example.com) and enter the OTP code that has been sent to you below. If you have received the OTP code, please enter it in the field below and click the 'Reset Password' button to proceed.
                </Text>
                <OTP onPress={handleOnPress} />
            </View>
        </SafeAreaView>
    );
};

export default VerifyCodeOTP;

const OTP: React.FC<{ onPress: () => Promise<void> }> = ({ onPress }) => {
    const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '']);
    const inputs = useRef<(TextInput | null)[]>([null, null, null, null, null]);

    const handleInputChange = (index: number, value: string) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        } else if (index === 4 && value) {
            inputs.current[4]?.blur();
        } else {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex flex-1 w-full">
            <View className="flex-row w-full justify-between">
                {otpValues.map((value, index) => (
                    <OTPInput
                        key={index}
                        value={value}
                        setValue={(newValue: string) => handleInputChange(index, newValue)}
                        ref={(input) => (inputs.current[index] = input)}
                    />
                ))}
            </View>
            <View className="my-2" />
            <PrimaryButton
                title="Continue"
                onPress={onPress}
                disabled={otpValues.some((value) => !value)}
            />
        </View>
    );
};

const OTPInput = React.forwardRef<TextInput, { value: string; setValue: (value: string) => void }>(
    ({ value, setValue }, ref) => {
        return (
            <TextInput
                selectionColor={'black'}
                ref={ref}
                className="border-2 border-gray-500 w-16 h-20 rounded-lg text-2xl font-bold bg-green text-center"
                value={value}
                maxLength={1}
                onChangeText={(value: string) => {
                    setValue(value);
                }}
                keyboardType="numeric"
                textContentType="postalCode"
            />
        );
    }
);
