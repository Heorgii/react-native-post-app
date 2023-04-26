import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Button } from "react-native";
import { db, storage } from "../../firebase/config";
import { collection, doc, getDocs } from "firebase/firestore";
import { listAll, ref } from "firebase/storage";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    // const allPosts = await getDocs(collection(storage, "postImage"));
    // // const allPosts = await getDocs(ref(storage, "postImage"));
    // const saveAllPost = [];
    // allPosts.forEach((doc) => {
    //   saveAllPost.push({ ...doc.data(), id: doc.id });
    //   setPosts(saveAllPost);
    // });
    const folderRef = ref(storage, "postImage");
    const saveAllPost = [];
    listAll(folderRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          saveAllPost.push({...itemRef});
          setPosts(saveAllPost);
        });
      })
      .catch((error) => {
        console.log(error);
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
