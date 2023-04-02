import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

const CreatePostsScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPhoto(photo.uri);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <View style={styles.imageBox}>
          <Image source={{ uri: photo }} />
        </View>
        <TouchableOpacity style={styles.publishBtn} onPress={takePhoto}>
          <Text style={styles.publish}>Publish</Text>
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Upload a photo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  camera: {
    width: 380,
    height: 240,
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
  },
  text: {
    textAlign: "left",
  },
  publishBtn: {
    marginTop: 180,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  publish: {
    textAlign: "center",
    paddingHorizontal: 118,
    paddingBottom: 16,
    paddingTop: 16,
    fontFamily: "Roboto",
    fontweight: 400,
    fontsize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  imageBox: {
    // position: "absolute",
    // top: 0,
    // left: 0,

    // width: 380,
    // height: 240,
    // borderRadius: 8,
    borderColor: "red",
  },
});

export default CreatePostsScreen;
