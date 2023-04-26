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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { listAll, ref } from "firebase/storage";

const ProfileScreen = ({route}) => {
  const [avatar, setAvatar] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    // const userPost = query(
    //   collection(storage, "postImage"),
    //   where("userId", "==", userId)
    // );
    // const querySnapshot = await getDocs(userPost);
    // const saveAllPost = [];
    // querySnapshot.forEach((doc) => {
    //   saveAllPost.push({ ...doc.data(), id: doc.id });
    // });
    // setUserPosts(saveAllPost);

    const folderRef = ref(storage, "postImage");
    const saveAllPost = [];
    listAll(folderRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          saveAllPost.push({ ...itemRef });
          setUserPosts(saveAllPost);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    dispatch(signout());
  };

  useEffect(() => {
    getUserPosts();
  }, []);

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
  imgProfile: {
    marginBottom: 32,
  },
});

export default ProfileScreen;
