/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Theme } from "_styles/themes";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootStackParamList = {
    Home: {
        theme: Theme;
    };
};

export type Product = {
    id: Number,
    description: String,
    price: Number,
    category: Number
}

export type ProductCategory = {
    id: Number,
    name: String
}




export type DbData = { product:Product[], productCategory:ProductCategory[] }

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, Screen>;
