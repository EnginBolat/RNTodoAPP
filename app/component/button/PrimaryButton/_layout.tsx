import React from "react";
import { Text, TouchableOpacity } from 'react-native';


const PrimaryButton: React.FC<{
    title: string;
    onPress: any;
    style?: string;
    disabled?: boolean;
}> = ({ title, onPress, style, disabled = false }) => {

    const defaultButtonStyle = 'items-center justify-center p-4 rounded-xl w-full';
    if (!style) {
        style = defaultButtonStyle
    }

    return <TouchableOpacity onPress={onPress} className={style} disabled={disabled} style={disabled ? { backgroundColor: 'grey' } : { backgroundColor: 'black' }}>
        <Text className="text-l font-semibold text-white">{title}</Text>
    </TouchableOpacity>
}

export default PrimaryButton;
