import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../consts/Colors";

const PlaceHolder = ({text, buttonText, onButtonPress}) => {
    return (
        <View style={styles.placeHolder}>
            <Text style={styles.placeHolderText}>{text}</Text>
            {
                buttonText && <TouchableOpacity
                    onPress={onButtonPress}
                    style={styles.placeHolderButtonContainer}>
                    <Text style={styles.placeHolderButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    placeHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeHolderText: {
        fontFamily: 'Poppins-Regular',
        color: Colors.placeholder,
        textAlign: 'center',
        fontSize: 16
    },
    placeHolderButtonText: {
        fontFamily: 'Poppins-Bold',
        color: Colors.buttonText,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    placeHolderButtonContainer: {
        backgroundColor: Colors.buttonBackground,
        borderRadius: 10,
        marginTop: 10,
    }

});
export default PlaceHolder;
