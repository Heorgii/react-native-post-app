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
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync({});
    // const address = await Location.reverseGeocodeAsync(location.coords);
    // console.log("address", address);
    // setLocation(address);
    console.log("file", uri);
    setPhoto(uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Posts");
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firesotre()
      .collection("post")
      .add({ photo, comment, location: location.coords, userId, userName });
    return createPost;
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        {photo && (
          <View style={styles.imageBox}>
            <Image source={{ uri: photo }} />
          </View>
        )}
        <TouchableOpacity style={styles.tackPht} onPress={takePhoto}>
          <FontAwesome name="camera" size={24} color="white" />
        </TouchableOpacity>
      </Camera>

      <Text style={styles.text}>Upload a photo</Text>

      <View>
        <TextInput
          style={styles.cameraInp}
          type="text"
          onChangeText={setMessage}
          placeholder="Name..."
        />

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
            value={JSON.stringify(location)}
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
    fontWeight: "400",
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

// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, TouchableOpacity } from "react-native";
// import { Camera } from "expo-camera";

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [camera, setCamera] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (camera) {
//       const data = await camera.takePictureAsync(null);
//       console.log(data.uri);
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera
//         style={{ flex: 1 }}
//         type={Camera.Constants.Type.back}
//         ref={setCamera}
//       >
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "transparent",
//             flexDirection: "row",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: "flex-end",
//               alignItems: "center",
//             }}
//             onPress={takePicture}
//           >
//             <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
//               {" "}
//               Snap{" "}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }
