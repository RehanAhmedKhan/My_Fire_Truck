import {StyleSheet, View} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';
const PdfViewScreen = ({route}) => {
  return (
    <WrapperSafeAreaView fullScreen={true} backButton={true}>
      <View style={styles.container}>
        <Pdf
          source={{uri: route.params.uri, cache: true}}
          style={styles.pdf}

          // onLoadComplete={(numberOfPages, filePath) => {
          //   console.log(`Number of pages: ${numberOfPages}`);
          // }}
          // onPageChanged={(page, numberOfPages) => {
          //   console.log(`Current page: ${page}`);
          // }}
          // onError={error => {
          //   console.log(error);
          // }}
          // onPressLink={uri => {
          //   console.log(`Link pressed: ${uri}`);
          // }}
        />
      </View>
    </WrapperSafeAreaView>
  );
};

export default PdfViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    width: '100%',
    height: '100%',
  },
});
