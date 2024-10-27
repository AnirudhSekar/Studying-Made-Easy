import React, { useContext } from 'react'
import {View, ScrollView, StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, useWindowDimensions, Alert, Platform} from 'react-native'
import { CardContext } from './Context'

const Create = () => {
    const {
        question, setQuestion,
        answer, setAnswer,
        cards, setCards,
        editIndex, setEditIndex,
        questions,setQuestions,
        answers, setAnswers
    } = useContext(CardContext)
    
    const handleAddTask = () => {
        if (question && answer) {
            if(editIndex !== -1) {
                const updatedCards = [...cards]
                updatedCards[editIndex] = {"question": question, "answer":answer}
                const updatedAnswers = [...answers]
                updatedAnswers[editIndex] = answer
                const updatedQuestions = [...questions]
                updatedQuestions[editIndex] = question
                
                setCards(updatedCards)
                setAnswers(updatedAnswers)
                setQuestions(updatedQuestions)

                setEditIndex(-1)
            }
            

            else {
                setCards([...cards, {"question": question, "answer":answer}])
                setAnswers([...answers, answer])
                setQuestions([...questions, question])

            }
            
            setQuestion("")
            setAnswer("")
        }

    }

    const handleEditTask = (index) => {
        const taskToEdit = cards[index]
        setQuestion(taskToEdit.question)
        setAnswer(taskToEdit.answer)
        
        setEditIndex(index)
    }
    const handleDeleteTask = (index) => {
        const updatedCards = [...cards]
        updatedCards.splice(index, 1)
        const updatedAnswers = [...answers]
        updatedAnswers.splice(index,1)
        setAnswers(updatedAnswers)
        setCards(updatedCards)
    } 
    const renderItem = ({ item, index }) => (
        <SafeAreaView style={{flexDirection:'row', padding:10}}>
            <View style={styles.task}>
            <Text style={{fontSize:20, padding:20}} >{index+1}.</Text>
            <View style={{flexDirection:'column', width:110}}>
                <Text style={{textAlign:'left'}}><Text style={{fontWeight:'600'}}>Question: </Text>{item.question}</Text>
                <Text style={{textAlign:'left'}}><Text style={{fontWeight:'600'}}>Answer: </Text>{item.answer}</Text>
            </View>
        <View
            style={styles.taskButtons}>
            <TouchableOpacity
                onPress={() => handleEditTask(index)}>
                <Text
                    style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleDeleteTask(index)}>
                <Text
                    style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
        </View>
        
        
        </SafeAreaView>
    );
    return (

        <SafeAreaView style={{paddingTop: Platform.OS === "android"? 40 : 0, paddingLeft:15, backgroundColor:"#fff", width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
            <View style={{paddingLeft:30, paddingRight:30}}>
            <Text style={styles.heading}>Create</Text>
            <Text style={styles.title}>Your Questions</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Enter question"
                value={question}
                onChangeText={(text) => setQuestion(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter answer"
                value={answer}
                onChangeText={(text) => setAnswer(text)}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddTask}>
                <Text style={styles.addButtonText}>
                    {editIndex !== -1 ? "Update Question" : "Add Question"}
                </Text>
            </TouchableOpacity>
            <View style={{height:400}}>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                
                scrollEnabled={true}
            />
            </View>
            </View>
        </SafeAreaView>


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

export default Create