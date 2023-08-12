import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/product/Breadcrumb';
import ProductsCardSection from './ProductsCardSection';
import ProductsSearchSection from './ProductsSearchSection';

const ProductsPage = () => {
    const categoryRedux = useSelector((state) => state.category);
    return (
        <div className='position-relative mb-3'>
            <ProductsSearchSection />
            <ProductsCardSection />
        </div>
    );
};
export default ProductsPage;
