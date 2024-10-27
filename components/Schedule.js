import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Dimensions, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import moment from 'moment-timezone';

export default function Schedule() {
    const [reminder, setReminder] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [reminders, setReminders] = useState([]);
    const [filteredReminders, setFilteredReminders] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    // Detect user's local timezone
    const userTimezone = moment.tz.guess();

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received in foreground:', notification);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        // Filter out past reminders each time reminders change
        const futureReminders = reminders.filter(r => moment(r.reminderDate).isAfter(moment().tz(userTimezone)));
        setFilteredReminders(futureReminders);
    }, [reminders]);

    const handleAddTask = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                alert('Notification permissions not granted!');
                return;
            }
        }

        const reminderDate = moment.tz(`${date} ${time}`, 'MM-DD-YYYY hh:mm A', userTimezone).toDate();
        console.log('Scheduled Reminder Date in user timezone:', reminderDate);

        if (moment(reminderDate).isValid() && moment(reminderDate).isAfter(moment().tz(userTimezone))) {
            console.log('Scheduling notification...');
            try {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: reminder,
                        body: description,
                    },
                    trigger: {
                        date: reminderDate,
                    },
                });

                const newReminder = { reminder, description, date, time, reminderDate };
                setReminders(prevReminders => [...prevReminders, newReminder]);

                alert('Reminder scheduled successfully!');

                const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
                console.log('All Scheduled Notifications:', scheduledNotifications);

                setReminder('');
                setDescription('');
                setDate('');
                setTime('');
            } catch (error) {
                console.error('Error scheduling notification:', error);
                alert('Failed to schedule notification. Please try again.');
            }
        } else {
            console.error('Invalid or past date:', reminderDate);
            alert('Please enter a valid future date and time.');
        }
    };

    const handleEditTask = (index) => {
        const taskToEdit = reminders[index];
        setReminder(taskToEdit.reminder);
        setDescription(taskToEdit.description);
        setDate(taskToEdit.date);
        setTime(taskToEdit.time);
        setEditIndex(index);
    };

    const handleDeleteTask = (index) => {
        const updatedReminders = [...reminders];
        updatedReminders.splice(index, 1);
        setReminders(updatedReminders);
    };

    const renderItem = ({ item, index }) => (
        <SafeAreaView style={{ flexDirection: 'row', padding: 10 }}>
            <View style={styles.task}>
                <Text style={{ fontSize: 20, padding: 20 }}>{index + 1}.</Text>
                <View style={{ flexDirection: 'column', width: 110 }}>
                    <Text style={{ textAlign: 'left' }}>
                        <Text style={{ fontWeight: '600' }}>Reminder: </Text>{item.reminder}
                    </Text>
                    <Text style={{ textAlign: 'left' }}>
                        <Text style={{ fontWeight: '600' }}>Description: </Text>{item.description}
                    </Text>
                    <Text style={{ textAlign: 'left' }}>
                        <Text style={{ fontWeight: '600' }}>Date: </Text>{moment(item.reminderDate).format('MM-DD-YYYY')}
                    </Text>
                    <Text style={{ textAlign: 'left' }}>
                        <Text style={{ fontWeight: '600' }}>Time: </Text>{moment(item.reminderDate).format('hh:mm A')}
                    </Text>
                </View>
                <View style={styles.taskButtons}>
                    <TouchableOpacity onPress={() => handleEditTask(index)}>
                        <Text style={styles.editButton}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                        <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 40 : 0, paddingLeft: 15, backgroundColor: "#fff", width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                <Text style={styles.heading}>Schedule</Text>
                <Text style={styles.title}>Your Reminders</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter Reminder name"
                    value={reminder}
                    onChangeText={setReminder}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter description (optional)"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter date (MM-DD-YYYY)"
                    value={date}
                    onChangeText={setDate}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter time (hh:mm AM/PM)"
                    value={time}
                    onChangeText={setTime}
                />
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddTask}>
                    <Text style={styles.addButtonText}>{editIndex !== -1 ? "Update Reminder" : "Add Reminder"}</Text>
                </TouchableOpacity>

                <View style={{ height: 400 }}>
                    <FlatList
                        data={filteredReminders}
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
        justifyContent: "space-around",
    },
    taskButtons: {
        flexDirection: "row",
        paddingTop: 17,
        paddingLeft: 40,
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
        paddingLeft: 10,
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18,
    },
});
