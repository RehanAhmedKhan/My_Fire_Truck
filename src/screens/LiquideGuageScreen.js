import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Alert, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import Colors from '../consts/Colors';
import WrapperSafeAreaView from '../components/WrapperSafeAreaView';
import {INJECTED_JS, html} from '../utils/gauge';
import {VehicleContext} from "../utils/vehicleContext";

const LiquidGaugeScreen = ({navigation, route}) => {
	const {name} = route?.params;
	const webview = useRef();
	const [data, setData] = useState({});
	const [mounted, setMounted] = useState(false);
	const {water, foam, vehicle, loading} = useContext(VehicleContext);

	const noDataAlert = () => {
		Alert.alert(
			"No data for selected Vehicle",
			"",
			[
				{
					text: "Go Back",
					onPress: () => {
						navigation.goBack()
					},
					style: "cancel"
				},
				{text: "Change Vehicles", onPress: () => navigation.replace('manageVehicalScreen')}
			]
		);
	}

	const setDataToGauge = (val) => {
		webview.current?.postMessage(JSON.stringify({
			id: "svg",
			value: val,
			type: route?.params?.name?.toLowerCase()
		}));
	}

	const handleData = () => {
		if(name === 'Water'){
			if(typeof water === 'object' && water?.level){
				setData(water);
				setDataToGauge(water?.level || 0)
			}else{
				noDataAlert()
			}
		}
		if(name === 'Foam'){
			if(typeof foam === 'object' && foam?.level) {
				setData(foam);
				setDataToGauge(foam?.level || 0)
			}else{
				noDataAlert()
			}
		}
	};

	const getGallons = (val) => {
		if(!val) return 0
		return (val * 0.264172).toFixed(2)
	}


	useEffect(()=>{
		if(mounted){
			handleData();
		}
	},[water, foam, mounted])

	return (
		<WrapperSafeAreaView pageTitle={`${route.params?.name} Readings`}>
			<View style={{height: 275}}>
				<WebView
					ref={webview}
					injectedJavaScript={INJECTED_JS}
					automaticallyAdjustContentInsets={false}
					scrollEnabled={false}
					domStorageEnabled={true}
					javaScriptEnabled={true}
					onMessage={event => {
						console.log('event');
					}}
					onLoadEnd={()=>{
						setMounted(true);
					}}
					useWebKit={true}
					source={{html}}
					onError={err => {}}
				/>
			</View>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: 20,
				}}>

				{/*<Text*/}
				{/*	style={styles.text}><Text style={styles.bold}>{`${data?.level || 0}%`}</Text></Text>*/}

				<Text
					style={styles.text}><Text style={styles.bold}>{`${data?.litres || 0}`}</Text> Litres</Text>

				<Text
					style={styles.text}><Text style={styles.bold}>{`${getGallons(data?.litres) || 0}`}</Text> Gallons</Text>

				{
					name === 'Water' &&
					<Text style={styles.text}>
						<Text style={styles.bold}>{data?.litres || 0}</Text> out of <Text style={styles.bold}>{vehicle?.water_tank_capacity || 0}</Text> litres available
					</Text>
				}

				{
					 name === 'Water' &&
					<Text style={styles.text}>
						<Text style={styles.bold}>{getGallons(data?.litres)}</Text> out of <Text style={styles.bold}>{getGallons(vehicle?.water_tank_capacity)}</Text> gallons available
					</Text>
				}

				{
					name === 'Foam' &&
					<Text style={styles.text}>
						<Text style={styles.bold}>{data?.litres || 0} </Text> out of <Text style={styles.bold}>{vehicle?.foam_tank_capacity || 0}</Text> litres available
					</Text>
				}

				{
					name === 'Foam' &&
					<Text style={styles.text}>
						<Text style={styles.bold}>{getGallons(data?.litres)} </Text> out of <Text style={styles.bold}>{getGallons(vehicle?.foam_tank_capacity)}</Text> gallons available
					</Text>
				}

				{
					loading && <ActivityIndicator size={'small'} color={Colors.primary}/>
				}
			</View>
		</WrapperSafeAreaView>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Poppins-Regular',
		fontSize: 16,
		color: Colors.mainText,
		marginTop: 15
	},
	bold: {
		fontFamily: 'Poppins-Bold',
		fontSize: 16,
		color: Colors.mainText,
	},
})

export default LiquidGaugeScreen;
