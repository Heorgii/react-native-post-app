import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../redux/auth/authOperations";
import { collection, query, where } from "firebase/firestore";

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const userPost = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(userPost);
    const saveAllPost = [];
    querySnapshot.forEach((doc) => {
      saveAllPost.push({ ...doc.data(), id: doc.id });
    });
    setUserPosts(saveAllPost);
  };

  const signOut = () => {
    dispatch(signout());
  };

  return (
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
          <Text>aaaaaaaaa</Text>

          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.photo }} style={styles.imgProfile} />
              </View>
            )}
          />
        </View>
      </ImageBackground>
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
    marginBottom: 64,
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  imgProfile:{
    marginBottom: 32,
  },
});

export default ProfileScreen;
