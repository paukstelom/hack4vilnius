import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { Avatar, Center, Divider, Stack } from "native-base";

export default function ProfileScreen() {
  return (
    <View style={styles.background}>
      <Divider
        opacity="0.2"
        bg="gray.600"
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
            John Doe
          </Text>
        </View>
        {/* <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            lineHeight: 32,
            letterSpacing: -0.015,
          }}
        >
          Total points: 1200
        </Text> */}
        {/* <Divider
          opacity="0.2"
          bg="orange.700"
          rounded="full"
          my={4}
          top="2%"
          thickness="3"
          orientation="horizontal"
          width="100%"
          alignSelf="center"
        /> */}
        <View style={styles.badges}>
          {/* <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Badges:
          </Text> */}
          {/* for range in 3 */}

          {/* <Stack
            direction="row"
            mt="6"
            space={4}
            style={{
              justifyContent: "space-between",
            }}
          >
            <Center
              size="16"
              bg="primary.500"
              rounded="2xl"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Award
            </Center>
            <Center
              bg="success.500"
              size="16"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Badge
            </Center>
            <Center
              size="16"
              bg="primary.700"
              rounded="sm"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Box 3
            </Center>
          </Stack>
          <Stack
            direction="row"
            mt="4"
            space={4}
            style={{
              justifyContent: "space-between",
            }}
          >
            <Center
              size="16"
              bg="danger.400"
              rounded="md"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Prize
            </Center>
            <Center
              bg="primary.500"
              size="16"
              rounded="xl"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Box 2
            </Center>
            <Center
              size="16"
              bg="primary.200"
              rounded="full"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Box 3
            </Center>
          </Stack>
          <Stack
            direction="row"
            mt="4"
            space={4}
            style={{
              justifyContent: "space-between",
            }}
          >
            <Center
              size="16"
              bg="primary.800"
              rounded="full"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Box 1
            </Center>
            <Center
              bg="primary.500"
              size="16"
              rounded="lg"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
              shadow={"3"}
            >
              Box 2
            </Center>
            <Center
              size="16"
              bg="transparent"
              rounded="md"
              _text={{
                color: "warmGray.50",
                fontWeight: "medium",
              }}
            ></Center>
          </Stack> */}
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
    backgroundColor: "orange",
    // add inside shadow

    // backgroundColor: "transparent",
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
  badges: {
    marginTop: "5%",
    backgroundColor: "white",
    opacity: 0.7,
    width: "90%",
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
