import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Button } from "react-native";
import { db, storage } from "../../firebase/config";
import { collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    // const folderRef = ref(storage, "postImage");
    // const saveAllPost = [];
    // listAll(folderRef)
    //   .then((res) => {
    //     res.items.forEach((itemRef,id, data) => {
    //       saveAllPost.push({data, id,});
    //       setPosts(saveAllPost);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const folderRef = ref(storage, "postImage");
    const saveAllPost = [];
    try {
      const items = await listAll(folderRef);
      for (let i = 0; i < items.items.length; i++) {
        const itemRef = items.items[i];
        const downloadUrl = await getDownloadURL(itemRef);
        saveAllPost.push({
          id: doc.id,
          photo: downloadUrl,
          comment: doc.comment,
          location: doc.location,
        });
      }
      setPosts(saveAllPost);
    } catch (error) {
      console.log(error);
    }
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
