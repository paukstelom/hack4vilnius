import { StyleSheet, TouchableOpacity } from "react-native";

import { CameraType, Camera } from "expo-camera";
import { Button, View, Text, Image, useToast, Box, Divider } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useRef, useContext } from "react";
import { MAINCOLORS } from "../constants/Colors";

import { UserContext } from "../utils/userContext";

export default function CameraScreen() {
  const { userData, refetchUser, problemImage, setProblemImage } =
    useContext(UserContext);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = useRef<Camera>(null);
  const takePhoto = async () => {
    const camera = cameraRef.current;
    if (!camera) return;
    try {
      const data: any = await camera.takePictureAsync();
      setProblemImage(data.uri);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        // take picture and save it
        // onPictureSaved={onPictureSaved}

        type={CameraType.back}
      >
        <View
          style={{
            width: "5%",
            height: "100%",
            ...styles.overlayer,
          }}
        ></View>
        <View
          style={{
            width: "90%",
            height: "100%",
          }}
        >
          <View
            style={{
              height: "15%",
              width: "100%",

              alignItems: "center",
              ...styles.overlayer,
            }}
          >
            <Divider
              opacity="0.2"
              bg="white"
              rounded="full"
              height={2}
              position={"absolute"}
              top="10%"
              // thickness={20}
              orientation="horizontal"
              width="50%"
              alignSelf="center"
            />
            <Text
              style={{
                paddingTop: "20%",
                ...styles.text,
              }}
            >
              Capture the area
            </Text>
          </View>
          <View shadow={10} style={styles.topContainer}></View>
          <View
            style={{
              height: "25%",
              width: "100%",
              ...styles.overlayer,
            }}
          ></View>
          <View
            // paddingX={"8%"}
            bottom={"1%"}
            position="absolute"
            // alignSelf="center"

            alignItems={"center"}
            // alignContent={"center"}
            // justifyContent="center"
            style={{
              height: "25%",
              width: "100%",
              flexDirection: "column",
              // justifyContent: "space-between",
              paddingTop: "8%",
              gap: 10,
            }}
          >
            <Button
              // size={"lg"}
              style={styles.button}
              bg={MAINCOLORS.otherblue}
              paddingLeft={6}
              paddingRight={6}
              startIcon={
                <Ionicons
                  name="ios-camera"
                  size={32}
                  color="white"

                  // style={styles.buttonIcon}
                />
              }
              onPress={() => (takePhoto(), router.push("/photo"))}
            >
              <Text
                style={{
                  paddingTop: 5,
                  ...styles.text,
                }}
              >
                Capture
              </Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            width: "5%",
            height: "100%",
            ...styles.overlayer,
          }}
        ></View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  overlayer: {
    backgroundColor: MAINCOLORS.darkmode,
    opacity: 0.9,
  },

  camera: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },

  topContainer: {
    // borderWidth: 1,
    // borderRadius: 10,
    borderColor: "white",
    // dashed

    // long dashes
    borderStyle: "dashed",
    // backgroundColor: "red",
    width: "100%",
    height: "60%",
    opacity: 0.2,

    // fill shadow 200px
    shadowColor: "black",
    // add shadow
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5.0,
    overflow: "visible",

    // overflow: "visible",
  },

  button: {
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },

  text: {
    fontSize: 24,

    color: "white",
    paddingLeft: 5,
  },
});
