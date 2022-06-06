import {StyleSheet, FlatList, Text, View} from 'react-native';
import React, {useRef} from 'react';
import ManageVehicalsCard from '../components/ManageVehicalsCard';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';
import {useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import RawBottomPage from '../components/RawBottomPage';
import Colors from '../consts/Colors';
import PlaceHolder from '../components/PlaceHolder';

const ManageVehicalScreen = () => {
  const vehicles = useSelector(value => value.vehical);
  const refRBSheet = useRef();

  return (
    <WrapperSafeAreaView
      pageTitle={'Manage Vehicles'}
      pageIcon={require('../../assets/icons/more.png')}
      onPress={() => refRBSheet.current.open()}>
      {vehicles?.vehicleList?.length === 0 ? (
        <PlaceHolder
          onButtonPress={() => refRBSheet.current.open()}
          text={'Ops, No Vehicle Found'}
          buttonText={'Add Vehicle'}
        />
      ) : (
        <Text style={styles.vehicleName}>
          Swipe Left to Delete.{'\n'}Press Vehicle to Select.
        </Text>
      )}

      {vehicles?.vehicleList?.length > 0 && (
        <FlatList
          style={{flex: 1}}
          keyExtractor={(item, index) => item.vehicleID}
          extraData={vehicles?.vehicleList}
          showsVerticalScrollIndicator={false}
          data={vehicles?.vehicleList}
          renderItem={({item}) => (
            <ManageVehicalsCard vehicalName={item.name} vehicalID={item.id} />
          )}
        />
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.12)',
          },
          draggableIcon: {
            backgroundColor: Colors.viewColor,
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <RawBottomPage bottomSheet={refRBSheet} />
      </RBSheet>
    </WrapperSafeAreaView>
  );
};
const styles = StyleSheet.create({
  vehicleName: {
    fontFamily: 'Poppins-Medium',
    color: Colors.mainText,
  },
});

export default ManageVehicalScreen;
