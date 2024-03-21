import React from "react";
import { Text } from 'react-native';

const PrimaryTitle: React.FC<{ title: string, style?: string }> = ({ title, style }) => {

    const defaultStyle = 'm-3 font-bold text-2xl';
    if (!style) {
        style = defaultStyle;
    }

    return <Text className={style}>{title}</Text>
}

export default PrimaryTitle;