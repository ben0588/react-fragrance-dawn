import ProductsCardSection from './ProductsCardSection';
import ProductsSearchSection from './ProductsSearchSection';

const ProductsPage = () => {
    return (
        <div className="position-relative mb-3">
            <ProductsSearchSection />
            <ProductsCardSection />
        </div>
    );
};
export default ProductsPage;
