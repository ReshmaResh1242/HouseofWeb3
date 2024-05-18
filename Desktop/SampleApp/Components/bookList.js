import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'

const bookList = ({ title, navigation, thumbnail, authors, contentVersion, item }) => {

    return (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('BookDetails', { itemDetails: item })}>
            <Image
                source={{ uri: thumbnail }}
                style={styles.bookView}
                resizeMode='contain'
            />
            <View style={styles.startView}>
                <Text style={styles.starText}>{contentVersion}</Text>
            </View>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>

            <Text style={styles.author}>{authors ? authors : 'Unknown'}</Text>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        width: '48%',
        padding: 10,
        borderColor: COLORS.borderColor2,
        borderWidth: 0.2,
        borderRadius: 10,
    },
    bookView: {
        width: '100%',
        height: 140,
        borderRadius: 10
    },
    title: {
        color: COLORS.borderColor,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    startView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
    },
    starText: {
        color: COLORS.borderColor,
        fontSize: 12,
        paddingLeft: 2,
    },
    author: {
        color: COLORS.borderColor,
        fontSize: 14,
        paddingTop: 2,
    }
});

export default bookList;