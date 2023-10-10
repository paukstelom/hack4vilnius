import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Carousel } from "react-native-basic-carousel";

import { Center, Divider, HStack, Image, View, Text } from "native-base";
import { Reward } from "../utils/models";
import { useQuery } from "@tanstack/react-query";
import { fetchRewards, redeemReward } from "../utils/requests";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

import { MAINCOLORS } from "../constants/Colors";

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
        opacity="0.1"
        bg="white"
        rounded="full"
        thickness="7"
        orientation="horizontal"
        width="40%"
        alignSelf="center"
        position={"absolute"}
        top={"2%"}
      />
      <View style={styles.topContainer}>
        <View style={styles.topCard}>
          <Text style={{ fontSize: 22, fontStyle: "italic" }}>
            Collected points:
          </Text>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}
          >
            {userData.points.value}
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Carousel
          data={rewardsData}
          renderItem={({ item, index }: { item: Reward; index: number }) => (
            <>
              <View style={styles.rewardCard}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.detail}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Price: {item.points} points
                </Text>

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

                {/* <Image
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
                    size={"70%"}
                    // height={"100%"}
                    // width={"70%"}
                    // position={"absolute"}
                    // alignSelf={"center"}
                    // opacity={0.9}
                    // shadow={3}
                  /> */}
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
    // backgroundColor: "orange",
    backgroundColor: MAINCOLORS.darkmode,
    height: "100%",
  },

  topContainer: {
    flex: 1,
    marginTop: "15%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    // gap: 10,
  },

  bottomContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
    backgroundColor: "transparent",
    height: "50%",
  },

  rewardCard: {
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 10,
    gap: 30,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",

    alignItems: "center",
    paddingTop: "10%",
    marginTop: "20%",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // backgroundColor: "brown",
    backgroundColor: "white",
  },
  topCard: {
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 10,
    gap: 30,
    flexDirection: "column",
    // justifyContent: "space-between",
    width: "80%",
    height: "100%",

    alignItems: "center",
    paddingTop: "10%",

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // backgroundColor: "brown",
    backgroundColor: "white",
  },
  buyButton: {
    backgroundColor: MAINCOLORS.otherblue,
    borderRadius: 10,
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
});
