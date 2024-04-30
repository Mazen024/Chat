import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable, TextInput, Keyboard } from "react-native";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useLocalSearchParams, router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";

const TodoListScreen = () => {
  const { userId, username } = useLocalSearchParams();
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(query(collection(db, "Todos"), where("userId", "==", userId)));
        const fetchedTodos = [];
        querySnapshot.forEach((doc) => {
          fetchedTodos.push({ id: doc.id, ...doc.data() });
        });
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [userId]);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleCompleted = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleAddTodo = async () => {
    try {
      if (!newTodoTitle || !newTodoDescription) return;
      
      const docRef = await addDoc(collection(db, "Todos"), {
        userId,
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      });

      setNewTodoTitle("");
      setNewTodoDescription("");

      Keyboard.dismiss();
      
      const updatedTodos = [...todos, { id: docRef.id, title: newTodoTitle, description: newTodoDescription, completed: false }];
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {username}</Text>
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Todo Title"
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Todo Description"
          value={newTodoDescription}
          onChangeText={setNewTodoDescription}
        />
        <Pressable style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add Todo</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Pressable>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, item.completed ? styles.completedButton : styles.incompleteButton]}
                  onPress={() => toggleCompleted(item.id)}
                  >
                  <Text style={styles.buttonText}>
                    {item.completed ? "Completed" : "Incomplete"}
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No Todos</Text>}
      />
      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addTodoContainer: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  completedButton: {
    backgroundColor: "green",
  },
  incompleteButton: {
    backgroundColor: "red",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  signOutButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  signOutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TodoListScreen;
