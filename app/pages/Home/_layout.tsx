import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, } from 'react-native';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FloatingAction } from "react-native-floating-action";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Todo } from "../../model";
import { AddTodo } from "../AddTodo";
import { AppDispatch, RootState } from "../../redux/";
import { addTodo, deleteTodo, fetchTodo, updateTodo } from "../../redux";
import { AppleStyleSwipable, CustomLoading, PrimaryTitle } from "../../component";
import Checkbox from "expo-checkbox";

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());

    // ? Bottom Sheet
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const { data, error, loading } = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => { dispatch(fetchTodo()) }, [])

    async function addTodoFunc() {
        try {
            const item: Todo = {
                title: title,
                description: description,
                createdDate: date.toString(),
                isDone: false
            };
            await dispatch(addTodo(item));
            bottomSheetModalRef.current?.close();
        } catch (error) {
            console.error('Perform operation hatası:', error);
        }
    }

    function createGreetings() {
        var hour = new Date();
        var message: string = ""
        if (hour.getHours() <= 5) { message = "Good Morning" }
        else if (hour.getHours() <= 12) { message = "Good Evening" }
        else if (hour.getHours() <= 14) { message = "Have a good day" }
        else { message = "Good Night" }

        return <View className="flex items-start justify-start">
            <PrimaryTitle style="font-bold text-xl m-3" title={message} />
        </View>
    }

    if (loading) {
        <CustomLoading />
    }

    if (error) {
        return <View className="flex flex-1 justify-center items-center">
            <Text>{error}</Text>
        </View>
    }

    function renderItem() {
        if (!data) {
            return <CustomLoading />;
        }

        if (data.length <= 0) {
            return <View className="flex flex-1 items-center justify-center">
                <PrimaryTitle title="No To Do Found" style="text-gray-500 font-semibold text-lg" />
            </View>;
        }

        const groupedData: { [key: string]: Todo[] } = {};
        const today = moment().format('YYYY-MM-DD'); // Bugünkü tarih

        data.forEach((item: Todo) => {
            const dateKey = moment(item.createdDate).format('YYYY-MM-DD');
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = [];
            }
            groupedData[dateKey].push(item);
        });
        return Object.keys(groupedData).map((date: string, index: number) => (
            <View key={index} >
                <Text className="px-3 text-lg font-bold mt-5">{date === today ? 'Today' : moment(date).format('D MMMM')}</Text>
                {groupedData[date].map((item: Todo, index: number) => (
                    <DetailsRow key={index} item={item} onPress={() => { }} />
                ))}
            </View>
        ));
    }

    return (
        <BottomSheetModalProvider>
            <SafeAreaView className="flex flex-1">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
                    {createGreetings()}
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
                            onPress={addTodoFunc}
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

const DetailsRow: React.FC<{ item: Todo, onPress: any }> = ({ item, onPress }) => {

    const dispatch = useDispatch<AppDispatch>();
    async function updateIsDone(item: Todo, isDone: boolean) {
        try {
            // ! Update TODO
            await dispatch(updateTodo({
                id: item.id,
                title: item.title,
                description: item.description,
                createdDate: item.createdDate,
                isDone: isDone
            }));
        } catch (error) {
            console.error('Perform operation hatası:', error);
        }
    }

    async function deleteData(id: number) {
        try {
            console.log('id:', id);
            await dispatch(deleteTodo(id));
        } catch (error) {
            console.error('Perform operation hatası:', error);
        }
    }


    const [selected, setSelected] = useState(item.isDone);

    useEffect(() => {
        setSelected(item.isDone);
    }, [item.isDone]);

    return (
        <AppleStyleSwipable onPress={() => { deleteData(item.id!) }}>
            <View className="flex flex-row items-center justify-between mr-4" key={item.id}>
                <View className="flex flex-row items-center">
                    <Checkbox
                        className="mx-4 my-4 rounded-md border-opacity-5"
                        value={selected}
                        onValueChange={(value: boolean) => {
                            setSelected(value);
                            updateIsDone(item, value)
                        }}
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
    );
};

