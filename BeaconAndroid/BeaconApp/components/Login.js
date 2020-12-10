/**
 * @format
 * @flow strict-local
 */

import React, {createRef} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Button, NativeModules} from 'react-native';
import AuthService from './services/auth.service';
import { Formik } from 'formik'
import * as yup from 'yup'

//import java module
const {LoadScannerModule} = NativeModules
const {ActivityStarter} = NativeModules

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            message: '',
            content: '',
        }
    }



    render() {

        const switchToScannerApp = () => {
            ActivityStarter.navigateToExample();
        }

        const {navigate} = this.props.navigation

        const handleLogin = (values) => {

            this.setState({message: ''})
            this.setState({loading: true})

            try{
                AuthService.login(values.username, values.password).then(
                    () => {
                        this.setState({username: values.username})
                        this.setState({password: values.password})
                        switchToScannerApp()
                    })
            } catch(e) {
                console.log(e.message)
            }

        }

        return(
            <View style={styles.loginPageBody}>
                <Image source ={require('../components/images/image.png')} style={styles.loginImg}/>
                <Text style={styles.loginWelcomeText}>Login</Text>
                <Text style={styles.guidanceText}>
                    login to guidance, a new pathfinding app to use in your favourite building.
                </Text>

                <Formik
                    initialValues={{username: '', password: ''}}
                    onSubmit={values => handleLogin(values)
                    }
                    validationSchema={yup.object().shape({
                        // username: yup
                        //     .string()
                        //     .required()
                        //     .min(3, "Must be longer than 3 characters"),
                        // password: yup
                        //     .string()
                        //     .required()
                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                        <View>
                            <View style={styles.loginContainer}>
                                <TextInput
                                    onChangeText={handleChange('username')}
                                    value={values.username}
                                    style={styles.loginTextInput}
                                    placeholder="Username"
                                />
                            </View>

                            {touched.username && errors.username &&
                            <Text style={styles.alert}>{errors.username}</Text>
                            }

                            <View style={styles.loginContainer}>
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    style={styles.loginTextInput}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                />
                            </View>
                                {touched.password && errors.password &&
                                    <Text style={styles.alert}>{errors.password}</Text>
                                }
                            <View style={styles.memberButton}>
                                <Button
                                    title='Sign In'
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                >
                                    Login
                                </Button>
                            </View>

                            <View>
                                <Text
                                    style={styles.userText}
                                    onPress={()=>navigate('Register')}
                                >
                                    New User
                                </Text>

                                <Text
                                    style={styles.userText}
                                >
                                    Forgot password?
                                </Text>
                            </View>
                        </View>
                    )}
                </Formik>


            </View>
        )

    }
}


const styles = StyleSheet.create({
    loginPageBody: {
        backgroundColor: '#FFF',
        height: '100%'
    },
    loginImg: {
        width: '100%',
        height: '40%'
    },
    loginWelcomeText:  {
        fontSize: 28,
        alignSelf: 'center',

    },
    guidanceText: {
        fontSize: 20,
        marginHorizontal: 55,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.4,
        marginBottom: 20
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 55,
        borderWidth: 2,
        marginTop: 15,
        paddingHorizontal: 10,
        borderColor: '#00716F',
        borderRadius: 23,
    },
    loginTextInput: {
        paddingHorizontal: 10
    },
    memberButton: {
        marginHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    memberText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    userText: {
        alignSelf: 'center',
        color: '#00716F',
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    alert: {
        color: '#d90000',
        alignSelf: 'center'
    }
});

