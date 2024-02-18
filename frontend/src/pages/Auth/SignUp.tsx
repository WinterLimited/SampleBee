import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    FormControl,
    InputLabel,
    FormHelperText,

    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControlLabel, Checkbox, IconButton
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';

// Import axios
import axios from '../../api/axiosConfig';

// import Alert
import {SwalAlert, SwalAlertCallBack} from "../../components/Common/SwalAlert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function SignUp() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [check, setCheck] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [occupation, setOccupation] = useState('');

    const [agreeTerms, setAgreeTerms] = useState(false); // 약관 동의
    const [agreeThirdParty, setAgreeThirdParty] = useState(false); // 제 3자 정보 동의

    const [openTermsDialog, setOpenTermsDialog] = useState(false);
    const [openPrivacyDialog, setOpenPrivacyDialog] = useState(false);


    const changeId = async (id: string) => {
        setId(id);

        if (id.length >= 6) {
            try {
                const response = await axios.get(`/api/auth/checkid/${id}`);
                if (response.data.success) {
                    setCheck(true);
                    // 추가적인 성공 메시지나 로직
                } else {
                    setCheck(false);
                    SwalAlert('error', '중복된 아이디', '이미 사용 중인 아이디입니다.');
                }
            } catch (error) {
                // 서버 에러 처리
                SwalAlert('error', '서버 오류', '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        } else {
            setCheck(false);
        }
    }



    const handleSignUp = () => {

        // Validation
        if (id === '' || name === '' || email === '' || phone === '' || password === '' || confirmPassword === '' || occupation === '') {
            SwalAlert('warning', '입력 오류', '모든 항목을 입력해주세요.');
        } else if (id.length < 6) {
            SwalAlert('warning', '입력 오류', '아이디는 6자 이상이어야 합니다.');
        } else if (password.length < 8) {
            SwalAlert('warning', '입력 오류', '비밀번호는 8자 이상이어야 합니다.');
        } else if (password !== confirmPassword) {
            SwalAlert('warning', '입력 오류', '비밀번호가 일치하지 않습니다.');
        } else if (!agreeTerms || !agreeThirdParty) {
            SwalAlert('warning', '동의 필요', '모든 약관에 동의해주세요.');
        } else {

            axios.post('/api/auth/signup', {
                id: id,
                name: name,
                email: email,
                phone: phone,
                password: password,
                occupation: occupation,
            }).then((res) => {
                if (res.data.success) {
                    // 회원가입 성공 시 콜백 함수를 사용하여 로그인 페이지로 이동
                    SwalAlertCallBack('success', '회원가입 성공', '회원가입이 성공적으로 완료되었습니다.', () => {
                        navigate('/login');
                    });
                } else {
                    SwalAlert('error', '회원가입 실패', '회원가입에 실패했습니다.');
                }
            }).catch((err) => {
                SwalAlert('error', '회원가입 실패', '회원가입에 실패했습니다.');
            })
        }

    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 12,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" fontWeight={'bold'}>
                    회원가입
                </Typography>
                <Box
                     sx={{
                         mt: 5,
                         p: 7,
                         backgroundColor: 'rgb(247, 247, 247)',
                         border: '1px solid rgb(249, 249, 249)',
                         borderRadius: '10px',
                     }}>

                    <FormControl fullWidth error={!check && id.length >= 6}>
                        <InputLabel
                            htmlFor="id"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}
                        >
                            아이디
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            name="id"
                            autoComplete="id"
                            autoFocus
                            value={id}
                            onChange={(e) => changeId(e.target.value)}
                            placeholder="아이디를 입력해주세요."
                            InputProps={{
                                sx: {
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',
                                    },
                                    backgroundColor: 'white',
                                    border: id === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                        {
                            id.length >= 6 && (
                                <FormHelperText>
                                    {check ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.'}
                                </FormHelperText>
                            )
                        }
                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="name"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            이름
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={"이름을 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: name === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="email"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            이메일
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={"이메일을 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: email === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="phone"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            전화번호
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={"전화번호를 하이픈(-)없이 입력해주세요."}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: phone === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="password"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            비밀번호
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            autoComplete="password"
                            type="password"
                            autoFocus
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"비밀번호를 입력해주세요. (8자리 이상)"}
                            InputProps={{
                                sx: {
                                    backgroundColor: 'white',
                                    border: password === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="passwordCheck"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            비밀번호 확인
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="passwordCheck"
                            name="passwordCheck"
                            autoComplete="passwordCheck"
                            type="password"
                            autoFocus
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={"비밀번호 다시 입력해주세요. (8자리 이상)"}
                            InputProps={{
                                sx: {
                                    backgroundColor: 'white',
                                    border: confirmPassword === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel
                            htmlFor="occupation"
                            sx={{
                                color: 'black',
                                fontSize: '15px',
                                fontWeight: 'bold',

                                // Input의 외부에 존재하도록 설정
                                position: 'relative',
                                top: '-5px',
                                left: '-10px',
                            }}>
                            직업
                        </InputLabel>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="occupation"
                            name="occupation"
                            autoComplete="occupation"
                            autoFocus
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder={"직업을 입력해주세요. (ex : 학생, 건축가, 인테리어 디자이너, 기타 )"}
                            InputProps={{
                                sx: {
                                    // 포커스 시 테두리 제거
                                    '&.Mui-focused fieldset': {
                                        outline: 'none',
                                        borderColor: 'transparent',  // 테두리 색 변경
                                    },

                                    backgroundColor: 'white',
                                    border: phone === "" ? '1px solid rgb(249, 249, 249)' : '1px solid rgb(41, 41, 46)',
                                    minWidth: '175px',
                                    minHeight: '40px',
                                    fontSize: '14px',
                                },
                            }}
                        />
                    </FormControl>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                name="agreeTerms"
                            />
                        }
                        label={
                        <Box
                            sx={{
                                wdith: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => setOpenTermsDialog(true)}
                        >
                            <span style={{ fontSize: '14px' }}>
                                [필수] 이용약관 동의
                            </span>
                            <IconButton>
                                <ArrowForwardIosIcon sx={{ fontSize: '15px', verticalAlign: '-2px' }} />
                            </IconButton>
                        </Box>

                        }
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreeThirdParty}
                                onChange={(e) => setAgreeThirdParty(e.target.checked)}
                                name="agreeThirdParty"
                            />
                        }
                        label={
                        <Box
                            sx={{
                                wdith: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => setOpenPrivacyDialog(true)}
                        >
                                <span style={{
                                    fontSize: '14px',
                                }}>
                                    [필수] 개인정보 수집 이용 동의
                                </span>
                            <IconButton>
                                <ArrowForwardIosIcon sx={{ fontSize: '15px', verticalAlign: '-2px' }} />
                            </IconButton>
                        </Box>

                        }
                    />


                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: 1,
                            mb: 1,

                            gap: '7%',
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(0, 0, 0, 0.54)',
                                fontSize: '12px',
                                cursor: 'pointer',
                            }}
                            component={Link}
                            to="/login"
                        >
                            이미 회원이신가요?
                        </Typography>
                    </Box>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            mt: 3,
                            backgroundColor: 'rgb(255, 212, 31)',
                            minHeight: '48px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'rgb(41, 41, 46)',
                            border: 'none',

                            '&:hover': {
                                backgroundColor: 'rgba(255, 212, 31, .7)',
                                border: 'none',
                            }

                            // '&:hover': {
                            //     backgroundColor: 'transparent',
                            //     border: '1px solid rgb(41, 41, 46)',
                            //     color: 'rgb(41, 41, 46)',
                            //     boxShadow: 'none',
                            // }
                        }}
                        onClick={handleSignUp}
                    >
                        회원가입
                    </Button>

                </Box>
            </Box>

            {/* 이용약관, 개인정보 처리방침 다이얼로그 */}
            <Dialog open={openTermsDialog} onClose={() => setOpenTermsDialog(false)}>
                <DialogTitle>샘플비 이용약관</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize: '14px', color: 'gray'}}>
                        제 1 장 총칙<br />
                        제 1 조 (목적)<br />
                        본 약관은 Samplebee 플랫폼(이하 “플랫폼”)을 통해 제공하는 모든 서비스의 이용조건 및 절차, 회원의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br />
                        <br />
                        제 2 조 (용어의 정의)<br />
                        본 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br />
                        <br />
                        “회원”이라 함은 “플랫폼”에 개인 정보를 제공하여 회원등록을 한 개인 또는 기업을 말합니다.<br />
                        “서비스”란 “플랫폼”이 제공하는 정보제공 및 사용자 간 소통을 가능하게 하는 서비스를 말합니다.<br />
                        제 3 조 (약관의 효력 및 변경)<br />
                        본 약관은 “플랫폼”에 회원가입 신청을 완료한 시점부터 효력이 발생합니다.<br />
                        “플랫폼”은 필요한 경우, 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 공지합니다.<br />
                        제 4 조 (약관 외 준칙)<br />
                        본 약관에 명시되지 않은 사항은 관련 법령에 따릅니다.<br />
                        <br />
                        제 5 조 (서비스의 제공 및 변경)<br />
                        “플랫폼”은 회원에게 아래와 같은 서비스를 제공하고 있지 않습니다. 회원가입만을 받는 랜딩페이지입니다.<br />
                        “플랫폼”은 서비스의 내용을 변경할 경우 변경 사항을 사전에 공지합니다.<br />
                        <br />
                        제 2 장 회원가입 및 관리<br />
                        제 6 조 (회원가입)<br />
                        회원으로 가입하고자 하는 자는 “플랫폼”이 정한 가입 양식에 따라 회원정보를 기입하고 회원가입을 신청해야 합니다.<br />
                        <br />
                        제 7 조 (회원 정보의 변경)<br />
                        회원은 등록된 자신의 정보에 변경이 있는 경우, 즉시 해당 정보를 수정해야 합니다.<br />
                        <br />
                        제 3 장 회원의 권리 및 의무<br />
                        제 8 조 (회원의 권리)<br />
                        회원은 “플랫폼”이 제공하는 서비스를 자유롭게 이용할 권리가 있습니다.<br />
                        <br />
                        제 9 조 (회원의 의무)<br />
                        회원은 본 약관 및 관련 법령을 준수해야 합니다.<br />
                        회원은 자신의 로그인 정보를 안전하게 관리해야 합니다.<br />
                        회원은 “플랫폼”의 운영을 방해하는 행위를 해서는 안 됩니다.<br />
                        제 4 장 계약 해지 및 서비스 이용 제한<br />
                        제 10 조 (회원 탈퇴 및 이용 제한)<br />
                        회원이 이용 계약을 해지하고자 할 때에는 언제든지 탈퇴를 요청할 수 있습니다.<br />
                        “플랫폼”은 회원이 본 약관을 위반하거나, “플랫폼”의 정상적인 운영을 방해한 경우, 회원의 서비스 이용을 제한할 수 있습니다.<br />
                        제 5 장 기타<br />
                        제 11 조 (면책조항)<br />
                        “플랫폼”은 천재지변 또는 이에 준하는 불가항력적 사유로 인해 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br />
                        <br />
                        제 12 조 (관할법원)<br />
                        “플랫폼”과 회원 간 발생한 분쟁에 대하여는 “플랫폼”의 주소지를 관할하는 법원을 관할법원으로 합니다.<br />
                        <br />
                        부칙<br />
                        본 약관은 2024년 1월 31일부터 시행합니다.<br />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenTermsDialog(false)}>확인</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPrivacyDialog} onClose={() => setOpenPrivacyDialog(false)}>
                <DialogTitle>샘플비 개인정보 처리방침</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize: '14px', color: 'gray'}}>
                        [필수] 개인정보 수집 및 이용<br />
                        <br />
                        .<br />
                        <br />
                        (목적) 본인여부 확인, 회원가입<br />
                        <br />
                        (항목) ID, 회원 정보(이름, 이메일주소, 비밀번호),전화번호, 직업정보<br />
                        <br />
                        (보유기간) 회원탈퇴 후 5년<br />
                        <br />
                        .<br />
                        <br />
                        .<br />
                        <br />
                        [필수] 개인정보 수집 및 이용<br />
                        <br />
                        .<br />
                        <br />
                        (목적) 계약이행 및 약관변경 등의 고지를 위한 연락, 정보제공, 커뮤니티활동 및 각종 이벤트 참가, 본인의사확인 및 민원 등의 고객불만처리<br />
                        <br />
                        (항목) ID, 회원 정보(이름, 이메일주소, 비밀번호),전화번호, 직업정보<br />
                        <br />
                        (보유기간) 회원탈퇴 후 5년<br />
                        <br />
                        .<br />
                        <br />
                        .<br />
                        <br />
                        [필수] 개인정보 수집 및 이용<br />
                        <br />
                        .<br />
                        <br />
                        (목적) 부정 이용 방지, 비인가 사용방지, 서비스 제공 및 계약의 이행<br />
                        <br />
                        (항목) 방문일시, 서비스 이용 기록 및 기기정보<br />
                        <br />
                        (보유기간) 회원탈퇴 후 5년<br />
                        <br />
                        .<br />
                        <br />
                        .<br />
                        <br />
                        [필수] 개인정보 수집 및 이용<br />
                        <br />
                        .<br />
                        <br />
                        (목적) 부정행위의 배제 (가입 후 부정행위가 확인된 경우만)<br />
                        <br />
                        (항목) ID, 회원 정보(이름, 이메일주소, 비밀번호),전화번호, 직업정보, 부정거래사유, 탈퇴 시 회원 상태값<br />
                        <br />
                        (보유기간) 회원탈퇴 후1년<br />
                        <br />
                        .<br />
                        <br />
                        .<br />
                        <br />
                        ※ 귀하는 위의 개인정보에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할 경우 플랫폼 회원 가입을 진행하실 수 없습니다.(필수적 동의사항)<br />
                        <br />
                        .<br />
                        <br />
                        .<br />
                        <br />
                        [필수] 개인정보 수집 및 이용<br />
                        <br />
                        .<br />
                        <br />
                        (목적) 회원의 서비스 이용 통계<br />
                        <br />
                        (항목) ID, 회원 정보(이름, 이메일주소, 비밀번호),전화번호, 직업정보<br />
                        <br />
                        (보유기간) 회원탈퇴 후 5년<br />

                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPrivacyDialog(false)}>닫기</Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
}

export default SignUp;
