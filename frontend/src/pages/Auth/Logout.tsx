import React, { useEffect } from 'react';
import { SwalAlertCallBack } from "../../components/Common/SwalAlert";
import {useNavigate} from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // 로그아웃 알림창
        SwalAlertCallBack('success', '로그아웃', '로그아웃 되었습니다.', () => {
            // 로그아웃 시 localStorage에 저장된 user 삭제
            localStorage.removeItem('user');

            // TODO: redux로 변경하면 navigate 사용
            // navigate('/');
            window.location.href = '/';
        });
    }, []);

    return (
        <div>

        </div>
    );
}

export default Logout;
