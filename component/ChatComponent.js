import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ChatComponent = ({ item }) => {
	const navigation = useNavigation();
	const [messages, setMessages] = useState({});

	const [user, setUser] = useState("");


	const getUsername = async () => {
		try {
			const value = await AsyncStorage.getItem("username");
			if (value !== null) {
				setUser(value);
			}
		} catch (e) {
			console.error("Error while loading username!");
		}
	};


	useLayoutEffect(() => {
		getUsername();
		setMessages(item.messages[item.messages.length - 1]);
	}, []);

	const handleNavigation = () => {
		navigation.navigate("Messaging", {
			id: item.id,
			name: item.name,
			by: item.by
		});
	};

	return (
		<Pressable style={styles.cchat} onPress={handleNavigation}>
			<Ionicons
				name='person-circle-outline'
				size={45}
				color='black'
				style={styles.cavatar}
			/>

			<View style={styles.crightContainer}>
				<View>
					<Text style={styles.cusername}>{item.name == user ? item.by : item.name}</Text>

					<Text style={styles.cmessage}>
						{messages?.text ? messages.text : "Tap to start chatting"}
					</Text>
				</View>
				<View>
					<Text style={styles.ctime}>
						{messages?.time ? messages.time : "now"}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ChatComponent;
