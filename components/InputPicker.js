import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InputPicker = ({ text, selectedValue, onValueChange, options }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{text}:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={styles.picker}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f5f5f5', 
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: '#333', 
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 40,
  },
});

export default InputPicker;
