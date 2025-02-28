import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GlobalStyles } from '../constants/styles';

const InputPicker = ({ label, iconName, IconPack, iconSize, error, options, onInuptChange, id, selectedValue }) => {
  
  const onChangeText = (itemValue) => {
    if (onInuptChange) {
      onInuptChange(id, itemValue);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {IconPack && <IconPack style={styles.icon} name={iconName} size={iconSize || 24} />}
        <Picker
          selectedValue={selectedValue} 
          onValueChange={onChangeText} 
          style={styles.input}
        >
          <Picker.Item label={'Select '+label} enabled={false} />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: GlobalStyles.colors.textColor,
  },
  label: {
    marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: GlobalStyles.colors.textColor,
  },
  input: {
    color: GlobalStyles.colors.textColor,
    flex: 1,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
});

export default InputPicker;
