import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Title from "../Components/Title";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Title titleText="Quizzler" />
      <View style={styles.bannerContainer}>
        <Image
          style={styles.banner}
          resizeMode="contain"
          source={require("../assets/quiz.png")}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.buttontext}>Start </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: "#1A759F",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  buttontext: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  },
});
