import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import I18n from '../utils/i18n';
import ItemSeparator from '../components/List/ItemSeparator';
import Item from '../components/List/Item';
import Fetch from '../utils/Api';

const RenderHeader = ({ text, onChangeText }) => <View style={styles.searchBar}>
    <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        value={text}
        placeholder={I18n.t('search')}
    />

</View>;

let allRestaurants = [];

const List = ({ route, navigation }) => {
    // STATES
    const [refreshing, setRefreshing] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);
    const [filter, setFilter] = useState('');

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
            if (response && response.data) {
                allRestaurants = response.data.activities
                filterRestaurants();
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

    const filterRestaurants = (val) => {
        let result = allRestaurants;
        if (val && allRestaurants && allRestaurants.filter) {
            result = allRestaurants.filter((item) => item.name.toLowerCase().includes(val.toLowerCase()));
        }
        console.log('Result : ' + result.length);
        setRestaurantData(result);
    };

    const setFilterText = (val) => {
        setFilter(val);
        filterRestaurants(val);
    };


    // EFFECTS
    React.useEffect(() => {
        // Update the screen title
        navigation.setOptions({ title: I18n.t('homeTitle') });
        loadRestaurantList();
    }, []);

    // COMPONENTS
    return <View style={styles.mainContainer}>
        <RenderHeader text={filter} onChangeText={setFilterText} />
        <FlatList
            refreshing={refreshing}
            onRefresh={() => loadRestaurantList(true)}
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
    searchBar: {
        height: 50,
        padding: 5,
        flexDirection: "row"
    },
    searchText: {
        height: 40,
        marginLeft: 20

    }
});

export default List;