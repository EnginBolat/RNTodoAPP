import React from "react";
import { KeyboardTypeOptions, TextInput } from 'react-native';


const PrimaryInput: React.FC<{
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeHolder: string;
    style?: string;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number
}> = ({ value, setValue, placeHolder, style, keyboardType = 'default', maxLength = 120 }) => {

    const defaultButtonStyle = 'items-center justify-center p-4 bg-white rounded-xl w-full border-black border text-neutral-500';
    if (!style) {
        style = defaultButtonStyle
    }

    return <TextInput
        className={style}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        value={value}
        maxLength={maxLength}
        onChangeText={(text: string) => {
            setValue(text);
        }}
    />
}

export default PrimaryInput;
