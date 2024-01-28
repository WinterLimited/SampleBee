import React, { useEffect } from 'react';
import { SwalAlertCallBack } from "../../components/Common/SwalAlert";

function Logout() {
    useEffect(() => {
        // 로그아웃 알림창
        SwalAlertCallBack('success', '로그아웃', '로그아웃 되었습니다.', () => {
            // 로그아웃 시 localStorage에 저장된 user 삭제
            localStorage.removeItem('user');
            // 메인 페이지로 리디렉션
            window.location.href = '/';
        });
    }, []);

    return (
        <div>

        </div>
    );
}

export default Logout;
