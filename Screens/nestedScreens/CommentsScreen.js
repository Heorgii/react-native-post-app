import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPost();
  }, []);

  const createPost = async () => {
    const createComment = doc(collection(db, "posts/" + postId + "/comments/"));
    await setDoc(createComment, {
      comment,
      userName,
    });
  };

  const getAllPost = async () => {
    const allPosts = await getDoc(
      collection(db, "posts/" + postId + "/comments/")
    );
    const saveAllPost = [];
    allPosts.forEach((doc) => {
      saveAllPost.push({ ...doc.data(), id: doc.id });
      setAllComments(saveAllPost);
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.userName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <TextInput
        style={styles.commentInp}
        type="text"
        onChangeText={setComment}
        placeholder="Comment..."
      />
      <TouchableOpacity onPress={createPost} style={styles.btnSend}>
        <Text style={styles.btnSendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  commentInp: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  btnSend: {},
  btnSendText: {},
});

export default CommentsScreen;
