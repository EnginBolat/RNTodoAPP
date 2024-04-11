import React from "react";
import { KeyboardTypeOptions, TextInput } from 'react-native';


const PrimaryInput: React.FC<{
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    onChangeText?: any;
    placeHolder: string;
    style?: string;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number
    cursorColor?: string,
    secureText?: boolean;
}> = ({ value, setValue, placeHolder, onChangeText, style, secureText = false, cursorColor = "black", keyboardType = 'default', maxLength = 120 }) => {

    const defaultButtonStyle = 'items-center justify-center p-4 bg-white rounded-xl w-full border-black border text-neutral-500';
    if (!style) {
        style = defaultButtonStyle
    }

    return <TextInput
        cursorColor={cursorColor}
        selectionColor={cursorColor}
        className={style}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        value={value}
        maxLength={maxLength}
        secureTextEntry={secureText}
        onChangeText={(text: string) => {
            !setValue ? onChangeText(text) : setValue(text);
        }}
    />
}

export default PrimaryInput;
