import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
const App = () => {
  const [result, setResult] = useState('');
  const [recording, setRecording] = useState(false);

  const speechStartHandler = e => {
    console.log('speech start event ', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech end event ', e);
  };

  const speechResultHandler = e => {
    console.log('speech event ', e);
    const text = e.value[0];
    setResult(text);
  };

  console.log('result ', result);

  const speechErrorHandler = e => {
    console.log('speech error event ', e);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('vi-VN'); //nhan dien tieng viet
    } catch (error) {
      console.log('error ', error);
    }
  };

  const stopRecording = async () => {
    setRecording(false);
    try {
      await Voice.stop(); //nhan dien tieng viet
    } catch (error) {
      console.log('error ', error);
    }
  };

  useEffect(() => {
    //voice handle event
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;
    Voice.onSpeechError = speechErrorHandler;
    return () => {
      //destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Voice to text</Text>
      {result ? (
        <View>
          <Text>{result}</Text>
        </View>
      ) : (
        ''
      )}
      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start" onPress={startRecording} />
      )}
    </View>
  );
};

export default App;
