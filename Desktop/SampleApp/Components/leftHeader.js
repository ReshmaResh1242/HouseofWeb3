import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'

const leftHeader = ({ navigation, header }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="chevron-left" color={COLORS.borderColor} size={30} />
            </TouchableOpacity>
            <Text style={styles.headText}>{header}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headText: {
        fontSize: 14,
        color: COLORS.borderColor,
        fontWeight: 'bold',
        paddingVertical: 10,
        paddingTop: 10,
        paddingLeft: 10
    },
});

export default leftHeader;