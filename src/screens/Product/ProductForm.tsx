import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { Picker } from '@react-native-picker/picker';

import { Button, TextInput, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

import { executeQuery } from '../../services/database'

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
        try {
            const res2 = await executeQuery('select * from category', undefined)
            const options = res2.rows._array.map(value => { return { value: value.id, label: value.name } })
            setCategoriesOptions(options)
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro, tente mais tarde.')
        }
    }

    const onRegister = async () => {

        if (!description) {
            Alert.alert('Preencha os campos obrigatórios', 'A descrição é obrigatória')
            return
        } else if (!price) {
            Alert.alert('Preencha os campos obrigatórios', 'O preço é obrigatório')
            return
        } else if (!category) {
            Alert.alert('Preencha os campos obrigatórios', 'A categoria de produtos é obrigatória')
            return
        }

        let res: Object

        try {
            if (!selectedProduct) {
                res = await executeQuery(`INSERT INTO product (description,price,category) VALUES('${description}','${price}', ${category})`, undefined)
            } else {
                res = await executeQuery(`UPDATE product SET description='${description}', price='${price}', category=${category} WHERE id = ${selectedProduct.id}`, undefined)
            }
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro, tente mais tarde.')
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
                {categoriesOptions.map((cat, i) => <Picker.Item key={i} label={cat.label} value={cat.value} />)}
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
