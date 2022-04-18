import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

import Product from '_screens/Product'
import ProductCategory from '_screens/ProductCategory'

const BottomBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'product', title: 'Produtos', icon: 'view_in_ar' },
    { key: 'productCategory', title: 'Categorias', icon: 'book' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    product: Product,
    productCategory: ProductCategory,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomBar;