import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'
import LeftHeader from '../Components/leftHeader.js'
import BookList from '../Components/bookList.js'

const FavoriteScreen = ({ navigation }) => {

  const [bookList, setBookList] = useState([])

  useEffect(() => {
    getListFavourite()
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getListFavourite()
    });
    return unsubscribe;
  }, [navigation]);

  const getListFavourite = async () => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem("favourateData"))
      console.log('favourateData', favorites)
      if (favorites !== null) {
        setBookList(favorites)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <View style={styles.container}>
      <LeftHeader navigation={navigation} header={'Favorite Books'} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={bookList}
          renderItem={({ item }) =>
            <BookList
              title={item?.itemDetails?.volumeInfo?.title}
              thumbnail={item?.itemDetails?.volumeInfo?.imageLinks?.thumbnail}
              navigation={navigation}
              authors={item?.itemDetails?.volumeInfo?.authors}
              contentVersion={item?.itemDetails?.volumeInfo?.contentVersion}
              item={item?.itemDetails}
            />}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: 'center', fontSize: 20 }}>
                <Text style={{ color: COLORS.borderColor }}>No Data Found</Text>
              </View>
            )
          }}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
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
  headText: {
    fontSize: 14,
    color: COLORS.borderColor,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingTop: 10
  },
  columnWrapperStyle: {
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default FavoriteScreen;