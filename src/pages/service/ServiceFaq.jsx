import { NavLink } from 'react-router-dom';
import AccordionCollapse from '../../components/AccordionCollapse';

const ServiceFaq = () => {
    return (
        <div>
            <AccordionCollapse
                list={[
                    {
                        title: '常見問題',
                        text: '需要盡快處理的要求如訂單取消或地址更改，請撥打免付費電話 0800-777-800 取得協助。',
                    },
                    {
                        title: '如何下單購買商品？',
                        text: (
                            <ul>
                                <li>前往我們的網站首頁，瀏覽您喜歡的商品。</li>
                                <li>點擊商品圖片或名稱，進入詳細資訊頁面。</li>
                                <li>在詳細資訊頁面選擇商品數量，並點擊「加入購物車」按鈕。</li>
                                <li>在購物車頁面檢查您的訂單，然後按下「結帳」。</li>
                                <li>填寫送貨資訊和付款方式，然後確認訂單。</li>
                            </ul>
                        ),
                    },
                    {
                        title: '如何查詢訂單狀態？',
                        text: '登入您的帳戶，進入「我的訂單」頁面，您將看到您的訂單歷史和目前訂單的狀態。',
                    },
                    {
                        title: '如何使用優惠券？',
                        text: '在結帳頁面輸入您的優惠券代碼，系統將自動計算折扣金額。',
                    },
                    {
                        title: '商品退換貨政策是什麼？',
                        text: '如需退換貨，請在收到商品後的14天內聯繫我們的客戶服務。詳細的退換貨政策可在網站上查閱。',
                    },
                    {
                        title: '商品運費如何計算？',
                        text: '運費會根據您的送貨地址和所選運送方式進行計算，您可以在結帳頁面看到最終的運費金額。',
                    },
                    {
                        title: '如何取消訂單？',
                        text: '若需要取消訂單，請在下單後的24小時內聯繫客戶服務，我們將協助您處理。',
                    },
                    {
                        title: '如果我想提供建議',
                        text: (
                            <div>
                                請前往 <NavLink to='contactUs'>聯絡我們</NavLink> 如果你有任何建議請發送郵件至
                                test@gmail.com 。謝謝
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};
export default ServiceFaq;
