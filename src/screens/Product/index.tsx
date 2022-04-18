import { Alert, ScrollView } from "react-native";
import { ActivityIndicator, DataTable, FAB, IconButton, Modal, Portal, Text, Title } from "react-native-paper";

import { useStyle } from "_hooks/utils";

import createStyle from "./style";

import ProductForm from '_screens/Product/ProductForm'
import { useEffect, useState } from "react";

import { Product as ProductType } from "_types";

import { executeQuery } from '../../services/database'
import { SafeAreaView } from "react-native-safe-area-context";

const Product = () => {
    const styles = useStyle(createStyle);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [products, setProducts] = useState<ProductType[] | undefined>(undefined)
    const [selectedProduct, setSelectedProduct] = useState<ProductType | undefined>(undefined)
    const [isReady, setIsReady] = useState(false)


    useEffect(() => {
        //setProducts()
        if (!isModalVisible) {
            getAll()
        }
    }, [isModalVisible])


    const getAll = async () => {
        try {
            const res2 = await executeQuery('select * from product order by id desc', undefined)
            setProducts(res2.rows._array)
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro, tente mais tarde.')
        }
        
        setIsReady(true)
    }

    const onCreating = () => {
        setIsModalVisible(true)
    }

    const onUpdating = (product: ProductType) => {
        setSelectedProduct(product)
        setIsModalVisible(true)
    }

    const onDelete = async productId => {
        setIsReady(false)
        try {
            await executeQuery(`DELETE FROM product WHERE id = ${productId}`, undefined)
            await getAll()
        } catch (error) {
            Alert.alert('Erro', 'Houve um erro, tente mais tarde.')
        }

        setIsReady(true)
    }


    return (
        !isReady
            ? <ActivityIndicator style={styles.spenner} size="large" />
            : <SafeAreaView style={styles.container}>
                <Title style={styles.title}> Produtos </Title>
                <DataTable.Header>
                    <DataTable.Title>Id</DataTable.Title>
                    <DataTable.Title>Descrição</DataTable.Title>
                    <DataTable.Title>Preço</DataTable.Title>
                    <DataTable.Title>Categoria</DataTable.Title>
                    <DataTable.Title>Ações</DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                    {products?.map(product =>
                        <DataTable.Row key={product.id} onPress={() => onUpdating(product)}>
                            <DataTable.Cell> {product.id} </DataTable.Cell>
                            <DataTable.Cell> {product.description} </DataTable.Cell>
                            <DataTable.Cell> {product.price} </DataTable.Cell>
                            <DataTable.Cell> {product.category} </DataTable.Cell>
                            <DataTable.Cell> <IconButton icon="delete" onPress={() => onDelete(product.id)} /> </DataTable.Cell>
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
                        <ProductForm setIsModalVisible={setIsModalVisible} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                    </Modal>
                </Portal>
            </SafeAreaView>
    );
};

export default Product;
