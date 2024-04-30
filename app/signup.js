// import React, { useState } from "react";
// import { Link, router } from "expo-router";
// import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
// import { db } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";

// const CustomAlert = ({ message }) => (
//   <View style={styles.alertContainer}>
//     <Text style={styles.alertText}>{message}</Text>
//   </View>
// );

// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSignUp = async () => {
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const userRef = doc(db, "users", email);
//       const userData = {
//         username,
//         email,
//         password,
//       };

//       await setDoc(userRef, userData);
//       // If sign-up is successful, navigate to the about page
//       router.push("about");
//     } catch (error) {
//       console.error("Error signing up:", error);
//       // Set error message
//       setError("An error occurred while signing up. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         onChangeText={setUsername}
//         value={username}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={setEmail}
//         value={email}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         onChangeText={setPassword}
//         value={password}
//         secureTextEntry
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm-Password"
//         onChangeText={setConfirmPassword}
//         value={confirmPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>
//       <Text style={styles.link}>
//         Already have account ?  <Link href={"./login"} style={styles.Login}>Log in</Link>
//       </Text>
//       {error && <CustomAlert message={error} />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     width: "80%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   Login: {
//     color: "blue",
//     textDecorationLine: 'underline'
//   },
//   button: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//     margin: 10
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 16,
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

// export default SignUp;




import React, { useState } from "react";
import { Link, router } from "expo-router";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const CustomAlert = ({ message }) => (
  <View style={styles.alertContainer}>
    <Text style={styles.alertText}>{message}</Text>
  </View>
);

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      const userData = {
        name: username,
        email: email,
        password: password,
        userId: userId,
      };
      await addDoc(collection(db, "users"), userData);

      router.replace(`/users`);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.link}>
        Already have an account? <Link href={"./login"} style={styles.Login}>Log in</Link>
      </Text>
      {error && <CustomAlert message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  Login: {
    color: "blue",
    textDecorationLine: 'underline'
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  alertContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alertText: {
    color: "red",
    textAlign: "center",
  },
});

export default SignUp;
