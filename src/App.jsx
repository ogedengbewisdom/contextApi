
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import CartContextProvider from './store/cart-ctx-provider.jsx';

function App() {


  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map(product => <li key={product.id} ><Product 
        title={product.title} 
        price={product.price} 
        id={product.id}
        description={product.description} 
        image={product.image}/></li>)
        }
      </Shop>
    </CartContextProvider>
  );
}

export default App;
