import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Colors from '../consts/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {addVehical} from '../react_redux/actions/vehicalActions';

const RawBottomPage = ({bottomSheet}) => {
  const dispatch = useDispatch();
  const [vehicalName, setVehicleName] = useState('');
  const [vehicleID, setVehicleID] = useState('');
    const vehicleList = useSelector(value => value.vehical.vehicleList);

    const buttonPress = () => {
        if (vehicleID?.length === 0) {
            alert('Vehicle ID id required');
            return;
        }

        const find = vehicleList.find(item => item.id === vehicleID);

        if (find?.id) {
            alert('Vehicle already exists');
            return;
        } else {
            dispatch(
                addVehical({
                    name: vehicalName,
                    id: vehicleID,
                }),
            );
            setVehicleName('');
            setVehicleID('');
            Keyboard.dismiss();
            alert('Vehicle added successfully');
            bottomSheet?.current.close()
        }

    };
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput]}
        placeholder="Vehicle Name"
        placeholderTextColor={Colors.subText}
        value={vehicalName}
        onChangeText={setVehicleName}
      />

      <TextInput
        style={[styles.textInput]}
        placeholder="Vehicle ID"
        placeholderTextColor={Colors.subText}
        value={vehicleID}
        onChangeText={setVehicleID}
      />

      <TouchableOpacity onPress={buttonPress} style={styles.loginBtn}>
        <Text
          style={styles.buttonText}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 10,
  },

  textInput: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    width: '70%',
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.mainText,
    color: Colors.mainText,
    justifyContent: 'center',
  },

  loginBtn: {
    width: '45%',
    borderRadius: 15,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: Colors.buttonBackground
  },
    buttonText: {
        fontSize: 16,
        color: Colors.buttonText,
        letterSpacing: 1,
        fontFamily: 'Poppins-Medium',
    }
});

export default RawBottomPage;
