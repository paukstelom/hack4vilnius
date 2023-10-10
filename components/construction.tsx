import { Callout } from "react-native-maps";
import { Button, Icon, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  BikeStandMarker,
  ConstructionMarker,
  Cords,
  WaterMarker,
} from "../utils/models";
import { calculateDistance } from "../utils/distance";
import { MAINCOLORS } from "../constants/Colors";

export default function ConstructionMarkerCalloutContent({
  bike_stand,
}: {
  bike_stand: ConstructionMarker;
}) {
  return (
    <View style={styles.base}>
      <View style={styles.topContent}>
        <View style={{ paddingLeft: 7 }}>
          <Text
            fontWeight={"bold"}
            color={"white"}

            // fontStyle={"italic"}
          >
            Construction
          </Text>
          <Text color={"white"}>
            Closed until: {bike_stand.completion_date.split("T")[0]}
          </Text>
        </View>
        <Ionicons
          name="warning-outline"
          size={42}
          // very light yellow
          color={"#f5f5dc"}
          style={styles.buttonIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "column",
    gap: 25,
    padding: 10,
    // paddingLeft: 3,
    // paddingRight: 3,
    flex: 1,
    width: 270,
    backgroundColor: MAINCOLORS.otherblue,
    borderRadius: 10,
    // shadow
    shadowColor: "black",
    // add shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 8,
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },

  buttonIcon: {
    // shadowColor: "black",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4.65,
    // elevation: 8,
  },

  button: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
