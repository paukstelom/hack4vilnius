import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Carousel } from "react-native-basic-carousel";

import { Center, Divider, HStack, Image, View, Text } from "native-base";
import { Reward } from "../utils/models";
import { useQuery } from "@tanstack/react-query";
import { fetchRewards, redeemReward } from "../utils/requests";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

const bikePhoto = require("../assets/images/bike.png");
const helmetPhoto = require("../assets/images/helmetpic.png");
const lockPhoto = require("../assets/images/lock.png");
const ticketPhoto = require("../assets/images/ticket.png");

export default function StoreScreen() {
  const { userData, refetchUser } = useContext(UserContext);
  const { data: rewardsData, refetch: refetchRewards } = useQuery<
    Reward[],
    Error
  >(["rewards"], fetchRewards);

  if (!rewardsData) {
    return null;
  }

  rewardsData.sort((a, b) => {
    return a.points - b.points;
  });

  return (
    <View style={styles.background}>
      <Divider
        opacity="0.2"
        bg="gray.600"
        rounded="full"
        thickness="7"
        orientation="horizontal"
        width="40%"
        alignSelf="center"
        position={"absolute"}
        top={"2%"}
      />
      <View style={styles.topContainer}>
        <Text style={{ fontSize: 24, fontStyle: "italic" }}>
          Collected points:
        </Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", fontStyle: "italic" }}>
          {userData.points.value}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <Carousel
          data={rewardsData}
          renderItem={({ item, index }: { item: Reward; index: number }) => (
            <>
              <View style={styles.cardWrapper}>
                <View style={styles.rewardCard}>
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                      {item.detail}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      Price: {item.points}
                    </Text>
                  </View>

                  <View style={styles.buyButton}>
                    <TouchableOpacity
                      disabled={userData.points.value < item.points}
                      onPress={() => {
                        redeemReward(item.id);
                        refetchRewards();
                        refetchUser();
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {item.redeemed
                          ? "Already redeemed"
                          : userData.points.value < item.points
                          ? "Not enough points"
                          : "Redeem"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.photoWrapper}>
                  <Image
                    source={
                      item.detail === "BIKE"
                        ? bikePhoto
                        : item.detail === "HELMET"
                        ? helmetPhoto
                        : item.detail === "BIKELOCK"
                        ? lockPhoto
                        : ticketPhoto
                    }
                    alt={item.detail}
                    // size={"90%"}
                    height={"60%"}
                    width={"80%"}
                    // position={"absolute"}
                    // alignSelf={"center"}
                    // opacity={0.9}
                    // shadow={3}
                  />
                </View>
              </View>
            </>
          )}
          // pagination
          itemWidth={Dimensions.get("window").width}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    justifyContent: "center",
    backgroundColor: "orange",
    height: "100%",
  },
  image: {
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.58,
    shadowRadius: 3.0,
  },
  topContainer: {
    flex: 1,
    marginTop: "15%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  cardWrapper: {
    backgroundColor: "transparent",
    alignItems: "center",
    height: "65%",
  },
  photoWrapper: {
    backgroundColor: "transparent",
    position: "absolute",
    // top: "%",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  rewardCard: {
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 30,
    gap: 30,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
    height: "80%",

    alignItems: "center",
    paddingTop: "30%",
    marginTop: "30%",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    backgroundColor: "brown",
    opacity: 0.6,
  },
  buyButton: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    // small shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.58,
    shadowRadius: 3.0,
  },

  bottomContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    backgroundColor: "transparent",
    height: "70%",
  },
});
