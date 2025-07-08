import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CalcButton = ({ title, onPress, type = 'number' }) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'function':
        return [styles.button, styles.functionButton];
      case 'operator':
        return [styles.button, styles.operatorButton];
      case 'equals':
        return [styles.button, styles.equalsButton];
      default:
        return [styles.button, styles.numberButton];
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'function':
        return [styles.buttonText, styles.functionButtonText];
      case 'operator':
        return [styles.buttonText, styles.operatorButtonText];
      case 'equals':
        return [styles.buttonText, styles.equalsButtonText];
      default:
        return [styles.buttonText, styles.numberButtonText];
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '400',
  },
  numberButton: {
    backgroundColor: '#ffffff',
  },
  numberButtonText: {
    color: '#333333',
  },
  functionButton: {
    backgroundColor: '#e8e9ea',
  },
  functionButtonText: {
    color: '#4285f4',
    fontSize: 20,
  },
  operatorButton: {
    backgroundColor: '#e8e9ea',
  },
  operatorButtonText: {
    color: '#4285f4',
    fontSize: 28,
  },
  equalsButton: {
    backgroundColor: '#4285f4',
  },
  equalsButtonText: {
    color: '#ffffff',
    fontSize: 28,
  },
});

export default CalcButton;