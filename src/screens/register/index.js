import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import styles from './style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = async () => {
    try {
      if (email?.length > 0 && password?.length > 0) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const userData = {
          id: response.user.uid,
          email: email,
        };
        await firestore()
          .collection('users')
          .doc(response.user.uid)
          .set(userData);
        await auth().currentUser.sendEmailVerification();

        await auth().signOut();

        Alert.alert('Please Verify YOur Email Check Out Link In Your Inbox');
        navigation.navigate('Login');
      } else {
        Alert.alert('Please enter all data');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{color: '#e93766', fontSize: 40}}>Sign Up</Text>
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button title="Sign Up" color="#e93766" onPress={handleSignUp} />
      <View>
        <Text>
          {' '}
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{color: '#e93766', fontSize: 18}}>
            {' '}
            Login{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;
