import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Button, View, Text } from "react-native";
import { PrimaryButton, PrimaryInput, PrimaryTitle } from "../../component";
import { SelectDate } from "../SelectDate";
import { useCallback, useMemo, useRef } from "react";
import moment from "moment";


const AddTodo: React.FC<{
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    description: string,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
    onPress: any;
}> = ({
    title,
    setTitle,
    description,
    setDescription,
    date,
    setDate,
    onPress,
}) => {

        const selectDatebottomSheetModalRef = useRef<BottomSheetModal>(null);
        const selectDatesnapPoints = useMemo(() => ['50%', '50%'], []);
        const selectDatehandlePresentModalPress = useCallback(() => {
            selectDatebottomSheetModalRef.current?.present();
        }, []);
        const selectDateHandleSheetChanges = useCallback((index: number) => {
            console.log('handleSheetChanges', index);
        }, []);

        return <BottomSheetView className="flex flex-1">
            <PrimaryTitle title="Add Todo" style="my-5 font-bold text-2xl" />
            <PrimaryInput
                value={title}
                setValue={setTitle}
                placeHolder='Title'
            />
            <View className="my-1" />
            <PrimaryInput
                value={description}
                setValue={setDescription}
                maxLength={120}
                placeHolder='Details'
            />

            <View className="flex flex-row justify-between items-center py-3">
                <Text className="text-base">{moment(date).format('D MMMM YYYY HH:MM')}</Text>
                <Button title="Select Date" onPress={selectDatehandlePresentModalPress} color={'black'} />
            </View>
            <View className="my-2 bottom-0">
                <PrimaryButton title="Add" onPress={onPress} />
            </View>

            <BottomSheetModal
                containerStyle={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
                style={{ padding: 12, }}
                ref={selectDatebottomSheetModalRef}
                index={1}
                snapPoints={selectDatesnapPoints}
                onChange={selectDateHandleSheetChanges}
            >
                <SelectDate
                    date={date}
                    setDate={setDate}
                    selectDatebottomSheetModalRef={selectDatebottomSheetModalRef}
                />
            </BottomSheetModal>
        </BottomSheetView>
    }

export default AddTodo;