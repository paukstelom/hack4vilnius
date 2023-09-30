import { Callout } from "react-native-maps";
import { Button, Icon, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ConstructionMarker } from "../utils/models";

export default function ConstructionCalloutContent({
  construction,
}: {
  construction: ConstructionMarker;
}) {
  return (
    <View style={styles.base}>
      <View style={styles.topContent}>
        <Text
          fontWeight={"bold"}
          fontSize={18}
          style={{ flex: 1 }}
          // fontStyle={"italic"}
        >
          Construction!
        </Text>
        <View>
          {/* icon construction */}
          <Ionicons
            name="ios-warning"
            size={28}
            color="orange"
            style={styles.buttonIcon}
          />
        </View>
      </View>
      <View>
        <Text>
          Due to renovations, the Gedimino g. is closed. Please use alternative
          route.
        </Text>
      </View>
      <View>
        {/* format dat */}
        <Text>
          Expected completion date:{" "}
          {new Date(construction.completion_date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "column",
    gap: 25,
    paddingLeft: 3,
    paddingRight: 3,
    flex: 1,
    width: 210,
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
