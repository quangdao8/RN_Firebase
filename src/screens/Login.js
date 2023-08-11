import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import styles from './style';
export default class Login extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin');
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#e93766', fontSize: 40}}>Login</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <Button title="Login" color="#e93766" onPress={this.handleLogin} />
        <View>
          <Text>
            {' '}
            Don't have an account?{' '}
            <Text
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{color: '#e93766', fontSize: 18}}>
              {' '}
              Sign Up{' '}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
