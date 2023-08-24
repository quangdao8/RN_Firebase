import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Auth from '@react-native-firebase/auth';

const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'Login';

        // navigation.dispatch(StackActions.replace(routeName));
        navigation.navigate(routeName);
      });
    }, 3000);

    return () => {};
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{color: '#e93766', fontSize: 40}}>Loading</Text>
      <ActivityIndicator color="#e93766" size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
