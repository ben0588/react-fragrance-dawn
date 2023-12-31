import AccordionCollapse from '../../components/AccordionCollapse';

const ServiceShop = () => {
    return (
        <div>
            <AccordionCollapse
                list={[
                    {
                        title: '註冊帳戶',
                        text: '您可以選擇註冊成為我們的會員，以便更方便地管理您的訂單和資訊。',
                    },
                    {
                        title: '選擇商品',
                        text: '在網站上瀏覽我們豐富的商品，選擇您喜歡的項目並將其加入購物車。',
                    },
                    {
                        title: '付款方式',
                        text: '在結帳時，您可以選擇您偏好的付款方式，我們接受信用卡、轉帳和PayPal。',
                    },
                    {
                        title: '送貨資訊',
                        text: '請提供正確的送貨地址和聯繫方式，以確保您的訂單能夠順利送達。',
                    },
                    {
                        title: '確認訂單',
                        text: '在結帳頁面確認您的訂單內容，包括商品、數量、價格等，然後進行付款。',
                    },
                ]}
            />
        </div>
    );
};
export default ServiceShop;
