import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

const getSurah = async (id) => {
    try {
        const response = await fetch('https://equran.id/api/v2/surat/' + id);
        const json = await response.json();
        console.log(json.data)
        return json.data;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of an error
    }
};

export default function DetailsScreen({ navigation, route }) {
    const [surah, setSurah] = useState([]);
    const { id } = route.params;
    useEffect(() => {
        getSurah(id).then(list => {
            setSurah([list]);
        })
    }, []);

    return (
        <View>
            {surah.map(item => (
                <View key={item.nomor} style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{item.namaLatin}</Text>
                        <Text style={styles.description}>{item.arti}</Text>
                        <View style={styles.separator} />
                        <View>
                            <Text style={styles.subtext}>{item.tempatTurun} - {item.jumlahAyat} ayat</Text>
                        </View>
                    </View>
                    <Image
                        source={require('../assets/bismilah.jpg')}
                        style={styles.images}
                    />
                    {item.ayat.map(ayat => (
                        <View key={ayat.nomorAyat} style={styles.flex}>
                            <View style={styles.boxNumber}>
                                <View style={styles.boxNumberText}>
                                    <Text>{ayat.nomorAyat}</Text>
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
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentArab}>{ayat.teksArab}</Text>
                                <Text style={styles.contentLatin}>{ayat.teksLatin}</Text>
                                <Text style={styles.contentId}>{ayat.teksIndonesia}</Text>
                            </View>
                        </View>
                    ))}
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
        paddingRight: '40px',
        paddingLeft: '40px',
        paddingTop: '20px',
        paddingBottom: '20px',
        gap: "40px",
    },
    images: {
        height: "80px",
        resizeMode: "contain",
        margin: "20px 0",
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        borderBottomWidth: 1,
        paddingBottom: "20px",
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
        flexWrap: "wrap",
        fontSize: "16px",
        textAlign: "right",
        width: "90%",
        color: "rgba(0,0,0,0.8)",
        gap: "10px",
    },
    contentLatin: {
        fontSize: "14px",
        color: "rgba(0,0,0,0.8)",
        fontWeight: "600",
    },
    contentArab: {
        fontSize: "20px",
        color: "rgba(0,0,0,1)",
    },
    contentId: {
        fontSize: "13px",
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
    boxNumber: {
        display: "flex",
        gap: "30px",
    },
    boxNumberText: {
        position: 'relative',
        textAlign: 'center',
        display: "flex",
    },
    numberBoxBorder: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',
    },
    header: {
        backgroundColor: '#1fb6ff',
        borderRadius: 8,
        textAlign: 'center',
        color: 'white',
        marginVertical: 4,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
    },
    description: {
        fontSize: 14,
        fontWeight: '500',
        color: "white",
    },
    separator: {
        width: '100%',
        maxWidth: 300,
        marginHorizontal: 'auto',
        marginVertical: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.4)',
        borderBottomWidth: 1,
    },
    subtext: {
        fontSize: 14,
        fontWeight: '500',
        color: "white",
    },
});
