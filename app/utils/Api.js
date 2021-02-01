import NetInfo from "@react-native-community/netinfo";
import { ToastAndroid, Platform, Alert } from "react-native"
import Server from "../config/Server";
import I18n from './i18n';

export const GetRestaurantQuery = {
    query: "query activities($market: String!, $types: [String]) { activities(market: $market, types: $types) {... on Activity {id name shortDescription heroMedia {...media} squareMedia {...media}}}}fragment media on Media {  url  alt}",
    variables: {
        market: "fr-fr",
        types: ["Restaurant"]
    },
    operationName: "activities"
};

// default options used for the query sent to the server
const defaultOptions = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}

// Display an error as a toast or an alert depending on platform
const showError = (txt) => {
    if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
            txt,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    } else {
        Alert.alert(txt);
    }
};


export const Fetch = async (body, opt) => {
    // Check if the device is connected
    if (Platform.OS == 'android') {
        const state = await NetInfo.fetch();
        const isConnected = state.isInternetReachable;
        if (!isConnected) {
            showError(I18n.t('notConnected'));
            return false;
        }
    }
    // in case of query timeout, cancel it after 10sec
    let controller = new AbortController();
    let timeout = setTimeout(() => {
        controller.abort();  // abort after 10 seconds
        timeout = null;
    }, 10000);

    // Query
    return fetch(Server, {
        ...defaultOptions,
        body: JSON.stringify(body),
        ...opt,
        //signal: controller.signal,
    })
        .then((response) => {
            // Cancel timeout handler
            //timeout && clearTimeout(timeout);
            //timeout = null;
            return response.json();
        });
};
