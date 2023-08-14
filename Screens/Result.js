import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Title from "../Components/Title";

const Result = ({ navigation, route }) => {
  const params = route.params;
  console.log(params);

  const resultImage =
    params.score > 50
      ? "https://cdni.iconscout.com/illustration/premium/thumb/team-victory-5303612-4423551.png"
      : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png";
  return (
    <View style={styles.container}>
      <Title titleText="Result" />
      <Text style={styles.scoreValue}>{params.score}</Text>
      <View style={styles.bannerContainer}>
        <Image
          style={styles.banner}
          resizeMode="contain"
          source={{ uri: resultImage }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttontext}>Go to Home </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Result;

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
  scoreValue: {
    fontSize: 24,
    fontWeight: "800",
    alignSelf: "center",
  },
});
