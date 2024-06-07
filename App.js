import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";

export default function App() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedDate(selectedDate);
      if (Platform.OS === "android") {
        setShowDatePicker(false); // Hide date picker
        setShowTimePicker(true); // Show time picker
      }
    }
  };


  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  const handleDateTimePicker = () => {
    setShowDatePicker(true);
  };
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
          style={styles.datePickerInput}
          onPress={handleDateTimePicker}
        >
          <View>
            <Text style={styles.text}>
              {`${selectedDate.toLocaleDateString()} ${selectedTime.toLocaleTimeString()}`}
            </Text>
          </View>
          <Fontisto name="date" size={24} style={styles.iconDate} />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={selectedDate ? selectedDate : new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={selectedTime ? selectedTime : new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
            <StatusBar style="auto" />

      <Text>DateTime: {selectedDate.getFullYear()}-{String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-{String(selectedDate.getDate()).padStart(
      2,
      "0"
    )} {String(selectedTime.getHours()).padStart(2, "0")}:{String(
      selectedTime.getMinutes()
    ).padStart(2, "0")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#727E87",
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 10,
  },
  iconDate: {
    lineHeight: 43,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderColor: "#727E87",
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#727E87",
  }

});
