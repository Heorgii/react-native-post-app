import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Button } from "react-native";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // const [local, setLocal] = useState([]);

  const getAllPost = async () => {
    const allPosts = await getDocs(collection(db, "posts"));
    const saveAllPost = [];
    allPosts.forEach((doc) => {
      saveAllPost.push({ ...doc.data(), id: doc.id });
      setPosts(saveAllPost);
    });
  };

  useEffect(() => {
    if (route.params) {
      setTimeout(() => {
        getAllPost();
      }, 100);
      route.params = null;
    }
  }, [route.params]);

  useEffect(() => {
    getAllPost();
  }, []);

  console.log("posts", posts);
  // console.log("local", local);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.imageCont} />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <Button
                title="Map"
                onPress={() => {
                  navigation.navigate("Map", { location: item.location });
                }}
              />
              <Button
                title="Comments"
                onPress={() => {
                  navigation.navigate("Comments", { postId: item.id });
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  imageCont: {
    width: 342,
    height: 240,
  },
});

export default DefaultPostsScreen;
