import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const getSurahList = async () => {
  try {
    const response = await fetch('https://api.quran.gading.dev/surah');
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export default function App() {
  const [surahList, setSurahList] = useState([]);

  useEffect(() => {
    getSurahList().then(list => {
      setSurahList(list);
    });
  }, []);

  return (
    <View style={styles.container}>
      {surahList.map(item => (
        <View key={item.number}>
          <View style={styles.box}>
            <View style={styles.boxNumber}>
              <View style={styles.boxNumberText}>
                <Text>{item.number}</Text>
                <svg
                  className=""
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={styles.numberBoxBorder}
                >
                  <path
                    d="M23 1.46451L28.8707 7.7459L29.181 8.07785L29.6351 8.06251L38.2279 7.77211L37.9375 16.3649L37.9221 16.819L38.2541 17.1293L44.5355 23L38.2541 28.8707L37.9221 29.181L37.9375 29.6351L38.2279 38.2279L29.6351 37.9375L29.181 37.9221L28.8707 38.2541L23 44.5355L17.1293 38.2541L16.819 37.9221L16.3649 37.9375L7.77211 38.2279L8.06251 29.6351L8.07785 29.181L7.7459 28.8707L1.46451 23L7.7459 17.1293L8.07785 16.819L8.06251 16.3649L7.77211 7.77211L16.3649 8.06251L16.819 8.07785L17.1293 7.7459L23 1.46451Z"
                    stroke="rgb(14 165 233)"
                    strokeWidth="1"
                  ></path>
                </svg>
              </View>
              <View>
                <Text style={styles.surahName}>{item.name.transliteration.id}</Text>
                <Text style={styles.surahNameId}>{item.name.translation.id}</Text>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentArab}>{item.name.short}</Text>
              <Text style={styles.contentVerses}>{item.numberOfVerses} ayat</Text>
            </View>
          </View>
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '40px',
    gap: "40px",
  },
  box: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "between",
    flexDirection: "row",
  },
  content: {
    flexGrow: "1",
    fontSize: "16px",
    textAlign: "right",
    color: "rgba(0,0,0,0.8)",
  },
  contentVerses:{
    fontSize: "14px",
    color: "rgba(0,0,0,0.8)",
  },
  contentArab: {
    fontSize:"20px",
    color: "rgba(0,0,0,1)",
  },
  surahName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "rgba(0,0,0,0.8)",
  },
  surahNameId: {
    fontSize: "14px",
    fontWeight: "600",
    color: "rgba(0,0,0,0.5)",
  },
  boxNumber:{
    display: "flex",
    flexDirection: "row",
    gap:"30px",
  },
  boxNumberText: {
    position: 'relative',
    textAlign: 'center',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  numberBoxBorder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50px',
  },
});
