import React from "react";
import { View, Text } from "react-native";
import { AppleStyleSwipable } from "../../slidable";
import Checkbox from "expo-checkbox";
import moment from "moment";
import { Todo } from "../../../model";

export const TodoLine: React.FC<{
    item: Todo,
    deleteOnPress: () => void,
    selected: boolean
    onValueChange: any
}> = ({ item, deleteOnPress, selected, onValueChange }) => {
    return <AppleStyleSwipable onPress={deleteOnPress}>
        <View className="flex flex-row items-center justify-between mr-4" key={item.id}>
            <View className="flex flex-row items-center">
                <Checkbox
                    className="mx-4 my-4 rounded-md border-opacity-5"
                    value={selected}
                    onValueChange={onValueChange}
                    color={'black'}
                />
                <View className="flex flex-col items-start">
                    <Text className="font-bold " style={{ textDecorationLine: selected ? 'line-through' : 'none' }}>{item.title}</Text>
                    <Text>{`${item.description.length > 15 ? `${item.description.substring(0, 50)}...` : item.description}`}</Text>
                </View>
            </View>
            <Text>{moment(item.createdDate).format('D MMMM YYYY HH:MM')}</Text>
        </View>
    </AppleStyleSwipable>
}
