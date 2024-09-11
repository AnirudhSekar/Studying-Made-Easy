import React, { useContext, useState } from 'react'
import {SafeAreaView, Text, Dimensions, View, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform} from 'react-native'
import axios from 'axios'
import { CardContext } from './Context'
import { FlatList } from 'react-native'


const AI_ASSISTANT = () => {
    const [question, setQuestion] = useState("")
    const [allQuestions, setAllQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const {cards, questions, answers} = useContext(CardContext)
    const sendPostData = function () {
            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.post('http://192.168.1.169:4242/llm', {
                "question" : question,
                "context": [questions,answers]
            })
            .then(response => {
                console.log(response.data.result)
                setAllQuestions([...allQuestions, question])
                console.log(allQuestions)
                setResponses([...responses, response.data.result])
                console.log(responses)
          })
            .catch(error => console.error(error))
    }
   
    return (
        <View style={{backgroundColor:"white", width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
        <SafeAreaView>
            <View style={{paddingLeft:30, paddingRight:30}}>
            <Text style={styles.heading}>AI Assistant</Text>
            <Text style={styles.title}>Ask a question</Text>
            
            <TextInput
                style={styles.input}
                value={question}
                onChangeText={(text) => setQuestion(text)}
                placeholder="Enter question"
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => sendPostData(question)}
                
                >
                <Text style={styles.addButtonText}>
                     Add Question</Text>
            </TouchableOpacity>
            </View>
            <View style={{margin:"20px"}}>
                {
                    responses.map(response => (
                        <View style={{margin:"20"}}>
                        <Text style={{fontWeight:'bold'}}>Question:</Text><Text>{allQuestions[responses.indexOf(response)]}</Text>
                        <Text style={{marginTop:"20",fontWeight:'bold'}}>Response: </Text><Text>{response}</Text>
                        </View>
                    ))
                }
            </View>
        </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 7,
        color: "green",
    },
    input: {
        borderWidth: 3,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    addButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    task: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        fontSize: 18,
        marginTop:15,
        justifyContent:"space-around"
    },
    itemList: {
        fontSize: 19,
    },
    taskButtons: {
        flexDirection: "row",
        paddingTop:17,
        paddingLeft:40
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft:10
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18,
    },
    questionView: {
        position:'relative',
        right:5,
        padding:10,
        paddingLeft:15,
        width:(Dimensions.get('screen').width / 2) - 10,
        backgroundColor:'white',
        borderColor:'gray',
        borderWidth:2.5,
        borderRadius:10,
    },
    answerView: {
        position:'relative',
        left:5,
        padding:10,
        width:(Dimensions.get('screen').width / 2) - 30,
        backgroundColor:'white',
        borderColor:'gray',
        borderWidth:2.5,
        borderRadius:10,
    },
});
export default AI_ASSISTANT