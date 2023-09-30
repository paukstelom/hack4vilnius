import { StyleSheet, Image, Text } from 'react-native'
import { View } from '../components/Themed'
import MapView, {
    Callout,
    Geojson,
    LatLng,
    Marker,
    Point
} from 'react-native-maps'
import { Key, useContext, useRef } from 'react'
import {
    AlertDialog,
    Box,
    Button,
    FormControl,
    Input,
    Popover, useToast
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import MissionCompletedCallout from '../components/mission_completed_callout'
import MissionCallout from '../components/mission_callout'
import MissionCalloutContent from '../components/mission_callout'
import MissionCompletedCalloutContent from '../components/mission_completed_callout'
import {
    createBikeStand,
    createConstruiction,
    createMission,
    fetchMarkers
} from '../utils/requests'
import { Picker } from '@react-native-picker/picker'

import {
    BikeStandMarker,
    ConstructionMarker,
    MarkerType,
    MissionMarker
} from '../utils/models'
import { useMutation, useQuery } from '@tanstack/react-query'
import ConstructionCalloutContent from '../components/construction_callout'
import React from 'react'
import { UserContext } from '../utils/userContext'

const { vilniusRoads }: any = require('../utils/vilniusgeojson.ts')
const mission_image = require('../assets/images/mission.png')
const completed_mission_image = require('../assets/images/completed.png')
const bike_stand_image = require('../assets/images/bikeStand.png')
const construction_image = require('../assets/images/construction.png')

export default function MapScreen() {
    const toast = useToast()
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedCords, setSelectedCords] = React.useState<LatLng>(
        {} as LatLng
    )
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef(null)
    const { userData, refetchUser } = useContext(UserContext)

    const { data: markersData, refetch: refetchMarkers } = useQuery<
        MarkerType[],
        Error
    >(['markers'], fetchMarkers)

    const createMissionMutation = useMutation(createMission, {
        onSuccess: () => {
            toast.show({ title: 'Mission registered', placement: 'top-left' })
            refetchMarkers()
        }
    })

    const createConsstructionMutation = useMutation(createConstruiction, {
        onSuccess: () => {
            toast.show({ title: 'Construction registered', placement: 'top-left' })
            refetchMarkers()
        }
    })

    const createBikeStandMutation = useMutation(createBikeStand, {
        onSuccess: () => {
            toast.show({ title: 'Bike stand registered', placement: 'top-left' })
            refetchMarkers()
        }
    })

    if (!userData) {
        return null
    }

    if (!markersData) {
        return null
    }

    const mission_markers: MissionMarker[] = markersData.filter(
        (marker) => marker.type === 'MISSION'
    ) as MissionMarker[]

    const construction_markers: ConstructionMarker[] = markersData.filter(
        (marker) => marker.type === 'CONSTRUCTION'
    ) as ConstructionMarker[]

    const bike_stands: BikeStandMarker[] = markersData.filter(
        (marker) => marker.type === 'BIKESTAND'
    ) as BikeStandMarker[]

    // console.log(mission_markers);

    return (
        <>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    userInterfaceStyle='light'
                    showsUserLocation
                    // provider="google"
                    initialRegion={{
                        latitude: 54.6872,
                        longitude: 25.2797,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    onLongPress={(e) => {
                        console.log(e.nativeEvent.coordinate)
                        setSelectedCords(e.nativeEvent.coordinate)
                        setIsOpen(!isOpen)
                    }}
                >
                    <Geojson
                        geojson={vilniusRoads}
                        strokeColor='rgba(255, 80, 0, 1)'
                        strokeWidth={1}
                    />
                    {mission_markers.map((mission: MissionMarker) => (
                        <Marker
                            style={styles.marker}
                            key={mission.id}
                            coordinate={{
                                latitude: mission.coord.lat,
                                longitude: mission.coord.long
                            }}
                        >
                            <Image
                                source={
                                    mission.completed ? completed_mission_image : mission_image
                                }
                                style={{ width: 50, height: 50, marginBottom: 40 }}
                            />

                            {mission.completed ? (
                                <Callout>
                                    <MissionCompletedCalloutContent />
                                </Callout>
                            ) : (
                                <Callout>
                                    <MissionCalloutContent
                                        mission={mission}
                                        refetch={() => {
                                            refetchMarkers()
                                            refetchUser()
                                        }}
                                    />
                                </Callout>
                            )}
                        </Marker>
                    ))}

                    {bike_stands.map((bike_stand: BikeStandMarker) => (
                        <Marker
                            style={styles.marker}
                            key={bike_stand.id}
                            coordinate={{
                                latitude: bike_stand.coord.lat,
                                longitude: bike_stand.coord.long
                            }}
                        >
                            <Image
                                source={bike_stand_image}
                                style={{ width: 20, height: 20 }}
                            />
                            <Callout style={{ width: 160 }}>
                                <Text>A bike stand for {bike_stand.capacity} bikes</Text>
                            </Callout>
                        </Marker>
                    ))}
                    {construction_markers.map(
                        (construction_location: ConstructionMarker) => (
                            <Marker
                                style={styles.marker}
                                key={construction_location.id}
                                coordinate={{
                                    latitude: construction_location.coord.lat,
                                    longitude: construction_location.coord.long
                                }}
                            >
                                <Image
                                    source={construction_image}
                                    style={{ width: 35, height: 35 }}
                                />
                                <Callout>
                                    <ConstructionCalloutContent
                                        construction={construction_location}
                                    />
                                </Callout>
                            </Marker>
                        )
                    )}
                </MapView>
            </View>
            <View style={styles.buttonArea}>
                <Button
                    bg={'cyan.500'}
                    opacity={0.9}
                    borderWidth={2}
                    bottom={4}
                    borderColor={'cyan.600'}
                    style={styles.button}
                    startIcon={
                        <Ionicons
                            name='ios-compass'
                            size={19}
                            color='white'
                            style={styles.buttonIcon}
                        />
                    }
                    borderRadius='3xl'
                    onPress={() => router.push('/store')}
                />
                <Button
                    bg={'cyan.500'}
                    opacity={0.9}
                    borderWidth={2}
                    borderColor={'cyan.600'}
                    style={styles.button}
                    startIcon={
                        <Ionicons
                            name='ios-camera'
                            size={50}
                            color='white'
                            style={styles.buttonIcon}
                        />
                    }
                    borderRadius='3xl'
                    onPress={() => router.push('/camera')}
                />
                <Link href='/profile' asChild>
                    <Button
                        bg={'cyan.500'}
                        opacity={0.9}
                        borderWidth={2}
                        bottom={4}
                        style={styles.button}
                        borderColor={'cyan.600'}
                        startIcon={
                            <Ionicons
                                name='ios-person'
                                size={19}
                                color='white'
                                style={styles.buttonIcon}
                            />
                        }
                        borderRadius='3xl'
                    />
                </Link>

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
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                gap: 10
                            }}
                        >
                            <Text>Selected cords: </Text>
                            <Text>Lat: {selectedCords.latitude} </Text>
                            <Text>Long: {selectedCords.longitude} </Text>

                            <Button
                                colorScheme='danger'
                                onPress={() => {
                                    createMissionMutation.mutate({
                                        coord: {
                                            lat: selectedCords.latitude,
                                            long: selectedCords.longitude
                                        },
                                        points: 300
                                    })
                                    onClose()
                                }}
                            >
                                Create Mission
                            </Button>
                            <Button
                                colorScheme='danger'
                                onPress={() => {
                                    createBikeStandMutation.mutate({
                                        coord: {
                                            lat: selectedCords.latitude,
                                            long: selectedCords.longitude
                                        },
                                        capacity: 10
                                    })
                                    onClose()
                                }}
                            >
                                Create Bike Stand
                            </Button>
                            <Button
                                colorScheme='danger'
                                onPress={() => {
                                    createConsstructionMutation.mutate({
                                        coord: {
                                            lat: selectedCords.latitude,
                                            long: selectedCords.longitude
                                        },
                                        completion_date: new Date()
                                    })
                                    onClose()
                                }}
                            >
                                Create Hazard
                            </Button>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                                <Button
                                    variant='unstyled'
                                    colorScheme='coolGray'
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    map: {
        width: '100%',
        height: '100%'
    },
    buttonIcon: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8
    },
    buttonArea: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    button: {
        borderBottomWidth: 6,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8
    },
    marker: {
        // shadowColor: "black",
        // shadowOffset: {
        //   width: 0,
        //   height: 3,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 4.65,
    }
})
