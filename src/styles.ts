import { wh, ww } from "./helpers";
import { Platform } from "react-native";

export const COLORS = {
    main: "#101018",
    white: "#fefefe",
    grayBg: "#15171a",
    textColor: "#dfe0e6",
    disabledColor: "gray",
    grey: "#888",
    softMain: "#28339a",
    secondary: "#fab04a",
    softSecondary: "#aba5d9",
    aqua: "#b7cbf1",
}

export const FONTS = {
    bold: "OpenSans-Bold",
    extraBold: "OpenSans-ExtraBold",
    medium: "OpenSans-Medium",
    regular: "OpenSans-Regular",
    semiBold: "OpenSans-SemiBold",
    light: "OpenSans-Light",
}

export const STYLES: any = {
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.main
    },
    heartLottie: {
        width: 50,
        height: 50,
    },
    text: {
        textAlign: "center",
        color: COLORS.textColor,
        fontFamily: FONTS.medium
    },
    movieCardTitle: {
        textAlign: "center",
        color: COLORS.textColor,
        fontSize: ww(.035),
        fontFamily: FONTS.bold,
        width: ww(.8),
        paddingHorizontal: 10
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
    fullScreen: {
        width: ww(1),
        height: wh(1)
    }
}
