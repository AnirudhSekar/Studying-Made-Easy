import React, { useContext, useState } from 'react'
import {SafeAreaView, Text, Dimensions, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native'
import { CardContext } from './Context'
const Test = () => {
    const {cards, questions, answers} = useContext(CardContext)
    const height = (Dimensions.get("screen").height)
    var empty = false
    
    const [count, setCount] = useState(0)
    const [item, setItem] = useState([])
    const [submitted, setSubmit] = useState(false)
    const [tryAgain, setTryAgain] = useState(false)
    const changeItem = (text, id) => {
        oldItem = [...item]
        oldItem[id] = text
        setItem(oldItem)
    }

    const gradeAnswers = () => {
        var newcount = 0
        for (let i = 0; i < item.length; i++) {
            console.log(item[i].toLowerCase());
            console.log(answers[i].toLowerCase());
            if (item[i].toLowerCase() === answers[i].toLowerCase()) {
                newcount++
            }
        }
        console.log(newcount);
        setCount(newcount)
        setSubmit(true)
        newcount=0
    }
    const resetPage = () => {
        empty = true
        setCount(0)
        setItem([])
        setSubmit(false)
        setTryAgain(true)
    }
    const returnforsubmit = () => {

        return (
            <View>
                    <View>
                        <Text style={{color: submitted && !empty ? 'black' : 'white', textAlign:'center', fontSize:18, paddingTop:15, fontWeight:'600'}}>You got {count}/{cards.length} correct! That is a {((count/cards.length)*100).toFixed(0)}%</Text>
                    </View>
            </View>
        )
    }

    const checkForEmptyValue = () => {
        if (JSON.stringify(cards) === JSON.stringify([])) {
            empty=true
            return (
                <View style={{justifyContent:'center', alignItems:'center',flex:height*(0.7/852), padding:20}}>
                    <Text style={styles.title}>You have not created any questions yet! Go make them in the create screen!</Text>
                </View>
            )
            
        }
        else {  
            return cards.map(val => 
                 (
                        <View key={cards.indexOf(val)} >
                            <Text style={styles.question}>{cards.indexOf(val) + 1}. {val.question}</Text>
                            <TextInput style={[styles.textInput]} placeholder='Enter Answer Here' onChangeText={(text) => changeItem(text, cards.indexOf(val))} value = {item[cards.indexOf(val)]} />
                        </View>
                    )
                )
            }
    }
    
    return (
        <SafeAreaView style={{backgroundColor:"#fff", paddingTop:Platform.OS === 'android' ? 30 : 0}}>
            <Text style = {styles.heading}>Test</Text>
            
            <ScrollView style={{height: Platform.OS === 'android' ? Dimensions.get('window').height / 2:Dimensions.get('window').height-200}}>
            
            {
                checkForEmptyValue()
            }
            
            <TouchableOpacity style={[styles.submitButton, {backgroundColor: empty ? 'white' : 'green'}, {borderColor: empty ? "white" : 'lightgray'}, {color: submitted ? 'white' : 'black'}]} 
            onPress={!submitted ? gradeAnswers : resetPage}
            
           >
                <Text style={{fontSize:25, fontWeight:'bold', color: !empty && !submitted ? 'white' : 'white'}}>{submitted ? "Try Again" : "Submit"}</Text>
            </TouchableOpacity>
            {returnforsubmit()}
            </ScrollView>
            <View style={{height:200, backgroundColor:"#fff"}}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
        marginLeft:20,
        marginRight:20
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 7,
        color: "green",
        marginLeft:20,
        marginTop:20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    question: {
        fontWeight:'bold',
        fontSize:20,
        margin:20,
    },
    submitButton: {
        alignSelf:'center',
        borderWidth:3,
        borderRadius:5,
        width:200,
        alignItems:'center',
        height:50,
        justifyContent:'center',
    }
})

export default Test