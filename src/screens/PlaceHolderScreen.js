import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';
import PlaceHolder from "../components/PlaceHolder";
import {useSelector} from "react-redux";
import {useFocusEffect} from '@react-navigation/native';

const PlaceHolderScreen = ({navigation}) => {
  const vehicles = useSelector(value => value.vehical);

  useFocusEffect(
      React.useCallback(() => {
          if (vehicles.selected?.id?.length > 0) {
              navigation.goBack();
          }
      }, [navigation])
  );

  return (
     <WrapperSafeAreaView pageTitle={'Ops.'}>
         <View style={styles.container}>
             <PlaceHolder
                 text={'No Vehicle Selected, Please Select Vehicle First'}
                 buttonText={'Manage Vehicles'}
                 onButtonPress={() => {
                     navigation.navigate('manageVehicalScreen')
                 }}/>
         </View>
     </WrapperSafeAreaView>

    );
};

export default PlaceHolderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pdf: {
        width: '100%',
        height: '100%',
    },
});
