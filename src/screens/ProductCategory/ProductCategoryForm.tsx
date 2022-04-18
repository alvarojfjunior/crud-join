import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

import { fetchTypeSaveSql } from '../../services/database'

const CategoryCategory = ({ setIsModalVisible, selectedCategory, setSelectedCategory }) => {
    const styles = useStyle(createStyle);

    const [name, setName] = useState('')


    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name)
        }
    }, [])

    const onRegister = async () => {
        let res: Object
        if (!selectedCategory) {
            res = await fetchTypeSaveSql(`INSERT INTO category (name) VALUES('${name}')`, undefined)
        } else {
            res = await fetchTypeSaveSql(`UPDATE category SET name='${name}' WHERE id = ${selectedCategory.id}`, undefined)
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
