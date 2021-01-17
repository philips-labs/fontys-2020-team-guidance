/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import AuthService from './services/auth.service';
import { Formik } from 'formik'
import * as yup from 'yup'

export default class ForgotPassword extends React.Component {

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
        const handleRegister = (values) => {
            this.setState({message: ''})
            this.setState({loading: true})
        }

        return(
            <View style={styles.loginPageBody}>
                <Text style={styles.loginWelcomeText}>Forgot Password</Text>

                <Formik
                    initialValues={{email: ''}}
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

                            <View style={styles.memberButton}>
                                <Button
                                    title="SEND EMAIL"
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                >
                                    Send Email
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
        paddingBottom: 25,
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


