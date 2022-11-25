import { wh, ww } from "./helpers";
import { Platform, StyleSheet } from "react-native";

export const COLORS = {
    main: "#101018",
    white: "#fefefe",
    grayBg: "#15171a",
    textColor: "#dfe0e6",
    disabledColor: "gray",
    grey: "#888",
    softMain: "#28339a",
    secondary: "#bfa543",
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

export const STYLES: any = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            backgroundColor: COLORS.main,
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
        contentText: {
            color: "grey",
            fontFamily: FONTS.medium,
            marginTop:10,
            fontSize:ww(.03),
        },
        title: {
            textAlign: "left",
            color: COLORS.textColor,
            fontFamily: FONTS.bold,
            fontSize:ww(.045)
        },
        buttonText: {
            textAlign:"center",
            color:COLORS.white,
            fontFamily:FONTS.semiBold,
            fontSize:ww(.03)
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
        },
        categoryContainer: {
            marginHorizontal:6,
            borderRadius:8,
            backgroundColor:COLORS.grayBg,
            justifyContent:"center",
            shadowColor: COLORS.grayBg,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            
            elevation: 5,
        },
        categoryText: {
            color:COLORS.grey,
            paddingHorizontal:10,
            fontFamily:FONTS.bold,
            fontSize:ww(.03),
        }
    }
)
