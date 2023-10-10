import { createContext } from "react";
import { AppUser } from "./models";

export const UserContext = createContext({
    userData: {} as AppUser,
    refetchUser: () => {},
    problemImage: "",
    setProblemImage: (image: string) => {},

});