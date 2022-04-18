import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

import { executeQuery } from '../../services/database'

const CategoryCategory = ({ setIsModalVisible, selectedCategory, setSelectedCategory }) => {
    const styles = useStyle(createStyle);

    const [name, setName] = useState('')


    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name)
        }
    }, [])

    const onRegister = async () => {
        if (!name) {
            Alert.alert('Preencha os campos obrigatórios', 'A descrição é obrigatória')
            return
        }
        let res: Object
        try {
            if (!selectedCategory) {
                res = await executeQuery(`INSERT INTO category (name) VALUES('${name}')`, undefined)
            } else {
                res = await executeQuery(`UPDATE category SET name='${name}' WHERE id = ${selectedCategory.id}`, undefined)
            }
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro, tente mais tarde.')
        }
        setSelectedCategory(undefined)
        setIsModalVisible(false)
    }

    const onCancel = () => {
        setIsModalVisible(false)
        setSelectedCategory(undefined)
    }


    return (
        <View style={styles.screen}>
            <Title style={styles.modalTitle}> Categoria de Produtos </Title>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(name) => setName(name)}
                placeholder="Nome da Categoria"
            />

            <View style={styles.bottonsContainer}>
                <Button
                    style={styles.buttonCancel}
                    icon="check_circle"
                    mode="contained"
                    onPress={onCancel}
                > Cancelar </Button>
                <Button
                    style={styles.buttonSave}
                    icon="check_circle"
                    mode="contained"
                    onPress={onRegister}
                > Salvar </Button>
            </View>
        </View>
    );
};

export default CategoryCategory;
