import { StyleSheet, TouchableOpacity } from "react-native";

import {
  Avatar,
  Center,
  Divider,
  Stack,
  View,
  Text,
  Button,
  Checkbox,
  VStack,
  HStack,
  Image,
  TextArea,
  Spinner,
  useToast,
  CheckIcon,
  Select,
  FormControl,
  WarningOutlineIcon,
  Box,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/userContext";
import { Ionicons } from "@expo/vector-icons";

import { MAINCOLORS } from "../constants/Colors";

import { router, useLocalSearchParams } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import { useMutation } from "@tanstack/react-query";
import { createBikeStand } from "../utils/requests";
import * as Location from "expo-location";

// generate array range 10
const possible_markers = ["Water tap", "Air pump", "Bike stand"];
const possible_issues = ["Pothole", "Lighting", "Signs", "Other"];

export default function PhotoScreen() {
  const toast = useToast();

  const [currentLocation, setCurrentLocation] = useState<any>();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    };

    getLocation();
  }, []);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const {
    mutateAsync: createBikeStandMutation,
    isLoading: isCreatingBikeStand,
  } = useMutation(createBikeStand, {
    onSuccess: () => {},
  });

  const { userData, refetchUser, problemImage, setProblemImage } =
    useContext(UserContext);

  return (
    <View style={styles.background}>
      <Divider
        opacity="0.1"
        bg="white"
        rounded="full"
        height={2}
        position={"absolute"}
        top="2%"
        // thickness={20}
        orientation="horizontal"
        width="40%"
        alignSelf="center"
      />
      <Text style={styles.text}>Describe the issue</Text>
      <View style={styles.photoContainer}>
        <View
          style={{
            // backgroundColor: "white",
            flexDirection: "row",
            gap: 14,
            height: "65%",
            paddingTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.photoFrame}>
            {problemImage === "" ? (
              <View
                style={{
                  borderColor: MAINCOLORS.darkblue,
                  borderRadius: 5,
                  borderWidth: 1,
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Spinner size="lg" />
              </View>
            ) : (
              <View style={styles.shadow}>
                <Image
                  alt="photo"
                  source={{ uri: problemImage }}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: 5,
                  }}
                />
              </View>
            )}
          </View>
          <View
            style={{
              width: "40%",
            }}
          >
            <VStack space={6}>
              <Checkbox
                value="red"
                size="sm"
                // set selected option
                onChange={(e) => {
                  setSelectedOption("issue");
                  setSelectedMarker(null);
                  setSelectedIssue(null);
                }}
                isChecked={selectedOption === "issue"}
              >
                Road issue
              </Checkbox>

              <Checkbox
                value="red"
                size="sm"
                onChange={(e) => {
                  setSelectedOption("map");
                  setSelectedMarker(null);
                  setSelectedIssue(null);
                }}
                isChecked={selectedOption === "map"}
              >
                Unmarked spot
              </Checkbox>
              <Checkbox
                value="red"
                size="sm"
                onChange={(e) => {
                  setSelectedOption("other");
                  setSelectedMarker(null);
                  setSelectedIssue(null);
                }}
                isChecked={selectedOption === "other"}
              >
                Other
              </Checkbox>

              <Divider width={"90%"} />
              {selectedOption === "map" || selectedOption === "issue" ? (
                <SelectDropdown
                  // disabled={true}
                  data={
                    selectedOption === "map"
                      ? possible_markers
                      : possible_issues
                  }
                  buttonStyle={{
                    borderRadius: 5,
                    borderWidth: 0.7,
                    height: 30,
                    width: "90%",

                    backgroundColor: "transparent",
                  }}
                  defaultButtonText={
                    selectedOption === "map"
                      ? "Specify marker"
                      : "Specify issue"
                  }
                  rowTextStyle={{
                    // color: "white",
                    fontSize: 14,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  buttonTextStyle={{
                    fontSize: 10,
                  }}
                  rowStyle={{
                    backgroundColor: "white",

                    // borderWidth: 1,
                    borderColor: MAINCOLORS.darkblue,
                    height: 40,

                    justifyContent: "center",
                  }}
                  selectedRowStyle={{
                    backgroundColor: MAINCOLORS.otherblue,
                  }}
                  dropdownStyle={{
                    backgroundColor: "transparent",
                    borderRadius: 10,
                  }}
                  onSelect={(selectedItem) =>
                    selectedOption === "map"
                      ? setSelectedMarker(selectedItem)
                      : setSelectedIssue(selectedItem)
                  }
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              ) : null}
              {/* <Checkbox
                value="green"
                size="sm"
                onChange={(e) => {
                  setSelectedOption("Clear");
                  setSelectedMarker(null);
                  setSelectedIssue(null);
                }}
                isChecked={selectedOption === "Clear"}
              >
                Clear
              </Checkbox> */}
            </VStack>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            // alignContent: "center",
            // justifyContent: "center",
            paddingTop: 30,
            gap: 15,
            padding: 0,
            height: "100%",
            alignItems: "center",
          }}
        >
          <TextArea
            // h={20}
            // height={"100%"}
            placeholder="Additional information"
            w="88%"
            isDisabled
            height={"100%"}
            // h={"40%"}
            // maxW="300"
            borderWidth={1}
            borderRadius={5}
            borderColor={MAINCOLORS.darkblue}
            autoCompleteType={undefined}
          />
        </View>
      </View>

      <Button
        endIcon={<Ionicons name="ios-send" size={30} color="white" />}
        style={styles.submitContainer}
        bg={MAINCOLORS.otherblue}
        onPress={async () => {
          toast.show({
            title: "Report sent successfully!",
            placement: "bottom",
            marginBottom: 40,
            backgroundColor: MAINCOLORS.green,
            borderRadius: 10,
            paddingX: 5,
            style: {
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.5,
              shadowRadius: 4.65,
              elevation: 8,
            },

            // marginTop: 200,
          });

          refetchUser();
          setProblemImage("");
          await createBikeStandMutation({
            // current location
            coord: {
              lat: currentLocation.latitude,
              long: currentLocation.longitude,
            },
            capacity: 2,
          });

          router.push("/");
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            // fontWeight: "bold",
            paddingRight: "5%",
          }}
        >
          Send a report
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: MAINCOLORS.darkmode,
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "20%",
    // add inside shadow

    // backgroundColor: "transparent",
  },
  photoFrame: {
    // borderWidth: 1,
    borderColor: MAINCOLORS.darkblue,
    borderRadius: 10,
    width: "43%",
    // height: "100%",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.0,
  },

  photoContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    height: "65%",
    width: "90%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    marginBottom: "7%",
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
    // gap: 20,

    // gap: 20,
  },

  submitContainer: {
    // backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    height: "9%",

    width: "60%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    marginBottom: "15%",
  },
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "white",
    marginBottom: "7%",
  },
});
