import { Button, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { MissionMarker } from '../utils/models'
import { updateMission } from '../utils/requests'

export default function MissionCalloutContent({
                                                  mission,
                                                  refetch
                                              }: {
    mission: MissionMarker;
    refetch: any;
}) {
    return (
        <View style={styles.base}>
            <View style={styles.topContent}>
                <Text
                    fontWeight={'bold'}
                    fontSize={18}
                    style={{ flex: 1 }}
                    // fontStyle={"italic"}
                >
                    Mission!
                </Text>
                <View>
                    {/* icon camera */}
                    <Button
                        bg={'cyan.500'}
                        opacity={0.9}
                        borderWidth={1}
                        style={styles.button}
                        borderColor={'cyan.600'}
                        size={'sm'}
                        startIcon={
                            <Ionicons
                                name='ios-camera'
                                size={18}
                                color='white'
                                style={styles.buttonIcon}
                            />
                        }
                        borderRadius='full'
                        onPress={async () => {
                            refetch()
                            router.replace('/camera')
                            await updateMission(mission.id)
                        }}
                    />
                </View>
            </View>
            <View>
                <Text>
                    We had some reports that one of our bike stands has been vandalized!
                    We need you to capture the crime scene and save the city!
                </Text>
            </View>
            <View>
                <Text>Reward: {mission.points} points</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'column',
        gap: 25,
        paddingLeft: 3,
        paddingRight: 3,
        flex: 1,
        width: 210
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
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

    button: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 4.65,
        elevation: 8
    }
})
