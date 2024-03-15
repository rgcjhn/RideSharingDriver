import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import R from "res/R";
import DetailsScreen from "screen/details";
import HomeScreen from "screen/home";
import { store } from "store/index";

import "react-native-gesture-handler";

const Stack = createStackNavigator<StackParams>();

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={() => ({
                  title: "Ride-Sharing Driver",
                  headerLeft: () => (
                    <Image
                      style={styles.logo}
                      source={R.images.logo}
                      height={20}
                      width={20}
                    />
                  ),
                })}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                presentation: "modal",
                headerShown: false,
                cardStyle: { backgroundColor: "transparent" },
              }}
            >
              <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  logo: { height: 26, width: 26, marginLeft: 18 },
});

export default App;
