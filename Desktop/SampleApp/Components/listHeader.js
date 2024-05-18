import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'

const listHeader = ({ navigation, addtoFavorites, favoriteAdded }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="chevron-left" color={COLORS.borderColor} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addtoFavorites()}>
                {favoriteAdded
                    ? <MaterialCommunityIcons name="heart" color={COLORS.colorRed} size={30} />
                    :
                    <MaterialCommunityIcons name="heart-outline" color={COLORS.borderColor} size={30} />
                }
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        justifyContent: 'space-between'
    },
    heartView: {
        alignItems: 'center',
        flex: 1
    }
});

export default listHeader;