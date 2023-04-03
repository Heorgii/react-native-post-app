import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "../nestedScreens/DefaultPostScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  <NestedScreen.Navigator>
    <NestedScreen.Screen
      name="DefaultPostScreen"
      component={DefaultPostsScreen}
    />
    <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    <NestedScreen.Screen name="CommentsScreen" component={CommentsScreen} />
  </NestedScreen.Navigator>;
};

export default PostsScreen; 