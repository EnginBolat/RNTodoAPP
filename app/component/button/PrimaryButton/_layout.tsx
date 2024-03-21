import React from "react";
import { Text, TouchableOpacity } from 'react-native';


const PrimaryButton: React.FC<{
    title: string;
    onPress: any;
    style?: string;
}> = ({ title, onPress, style }) => {

    const defaultButtonStyle = 'items-center justify-center p-4 bg-black rounded-xl w-full';
    if (!style) {
        style = defaultButtonStyle
    }

    return <TouchableOpacity onPress={onPress} className={style} >
        <Text className="text-l font-semibold text-white">{title}</Text>
    </TouchableOpacity>
}

export default PrimaryButton;
