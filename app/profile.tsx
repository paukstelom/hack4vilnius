import { StyleSheet, TouchableOpacity } from "react-native";

import { Avatar, Center, Divider, Stack, View, Text } from "native-base";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

import { MAINCOLORS } from "../constants/Colors";

// generate array range 10
const badges = Array.from(Array(5).keys());

export default function ProfileScreen() {
  const { userData, refetchUser } = useContext(UserContext);

  return (
    <View style={styles.background}>
      <Divider
        opacity="0.1"
        bg="white"
        rounded="full"
        top="2%"
        thickness="7"
        orientation="horizontal"
        width="40%"
        alignSelf="center"
      />
      <View style={styles.content}>
        <View style={styles.mainDetails}>
          <Text
            style={{
              // font in written style
              fontSize: 14,
              fontStyle: "italic",
              color: "black",
            }}
          >
            Hello,
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              // brown color
              color: "black",
              fontSize: 24,
              lineHeight: 32,
              letterSpacing: -0.015,
            }}
          >
            {userData.name}
          </Text>
        </View>
        <Divider
          opacity="0.2"
          bg="gray.600"
          rounded="full"
          thickness="3"
          orientation="horizontal"
          width="80%"
          alignSelf="center"
          top="2%"
          margin={5}
        />
        <View style={styles.statistics}>
          <Text fontSize={32} style={{ fontSize: 18, fontWeight: "bold" }}>
            Statistics:
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 0,
              marginTop: "3%",
            }}
          >
            <Text fontSize={23} style={{ fontSize: 18, fontStyle: "italic" }}>
              Total points earned: {userData.points.value}
            </Text>
            <Text fontSize={23} style={{ fontSize: 18, fontStyle: "italic" }}>
              Total missions completed: {userData.completed_missions.length}
            </Text>
          </View>
        </View>
        <Divider
          opacity="0.2"
          bg="gray.600"
          rounded="full"
          thickness="3"
          orientation="horizontal"
          width="80%"
          alignSelf="center"
          // top="2%"
          margin={5}
        />

        <View style={styles.badges}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Badges:</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              marginTop: "10%",
              // only 4 in row
              flexWrap: "wrap",
            }}
          >
            {badges.map((badge) => (
              <Avatar
                key={badge}
                bg="purple.600"
                size="lg"
                source={{
                  // random
                  uri: `https://picsum.photos/seed/${badge + 10}/200/300`,
                }}
                style={styles.badgeIcon}
              />
            ))}
          </View>
        </View>
      </View>
      <Avatar
        bg="purple.600"
        size="2xl"
        source={{
          uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
        }}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: MAINCOLORS.darkmode,
    // add inside shadow

    // backgroundColor: "transparent",
  },
  statistics: {
    // backgroundColor: "red",
    width: "100%",
    height: "20%",
  },
  badgeIcon: {
    // add shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.58,
    shadowRadius: 5.0,
  },
  badges: {
    marginTop: "5%",
    // backgroundColor: "blue",
    width: "100%",
    height: "30%",
  },
  content: {
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: "100%",
    width: "90%",
    paddingTop: "20%",
    paddingHorizontal: "10%",
    alignItems: "center",
    alignSelf: "center",
    top: "20%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  mainDetails: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    right: "2%",
    backgroundColor: "transparent",
  },

  avatar: {
    alignSelf: "center",
    position: "absolute",
    top: "10%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.38,
    shadowRadius: 16.0,
  },
});
