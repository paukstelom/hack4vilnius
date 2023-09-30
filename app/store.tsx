import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Carousel } from "react-native-basic-carousel";

import { Text, View } from "../components/Themed";
import { Center, Divider, HStack, Image } from "native-base";
import { Reward } from "../utils/models";
import { useQuery } from "@tanstack/react-query";
import { fetchRewards, redeemReward } from "../utils/requests";
import { useContext } from "react";
import { UserContext } from "../utils/userContext";

const bikePhoto = require("../assets/images/bike.png");

export default function StoreScreen() {
  const { userData, refetchUser } = useContext(UserContext);
  const { data: rewardsData, refetch: refetchRewards } = useQuery<
    Reward[],
    Error
  >(["rewards"], fetchRewards);

  if (!rewardsData) {
    return null;
  }

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
                    {item.redeemed ? (
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Already redeemed
                      </Text>
                    ) : null}
                  </Text>
                </View>

                <View style={styles.buyButton}>
                  <TouchableOpacity
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
                      Redeem
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                source={bikePhoto}
                alt="bike"
                alignSelf={"center"}
                width={"60%"}
                height={"40%"}
                bottom={"60%"}
                left={"21%"}
                position={"absolute"}
                opacity={0.9}
                shadow={3}
              />
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
    width: "100%",
  },
  topContainer: {
    flex: 1,
    marginTop: "15%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",

    height: "35%",
  },
  rewardCard: {
    marginTop: 100,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 30,
    flexDirection: "column",
    justifyContent: "space-between",
    height: "60%",
    alignItems: "center",
    paddingTop: "30%",

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
    width: "70%",
  },
  buyButton: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "30%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  bottomContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    backgroundColor: "transparent",
    height: "65%",
    width: "100%",
  },
});
