/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
    Button,
} from 'react-native';

import AuthService from './services/auth.service'

export default class MainApp extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    content: '',
    user: '',
    loggedIn: false,
  })

  resetState = () => {
    this.setState(this.getInitialState())
  }

  componentDidMount() {
    this._isMounted = true;

    let currentUser = AuthService.getCurrentUser().then((person => {
      let parsedUser = JSON.parse(person)
      this.setState({user: parsedUser})
    }))
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    const {navigate} = this.props.navigation

    const Logout = () => {
      AuthService.logout("user").then((() => {
        this.resetState()
        navigate('Login')
      }));
    }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.scanItem}>
          <Text
              style={styles.basicScannedText}>{this.state.user.username}
          </Text>
        </View>
        <View style={styles.scanItem}>
          <Text style={styles.basicScannedText}>Beacon Two</Text>
        </View>
        <View style={styles.scanItem}>
          <Text style={styles.basicScannedText}>Beacon Three</Text>
        </View>
        <View style={{marginTop: 50}}>
          <Button
              title="logout"
              onPress={Logout}
          >
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.basicButton}
              onPress={() => {console.log("SCANNING")}}
          >
            <Text style={styles.basicButtonText}>Scan</Text>
          </TouchableOpacity>
        </View>

      </View>

    </>
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#121212',
  },
  basicScannedText: {
    fontSize: 20,
    textAlign: 'center'
  },
  scanItem: {
    backgroundColor: '#FFFFFF',
    height: 50,
    justifyContent: 'center',
    marginTop: 20
  },
  basicButtonText: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  basicButton: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 50,
    borderRadius: 100,
    marginBottom: 50
  }
});
