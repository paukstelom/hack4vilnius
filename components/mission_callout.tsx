import { Callout, LatLng } from "react-native-maps";
import { Button, Icon, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Cords, MissionMarker } from "../utils/models";
import { updateMission } from "../utils/requests";
import { calculateDistance } from "../utils/distance";
import { MAINCOLORS } from "../constants/Colors";

export default function MissionCalloutContent({
  mission,
  refetch,
  currentLocation,
}: {
  mission: MissionMarker;
  refetch: any;
  currentLocation: Cords;
}) {
  const distance = calculateDistance(currentLocation, mission.coord);

  return (
    <View style={styles.base}>
      <View style={styles.topContent}>
        <View style={{ paddingLeft: 7 }}>
          <Text
            fontWeight={"bold"}
            color={"white"}

            // fontStyle={"italic"}
          >
            Mission
          </Text>
          <Text color={"white"}>Reward: {mission.points} points</Text>
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
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <Text color={"white"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor
          semper nisl, tincidunt nunc.
        </Text>

        {/* <Text color={"white"}>* Bullpoint4</Text> */}
      </View>

      <View
        style={{
          width: "100%",

          justifyContent: "flex-start",

          gap: 10,
        }}
      >
        <Button
          // disabled
          // opacity={0.9}
          // borderWidth={1}
          style={{
            backgroundColor: MAINCOLORS.darkblue,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
            borderRadius: 10,

            paddingRight: 20,
            paddingLeft: 20,
            // height: "20%",

            // width: "60%",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.58,
            shadowRadius: 3.0,
          }}
          startIcon={<Ionicons name="ios-camera" size={22} color="white" />}
          borderRadius={"md"}
          onPress={() => {
            router.push("/camera");
            refetch();
            updateMission(mission.id);
          }}
        >
          <Text
            style={{
              fontSize: 16,
              // fontWeight: "bold",
              paddingLeft: 5,
              color: "white",
            }}
          >
            Capture the location
          </Text>
        </Button>
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
    width: 250,
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

  buttonIcon: {},

  shadow: {
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
