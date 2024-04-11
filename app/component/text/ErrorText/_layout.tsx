import React from "react";
import { Text } from 'react-native';

const ErrorText: React.FC<{ title: string }> = ({ title }) => {
    return <Text className="my-2 text-red-600">{title}</Text>
}

export default ErrorText;
