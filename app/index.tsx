import { StyleSheet, Image, Text, Pressable } from "react-native";
import MapView, {
  Callout,
  Geojson,
  LatLng,
  Marker,
  Point,
} from "react-native-maps";
import { Key, useContext, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  Icon,
  Input,
  Menu,
  Popover,
  Spinner,
  VStack,
  View,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, useFocusEffect } from "expo-router";
import MissionCompletedCallout from "../components/mission_completed_callout";
import MissionCallout from "../components/mission_callout";
import MissionCalloutContent from "../components/mission_callout";
import MissionCompletedCalloutContent from "../components/mission_completed_callout";
import {
  createBikeStand,
  createConstruiction,
  createMission,
  fetchMarkers,
} from "../utils/requests";
import { Picker } from "@react-native-picker/picker";

import {
  AirPressureMarker,
  BikeStandMarker,
  ConstructionMarker,
  Cords,
  MarkerType,
  MissionMarker,
  ModalineMarker,
  WaterMarker,
} from "../utils/models";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { UserContext } from "../utils/userContext";
import MapViewDirections from "react-native-maps-directions";
import BikeStandCalloutContent from "../components/bike_stand";
import WaterMarkerCalloutContent from "../components/water";
import AirMarkerCalloutContent from "../components/air";
import ConstructionMarkerCalloutContent from "../components/construction";

import { MAINCOLORS } from "../constants/Colors";

import ModalineCalloutContent from "../components/modaline";
import * as Location from "expo-location";

const { vilniusRoads }: any = require("../utils/vilniusgeojson.ts");
// const mission_image = require("../assets/images/mission2.png");
const mission_image = require("../assets/images/orangemission.png");

const completed_mission_image = require("../assets/images/completed.png");
const bike_stand_image = require("../assets/images/bikeStand2.png");
const construction_image = require("../assets/images/dangerou.png");
const water_image = require("../assets/images/water.png");
const air_image = require("../assets/images/air.png");
const modaline_image = require("../assets/images/modal.png");

type Directions = {
  origin: LatLng;
  destination: LatLng;
};

export default function MapScreen() {
  const toast = useToast();

  const [region, setRegion] = React.useState({
    latitude: 54.6872,
    longitude: 25.2797,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCords, setSelectedCords] = React.useState<LatLng>(
    {} as LatLng
  );

  const GOOGLE_MAPS_APIKEY = "AIzaSyCd_WCF0KEDjfsxWi_BViCCpTTh9uNGnHc";
  const [directions, setDirections] = React.useState<Directions | undefined>(
    undefined
  );
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const { userData, refetchUser } = useContext(UserContext);

  const { data: markersData, refetch: refetchMarkers } = useQuery<
    MarkerType[],
    Error
  >(["markers"], fetchMarkers);

  const { mutateAsync: createMissionMutation, isLoading: isCreatingMission } =
    useMutation(createMission, {
      onSuccess: () => {
        toast.show({ title: "Mission registered", placement: "top-left" });
        refetchMarkers();
      },
    });

  const {
    mutateAsync: createConsstructionMutation,
    isLoading: isCreatingConstruction,
  } = useMutation(createConstruiction, {
    onSuccess: () => {
      toast.show({ title: "Construction registered", placement: "top-left" });
      refetchMarkers();
    },
  });

  const {
    mutateAsync: createBikeStandMutation,
    isLoading: isCreatingBikeStand,
  } = useMutation(createBikeStand, {
    onSuccess: () => {
      toast.show({ title: "Bike stand registered", placement: "top-left" });
      refetchMarkers();
    },
  });

  const [currentLocation, setCurrentLocation] = useState<any>();
  const [initialRegion, setInitialRegion] = useState<any>();

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  useFocusEffect(() => {
    refetchMarkers();
  });

  if (!userData || !markersData || !initialRegion) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // opacity: 0.5,
          position: "absolute",
          backgroundColor: "black",
          width: "100%",
          height: "100%",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
          <Spinner size="lg" />
        </Text>
      </View>
    );
  }

  //   if (isCreatingMission || isCreatingBikeStand || isCreatingConstruction) {
  //     return (
  //       <View style={styles.container}>
  //         <View
  //           style={{
  //             flex: 1,
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
  //             Loading...
  //           </Text>
  //         </View>
  //       </View>
  //     );
  //   }

  const mission_markers: MissionMarker[] = markersData.filter(
    (marker) => marker.type === "MISSION"
  ) as MissionMarker[];

  const construction_markers: ConstructionMarker[] = markersData.filter(
    (marker) => marker.type === "CONSTRUCTION"
  ) as ConstructionMarker[];

  const bike_stands: BikeStandMarker[] = markersData.filter(
    (marker) => marker.type === "BIKESTAND"
  ) as BikeStandMarker[];

  const water_fountains: WaterMarker[] = markersData.filter(
    (marker) => marker.type === "WATER"
  ) as WaterMarker[];

  const air_pumps: AirPressureMarker[] = markersData.filter(
    (marker) => marker.type === "AIR_PUMP"
  ) as AirPressureMarker[];

  const modalines_aiksteles: ModalineMarker[] = markersData.filter(
    (marker) => marker.type === "MODULAR"
  ) as ModalineMarker[];

  // console.log(mission_markers);

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsCompass={false}
          // showsMyLocationButton
          userInterfaceStyle="dark"
          showsBuildings={false}
          showsUserLocation
          // ref={_map}
          // mapPadding={20}
          showsPointsOfInterest={false}
          mapType="mutedStandard"
          // provider="google"
          initialRegion={initialRegion}
          onLongPress={(e) => {
            console.log(e.nativeEvent.coordinate);
            setSelectedCords(e.nativeEvent.coordinate);
            setIsOpen(!isOpen);
          }}
        >
          <Geojson
            geojson={vilniusRoads}
            // strokeColor="rgba(255, 80, 0, 1)"
            strokeColor={MAINCOLORS.yellow}
            strokeWidth={0.4}
          />
          {mission_markers.map((mission: MissionMarker) => (
            <Marker
              key={mission.id}
              coordinate={{
                latitude: mission.coord.lat,
                longitude: mission.coord.long,
              }}
            >
              <Image
                source={
                  mission.completed ? completed_mission_image : mission_image
                }
                style={{ width: 32, height: 60, marginBottom: 40 }}
              />

              {mission.completed ? (
                <Callout
                  tooltip
                  style={{
                    borderRadius: 20,
                    paddingRight: 7,
                    paddingLeft: 7,
                    backgroundColor: "white",
                    // backdrop
                    borderWidth: 2,
                    borderColor: "#232851",
                    marginBottom: 50,
                  }}
                >
                  <MissionCompletedCalloutContent />
                </Callout>
              ) : (
                <Callout tooltip style={styles.callout}>
                  <MissionCalloutContent
                    currentLocation={{
                      lat: currentLocation.latitude,
                      long: currentLocation.longitude,
                    }}
                    mission={mission}
                    refetch={() => {
                      refetchMarkers();
                      refetchUser();
                    }}
                  />
                </Callout>
              )}
            </Marker>
          ))}

          {bike_stands.map((bike_stand: BikeStandMarker) => (
            <Marker
              key={bike_stand.id}
              coordinate={{
                latitude: bike_stand.coord.lat,
                longitude: bike_stand.coord.long,
              }}
            >
              <Image
                source={bike_stand_image}
                style={{ width: 25, height: 25 }}
              />
              <Callout tooltip style={styles.callout}>
                <BikeStandCalloutContent
                  bike_stand={bike_stand}
                  currentLocation={{
                    lat: currentLocation.latitude,
                    long: currentLocation.longitude,
                  }}
                />
              </Callout>
            </Marker>
          ))}
          {water_fountains.map((bike_stand: WaterMarker) => (
            <Marker
              key={bike_stand.id}
              coordinate={{
                latitude: bike_stand.coord.lat,
                longitude: bike_stand.coord.long,
              }}
            >
              <Image source={water_image} style={{ width: 25, height: 25 }} />
              <Callout tooltip style={styles.callout}>
                <WaterMarkerCalloutContent
                  currentLocation={{
                    lat: currentLocation.latitude,
                    long: currentLocation.longitude,
                  }}
                  bike_stand={bike_stand}
                />
              </Callout>
            </Marker>
          ))}
          {air_pumps.map((bike_stand: AirPressureMarker) => (
            <Marker
              key={bike_stand.id}
              coordinate={{
                latitude: bike_stand.coord.lat,
                longitude: bike_stand.coord.long,
              }}
              // onPress={onMarkerClicked}
            >
              <Image source={air_image} style={{ width: 25, height: 25 }} />
              <Callout tooltip style={styles.callout}>
                <AirMarkerCalloutContent
                  currentLocation={{
                    lat: currentLocation.latitude,
                    long: currentLocation.longitude,
                  }}
                  bike_stand={bike_stand}
                />
              </Callout>
            </Marker>
          ))}
          {modalines_aiksteles.map((bike_stand: ModalineMarker) => (
            <Marker
              key={bike_stand.id}
              coordinate={{
                latitude: bike_stand.coord.lat,
                longitude: bike_stand.coord.long,
              }}
            >
              <Image
                source={modaline_image}
                style={{ width: 30, height: 30 }}
              />
              <Callout tooltip style={styles.callout}>
                <ModalineCalloutContent
                  bike_stand={bike_stand}
                  currentLocation={{
                    lat: currentLocation.latitude,
                    long: currentLocation.longitude,
                  }}
                />
              </Callout>
            </Marker>
          ))}

          {construction_markers.map(
            (construction_location: ConstructionMarker) => (
              <Marker
                key={construction_location.id}
                coordinate={{
                  latitude: construction_location.coord.lat,
                  longitude: construction_location.coord.long,
                }}
                // zoom to marker
              >
                <Image
                  source={construction_image}
                  style={{ width: 30, height: 30 }}
                />
                <Callout tooltip style={styles.callout}>
                  <ConstructionMarkerCalloutContent
                    bike_stand={construction_location}
                  />
                </Callout>
              </Marker>
            )
          )}
        </MapView>
      </View>
      <View style={styles.topButtonArea}>
        <View width="80%" height={44} style={styles.shadow}>
          <Input
            width="100%"
            height="100%"
            onTouchCancel={() => {}}
            placeholder="Search for directions"
            isDisabled
            variant="filled"
            // isDisabled
            borderRadius="14"
            // py="1"

            // px="2"
            pl={2}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
          />
        </View>

        <Menu
          borderRadius={10}
          backgroundColor={MAINCOLORS.otherblue}
          marginRight={10}
          // borderWidth={2}
          // borderColor={"#395aa5"}
          // w="30%"
          _backdrop={{
            // blur
            bg: "black",
            opacity: 0.3,
          }}
          style={styles.shadow}
          placement="bottom left"
          offset={12}
          trigger={(triggerProps) => {
            return (
              <View style={styles.shadow}>
                <Button
                  bg={MAINCOLORS.otherblue}
                  // opacity={1}
                  height={44}
                  // opacity={0.9}
                  // bottom={4}
                  startIcon={
                    <Ionicons name="ios-list" size={20} color="white" />
                  }
                  borderRadius={14}
                  {...triggerProps}
                >
                  {/* <Text
                    style={{
                      color: "white",
                    }}
                  >
                    Menu
                  </Text> */}
                </Button>
              </View>
            );
          }}
        >
          <Menu.Item
            onPress={() => router.push("/profile")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons
              name="ios-person"
              size={20}
              // very dark red
              color="white"
            />
            <Text
              style={{
                color: "white",
              }}
            >
              Profile
            </Text>
          </Menu.Item>
          <Divider
            style={{
              backgroundColor: "white",
              width: "80%",
              opacity: 0.2,
              alignSelf: "center",
            }}
          />
          <Menu.Item
            onPress={() => router.push("/store")}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons
              name="ios-cart"
              size={20}
              // very dark red
              color="white"
            ></Ionicons>
            <Text
              style={{
                color: "white",
              }}
            >
              Redeem points
            </Text>
          </Menu.Item>
          <Divider
            style={{
              backgroundColor: "white",
              width: "80%",
              opacity: 0.2,
              alignSelf: "center",
            }}
          />
          <Menu.Item
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons
              name="ios-settings"
              size={20}
              // very dark red
              color="white"
            />
            <Text
              style={{
                color: "white",
              }}
            >
              Settings
            </Text>
          </Menu.Item>
        </Menu>
      </View>
      <View style={styles.buttonArea}>
        <Button
          bg={MAINCOLORS.otherblue}
          // opacity={1}
          // opacity={0.9}
          // borderWidth={1}
          // borderColor={MAINCOLORS.darkblue}
          paddingRight={6}
          paddingLeft={6}
          style={styles.shadow}
          startIcon={<Ionicons name="ios-camera" size={32} color="white" />}
          borderRadius={14}
          onPress={() => router.push("/camera")}
        >
          <Text
            style={{
              fontSize: 24,
              color: "white",
              paddingLeft: 5,
            }}
          >
            Report an issue
          </Text>
        </Button>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Developer Options</AlertDialog.Header>
            <AlertDialog.Body
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text>Selected cords: </Text>
              <Text>Lat: {selectedCords.latitude} </Text>
              <Text>Long: {selectedCords.longitude} </Text>

              <Button
                colorScheme="danger"
                onPress={() => {
                  createMissionMutation({
                    coord: {
                      lat: selectedCords.latitude,
                      long: selectedCords.longitude,
                    },
                    points: 300,
                  });
                  onClose();
                }}
              >
                Create Mission
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  createBikeStandMutation({
                    coord: {
                      lat: selectedCords.latitude,
                      long: selectedCords.longitude,
                    },
                    capacity: 10,
                  });
                  onClose();
                }}
              >
                Create Bike Stand
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  createConsstructionMutation({
                    coord: {
                      lat: selectedCords.latitude,
                      long: selectedCords.longitude,
                    },
                    completion_date: new Date(),
                  });
                  onClose();
                }}
              >
                Create Hazard
              </Button>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </View>
      {isCreatingBikeStand || isCreatingConstruction || isCreatingMission ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.5,
            position: "absolute",
            backgroundColor: "black",
            width: "100%",
            height: "100%",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            <Spinner size="lg" />
          </Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    background: "transparent",
    padding: 20,
    paddingBottom: 5,
  },

  buttonArea: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  topButtonArea: {
    position: "absolute",
    top: 45,
    padding: 30,

    width: "100%",
    height: 200,
    // right: "35%",
    // right: 160,
    // justifyContent: "flex-start",
    flexDirection: "row",
    // alignItems: "center",
    // alignContent: "center",
    justifyContent: "space-between",
    // backgroundColor: "transparent",
  },
  shadow: {
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
});
