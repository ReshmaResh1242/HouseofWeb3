import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'
import ListHeader from '../Components/listHeader.js';

const BookDetails = ({ navigation, route }) => {

    const { itemDetails } = route?.params;

    const [favoriteList, setFavoriteList] = useState([]);
    const [favoriteAdded, seFavoriteAdded] = useState(false);

    useEffect(() => {
        getListFavourite()
    }, [])

    const addtoFavorites = () => {
        if (!favoriteAdded) {
            const data = [...favoriteList];
            data.push({ itemDetails });
            AsyncStorage.setItem('favourateData', JSON.stringify(data))
            seFavoriteAdded(true)
            ToastAndroid.show('Item added to favorites', ToastAndroid.SHORT);
        } else {
            const dataSet = favoriteList.filter((item, index) => {
                if (item?.itemDetails?.id !== itemDetails?.id) {
                    return true
                }
            })
            AsyncStorage.setItem('favourateData', JSON.stringify(dataSet))
            seFavoriteAdded(false)
            ToastAndroid.show('Item removed from favorites', ToastAndroid.SHORT);
        }
    }

    const getListFavourite = async () => {
        try {
            const favorites = JSON.parse(await AsyncStorage.getItem("favourateData"))
            console.log('favourateData', favorites)
            if (favorites !== null) {
                setFavoriteList(favorites)
            }
            favorites.map((item, index) => {
                console.log(item?.itemDetails?.id, itemDetails?.id)
                if (item?.itemDetails?.id.includes(itemDetails?.id)) {
                    return seFavoriteAdded(true)
                }
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ListHeader navigation={navigation} itemDetails={itemDetails} addtoFavorites={addtoFavorites} favoriteAdded={favoriteAdded} />
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: itemDetails?.volumeInfo?.imageLinks?.thumbnail }}
                        style={styles.bookView}
                    />
                    <View style={styles.startView}>
                        <Text style={styles.starText}>{itemDetails?.volumeInfo?.contentVersion}</Text>
                    </View>
                    <Text style={styles.title}>{itemDetails?.volumeInfo?.title}</Text>
                    <Text style={styles.author}>{itemDetails?.volumeInfo?.authors ? itemDetails?.volumeInfo?.authors : 'Unknown'}</Text>
                </View>
                <View style={styles.categoryView}>
                    {itemDetails?.volumeInfo?.pageCount &&
                        <Text style={styles.categoryText}>{itemDetails?.volumeInfo?.pageCount} Pages</Text>
                    }
                    {itemDetails?.volumeInfo?.categories &&
                        <Text style={styles.categoryText}>{itemDetails?.volumeInfo?.categories}</Text>
                    }
                    {itemDetails?.volumeInfo?.printType &&
                        <Text style={styles.categoryText}>{itemDetails?.volumeInfo?.printType}</Text>
                    }
                </View>
                <Text style={styles.description}>{itemDetails?.volumeInfo?.description}</Text>
            </ScrollView>
            <View style={styles.bottomView}>
                <Text style={styles.amountText}>{itemDetails?.saleInfo?.listPrice?.currencyCode} {itemDetails?.saleInfo?.listPrice?.amount}</Text>
                <TouchableOpacity style={styles.BuyView}>
                    <Text style={styles.BuyText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryColor,
        paddingHorizontal: 16
    },
    imageContainer: {
        alignItems: 'center',
        paddingTop: 20
    },
    bookView: {
        width: 160,
        height: 250,
        borderRadius: 10,
    },
    title: {
        color: COLORS.borderColor,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
        textAlign: 'center'
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
    },
    description: {
        color: COLORS.borderColor,
        fontSize: 14,
        paddingTop: 20,
        textAlign: 'justify'
    },
    categoryView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    categoryText: {
        color: COLORS.primaryColor2,
        fontSize: 12,
        padding: 10,
        backgroundColor: COLORS?.secondaryColor,
        alignSelf: 'center',
        borderRadius: 10,
    },
    bottomView: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    BuyView: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.primaryColor2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    BuyText: {
        color: COLORS.primaryColor,
        fontSize: 18,
        fontWeight: 'bold'
    },
    amountText: {
        color: COLORS.borderColor,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default BookDetails;