import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider, Switch } from "react-native-paper";
import { Theme } from "react-native-paper/lib/typescript/types";

import Navigation from "_navigation";
import { MaterialIcons } from "_components";
import { useAndroidNavigationBar, useCachedResources } from "_hooks/utils";
import Themes from "_styles/themes";
import { useEffect, useState } from "react";
import DatabaseInit from './src/database/init';

const paperSettings = {
    icon: MaterialIcons,
};

export default function App() {
    const [theme, setTheme] = useState(Themes.light)
    const [isDark, setIsDark] = useState(false)

    useEffect(()=>{
        new DatabaseInit();
    },[])

    const onChengeTheme = (value: any) => {
        setIsDark(value)
        setTheme(value ? Themes.dark : Themes.light)
    }

    /** HOOKS **/
    const loaded = useCachedResources();
    useAndroidNavigationBar(theme.colors.background);

    if (!loaded) return null;

    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme as Theme} settings={paperSettings}>
                <StatusBar
                    style="dark"
                    translucent={true}
                    backgroundColor="transparent"
                />
                <Switch
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        top: 10,
                        marginTop: 10,
                        zIndex: 1
                    }}
                    color={theme.colors.primary}
                    value={isDark}
                    onValueChange={onChengeTheme} />
                <Navigation />
            </PaperProvider>
        </SafeAreaProvider>
    );
}
