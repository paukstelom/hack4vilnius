import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { CameraType, Camera } from "expo-camera";
import { Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.text}>Request permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back}>
        <TouchableOpacity>
          <Button
            size={"sm"}
            bg={"transparent"}
            style={styles.backButton}
            onPress={() => router.push("/")}
          >
            <Ionicons
              name="ios-arrow-back"
              size={30}
              color="white"
              style={styles.buttonIcon}
            />
          </Button>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Button
              bg={"transparent"}
              opacity={0.9}
              borderWidth={4}
              style={styles.button}
              borderColor={"cyan.600"}
              size={"sm"}
              startIcon={
                <Ionicons
                  name="ios-camera"
                  size={30}
                  color="white"
                  style={styles.buttonIcon}
                />
              }
              borderRadius="full"
              onPress={() => router.push("/")}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  camera: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  backButton: {
    width: 50,
    // height: 40,
    borderRadius: 100,
    opacity: 0.7,
    top: "10%",
    left: "10%",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 100,
    justifyContent: "center",
    // top
    alignItems: "flex-start",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 100,
    justifyContent: "center",
    // bottom
    alignItems: "flex-end",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    opacity: 0.7,
  },
  buttonIcon: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
