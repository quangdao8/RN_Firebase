import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import database, {firebase} from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [inputTextValue, setInputTextValue] = useState(null);
  const [list, setList] = useState(null);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      // const data = await database().ref('todo').once('value');
      const data = await firebase
        .app()
        .database(
          'https://rn-auth-7c5ee-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref('todo')
        .on('value', tempData => {
          console.log('aaa', tempData.val());
          setList(tempData.val());
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddData = async () => {
    try {
      const index = list?.length || 0;
      const response = await firebase
        .app()
        .database(
          'https://rn-auth-7c5ee-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(`todo/${index}`)
        .set({
          value: inputTextValue,
        });

      console.log(response);

      setInputTextValue('');
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateData = async () => {
    try {
      if (inputTextValue.length > 0) {
        const response = await firebase
          .app()
          .database(
            'https://rn-auth-7c5ee-default-rtdb.asia-southeast1.firebasedatabase.app/',
          )
          .ref(`todo/${selectedCardIndex}`)
          .update({
            value: inputTextValue,
          });

        console.log(response);
        setInputTextValue('');
        setIsUpdateData(false);
      } else {
        alert('Please Enter Value & Then Try Again');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardPress = (cardIndex, cardValue) => {
    try {
      setIsUpdateData(true);
      setSelectedCardIndex(cardIndex);
      setInputTextValue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCardLongPress = (cardIndex, cardValue) => {
    try {
      Alert.alert('Alert', `Are You Sure To Delete ${cardValue} ?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Is Press');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            try {
              const response = await firebase
                .app()
                .database(
                  'https://rn-auth-7c5ee-default-rtdb.asia-southeast1.firebasedatabase.app/',
                )
                .ref(`todo/${cardIndex}`)
                .remove();

              setInputTextValue('');
              setIsUpdateData(false);
              console.log(response);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);

      // setIsUpdateData(true);
      // setSelectedCardIndex(cardIndex);
      // setInputTextValue(cardValue);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Todo App
        </Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Any Value"
          value={inputTextValue}
          onChangeText={value => setInputTextValue(value)}
        />
        {!isUpdateData ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddData()}>
            <Text style={{color: '#fff'}}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleUpdateData()}>
            <Text style={{color: '#fff'}}>Update</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{
          marginVertical: 20,
          width: '80%',
          backgroundColor: 'red',
          alignItems: 'center',
          padding: 10,
          borderRadius: 20,
        }}
        onPress={async () => {
          await Auth().signOut();
          navigation.dispatch(StackActions.popToTop());
          // navigation.navigate('Login');
        }}>
        <Text style={{color: '#fff'}}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <Text style={{marginVertical: 20, fontSize: 20, fontWeight: 'bold'}}>
          Todo List
        </Text>
        <FlatList
          data={list}
          renderItem={item => {
            const cardIndex = item.index;
            if (item.item !== null) {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleCardPress(cardIndex, item.item.value)}
                  onLongPress={() =>
                    handleCardLongPress(cardIndex, item.item.value)
                  }>
                  <Text>{item.item.value}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </View>
  );
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  cardContainer: {
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: width - 40,
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
});
