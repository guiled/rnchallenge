import React from 'react';
import { Image, StyleSheet, View } from "react-native";
import DText from '../components/Text';

const Detail = ({ route, navigation }) => {
    return <View style={styles.detailContainer}>
        <DText style={styles.title}>{route.params.item.name}</DText>
        <Image
            style={styles.headImage}
            source={{ uri: route.params.item.heroMedia.url }}
        />
        <DText style={styles.description}>{route.params.item.shortDescription}</DText>
    </View>;
};

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center"
    },
    headImage: {
        marginTop: 10,
        width: undefined,
        height: 230
    },
    description: {
        fontSize: 16,
        margin: 20,
        textAlign: "justify",
        lineHeight: 25
    }
})

export default Detail;