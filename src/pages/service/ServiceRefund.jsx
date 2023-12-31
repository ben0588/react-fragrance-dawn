import AccordionCollapse from '../../components/AccordionCollapse';

const ServiceRefund = () => {
    return (
        <div>
            <AccordionCollapse
                list={[
                    {
                        title: '退換貨政策說明',
                        text: '我們希望您滿意您購買的商品。如果您收到的商品有任何品質問題或不符合您的期望，請遵循以下退換貨政策。',
                    },
                    {
                        title: '退貨申請',
                        text: '如果您需要退貨，請在收到商品後的14天內聯繫我們的客戶服務團隊，提供訂單號碼和退貨原因。',
                    },
                    {
                        title: '退貨審核',
                        text: '我們將審核您的退貨申請，並根據商品狀態進行評估。一旦退貨審核通過，我們將提供退貨指引。',
                    },
                    {
                        title: '退款處理',
                        text: ' 在我們收到退回的商品並檢查無誤後，您將收到退款或換貨處理。',
                    },
                ]}
            />
        </div>
    );
};
export default ServiceRefund;
