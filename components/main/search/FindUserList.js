import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const FindUserList = ({navigation, data}) => {
  return (
    // <Text>test</Text>
    <FlatList
      numColumns={1}
      horizontal={false}
      data={data}
      renderItem={({ item }) =>
        <TouchableOpacity onPress={()=> navigation.navigate('Profile', {uid: item.id}) }>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      }
    />


  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 10 },
  item: { marginHorizontal: 15 }
})

export default FindUserList;
