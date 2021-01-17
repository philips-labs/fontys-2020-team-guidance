/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import AuthService from './services/auth.service';
import { Formik } from 'formik'
import * as yup from 'yup'

export default class Register extends React.Component {

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
        const {navigate} = this.props.navigation

        const handleRegister = (values) => {

            this.setState({message: ''})
            this.setState({loading: true})

            try{
                AuthService.register(values.username, values.email, values.password).then(
                    () => {
                        navigate('Login')
                    })
            } catch(e) {
                console.log(e.message)
            }
        }

        return(
            <View style={styles.loginPageBody}>
                <Text style={styles.loginWelcomeText}>SIGN UP</Text>

                <Formik
                    initialValues={{username: '', email: '', password: '', confirmPassword: ''}}
                    onSubmit={values => handleRegister(values)
                    }
                    validationSchema={yup.object().shape({
                        username: yup
                            .string()
                            .required()
                            .min(3, "Must be longer than 3 characters"),
                        email: yup
                            .string()
                            .email("Invalid Email")
                            .required("Email Required"),
                        password: yup
                            .string()
                            .required()
                            .min(6, "Must be longer than 5 characters")

                    })}
                >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <View>
                    <View style={styles.loginContainer}>
                        <TextInput
                            onChangeText={handleChange('email')}
                            value={values.email}
                            style={styles.loginTextInput}
                            placeholder="Email"
                            placeholderTextColor='white'
                        />
                    </View>

                    {touched.email && errors.email &&
                    <Text style={styles.alert}>{errors.email}</Text>
                    }

                    <View style={styles.loginContainer}>
                        <TextInput
                            onChangeText={handleChange('username')}
                            value={values.username}
                            style={styles.loginTextInput}
                            placeholder="Username"
                            placeholderTextColor='white'
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
                            secureTextEntry={true}
                            placeholder="Password"
                            placeholderTextColor='white'
                        />
                    </View>

                    {touched.password && errors.password &&
                    <Text style={styles.alert}>{errors.password}</Text>
                    }

                    <View style={styles.loginContainer}>
                        <TextInput
                            onChangeText={handleChange('confirmPassword')}
                            value={values.confirmPassword}
                            style={styles.loginTextInput}
                            secureTextEntry={true}
                            placeholder="Confirm Password"
                            placeholderTextColor='white'
                        />
                    </View>

                    <View style={styles.memberButton}>
                        <Button
                            title="Register"
                            disabled={!isValid}
                            onPress={handleSubmit}
                        >
                            Register
                        </Button>
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
        backgroundColor: '#1a1a1a',
        height: '100%',
        justifyContent:'center',
    },
    loginWelcomeText:  {
        fontSize: 28,
        alignSelf: 'center',
        paddingBottom: 50,
        color: '#FFFFFF'

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
        borderColor: '#2296F3',
        borderRadius: 23,
    },
    loginTextInput: {
        paddingHorizontal: 10,

    },
    memberButton: {
        marginHorizontal: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    memberText: {
        color: '#FFF',
        fontWeight: 'bold',

    },
    userText: {
        alignSelf: 'center',
        color: '#00716F',
        fontWeight: 'bold',
        paddingVertical: 30
    },
    alert: {
        color: '#d90000',
        textAlign: 'center',
        paddingTop: 5
    }
});


