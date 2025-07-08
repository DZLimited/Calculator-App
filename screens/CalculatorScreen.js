import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import CalcButton from '../components/CalcButton'

const { width } = Dimensions.get('window')

const CalculatorScreen = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('')

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setExpression('')
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
      setExpression(`${inputValue} ${nextOperation}`)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
      setExpression(`${newValue} ${nextOperation}`)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
    setDisplay('0')
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleOperation = (op) => {
    if (op === '=') {
      if (operation && previousValue !== null) {
        const inputValue = parseFloat(display)
        const newValue = calculate(previousValue, inputValue, operation)
        setExpression(`${expression} ${inputValue} =`)
        setDisplay(String(newValue))
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
      }
    } else {
      performOperation(op)
    }
  }

  const handlePercentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handlePlusMinus = () => {
    const value = parseFloat(display)
    setDisplay(String(value * -1))
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const formatDisplay = (value) => {
    if (value.length > 9) {
      return parseFloat(value).toExponential(3)
    }
    return value
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.expressionText}>{expression}</Text>
        <Text style={styles.display}>{formatDisplay(display)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        
        <View style={styles.row}>
          <CalcButton
            title="AC"
            onPress={clear}
            type="function"
          />
          <CalcButton
            title="⌫"
            onPress={handleBackspace}
            type="function"
          />
          <CalcButton
            title="+/-"
            onPress={handlePlusMinus}
            type="function"
          />
          <CalcButton
            title="÷"
            onPress={() => handleOperation('÷')}
            type="operator"
          />
        </View>

        
        <View style={styles.row}>
          <CalcButton
            title="7"
            onPress={() => inputNumber(7)}
            type="number"
          />
          <CalcButton
            title="8"
            onPress={() => inputNumber(8)}
            type="number"
          />
          <CalcButton
            title="9"
            onPress={() => inputNumber(9)}
            type="number"
          />
          <CalcButton
            title="×"
            onPress={() => handleOperation('×')}
            type="operator"
          />
        </View>

        
        <View style={styles.row}>
          <CalcButton
            title="4"
            onPress={() => inputNumber(4)}
            type="number"
          />
          <CalcButton
            title="5"
            onPress={() => inputNumber(5)}
            type="number"
          />
          <CalcButton
            title="6"
            onPress={() => inputNumber(6)}
            type="number"
          />
          <CalcButton
            title="-"
            onPress={() => handleOperation('-')}
            type="operator"
          />
        </View>

        
        <View style={styles.row}>
          <CalcButton
            title="1"
            onPress={() => inputNumber(1)}
            type="number"
          />
          <CalcButton
            title="2"
            onPress={() => inputNumber(2)}
            type="number"
          />
          <CalcButton
            title="3"
            onPress={() => inputNumber(3)}
            type="number"
          />
          <CalcButton
            title="+"
            onPress={() => handleOperation('+')}
            type="operator"
          />
        </View>

       
        <View style={styles.row}>
          <CalcButton
            title="%"
            onPress={handlePercentage}
            type="number"
          />
          <CalcButton
            title="0"
            onPress={() => inputNumber(0)}
            type="number"
          />
          <CalcButton
            title="."
            onPress={inputDecimal}
            type="number"
          />
          <CalcButton
            title="="
            onPress={() => handleOperation('=')}
            type="equals"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  expressionText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#666666',
    textAlign: 'right',
    marginBottom: 10,
    minHeight: 30,
  },
  display: {
    fontSize: 48,
    fontWeight: '300',
    color: '#333333',
    textAlign: 'right',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
})

export default CalculatorScreen