import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

const DefaultPostsScreen = ({ route, navigation, discr, location }) => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
      // setData((prevState) => [...prevState, discr, loc]);
    }
  }, [route.params]);

  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.imageCont} />
            <Text>{item.location}</Text>
          </View>
        )}
      />

      {/* <Text>{route.discr}</Text> */}

      <Button title="Map" onPress={() => navigation.navigate("MapScreen")} />
      <Button
        title="Comments"
        onPress={() => navigation.navigate("CommentsScreen")}
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
