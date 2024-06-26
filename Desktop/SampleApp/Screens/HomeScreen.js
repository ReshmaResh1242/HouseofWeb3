import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'
import Header from '../Components/header.js'
import BookList from '../Components/bookList.js'
import { api } from '../Api';

const HomeScreen = ({ navigation }) => {

  const [search, setSearch] = useState('')
  const [bookList, setBookList] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [onLoading, setOnLoading] = useState(false)

  useEffect(() => {
    getBookListApi()
  }, [search])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("USERDETAILS"))
      console.log('userData', userData)
      setUserDetails(userData)
    } catch (error) {
      console.log(error);
    }
  };

  const getBookListApi = () => {
    setOnLoading(true)
    api.getBookList(search).then(result => {
      if (result?.status == 200) {
        console.log("BookList ----->>", result?.data?.items[3]?.volumeInfo, '---->')
        setBookList(result?.data?.items)
      }
      setOnLoading(false)
    }).catch(err => {
      console.log("BookList ----->>", err);
      setOnLoading(false)
    });
  }

  return (

    <View style={styles.container}>
      <Header search={search} setSearch={setSearch} userDetails={userDetails} navigation={navigation} />
      <Text style={styles.headText}>Trending Books</Text>
      {onLoading
        ? <View style={{ flex: 1, paddingTop: 10 }}>
          <ActivityIndicator size="large" color={COLORS.primaryColor2} />
        </View>
        : <View style={{ flex: 1 }}>
          <FlatList
            data={bookList}
            renderItem={({ item }) =>
              <BookList
                title={item?.volumeInfo?.title}
                thumbnail={item?.volumeInfo?.imageLinks?.thumbnail}
                navigation={navigation}
                authors={item?.volumeInfo?.authors}
                contentVersion={item?.volumeInfo?.contentVersion}
                item={item}
              />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapperStyle}
          />
        </View>}
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

export default HomeScreen;