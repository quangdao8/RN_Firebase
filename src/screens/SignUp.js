import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import styles from './style';

export default class signUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleSignUp = () => {
    // TODO: For Firebase athu
    console.log('handleSignUp');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#e93766', fontSize: 40}}>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
        <View>
          <Text>
            {' '}
            Already have an account?{' '}
            <Text
              onPress={() => this.props.navigation.navigate('Login')}
              style={{color: '#e93766', fontSize: 18}}>
              {' '}
              Login{' '}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
