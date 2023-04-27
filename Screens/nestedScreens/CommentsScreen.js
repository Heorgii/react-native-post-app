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
  TouchableWithoutFeedback,
} from "react-native";
import { useSelector } from "react-redux";
import { db, storage } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { ref } from "firebase/storage";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPost();
  }, []);

  const createPost = async () => {
    const createComment = ref(storage, "postImage/" + postId + "/comments/");
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

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
          <AntDesign
            style={styles.btnSendSVG}
            name="arrowup"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentInp: {
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 178,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 100,
    marginTop: 550,
  },
  btnSend: {
    backgroundColor: "#FF6C00",
    position: "absolute",
    bottom: 8,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSendSVG: {},
});

export default CommentsScreen;
