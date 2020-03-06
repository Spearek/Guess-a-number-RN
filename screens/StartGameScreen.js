import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';

const startGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    return (
        <TouchableWithoutFeedback onPress={() =>{Keyboard.dismiss()}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start na New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text >Select a Number</Text>
                    <Input style={styles.input}
                        keyboardType="number-pad"
                        autoCapitalize="none"
                        blurOnSubmit
                        autoCorrect={false}
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} />
                    <View style={styles.buttonsContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={() => { }} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={() => { }} color={Colors.primary} /></View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: '40%'
    }
});

export default startGameScreen;