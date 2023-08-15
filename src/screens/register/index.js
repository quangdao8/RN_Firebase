import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import styles from './style';
import auth from '@react-native-firebase/auth';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User created');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        setErrorMessage('err', errorMessage.message);
      });
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
