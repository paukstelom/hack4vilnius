import {IToastProps} from "native-base";

export const bikeToast = (props: IToastProps): IToastProps => (
    {
        duration: 1,
        placement: "top-left",
        ...props
    }
)