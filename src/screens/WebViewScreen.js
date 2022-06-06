import React from 'react';
import {WebView} from 'react-native-webview';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';

const WebViewScreen = ({route}) => {
  return (
    <WrapperSafeAreaView fullScreen={true}>
      <WebView style={{flex: 1}} source={{uri: route.params.uri}} />
    </WrapperSafeAreaView>
  );
};

export default WebViewScreen;
