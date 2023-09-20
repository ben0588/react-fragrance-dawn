import { Link } from 'react-router-dom';
import { BsLinkedin } from 'react-icons/bs';
import { RiBankLine } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';

const AboutJoinUs = () => {
    return (
        <div>
            <h2 className="text-center">加入我們</h2>
            <p className="mt-4">
                如果您對香氛有熱情，並且擁有豐富的銷售經驗和良好的溝通能力，歡迎您加入「香氛晨光」的團隊。我們提供優厚的薪資待遇和完善的培訓體系，讓您在這裡實現自己的職業夢想。
            </p>
            <p className="mt-3">如果您對我們的品牌充滿熱情，並且願意為客戶帶來愉悅的購物體驗，我們期待您的加入。</p>
            <p className="mt-4">更多公司及通路品牌理念與詳細職缺資訊，請由下方招募管道進一步了解：</p>

            <div className="mx-auto text-center">
                <ul className="list-unstyled py-1">
                    <li>
                        <Link to="https://www.104.com.tw/jobs/main/" target="_blank" className="link-hover">
                            <RiBankLine className="icon-sm me-1" /> 104人力銀行
                        </Link>
                    </li>

                    <li>
                        <Link to="https://www.linkedin.com/" target="_blank" className="link-hover">
                            <BsLinkedin className="icon-sm me-1" /> LinkedIn
                        </Link>
                    </li>
                    <li>
                        <a href="mailto:example@example.com" className="link-hover">
                            <MdOutlineMailOutline className="icon-sm me-1" />
                            聯絡我們
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default AboutJoinUs;
