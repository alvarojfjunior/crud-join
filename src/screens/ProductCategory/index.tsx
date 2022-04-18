import { ScrollView } from "react-native";
import { ActivityIndicator, Button, DataTable, FAB, IconButton, Modal, Portal, Text, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

import { ProductCategory as ProductCategoryType } from "_types";

import ProductCategoryForm from '_screens/ProductCategory/ProductCategoryForm'
import { useEffect, useState } from "react";
import { executeQuery } from '../../services/database'
import { SafeAreaView } from "react-native-safe-area-context";

const ProductCategory = () => {
    const styles = useStyle(createStyle);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [productCategorys, setProductCategorys] = useState<ProductCategoryType[] | undefined>(undefined)
    const [selectedCategory, setSelectedCategory] = useState<ProductCategoryType | undefined>(undefined)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!isModalVisible) {
            getAll()
        }
    }, [isModalVisible])


    const getAll = async () => {
        try {
            const res = await executeQuery('select * from category order by id desc', undefined)
            setProductCategorys(res.rows._array)
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro, tente mais tarde.')
        }
        setIsReady(true)
    }

    const onCreating = () => {
        setIsModalVisible(true)
    }

    const onUpdating = (category: ProductCategoryType) => {
        setSelectedCategory(category)
        setIsModalVisible(true)
    }

    const onDelete = async categoryId => {
        setIsReady(false)
        const res = await executeQuery(`DELETE FROM category WHERE id = ${categoryId}`, undefined)
        await getAll()
        setIsReady(true)
    }

    return (
        !isReady
            ? <ActivityIndicator style={styles.spenner} size="large" />
            : <SafeAreaView style={styles.container}>
                <Title style={styles.title}> Categoria de Produtos </Title>
                <DataTable.Header>
                    <DataTable.Title>Id</DataTable.Title>
                    <DataTable.Title>Nome</DataTable.Title>
                    <DataTable.Title>Ações</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {productCategorys?.map(category =>
                        <DataTable.Row key={category.id} onPress={() => onUpdating(category)}>
                            <DataTable.Cell> {category.id} </DataTable.Cell>
                            <DataTable.Cell> {category.name} </DataTable.Cell>
                            <DataTable.Cell> <IconButton icon="delete" onPress={() => onDelete(category.id)} /> </DataTable.Cell>
                        </DataTable.Row>
                    )}
                </ScrollView>
                <FAB
                    style={styles.fab}
                    small
                    icon="add"
                    onPress={onCreating}
                />
                <Portal>
                    <Modal contentContainerStyle={styles.modalContainer} visible={isModalVisible}>
                        <ProductCategoryForm setIsModalVisible={setIsModalVisible} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                    </Modal>
                </Portal>
            </SafeAreaView>
    );
};

export default ProductCategory;
