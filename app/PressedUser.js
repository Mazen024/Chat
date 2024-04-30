import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TextInput, Pressable } from "react-native";
import { collection, getDocs, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, Feather } from '@expo/vector-icons'; 


const PressedUser = () => {
  const { userId } = useLocalSearchParams();
  const auth = getAuth();
  const loggedInUserId = auth.currentUser.uid;

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [username, setUsername] = useState("");


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const conversationId = getConversationId(loggedInUserId, userId);
        const messagesRef = collection(db, `conversations/${conversationId}/messages`);
        const q = query(messagesRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedMessages = [];
          querySnapshot.forEach((doc) => {
            fetchedMessages.push(doc.data());
          });
          setMessages(fetchedMessages);
        });

        const querySnapshot = await getDocs(query(collection(db, "users"),where("userId", "==", userId)));

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setUsername(data.name);
        } else {
          console.log('Item not found');
        }

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [loggedInUserId, userId]);

  const sendMessage = async () => {
    try {
      const conversationId = getConversationId(loggedInUserId, userId);
      const messagesRef = collection(db, `conversations/${conversationId}/messages`);
      await addDoc(messagesRef, {
        text: messageText,
        senderId: loggedInUserId,
        timestamp: new Date(),
      });
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getConversationId = (userId1, userId2) => {
    return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.senderId === loggedInUserId ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{formatMessageTime(item.timestamp)}</Text>
    </View>
  );

  const formatMessageTime = (timestamp) => {
      const date = timestamp.toDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours > 12 ? `${hours % 12}`:`${hours}`}:${minutes < 10 ? "0" : ""}${minutes}`;    
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={router.back}>
          {/* arrow-back-circle-outline //(one more style) */}
          <Ionicons name="arrow-undo-circle-outline" size={35} color="#333" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.username}>{username}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type your message..."
          placeholderTextColor="#888"
        />
        <Pressable style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PressedUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#075e54",
    borderRadius: 5,
  },
  backIcon: {
    margin: 10,
    color: "white",
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    padding: 15,
    color: "white",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    textAlign: "right",
  },
  sentMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 8,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  sendButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
