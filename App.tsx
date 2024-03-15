import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import HomeScreen from "screen/home";
import { store } from "store/index";

import "react-native-gesture-handler";

const Stack = createStackNavigator<StackParams>();

const App = () => {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
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
});

export default App;
