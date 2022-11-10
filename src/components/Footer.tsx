import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Footer = (isLoading?:boolean) => {
    if (!isLoading) {
        return null;
    }
    return (
        <View
            style={{
                paddingVertical: 20,
            }}>
            <ActivityIndicator size="large" />
        </View>
    );
};