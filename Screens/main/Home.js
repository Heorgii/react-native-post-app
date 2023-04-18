import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const NavBtnStack = createBottomTabNavigator();

import DefaultPostsScreen from "../nestedScreens/DefaultPostScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
// Iocns
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { signout } from "../../redux/auth/authOperations";

const Home = () => {
  return (
    <NavBtnStack.Navigator tabBarOptions={{ showLabel: false }}>
      <NavBtnStack.Screen
        options={{
          headerTitleStyle: { alignItems: "center", color: "#212121" },
          headerRight: () => (
            <TouchableOpacity style={styles.logout_btn} onPress={() => signout}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons name="grid-outline" size={24} color="#212121" />
          ),
        }}
        name="Posts"
        component={DefaultPostsScreen}
      />

      <NavBtnStack.Screen
        options={{
          headerTitleStyle: { alignItems: "center", color: "#212121" },
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.nav_btn__box}>
              <Ionicons
                name="add-outline"
                size={24}
                color="#212121"
                style={styles.nav_btn}
              />
            </View>
          ),
        }}
        name="Create Posts"
        component={CreatePostsScreen}
      />

      <NavBtnStack.Screen
        options={{
          headerTitleStyle: { alignItems: "center", color: "#212121" },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="#212121" />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </NavBtnStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logout_btn: {
    marginRight: 16,
  },
  nav_btn__box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    color: "white",
  },
  nav_btn: {
    color: "#FFFFFF",
  },
});

export default Home;
