import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from "react-native-elements"
import { wh } from "./src/helpers";
import { COLORS } from "./src/styles";
import { Loader } from "./src/components";
import { Home } from "./src/pages/Home";
import { useLoadingState, useMovieStore } from "./store";
import { ChooseFav } from "./src/pages/ChooseFav";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => {
    const favorites = useMovieStore((state => state.favorites));
    const setLoading = useLoadingState((state => state.setLoading));
    const loading = useLoadingState((state => state.loading))

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 250)
    }, [])


    const TabStack = () => {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#FEFEFE",
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        height: wh(.1),
                        shadowColor: "#000",
                        shadowOpacity: .06,
                        shadowOffset: {
                            width: 10,
                            height: 10
                        },
                        paddingHorizontal: 20
                    },
                }} initialRouteName={"Home"}>
                <Tab.Screen name={"Home"} component={Home} options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon name={"home"} type={"material-community"} color={!focused ? COLORS.main : COLORS.secondary} tvParallaxProperties={undefined} />
                    )
                }} />

            </Tab.Navigator>
        )

    }

    const StepperStack = () => {
        return (
            <Stack.Navigator
                initialRouteName={"ChooseFav"} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"ChooseFav"} component={ChooseFav} />
            </Stack.Navigator>
        )

    }
    return (
        <NavigationContainer>
            {
                loading ?
                    <Loader /> :
                    <>

                        {
                            favorites.length === 0 ?
                                <StepperStack /> :
                                favorites.length > 0 ?
                                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                                        {

                                            <Stack.Screen name={"TabStack"} component={TabStack} />
                                        }
                                    </Stack.Navigator> :
                                    <></>
                        }
                    </>

            }

        </NavigationContainer>
    );

};

export default Router;




