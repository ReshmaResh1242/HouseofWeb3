import React from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --------- Component Imports ---------------
import { COLORS } from '../Constants/colors.js'

const header = ({ search, setSearch, userDetails, navigation }) => {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: userDetails?.profile?.picture }}
          style={styles.profieView}
        />
        <Text style={styles.nameView}>{userDetails?.profile?.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={styles.searchIcon}>
          <TextInput
            style={styles.input}
            onChangeText={setSearch}
            value={search}
            placeholder='Search Here...'
            placeholderTextColor={COLORS.borderColor}
          />
          <MaterialCommunityIcons name="magnify" color={COLORS.borderColor} size={23} />
        </View>
        <TouchableOpacity style={styles.heartView} onPress={() => navigation.navigate('FavoriteScreen')}>
          <MaterialCommunityIcons name="heart" color={COLORS.colorRed} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20
  },
  profieView: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  nameView: {
    fontSize: 20,
    color: COLORS.borderColor,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  searchIcon: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    borderRadius: 25,
    borderColor: COLORS.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 50,
    width: '90%',
    color: COLORS.borderColor,
    fontSize: 14
  },
  heartView: {
    alignItems: 'center',
    flex: 1
  }
});

export default header;