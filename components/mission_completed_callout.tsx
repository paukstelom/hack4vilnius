import { Callout } from "react-native-maps";
import { StyleSheet } from "react-native";

import { Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function MissionCompletedCalloutContent() {
  return (
    <View style={styles.base}>
      <Text>You have completed this mission on: 2021-10-10</Text>
      <View>
        {/* icon okay */}
        <Ionicons name="checkmark-circle-outline" style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    gap: 6,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 210,
  },
  icon: {
    fontSize: 40,
    color: "green",
  },
});
