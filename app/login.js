// import React, { useState } from "react";
// import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
// import { Link, router } from "expo-router";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

// const CustomAlert = ({ message }) => (
//     <View style={styles.alertContainer}>
//       <Text style={styles.alertText}>{message}</Text>
//     </View>
//   );

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState(null);

//   const handleLogin = async () => {
//     try {
//       const usersRef = collection(db, "users");
//       const q = query(usersRef, where("username", "==", username), where("password", "==", password));
//       const querySnapshot = await getDocs(q);
  
//       if (!querySnapshot.empty) {
//         console.log("User logged in successfully");
//         router.push("about");
//       } else {
//         setErrors("Invalid username or password");
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setErrors("Error logging in:", error);
//     }
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={setUsername}
//         value={username}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={setPassword}
//         value={password}
//         secureTextEntry
//       />
//       <Pressable style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </Pressable>
//       <Text style={styles.link}>
//         Don't have an account ? <Link href={"./signup"} style={styles.SignUp}>Sign Up</Link>
//       </Text>
//       <Text style={styles.link}>
//         <Link href={"./forgotPassword"} style={styles.SignUp}>Forgot Password?</Link>
//       </Text>
//       {errors && <CustomAlert message={errors} />}
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 32,
//     marginBottom: 30,
//     fontWeight: "bold",
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   SignUp:{
//     color: "blue",
//     textDecorationLine: 'underline'
//   },
//   button: {
//     backgroundColor: "blue",
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   link: {
//     marginTop: 10,
//     fontSize: 14,
//   },
//   alertContainer: {
//     // backgroundColor: "white",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   alertText: {
//     color: "red",
//     textAlign: "center",
//   },
// });


import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Link, router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CustomAlert = ({ message }) => (
  <View style={styles.alertContainer}>
    <Text style={styles.alertText}>{message}</Text>
  </View>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // User found, proceed to navigation
        router.replace(`/users`);
      } else {
        // User not found
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors(error.message);
    }
  };

  const handleLoginButtonPress = () => {
    handleLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLoginButtonPress}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Text style={styles.link}>
        Don't have an account ? 
        <Link href={"./signup"} style={styles.SignUp}>Sign Up</Link>
      </Text>
      <Text style={styles.link}>
        <Link href={"./forgotPassword"} style={styles.SignUp}>Forgot Password?</Link>
      </Text>
      {errors && <CustomAlert message={errors} />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  SignUp:{
    color: "blue",
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    fontSize: 14,
  },
  alertContainer: {
    // backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alertText: {
    color: "red",
    textAlign: "center",
  },
});
