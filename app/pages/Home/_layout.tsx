import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, } from 'react-native';
import { AppleStyleSwipable, PrimaryTitle } from "../../component";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { DataInterface } from "../../model/DataInterface";
import { data10, data11, data12 } from "../../utils/dummy";
import { AddTodo } from "../AddTodo";
import Checkbox from 'expo-checkbox';
import { FloatingAction } from "react-native-floating-action";



const render12Data = () => data12.map((item: DataInterface, index: number) => {
    return <DetailsRow item={item} />
})

const render11Data = () => data11.map((item: DataInterface, index: number) => {
    return <DetailsRow item={item} />
})

const render10Data = () => data10.map((item: DataInterface, index: number) => {
    return <DetailsRow item={item} />
})


const Home = () => {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [date, setDate] = useState(new Date());

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex flex-1">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PrimaryTitle title="Today" />
                    {render10Data()}
                    <PrimaryTitle title="11 Şubat" />
                    {render11Data()}
                    <PrimaryTitle title="12 Şubat" />
                    {render12Data()}
                    <BottomSheetModal
                        containerStyle={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
                        style={{ padding: 12, }}
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <AddTodo
                            title={title}
                            setTitle={setTitle}
                            detail={detail}
                            setDetail={setDetail}
                            date={date}
                            setDate={setDate}
                        />
                    </BottomSheetModal>
                </ScrollView>
                <FloatingAction
                    color="black"
                    onPressMain={handlePresentModalPress}
                    showBackground={false}
                    animated={false}
                />
            </SafeAreaView>
        </BottomSheetModalProvider >
    );
}

export default Home;



const DetailsRow: React.FC<{ item: DataInterface }> = ({ item }) => {
    const [selected, setSelected] = useState(item.isDone);

    useEffect(() => {
        setSelected(item.isDone);
    }, [item.isDone]);

    return (
        <AppleStyleSwipable>
            <View className="flex flex-row items-center justify-between mr-4" key={item.id}>
                <View className="flex flex-row items-center">
                    <Checkbox className="mx-4 my-4 rounded-md border-opacity-5" value={selected} onValueChange={(value) => { setSelected(value) }} color={'black'} />
                    <View className="flex flex-col items-start">
                        <Text className="font-bold " style={{ textDecorationLine: selected ? 'line-through' : 'none' }}>{item.name}</Text>
                        <Text>{item.details}</Text>
                    </View>
                </View>
                <Text>{item.createdDate}</Text>
            </View>
        </AppleStyleSwipable>
    );
};

