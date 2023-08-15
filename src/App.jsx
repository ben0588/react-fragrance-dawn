import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Error from './pages/Error';
import AdminLayout from './pages/admin/AdminLayout';
import AdminHomePage from './pages/admin/AdminHomePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsSection from './pages/admin/AdminProductsSection';
import AdminCouponsSection from './pages/admin/AdminCouponsSection';
import AdminOrdersSection from './pages/admin/AdminOrdersSection';
import AdminArticleSection from './pages/admin/AdminArticleSection';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductsDetailPage from './pages/products/ProductsDetailPage';
import CartLayout from './pages/cart/CartLayout';
import CartPage from './pages/cart/CartPage';
import CartCheckoutSection from './pages/cart/CartCheckoutSection';
import CartPaymentSection from './pages/cart/CartPaymentSection';
import AccountLayout from './pages/account/AccountLayout';
import AccountPage from './pages/account/AccountPage';
import AccountOrdersPage from './pages/account/AccountOrdersPage';
import ArticlePage from './pages/article/ArticlePage';
import ArticleDetailPage from './pages/article/ArticleDetailPage';
import WishListPage from './pages/wishlist/WishListPage';
import SalePage from './pages/sale/SalePage';
import AboutBrand from './pages/about/AboutBrand';
import AboutLayout from './pages/about/AboutLayout';
import AboutJoinUs from './pages/about/AboutJoinUs';
import AboutStoreInfo from './pages/about/AboutStoreInfo';
import OrderTracking from './pages/order/OrderTracking';
import ServiceLayout from './pages/service/ServiceLayout';
import ServiceFaq from './pages/service/ServiceFaq';
import ServiceShipping from './pages/service/ServiceShipping';
import ServiceShop from './pages/service/ServiceShop';
import ServiceRefund from './pages/service/ServiceRefund';
import ServiceContactUs from './pages/service/ServiceContactUs';
import ServicePrivacy from './pages/service/ServicePrivacy';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='/products' element={<ProductsPage />}></Route>
                    <Route path='/products/:id' element={<ProductsDetailPage />}></Route>
                    <Route path='/cart' element={<CartLayout />}>
                        <Route index element={<CartPage />}></Route>
                        <Route path='checkout' element={<CartCheckoutSection />}></Route>
                        <Route path='payment' element={<CartPaymentSection />}></Route>
                    </Route>
                    <Route path='/account' element={<AccountLayout />}>
                        <Route index element={<AccountPage />}></Route>
                        <Route path='orders' element={<AccountOrdersPage />}></Route>
                    </Route>
                    <Route path='/wishlist' element={<WishListPage />}></Route>
                    <Route path='/article' element={<ArticlePage />}></Route>
                    <Route path='/article/:id' element={<ArticleDetailPage />}></Route>
                    <Route path='/sale' element={<SalePage />}></Route>
                    <Route path='/about' element={<AboutLayout />}>
                        <Route index element={<AboutBrand />}></Route>
                        <Route path='joinUs' element={<AboutJoinUs />}></Route>
                        <Route path='storeInfo' element={<AboutStoreInfo />}></Route>
                    </Route>
                    <Route path='/orderTracking' element={<OrderTracking />}></Route>
                    <Route path='/service' element={<ServiceLayout />}>
                        <Route index element={<ServiceFaq />}></Route>
                        <Route path='shipping' element={<ServiceShipping />}></Route>
                        <Route path='shop' element={<ServiceShop />}></Route>
                        <Route path='refund' element={<ServiceRefund />}></Route>
                        <Route path='contactUs' element={<ServiceContactUs />}></Route>
                        <Route path='privacy' element={<ServicePrivacy />}></Route>
                    </Route>
                    <Route path='*' element={<Error />}></Route>
                </Route>
                <Route path='/admin' element={<AdminLayout />}>
                    <Route index element={<AdminHomePage />}></Route>
                    <Route path='login' element={<AdminLoginPage />}></Route>
                    <Route path='dashboard' element={<AdminDashboardPage />}>
                        <Route path='products' element={<AdminProductsSection />}></Route>
                        <Route path='coupons' element={<AdminCouponsSection />}></Route>
                        <Route path='orders' element={<AdminOrdersSection />}></Route>
                        <Route path='article' element={<AdminArticleSection />}></Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
