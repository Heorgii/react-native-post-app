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

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [local, setLocal] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
      // setLocal((prevState) => [...prevState, route.params.location]);
    }
  }, [route.params]);

  console.log("posts", posts);
  console.log("local", local);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.imageCont} />
            <Text>{JSON.stringify(local)}</Text>
          </View>
        )}
      />

      <Button title="Map" onPress={() => {navigation.navigate("Map")}} />
      <Button
        title="Comments"
        onPress={() => {navigation.navigate("Comments")}}
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
