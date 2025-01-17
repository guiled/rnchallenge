import React from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import DText from '../Text';

const Item = ({ data, onTouch }) => {
    return <TouchableOpacity
        onPress={onTouch}
    >
        <View style={styles.itemContainer}>
            <Image
                style={styles.thumbnail}
                source={{ uri: data.squareMedia.url }}
            />
            <DText style={styles.name}>{data.name}</DText>
        </View>
    </TouchableOpacity>;
}

const itemHeight = 120;
const itemPadding = 10;

const styles = StyleSheet.create({
    itemContainer: {
        height: itemHeight,
        flexDirection: "row",
        padding: itemPadding,
        alignItems: "center"
    },
    thumbnail: {
        left: 0,
        top: 0,
        width: itemHeight - 2 * itemPadding,
        height: itemHeight - 2 * itemPadding,
        borderRadius: 20,
    },
    name: {
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 16,
        flexShrink: 1
    }
});

export default Item;