import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import FirstLoading from './components/FirstLoading';

// import Layout from './components/layout/Layout';
// import Error from './pages/Error';
// import AdminLayout from './pages/admin/AdminLayout';
// import AdminHomePage from './pages/admin/AdminHomePage';
// import AdminLoginPage from './pages/admin/AdminLoginPage';
// import AdminDashboardPage from './pages/admin/AdminDashboardPage';
// import AdminProductsSection from './pages/admin/AdminProductsSection';
// import AdminCouponsSection from './pages/admin/AdminCouponsSection';
// import AdminOrdersSection from './pages/admin/AdminOrdersSection';
// import AdminArticleSection from './pages/admin/AdminArticleSection';
// import HomePage from './pages/home/HomePage';
// import ProductsPage from './pages/products/ProductsPage';
// import ProductsDetailPage from './pages/products/ProductsDetailPage';
// import CartLayout from './pages/cart/CartLayout';
// import CartPage from './pages/cart/CartPage';
// import CartCheckoutSection from './pages/cart/CartCheckoutSection';
// import CartPaymentSection from './pages/cart/CartPaymentSection';
// import AccountLayout from './pages/account/AccountLayout';
// import AccountPage from './pages/account/AccountPage';
// import AccountOrdersPage from './pages/account/AccountOrdersPage';
// import ArticlePage from './pages/article/ArticlePage';
// import ArticleDetailPage from './pages/article/ArticleDetailPage';
// import WishListPage from './pages/wishlist/WishListPage';
// import SalePage from './pages/sale/SalePage';
// import AboutBrand from './pages/about/AboutBrand';
// import AboutLayout from './pages/about/AboutLayout';
// import AboutJoinUs from './pages/about/AboutJoinUs';
// import AboutStoreInfo from './pages/about/AboutStoreInfo';
// import OrderTracking from './pages/order/OrderTracking';
// import ServiceLayout from './pages/service/ServiceLayout';
// import ServiceFaq from './pages/service/ServiceFaq';
// import ServiceShipping from './pages/service/ServiceShipping';
// import ServiceShop from './pages/service/ServiceShop';
// import ServiceRefund from './pages/service/ServiceRefund';
// import ServiceContactUs from './pages/service/ServiceContactUs';
// import ServicePrivacy from './pages/service/ServicePrivacy';

const Layout = lazy(() => import('./components/layout/Layout'));
const Error = lazy(() => import('./pages/Error'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsSection = lazy(() => import('./pages/admin/AdminProductsSection'));
const AdminCouponsSection = lazy(() => import('./pages/admin/AdminCouponsSection'));
const AdminOrdersSection = lazy(() => import('./pages/admin/AdminOrdersSection'));
const AdminArticleSection = lazy(() => import('./pages/admin/AdminArticleSection'));
const HomePage = lazy(() => import('./pages/home/HomePage'));
const ProductsPage = lazy(() => import('./pages/products/ProductsPage'));
const ProductsDetailPage = lazy(() => import('./pages/products/ProductsDetailPage'));
const CartLayout = lazy(() => import('./pages/cart/CartLayout'));
const CartPage = lazy(() => import('./pages/cart/CartPage'));
const CartCheckoutSection = lazy(() => import('./pages/cart/CartCheckoutSection'));
const CartPaymentSection = lazy(() => import('./pages/cart/CartPaymentSection'));
const AccountLayout = lazy(() => import('./pages/account/AccountLayout'));
const AccountPage = lazy(() => import('./pages/account/AccountPage'));
const AccountOrdersPage = lazy(() => import('./pages/account/AccountOrdersPage'));
const ArticlePage = lazy(() => import('./pages/article/ArticlePage'));
const ArticleDetailPage = lazy(() => import('./pages/article/ArticleDetailPage'));
const WishListPage = lazy(() => import('./pages/wishlist/WishListPage'));
const SalePage = lazy(() => import('./pages/sale/SalePage'));
const AboutBrand = lazy(() => import('./pages/about/AboutBrand'));
const AboutLayout = lazy(() => import('./pages/about/AboutLayout'));
const AboutJoinUs = lazy(() => import('./pages/about/AboutJoinUs'));
const AboutStoreInfo = lazy(() => import('./pages/about/AboutStoreInfo'));
const OrderTracking = lazy(() => import('./pages/order/OrderTracking'));
const ServiceLayout = lazy(() => import('./pages/service/ServiceLayout'));
const ServiceFaq = lazy(() => import('./pages/service/ServiceFaq'));
const ServiceShipping = lazy(() => import('./pages/service/ServiceShipping'));
const ServiceShop = lazy(() => import('./pages/service/ServiceShop'));
const ServiceRefund = lazy(() => import('./pages/service/ServiceRefund'));
const ServiceContactUs = lazy(() => import('./pages/service/ServiceContactUs'));
const ServicePrivacy = lazy(() => import('./pages/service/ServicePrivacy'));

function App() {
    return (
        <>
            <Suspense fallback={<FirstLoading />}>
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
            </Suspense>
        </>
    );
}

export default App;
