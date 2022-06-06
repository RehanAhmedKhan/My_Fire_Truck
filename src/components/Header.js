import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../consts/Colors';
import BackButton from './BackButton';

const Header = ({title, icon, onPress, fullScreen, backButton}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenHeaderContainer}>
        {backButton && <BackButton />}
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
      {icon ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={!onPress}
          style={{justifyContent: 'center'}}>
          <Image style={styles.filter} source={icon} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    paddingLeft: 5,
    paddingTop: 10,
  },
  text: {
    color: Colors.primary,
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
  filter: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },
});

export default Header;
