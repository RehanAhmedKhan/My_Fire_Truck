import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../consts/Colors';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({containerStyle}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.backButton, containerStyle && containerStyle]}>
      <Image
        style={styles.imageBack}
        source={require('../../assets/icons/back-button.png')}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginVertical: 5,
  },
  imageBack: {
    width: 35,
    height: 35,
    tintColor: Colors.primary,
  },
});

export default BackButton;
