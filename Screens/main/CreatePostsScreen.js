import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    console.log("location", location);
    setPhoto(uri);
  };

  const sendPhoto = () => {
    navigation.navigate("DefaultPostScreen", { photo });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCamera(ref);
        }}
      >
        <TouchableOpacity style={styles.tackPht} onPress={takePhoto}>
          <FontAwesome name="camera" size={24} color="white" />
        </TouchableOpacity>
        {photo && (
          <View style={styles.imageBox}>
            <Image source={{ uri: photo }} />
          </View>
        )}
      </Camera>
      <Text style={styles.text}>Upload a photo</Text>

      <View>
        <TextInput style={styles.cameraInp} type="text" placeholder="Name..." />

        <View>
          <Ionicons
            name="location-outline"
            style={styles.locationIcon}
            size={24}
            color="#BDBDBD"
          />
          <TextInput
            style={styles.cameraInp2}
            type="text"
            placeholder="Location"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.publishBtn} onPress={sendPhoto}>
        <Text style={styles.publish}>Publish</Text>
      </TouchableOpacity>

      <View style={styles.deleteBox}>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteText}>
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </Text>
        </TouchableOpacity>
      </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tackPht: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  text: {
    textAlign: "left",
  },
  publishBtn: {
    marginTop: 32,
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
  cameraInp: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingRight: 257,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 32,
  },
  cameraInp2: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingRight: 220,
    paddingLeft: 28,
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 32,
  },
  locationIcon: {
    position: "absolute",
    top: 40,
  },
  deleteBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    width: 70,
    height: 40,
    marginTop: 120,
  },
  deleteText: {},
});

export default CreatePostsScreen;
