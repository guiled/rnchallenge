import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import I18n from '../utils/i18n';
import ItemSeparator from '../components/List/ItemSeparator';
import Item from '../components/List/Item';
import Fetch from '../utils/Api';

const List = ({ route, navigation }) => {
    // STATES
    const [refreshing, setRefreshing] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);


    // METHODS
    const loadRestaurantList = (force = false) => {
        setRefreshing(true);
        Fetch({
            query: "query activities($market: String!, $types: [String]) { activities(market: $market, types: $types) {... on Activity {id name shortDescription heroMedia {...media} squareMedia {...media}}}}fragment media on Media {  url  alt}",
            variables: {
                market: "fr-fr",
                types: ["Restaurant"]
            },
            operationName: "activities"
        }).then((response) => {
            if (response && response.data && response.data.activities) {
                setRestaurantData(response.data.activities);
            }
        }).finally(() => setRefreshing(false));
    };

    const openDetails = (item) => {
        navigation.navigate('Detail', { item });
    };

    const renderItem = ({ item, index }) => {
        return <Item
            data={item}
            onTouch={() => openDetails(item)}
        />;
    };

    // EFFECTS
    React.useEffect(() => {
        // Update the screen title
        navigation.setOptions({ title: I18n.t('homeTitle') });
        loadRestaurantList();
    }, []);

    // COMPONENTS
    return <View style={styles.mainContainer}>
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => loadRestaurantList(true)}
                />}
            refreshing={refreshing}
            onRefresh={() => loadRestaurantList(true)}
            style={styles.list}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item, index) => 'idx' + index}
            renderItem={renderItem}
            data={restaurantData}
        />
    </View>
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    list: {
        flex: 1
    },

});

export default List;