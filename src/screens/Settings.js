import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../consts/Colors';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <WrapperSafeAreaView pageTitle={'Settings'}>
      <TouchableOpacity
        onPress={() => navigation.navigate('manageVehicalScreen')}
        style={styles.card}>
        <Text style={styles.subText}>Manage Vehicles</Text>
      </TouchableOpacity>
    </WrapperSafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    color: Colors.primary,
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
  filter: {
    width: 23,
    height: 23,
    tintColor: Colors.primary,
    alignSelf: 'center',
    marginBottom: 3,
  },
  card: {
    marginTop: 10,
    height: 45,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderRadius: 12,
    // elevation: 5,
  },
  subText: {
    fontSize: 14,
    color: Colors.mainText,
    marginHorizontal: 12,
    fontFamily: 'Poppins-Regular',
  },
});
