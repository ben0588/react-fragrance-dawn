import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import {
    Layout,
    Error,
    AdminLayout,
    AdminHomePage,
    AdminLoginPage,
    AdminDashboardPage,
    AdminProductsSection,
    AdminCouponsSection,
    AdminOrdersSection,
    AdminArticleSection,
    HomePage,
    ProductsPage,
    ProductsDetailPage,
    CartLayout,
    CartPage,
    CartCheckoutSection,
    CartPaymentSection,
    AccountLayout,
    AccountPage,
    AccountOrdersPage,
    ArticlePage,
    ArticleDetailPage,
    WishListPage,
    SalePage,
    AboutBrand,
    AboutLayout,
    AboutJoinUs,
    AboutStoreInfo,
    OrderTracking,
    ServiceLayout,
    ServiceFaq,
    ServiceShipping,
    ServiceShop,
    ServiceRefund,
    ServiceContactUs,
    ServicePrivacy,
} from './PagesRoutes';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';

function App() {
    return (
        <>
            {/* <Suspense fallback={null}> */}
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
                        <Route index element={<AdminDashboardHome />}></Route>
                        <Route path='products' element={<AdminProductsSection />}></Route>
                        <Route path='coupons' element={<AdminCouponsSection />}></Route>
                        <Route path='orders' element={<AdminOrdersSection />}></Route>
                        <Route path='article' element={<AdminArticleSection />}></Route>
                    </Route>
                </Route>
            </Routes>
            {/* </Suspense> */}
        </>
    );
}

export default App;
