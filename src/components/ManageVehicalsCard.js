import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Swipeout from 'react-native-swipeout';
import Colors from '../consts/Colors';
import {
  deleteVehical,
  selectVehical,
} from '../react_redux/actions/vehicalActions';
import {useDispatch, useSelector} from 'react-redux';

const ManageVehicalsCard = props => {
  const dispatch = useDispatch();
  const selectedVehicle = useSelector(value => value.vehical.selected);

  const swipeoutBtns = [
    {
      text: 'Delete',
      type: 'delete',
      onPress: () => {
        dispatch(deleteVehical(props.vehicalID));
      },
    },
  ];
  return (
    <Swipeout
      autoClose={true}
      right={swipeoutBtns}
      buttonWidth={100}
      style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            selectVehical({id: props.vehicalID, name: props.vehicalName || ''}),
          );
        }}
        style={{
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.view} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
          <View>
            <Text style={styles.mainText}>
              {props.vehicalName || 'Untitled'}
            </Text>
            <Text style={styles.subText}>{props.vehicalID}</Text>
          </View>
          <Image
            style={styles.filter}
            source={
              selectedVehicle?.id === props.vehicalID
                ? require('../../assets/icons/check.png')
                : require('../../assets/icons/stop.png')
            }
          />
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

export default ManageVehicalsCard;

const styles = StyleSheet.create({
  card: {
    height: 70,
    borderRadius: 16,
    backgroundColor: Colors.white,
    marginVertical: 10,
    width: '100%',
  },
  view: {
    marginHorizontal: 16,
    width: 6,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.viewColor,
  },
  mainText: {
    fontSize: 16,
    color: Colors.mainText,
    fontFamily: 'Poppins-Medium',
  },
  subText: {
    fontSize: 14,
    color: Colors.subText,
    fontFamily: 'Poppins-Medium',
  },
  filter: {
    width: 22,
    height: 22,
    tintColor: Colors.primary,
    alignSelf: 'center',
    marginRight: 5,
  },
});
