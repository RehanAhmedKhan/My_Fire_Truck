import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';
import Colors from '../consts/Colors';
import Header from './Header';
const WrapperSafeAreaView = ({
  children,
  pageTitle,
  pageIcon,
  onPress,
  fullScreen = false,
  backButton = false,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[styles.viewContainer, !fullScreen && {marginHorizontal: 20}]}>
        <Header
          fullScreen={fullScreen}
          backButton={backButton}
          title={pageTitle}
          icon={pageIcon}
          onPress={onPress}
        />
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
  },
});

export default WrapperSafeAreaView;
