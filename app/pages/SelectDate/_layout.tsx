import { BottomSheetView } from "@gorhom/bottom-sheet";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { PrimaryButton } from "../../component";


const SelectDate: React.FC<{ date: any, setDate: any, selectDatebottomSheetModalRef: any }> = ({ date, setDate, selectDatebottomSheetModalRef }) => {
    return <BottomSheetView className="flex flex-1">
        <RNDateTimePicker
            mode="datetime"
            value={date}
            minimumDate={new Date()}
            display='spinner'
            locale="en-EN"
            onChange={(event, value) => {
                console.log(value)
                setDate(value!);
            }}
        />
        <PrimaryButton onPress={() => { selectDatebottomSheetModalRef.current?.close() }} title="Select Date" />
    </BottomSheetView>
}

export default SelectDate;