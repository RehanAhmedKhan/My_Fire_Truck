import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Colors from '../consts/Colors';

const ManageVehicalHeader = () => {
  const refRBSheet = useRef();
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.text}>Manage Vehicles</Text>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={{justifyContent: 'center'}}>
          <Image
            style={styles.filter}
            source={require('../../assets/icons/more.png')}
          />
        </TouchableOpacity>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            // wrapper: {
            //   backgroundColor: 'transparent',
            // },
            draggableIcon: {
              backgroundColor: Colors.viewColor,
            },
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    paddingLeft: 6,
    marginVertical: 10,
  },
  text: {
    color: Colors.primary,
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
  },
  filter: {
    width: 26,
    height: 26,
    tintColor: Colors.primary,
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ManageVehicalHeader;
