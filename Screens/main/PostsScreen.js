import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nestedScreens/DefaultPostScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator screenOptions={{ showLabel: false }}>
      <NestedScreen.Screen
        options={{
          title: false,
          headerShown: false,
        }}
        name="DefaultScreen"
        component={DefaultPostsScreen}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
