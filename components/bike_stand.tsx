import { Callout } from "react-native-maps";
import { Button, Icon, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BikeStandMarker, ConstructionMarker, Cords } from "../utils/models";
import { calculateDistance } from "../utils/distance";
import { MAINCOLORS } from "../constants/Colors";

export default function BikeStandCalloutContent({
  bike_stand,
  currentLocation,
}: {
  bike_stand: BikeStandMarker;
  currentLocation: Cords;
}) {
  const distance = calculateDistance(currentLocation, bike_stand.coord);

  return (
    <View style={styles.base}>
      <View style={styles.topContent}>
        <View style={{ paddingLeft: 7 }}>
          <Text
            fontWeight={"bold"}
            color={"white"}

            // fontStyle={"italic"}
          >
            Bike stand
          </Text>
          <Text color={"white"}>Capacity: {bike_stand.capacity}</Text>
        </View>
        <View
          style={{
            height: "100%",
            // backgroundColor: "#90be29",
            // borderRadius: 10,
            padding: 2,
            paddingRight: 7,
            paddingLeft: 7,
            // align right
            justifyContent: "flex-end",
            alignItems: "flex-end",
            // darker than yellow
            // borderColor: "#6e9e1d",

            // borderWidth: 2,
            // borderBottomWidth: 4,
            // shadowColor: "black",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            ~{Math.round(distance / 1000) * 10} min
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            {distance < 1000
              ? `${Math.round(distance)} m`
              : `${Math.round(distance / 1000)} km`}
          </Text>
        </View>
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
    width: 240,
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
