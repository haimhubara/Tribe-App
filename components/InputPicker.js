import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GlobalStyles } from '../constants/styles';

const InputPicker = ({ label, iconName, IconPack, iconSize, error, options, onInuptChange, id, selectedValue }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onChangeText = (itemValue) => {
    setIsPickerVisible(false); // סוגר את ה-Picker אחרי בחירה
    if (onInuptChange) {
      onInuptChange(id, itemValue);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>

      {/* iOS: TouchableOpacity פותח את ה-Picker */}
      {Platform.OS === 'ios' ? (
        <>
          <TouchableOpacity onPress={() => setIsPickerVisible(true)} style={styles.inputContainer}>
            {IconPack && <IconPack style={styles.icon} name={iconName} size={iconSize || 24} />}
            <Text style={styles.inputText}>
              {options.find(option => option.value === selectedValue)?.label || `Select ${label}`}
            </Text>
          </TouchableOpacity>

          {/* Modal במרכז המסך */}
          <Modal visible={isPickerVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.pickerBox}>
                <Picker selectedValue={selectedValue} onValueChange={onChangeText} style={styles.picker}>
                  {options.map((option, index) => (
                    <Picker.Item key={index} label={option.label} value={option.value} />
                  ))}
                </Picker>
                <TouchableOpacity onPress={() => setIsPickerVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={styles.inputContainer}>
          {IconPack && <IconPack style={styles.icon} name={iconName} size={iconSize || 24} />}
          <Picker
            selectedValue={selectedValue}
            onValueChange={onChangeText}
            style={styles.picker}
          >
            <Picker.Item label="Select" value="" enabled={false} />
            {options.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
      </View>
            )}

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
    paddingVertical: Platform.OS === 'ios' ? 10 : 4,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: GlobalStyles.colors.textColor,
  },
  label: {
    marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: GlobalStyles.colors.textColor,
  },
  inputText: {
    color: GlobalStyles.colors.textColor,
    flex: 1,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    marginLeft: Platform.OS === 'ios'? 10 : 0
  },
  picker: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  pickerBox: {
    backgroundColor: 'white',
    width: '80%', 
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
