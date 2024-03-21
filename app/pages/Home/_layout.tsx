import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, } from 'react-native';
import { AppleStyleSwipable, PrimaryTitle, CustomLoading } from "../../component";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { DataInterface } from "../../model/DataInterface";
import { AddTodo } from "../AddTodo";
import Checkbox from 'expo-checkbox';
import { FloatingAction } from "react-native-floating-action";
import axios, { HttpStatusCode } from 'axios';
import moment from "moment";

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)

    async function fetchTodo() {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/todo/`);
            if (response.status === HttpStatusCode.Ok) {
                setData(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    async function addTodo() {
        try {
            var item: DataInterface = {
                title: title,
                description: description,
                createdDate: date.toString(),
                isDone: false
            }
            const response = await axios.post(`http://localhost:3000/api/v1/todo/`, {
                title: item.title,
                description: item.description,
                createdDate: item.createdDate,
                isDone: item.isDone
            });
            if (response.status === HttpStatusCode.Created) {
                console.log('Data Added')
                bottomSheetModalRef.current?.close();
                fetchTodo();
            }
        } catch (error) {
            console.error("Data Can't Added:", error);
        }
    }

    useEffect(() => {
        fetchTodo();
    }, [])

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    if (loading) {
        return <CustomLoading />
    }

    function renderItem() {
        const groupedData: { [key: string]: DataInterface[] } = {};
        const today = moment().format('YYYY-MM-DD'); // Bugünkü tarih

        data.forEach((item: DataInterface) => {
            const dateKey = moment(item.createdDate).format('YYYY-MM-DD');
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = [];
            }
            groupedData[dateKey].push(item);
        });

        return Object.keys(groupedData).map((date: string, index: number) => (
            <View key={index} >
                <Text className="px-3 text-lg font-bold mt-5">{date === today ? 'Today' : moment(date).format('D MMMM')}</Text>
                {groupedData[date].map((item: DataInterface, index: number) => (
                    <DetailsRow key={index} item={item} onPress={() => { }} />
                ))}
            </View>
        ));
    }



    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex flex-1">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <PrimaryTitle title="Today" />
                    {renderItem()}
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
                            description={description}
                            setDescription={setDescription}
                            date={date}
                            setDate={setDate}
                            onPress={addTodo}
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



const DetailsRow: React.FC<{ item: DataInterface, onPress: any }> = ({ item, onPress }) => {

    async function updateIsDone(item: DataInterface) {
        try {
            var response = await axios.put(`http://localhost:3000/api/v1/todo/${item.id}`, {
                id: item.id,
                title: item.title,
                description: item.description,
                createdDate: item.createdDate,
                isDone: item.isDone
            });
            if (response.status == HttpStatusCode.Ok) {
                console.log('Update Is Success')
            }
        } catch (error) {
            console.log(`Update Error: ${error}`)
        }
    }

    const [selected, setSelected] = useState(item.isDone);

    useEffect(() => {
        setSelected(item.isDone);
    }, [item.isDone]);

    return (
        <AppleStyleSwipable>
            <View className="flex flex-row items-center justify-between mr-4" key={item.id}>
                <View className="flex flex-row items-center">
                    <Checkbox
                        className="mx-4 my-4 rounded-md border-opacity-5"
                        value={selected}
                        onValueChange={(value: boolean) => {
                            item.isDone = !item.isDone;
                            setSelected(value)
                            updateIsDone(item)
                        }}
                        color={'black'}
                    />
                    <View className="flex flex-col items-start">
                        <Text className="font-bold " style={{ textDecorationLine: selected ? 'line-through' : 'none' }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                </View>
                <Text>{moment(item.createdDate).format('D MMMM YYYY HH:MM')}</Text>
            </View>
        </AppleStyleSwipable>
    );
};

