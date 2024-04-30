
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import { Link, router } from "expo-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent to:", email);
      // Optionally, you can redirect the user to a confirmation screen
      // router.push("/password-reset-confirmation");
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <Pressable style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </Pressable>
      <Text style={styles.link}>
        Remember your password?{" "}
        <Link href={"./login"} style={styles.Login}>
          Log in
        </Link>
      </Text>
    </View>
  );
};

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
  Login: {
    color: "blue",
    textDecorationLine: "underline",
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
});

export default ForgotPassword;
