import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth/authOperations";

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(false);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../image/bgImage.jpg")}
          style={styles.main_image}
        >
          <View style={styles.main_box}>
            <View style={styles.image_box}>
              <TouchableOpacity style={styles.image} activeOpacity={0.5}>
                {avatar ? (
                  <Image
                    style={styles.btn_add}
                    source={require("../image/icons/delete.png")}
                  />
                ) : (
                  <Image
                    style={styles.btn_add}
                    source={require("../image/icons/add.png")}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logout_btn} onPress={signOut}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>

            <Text style={styles.user_name}>Name</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main_image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  main_box: {
    backgroundColor: "#FFFFFF",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image_box: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    position: "absolute",
    top: -60,
    flex: 1,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  btn_add: {
    position: "absolute",
    bottom: 10,
    left: 105,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
  },
  logout_btn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  user_name: {
    marginTop: 64,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
});

export default ProfileScreen;
