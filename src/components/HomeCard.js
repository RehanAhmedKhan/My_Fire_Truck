import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../consts/Colors';

const HomeCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.card}>
      <Image style={styles.personImage} source={props.image} />
      <Text style={styles.cardMainText}>{props.cardMainText}</Text>
      <Text style={styles.cardSubText}>{props.cardSubText}</Text>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    height: 150,
    width: '47%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 20,
    // elevation: 5,
  },
  cardMainText: {
    fontSize: 16,
    color: Colors.mainText,
    fontWeight: '500',
    letterSpacing: 0.5,
    // marginVertical: 3,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    width: 100,
  },
  cardSubText: {
    fontSize: 14,
    color: Colors.subText,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },

  personImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
});
