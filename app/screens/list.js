import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import I18n from '../utils/i18n';
import ItemSeparator from '../components/List/ItemSeparator';
import Item from '../components/List/Item';
import mock from '../assets/mock';

const List = ({ route, navigation }) => {
    // STATES
    const [refreshing, setRefreshing] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);


    // METHODS
    const loadRestaurantList = () => {

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
    }, []);

    setTimeout(() => {
        setRestaurantData(mock.data.activities);
    }, 1);

    // COMPONENTS
    return <View>
        <FlatList
            style={styles.list}
            refreshing={refreshing}
            onRefresh={loadRestaurantList}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item, index) => 'idx' + index}
            renderItem={renderItem}
            data={restaurantData}
        />
    </View>
};

const styles = StyleSheet.create({
    list: {},

});

export default List;