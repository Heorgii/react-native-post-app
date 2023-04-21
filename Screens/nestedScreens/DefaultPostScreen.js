import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, Button } from "react-native";
import { db } from "../../firebase/config";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  // const [local, setLocal] = useState([]);

  const getAllPost = async () => {
    db.firestore()
      .collection("post")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

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
            {/* <Text>{JSON.stringify(local)}</Text> */}
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
                  navigation.navigate("Comments");
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
