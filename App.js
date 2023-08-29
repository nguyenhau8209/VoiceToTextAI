import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
const App = () => {
  //state lưu trữ kết quả sau khi chuyển đổi
  const [result, setResult] = useState('');
  //biến quản lý trạng thái có đang nói hay không
  const [recording, setRecording] = useState(false);

  //Xử lý sự kiện bắt đầu nói
  const speechStartHandler = e => {
    console.log('speech start event ', e);
  };

  //Xử lý sự kiện kết thúc nói
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech end event ', e);
  };
  //Xử lý kết quả nhận dạng giọng nói thành văn bản
  const speechResultHandler = e => {
    console.log('speech event ', e);
    const text = e.value[0];
    setResult(text);
  };

  console.log('result ', result);

  //Xử lý lỗi khi nhận dạng giọng nói
  const speechErrorHandler = e => {
    console.log('speech error event ', e);
  };

  //Bắt đầu ghi âm
  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start('vi-VN'); //nhan dien tieng viet
    } catch (error) {
      console.log('error ', error);
    }
  };

  //dừng ghi âm
  const stopRecording = async () => {
    setRecording(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error ', error);
    }
  };

  useEffect(() => {
    //gán các sử lý sự kiện của thư viện voice
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
