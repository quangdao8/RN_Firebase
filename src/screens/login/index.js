import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import styles from './style';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const Login = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    // navigation.navigate('Home');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Home'))
      .catch(error => {
        console.log('err', error.message);
        setErrorMessage(error.message);
      });
  };

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  return (
    <View style={styles.container}>
      <Text style={{color: '#e93766', fontSize: 40}}>Login</Text>
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <Button
        title="Facebook"
        color={'blue'}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }
      />
      <Button title="Login" color="#e93766" onPress={handleLogin} />
      <View>
        <Text>
          {' '}
          Don't have an account?{' '}
          <Text
            onPress={() => {
              navigation.navigate('Register');
            }}
            style={{color: '#e93766', fontSize: 18}}>
            {' '}
            Sign Up{' '}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
