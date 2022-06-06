import {StyleSheet, View, Image, Alert, ActivityIndicator, Dimensions} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';
import WrapperSafeAreaView from "../components/WrapperSafeAreaView";
import JSON5 from "json5";
import Colors from "../consts/Colors";
import {VehicleContext} from "../utils/vehicleContext";
import moment from "moment";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const tempDelta = {
	dx: 10,
	dy: 10
}

const liveDelta = {
	dx: 0.04,
	dy: 0.04
}
const tempCoordinates = {
	x: 30.3753,
	y: 69.3451
}
const MapViewScreen = ({navigation, route}) => {
	const vehicles = useSelector(value => value.vehical);
	const [coordinates, setCoordinates] = useState({...tempCoordinates, ...liveDelta});
	const [isData, setIsData] = useState(false);
	const [allRecords, setAllRecords] = useState([]);
	const {loading, position, vehicle} = useContext(VehicleContext)
	const map = useRef();

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

	const success = res => {
		try{
			if(!res){
				noDataAlert()
				return;
			}
			if (typeof res === 'object' && Object.values(res).length > 0) {
				const tempArray = Object.values(res).map(item => {
					return JSON5.parse(item);
				});
				tempArray.sort((a, b) => b?.time?.localeCompare(a?.time))
				setCoordinates({...tempArray[0]});
				setIsData(true);
				setAllRecords(tempArray);
				map.current?.animateToRegion({
					latitude: tempArray[0]?.x,
					longitude: tempArray[0]?.y,
					latitudeDelta: liveDelta.dx,
					longitudeDelta: liveDelta.dy,
				}, 1000)
			}
		}catch (e) {}
	};

	useEffect(()=>{
		if(!loading){
			setTimeout(() => {
				success(position);
			}, 800)
		}
	}, [position, loading])

	const renderMarker = (latitude, longitude, title, description, image) => {
		return (<Marker
			coordinate={{
				latitude,
				longitude,
			}}
			title={title}
			description={description}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>
				<Image
					style={styles.routeImage}
					source={image}
				/>
			</View>
		</Marker>)
	}

	const formatDate = (date) =>{
		if(date){
			return '| '+ moment(date).format('DD-MMM-YY HH:MM A');
		}

		return '';
	}


	return (
		<WrapperSafeAreaView fullScreen={true} backButton={true}>
			<View style={styles.container}>
				<MapView.Animated
					ref={map}
					provider={PROVIDER_GOOGLE}
					style={StyleSheet.absoluteFill}
					initialRegion={{
						latitude: tempCoordinates.x,
						longitude: tempCoordinates.y,
						latitudeDelta: tempDelta.dx,
						longitudeDelta: tempDelta.dy,
					}}>
					{
						isData && route?.params?.tracking &&
						renderMarker(
							coordinates.x,
							coordinates.y,
							`${vehicle?.description ? vehicle?.description : 'Fire Truck'} | ${coordinates?.vehicle}`,
							`Number: ${vehicle?.number || coordinates?.vehicle} | Speed: ${coordinates?.speed} ${formatDate(coordinates?.time)}`,
							require('../../assets/icons/logistic.png')
						)
					}
					{
						isData && route?.params?.routing && allRecords?.length > 0 && allRecords?.map(item => {
							return renderMarker(
								item.x,
								item.y,
								`${vehicle?.description ? vehicle?.description : 'Fire Truck'} | ${item?.vehicle}`,
								`Number: ${vehicle?.number || item?.vehicle} | Speed: ${item?.speed} ${formatDate(item?.time)}`,
								require('../../assets/icons/pin.png')
							)
						})
					}
				</MapView.Animated>

				{
					loading && <View style={styles.loaderContainer}>
						<ActivityIndicator size={'small'} color={Colors.primary}/>
					</View>
				}

			</View>
		</WrapperSafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 60,
		height: 60,
	},
	routeImage: {
		width: 40,
		height: 40,
	},
	loaderContainer: {
		position: 'absolute',
		top: height * 0.40,
		left: (width * 0.5)-15,
		backgroundColor: Colors.white,
		borderRadius: 30,
		height: 30,
		width: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MapViewScreen;
