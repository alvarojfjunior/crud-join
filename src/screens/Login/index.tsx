import { useState } from "react";
import { View, Alert } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

const Login = ({ navigation }:any) => {
    const styles = useStyle(createStyle);

    const [username, setUsername] = useState('join')
    const [password, setPassword] = useState('123')

    const onLogin = () => {
        if (username === 'join' && password === '123')
            navigation.navigate('BottomBar')
        else
            Alert.alert('Credenciais Inválidas', 'O Usuario ou senham estão incorretos!')
    }

    return (
        <View style={styles.container}>


            <View style={styles.content}>

                <Title style={styles.title}> Login </Title>

                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <Button
                    style={styles.button}
                    icon="person"
                    mode="contained"
                    onPress={onLogin}
                > Login </Button>

            </View>
        </View >
    );
};

export default Login;
