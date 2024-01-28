/**
 * file : SwalAlert.tsx
 * 설명 : 알람
 *
 * Icon 종류: success, error, warning, info, question
 * 알림 창에서 검색 및 이미지 띄우기 가능
 */
import Swal, { SweetAlertIcon } from "sweetalert2";

/**
 * 기본 알림
 * @param icon Icon 종류
 * @param title 제목
 * @param html 표기할 HTML 코드
 */
const SwalAlert = (icon: SweetAlertIcon, title: string, html: string | HTMLElement) => {
    Swal.fire({
        icon: icon,
        title: title,
        html: html,
        confirmButtonText: "확인"
    });
};

/**
 * 기본 알림(콜백 함수 추가)
 * @param icon Icon 종류
 * @param title 제목
 * @param html 표기할 HTML 코드
 * @param CallBack 콜백 함수
 */
const SwalAlertCallBack = (icon: SweetAlertIcon, title: string, html: string | HTMLElement, CallBack: () => void) => {
    Swal.fire({
        icon: icon,
        title: title,
        html: html,
        confirmButtonText: "확인"
    }).then((res) => {
        if (res.isConfirmed) {
            CallBack();
        }
    });
};

/**
 * CallBack 가능 알림 창(확인, 취소)
 * @param icon Icon 종류
 * @param title 제목
 * @param html 표기할 HTML 코드
 * @param data 전달 받은 데이터
 * @param CallBack 콜백 함수
 */
const SwalConfirm = (icon: SweetAlertIcon, title: string, html: string | HTMLElement, data: any, CallBack: (data: any) => void) => {
    Swal.fire({
        icon: icon,
        title: title,
        html: html,
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
    }).then((res) => {
        if (res.isConfirmed) {
            CallBack(data);
        }
    });
};

export { SwalAlert, SwalAlertCallBack, SwalConfirm };
