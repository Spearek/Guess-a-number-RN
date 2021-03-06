import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/numberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';



const startGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState();



    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });


    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!',
                'There need to be a number from 1-99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton onPress={props.onStartGame.bind(this, selectedNumber)} >
                    START GAME
                </MainButton>
            </Card>
        );
    }
    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.screen}>
                    <Text style={styles.title}>Start na New Game!</Text>
                    <Card style={styles.inputContainer}>
                        <BodyText >Select a Number</BodyText>
                        <Input style={styles.input}
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            blurOnSubmit
                            autoCorrect={false}
                            maxLength={2}
                            onChangeText={numberInputHandler}
                            value={enteredValue} />
                        <View style={styles.buttonsContainer}>
                            <View style={{ width: buttonWidth }}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                            <View style={{ width: buttonWidth }}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                        </View>
                    </Card>
                    {confirmedOutput}
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>

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
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        minWidth: 300,
        width: '80%',
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
    // button: {
    //     //width: '40%'
    //     width: Dimensions.get('window').width / 4
    // },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default startGameScreen;