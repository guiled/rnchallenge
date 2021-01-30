import React from 'react';
import { Text } from 'react-native';


export default (props) => <Text
    style={[defaultStyle, props.style]}>{props.children}
</Text>;

const defaultStyle = {
    color: "#333",
};

