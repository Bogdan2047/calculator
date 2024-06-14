import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handlePress = (value: string): void => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearDisplay();
    } else {
      setDisplay(display + value);
    }
  };

  const calculateResult = (): void => {
    try {
      const evalResult = eval(display); // Note: eval can be unsafe in production.
      setResult(String(evalResult));
    } catch (error) {
      setResult('Error');
    }
  };

  const clearDisplay = (): void => {
    setDisplay('');
    setResult('');
  };

  const renderButton = (value: string): JSX.Element => (
    <TouchableOpacity
      key={value}
      style={styles.button}
      onPress={() => handlePress(value)}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        blurRadius={10}
        source={require('./assets/back.jpg')}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: 100,
          }}>
          <View style={{width: '90%'}}>
            <View style={styles.displayContainer}>
              <Text style={styles.displayText}>{display}</Text>
              <Text style={styles.resultText}>{result}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: 50,
            }}>
            <View style={styles.buttonContainer}>
              {['7', '8', '9', '/'].map(renderButton)}
              {['4', '5', '6', '*'].map(renderButton)}
              {['1', '2', '3', '-'].map(renderButton)}
              {['0', '.', '=', '+'].map(renderButton)}
              {['C'].map(renderButton)}
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 32,
    color: 'white',
  },
  resultText: {
    fontSize: 24,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: '22%',
    margin: '1%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default App;
