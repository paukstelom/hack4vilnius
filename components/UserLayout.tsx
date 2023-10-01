import { Callout } from "react-native-maps";
import { Button, Icon, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppUser, ConstructionMarker } from "../utils/models";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../utils/requests";
import { UserContext } from "../utils/userContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userData, refetch: refetchUser } = useQuery<AppUser, Error>(
    ["user"],
    fetchUser
  );

  if (!userData) {
    return <>{children}</>;
  }

  return (
    <UserContext.Provider value={{ userData, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "column",
    gap: 25,
    paddingLeft: 3,
    paddingRight: 3,
    flex: 1,
    width: 210,
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  buttonIcon: {
    // shadowColor: "black",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4.65,
    // elevation: 8,
  },

  button: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
