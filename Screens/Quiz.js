import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ navigation }) => {
  const [questions, setquestions] = useState();
  const [ques, setques] = useState(0);
  const [options, setoptions] = useState([]);
  const [score, setscore] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [count, setcount] = useState(1);

  const getQuiz = async () => {
    setisLoading(true);
    const url =
      "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
    const res = await fetch(url);
    const data = await res.json();
    setquestions(data.results);
    // console.log(data.results);
    setoptions(generateoptionsandshuffle(data.results[0]));
    setisLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleNext = () => {
    setques(ques + 1);
    setoptions(generateoptionsandshuffle(questions[ques + 1]));
    setcount(count + 1);
  };

  const handleResult = () => {
    navigation.navigate("Result", {
      score: score,
    });
  };

  const handlesubmitoption = (_option) => {
    if (_option === questions[ques].correct_answer) {
      setscore(score + 10);
    }
    if (ques !== 9) {
      setques(ques + 1);
      setoptions(generateoptionsandshuffle(questions[ques + 1]));
    } else {
      handleResult();
    }

    //  console.log(_option===questions[ques].correct_answer)
  };

  const generateoptionsandshuffle = (question) => {
    const options = [question.correct_answer, ...question.incorrect_answers];
    //  console.log(options,'before')
    shuffleArray(options);
    //  console.log(options,'after')
    return options;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size={70}
          color="#34A0A4"
          style={{ justifyContent: "center", alignSelf: "center", flex: 1 }}
        />
      ) : (
        questions && (
          <View style={{ height: "100%" }}>
            <View style={styles.top}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 25,
                  fontWeight: "700",
                  paddingBottom: 10,
                }}
              >
                {count}
              </Text>
              <Text style={styles.question}>
                {decodeURIComponent(questions[ques].question)}
              </Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.buttonoption}
                onPress={() => handlesubmitoption(options[0])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[0])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonoption}
                onPress={() => handlesubmitoption(options[1])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[1])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonoption}
                onPress={() => handlesubmitoption(options[2])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[2])}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonoption}
                onPress={() => handlesubmitoption(options[3])}
              >
                <Text style={styles.option}>
                  {decodeURIComponent(options[3])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttom}>
              {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttontext}>SKIP</Text>
        </TouchableOpacity > */}

              {ques !== 9 ? (
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttontext}>SKIP</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={handleResult}>
                  <Text style={styles.buttontext}>SHOW RESULT</Text>
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity onPress={()=>navigation.navigate('Result')}>
          <Text>END</Text>
        </TouchableOpacity> */}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  buttom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#1A759F",
    padding: 12,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  buttontext: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    color: "white",
  },
  buttonoption: {
    backgroundColor: "#34A0A4",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
});
