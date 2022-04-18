import { useEffect, useState } from "react";
import { View } from "react-native";

import { Picker } from '@react-native-picker/picker';

import { Button, TextInput, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

import { fetchTypeSaveSql } from '../../services/database'

const ProductCategory = ({ setIsModalVisible, selectedProduct, setSelectedProduct }: any) => {
    const styles = useStyle(createStyle);

    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [category, setCategory] = useState<number>(0)
    const [categoriesOptions, setCategoriesOptions] = useState<DropDownPropsInterface[]>([])

    useEffect(() => {
        getAllCategories()
        if (selectedProduct) {
            setDescription(selectedProduct.description)
            setPrice(selectedProduct.price)
            setCategory(selectedProduct.category)
        }
    }, [])


    const getAllCategories = async () => {
        const res1 = await fetchTypeSaveSql(`INSERT INTO category (name) VALUES ('Teste')`, undefined)
        const res2 = await fetchTypeSaveSql('select * from category', undefined)
        const options = res2.rows._array.map(value => { return { value: value.id, label: value.name } })
        setCategoriesOptions(options)
    }

    const onRegister = async () => {
        let res: Object
        if (!selectedProduct) {
            res = await fetchTypeSaveSql(`INSERT INTO product (description,price,category) VALUES('${description}','${price}', ${category})`, undefined)
        } else {
            res = await fetchTypeSaveSql(`UPDATE product SET description='${description}', price='${price}', category=${category} WHERE id = ${selectedProduct.id}`, undefined)
        }

        setSelectedProduct(undefined)
        setIsModalVisible(false)
    }

    const onCancel = () => {
        setSelectedProduct(undefined)
        setIsModalVisible(false)
    }


    return (
        <View style={styles.screen}>
            <Title style={styles.modalTitle}> Produtos </Title>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={(description) => setDescription(description)}
                placeholder="Descrição"
            />
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={(price) => setPrice(price)}
                placeholder="Preço"
            />
            <Picker
                style={styles.picker}
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                {categoriesOptions.map(cat => <Picker.Item label={cat.label} value={cat.value} />)}
            </Picker>

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

export default ProductCategory;
