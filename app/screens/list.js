import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import I18n from '../utils/i18n';
import ItemSeparator from '../components/List/ItemSeparator';
import Item from '../components/List/Item';
import { Fetch, GetRestaurantQuery } from '../utils/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    async function loadRestaurantList(force = false) {
        let data = null;
        setRefreshing(true);

        if (!force) {
            let response = await AsyncStorage.getItem('restaurants');
            if (response !== null) {
                data = JSON.parse(response);
            }
        }

        if (!data) {
            console.log('Fetch from server');
            response = await Fetch(GetRestaurantQuery);
            if (response && response.data) {
                data = response.data.activities;
            }
        }
        allRestaurants = data;
        filterRestaurants();
        await AsyncStorage.setItem('restaurants', JSON.stringify(allRestaurants));
        setRefreshing(false);
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