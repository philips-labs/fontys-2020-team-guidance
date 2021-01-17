import React from 'react'
import { Formik } from 'formik'
import {StyleSheet, View, Text, Image, TextInput } from 'react-native';

export default function ReviewForm() {
    return(
        <View>
            <Formik
                initialValues={{title: '', body: '', rating: '' }}
                onSubmit{(values) => {

                }}
            >
                {(props) => (
                    <View>
                        <TextInput/>
                    </View>
                )}
            </Formik>
        </View>
    )
}
