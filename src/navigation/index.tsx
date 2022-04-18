import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "_screens/Login";
import BottomBar from "_screens/BottomBar";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const screenOptions = {
        headerShown: false,
        detachPreviousScreen: false,
    };

    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "Login!" }}
            />
            <Stack.Screen
                name="BottomBar"
                component={BottomBar}
            />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
};

export default Navigation;
