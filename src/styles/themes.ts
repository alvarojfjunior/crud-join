import { DefaultTheme, DarkTheme } from "react-native-paper";
import Colors from "./colors";
import * as Typography from "./typography";

const fonts = {
    light: {
        fontFamily: Typography.MEDIUM,
        fontWeight: Typography.FONT_WEIGHT_REGULAR,
    },
    thin: {
        fontFamily: Typography.MEDIUM,
        fontWeight: Typography.FONT_WEIGHT_REGULAR,
    },
    regular: {
        fontFamily: Typography.MEDIUM,
        fontWeight: Typography.FONT_WEIGHT_REGULAR,
    },
    medium: {
        fontFamily: Typography.MEDIUM,
        fontWeight: Typography.FONT_WEIGHT_MEDIUM,
    },
    bold: {
        fontFamily: Typography.BOLD,
        fontWeight: Typography.FONT_WEIGHT_BOLD,
    },
};

export const light = {
    ...DefaultTheme,

    mode: "adaptive",
    scheme: "light",

    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        ...Colors.light,
    },
    fonts,
};

export const dark = {
    ...DarkTheme,

    mode: "adaptive",
    scheme: "dark",

    roundness: 4,
    colors: {
        ...DarkTheme.colors,
        ...Colors.dark,
    },
    fonts,
};

export type Theme = typeof light;

export default { light, dark };
