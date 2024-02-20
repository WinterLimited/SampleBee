import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Import Components
import ImageCarousel from "./ImageCarousel";
import axios from "../../api/axiosConfig";

function Main() {
    const images = [
        `${process.env.PUBLIC_URL}/main/firstSection/main_background1.png`,
        `${process.env.PUBLIC_URL}/main/firstSection/main_background2.png`,
        `${process.env.PUBLIC_URL}/main/firstSection/main_background3.png`,
    ];

    const [bgIndex, setBgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    // 접속률 기록
    useEffect(() => {
        const checkUserVisit = async () => {
            const userVisited = localStorage.getItem('userVisited');

            if (!userVisited) {
                try {

                    // UserAgent, Url
                    const userAgent = navigator.userAgent;
                    const pageUrl = window.location.href;

                    await axios.post('/api/visit/record', { userAgent, pageUrl });
                    localStorage.setItem('userVisited', 'true');
                } catch (error) {
                    console.error('Error recording visit:', error);
                }
            }
        };

        checkUserVisit();
    }, []);

    return (

        <>
            { /* Landing Page first section */ }
            <Box
                sx={{
                    maxWidth: '100%',
                    height: '75vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // 세로 중앙 정렬 유지
                    alignItems: 'flex-start', // 가로 방향에서 왼쪽 정렬
                    backgroundImage: `url(${images[bgIndex]})`,
                    backgroundSize: 'cover',
                    transition: 'background-image .5s ease-in-out',
                    padding: '0 10%', // 왼쪽 여백 추가
                }}
            >
                <Typography variant="h3" component="h1" sx={{ mb: 1, color: 'rgb(41, 41, 46)', fontWeight: 'bold' }}>
                    빠르고 정확하게 <br />
                    비교할 수 있도록,
                </Typography>
                <Typography variant="h6" component="h5" sx={{ mb: 4, color: 'rgb(114, 114, 114)', fontSize: '15px' }}>
                    샘플비로 빠르고 정확하게 비교해보세요.
                </Typography>

                <Button variant="contained" size="large"
                        sx={{
                            mt: 1,
                            mb: 2,
                            backgroundColor: 'white',
                            color : 'rgb(41, 41, 46)',
                            minWidth: '200px',
                            minHeight: '50px',
                            borderRadius: '25px',
                            fontSize: '20px',
                            fontWeight: 'bold',

                            // boxShadow를 전체적으로 배경에서 떠있는 느낌을 주기 위해 사용
                            boxShadow: '0px 2px 10px 2px rgba(0, 0, 0, 0.2)',

                            '&:hover': {
                                backgroundColor: 'rgb(41, 41, 46)',
                                color: 'white',
                            }
                        }}
                        component={Link}
                        to="/login"
                >
                    START NOW
                </Button>
            </Box>



            <Box sx={{ height: '10vh' }} />



            { /* Landing Page second section */ }
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '90%',
                    height: '75vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // 세로 중앙 정렬 유지
                    alignItems: 'center', // 가로 방향에서 왼쪽 정렬
                    margin: '0 auto',
                }}
            >
                <Grid container spacing={2}>
                    {/* 첫 번째 50% */}
                    <Grid item xs={6}>

                        <Box
                            sx={{
                                height: '75vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                borderRadius: '25px',
                                backgroundImage: `url('${process.env.PUBLIC_URL}/main/secondSection/products.png')`,
                                backgroundSize: 'cover',
                                transition: 'background-image .5s ease-in-out',
                                position: 'relative',

                                '&:hover': {
                                    '& .hover-text': {
                                        color: 'white',
                                    }
                                }
                            }}
                        >
                            {/* 오버레이를 위한 별도의 컨테이너 */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: 1, // 오버레이의 z-index 설정
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    borderRadius: '25px',
                                    transition: 'background-color .5s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            ></Box>

                            {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                            <Typography
                                variant="h6"
                                component="h5"
                                className="hover-text"
                                sx={{
                                    mb: 4, mr: 4, color: 'rgb(41, 41, 46)', fontSize: '16px', fontWeight: 'bold', verticalAlign: 'bottom',
                                    position: 'relative',
                                    zIndex: 2,
                                    transition: 'color .5s ease-in-out',
                                }}
                            >
                                PRODUCTS <ArrowForwardIosIcon sx={{ fontSize: '20px', verticalAlign: '-4px' }}/>
                            </Typography>
                        </Box>

                    </Grid>

                    {/* 두 번째 25% */}
                    <Grid item xs={3}>

                        <Box
                            sx={{
                                height: '75vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-end',
                                borderRadius: '25px',
                                backgroundImage: `url('${process.env.PUBLIC_URL}/main/secondSection/material.png')`,
                                backgroundSize: 'cover',
                                transition: 'background-image .5s ease-in-out',
                                position: 'relative',
                            }}
                        >
                            {/* 오버레이를 위한 별도의 컨테이너 */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: 1, // 오버레이의 z-index 설정
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    borderRadius: '25px',
                                    transition: 'background-color .5s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            ></Box>

                            {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                            <Box
                                sx={{
                                    mt: 4, mr: 4,
                                    display: 'flex',
                                    flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                    alignItems: 'flex-end', // 오른쪽 정렬
                                    position: 'relative',
                                    zIndex: 2,
                                }}
                            >
                                {/* 텍스트 부분 */}
                                <Typography
                                    variant="h6"
                                    component="h5"
                                    className="hover-text"
                                    sx={{
                                        color: 'white',
                                        fontSize: '16px', fontWeight: 'bold',
                                        verticalAlign: 'bottom',
                                        transition: 'color .5s ease-in-out',
                                    }}
                                >
                                    MATERIALS
                                </Typography>

                                <br />

                                {/* 아이콘 부분 */}
                                <ArrowForwardIosIcon sx={{ fontSize: '20px', verticalAlign: '-4px', color: 'white' }}/>
                            </Box>

                        </Box>

                    </Grid>

                    {/* 마지막 25%, 위아래로 50%씩 구분 */}
                    <Grid item xs={3}>
                        <Box sx={{ height: `calc(50% - 8px)`, mb: 2 }}>

                            <Box
                                sx={{
                                    height: '100%',
                                    maxHeight: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    borderRadius: '25px',
                                    backgroundImage: `url('${process.env.PUBLIC_URL}/main/secondSection/color.png')`,
                                    backgroundSize: 'cover',
                                    transition: 'background-image .5s ease-in-out',
                                    position: 'relative',
                                    overflowY: 'auto', // 필요한 경우 스크롤바 표시
                                }}
                            >
                                {/* 오버레이를 위한 별도의 컨테이너 */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        zIndex: 1, // 오버레이의 z-index 설정
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                        borderRadius: '25px',
                                        transition: 'background-color .5s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        },
                                    }}
                                ></Box>

                                {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                                <Box
                                    sx={{
                                        mt: 4, mr: 4,
                                        display: 'flex',
                                        flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                        alignItems: 'flex-end', // 오른쪽 정렬
                                        position: 'relative',
                                        zIndex: 2,
                                    }}
                                >
                                    {/* 텍스트 부분 */}
                                    <Typography
                                        variant="h6"
                                        component="h5"
                                        className="hover-text"
                                        sx={{
                                            color: 'white',
                                            fontSize: '16px', fontWeight: 'bold',
                                            verticalAlign: 'bottom',
                                            transition: 'color .5s ease-in-out',
                                        }}
                                    >
                                        COLOR
                                    </Typography>

                                    <br />

                                    {/* 아이콘 부분 */}
                                    <ArrowForwardIosIcon sx={{ fontSize: '20px', verticalAlign: '-4px', color: 'white' }}/>
                                </Box>

                            </Box>

                        </Box>

                        <Box sx={{ height: `calc(50% - 8px)` }}>

                            <Box
                                sx={{
                                    height: '100%',
                                    maxHeight: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-end',
                                    borderRadius: '25px',
                                    backgroundImage: `url('${process.env.PUBLIC_URL}/main/secondSection/about.png')`,
                                    backgroundSize: 'cover',
                                    transition: 'background-image .5s ease-in-out',
                                    position: 'relative',
                                    overflowY: 'auto', // 필요한 경우 스크롤바 표시
                                }}
                            >
                                {/* 오버레이를 위한 별도의 컨테이너 */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        zIndex: 1, // 오버레이의 z-index 설정
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                        borderRadius: '25px',
                                        transition: 'background-color .5s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        },
                                    }}
                                ></Box>

                                {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                                <Box
                                    sx={{
                                        mt: 4, mr: 4,
                                        display: 'flex',
                                        flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                        alignItems: 'flex-end', // 오른쪽 정렬
                                        position: 'relative',
                                        zIndex: 2,
                                    }}
                                >
                                    {/* 텍스트 부분 */}
                                    <Typography
                                        variant="h6"
                                        component="h5"
                                        className="hover-text"
                                        sx={{
                                            color: 'white',
                                            fontSize: '16px', fontWeight: 'bold',
                                            verticalAlign: 'bottom',
                                            transition: 'color .5s ease-in-out',
                                            textAlign: 'right',
                                        }}
                                    >
                                        ABOUT <br />
                                        SAMPLEBEE
                                    </Typography>

                                    <br />

                                    {/* 아이콘 부분 */}
                                    <ArrowForwardIosIcon sx={{ fontSize: '20px', verticalAlign: '-4px', color: 'white' }}/>
                                </Box>

                            </Box>

                        </Box>
                    </Grid>
                </Grid>
            </Box>


            <Box sx={{ height: '10vh' }} />


            {/* Landing page third section */}
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '80%',
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // 세로 중앙 정렬 유지
                    alignItems: 'center', // 가로 방향에서 왼쪽 정렬
                    margin: '0 auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',  // 수평 정렬
                        alignItems: 'center',  // 수직 중앙 정렬
                        justifyContent: 'center' // 수평 중앙 정렬
                    }}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/logo/horizon_logo1.png`}
                        alt="horizon-logo"
                        style={{ width: '15%', marginBottom: 1 }} // 이미지 크기 조정
                    />
                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                            color: 'rgb(189, 189, 189)',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        가 여러분의 선택을 도와드립니다.
                    </Typography>
                </Box>

                <Box sx={{ height: '10vh' }} />

                <Grid
                    container spacing={2}
                    sx={{
                        width: '80%',
                        display: 'flex',
                        flexDirection: 'row',  // 수평 정렬
                        alignItems: 'center',  // 수직 중앙 정렬
                        justifyContent: 'center' // 수평 중앙 정렬
                    }}
                >

                    <Grid
                        item xs={4}
                        sx={{
                            textAlign: 'center',
                            flexDirection: 'row',  // 수평 정렬
                            alignItems: 'center',  // 수직 중앙 정렬
                            justifyContent: 'center' // 수평 중앙 정렬
                        }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/main/thridSection/icon1.png`}
                            alt="horizon-logo"
                            style={{ height: '15vh' }}
                        />
                        <Typography
                            variant="h6"
                            component="h5"
                            sx={{
                                color: 'rgb(41, 41, 46)',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                mt: 4,
                                mb: 2,
                            }}
                        >
                            찾는 일에 힘쓰지 마세요.
                        </Typography>
                    </Grid>

                    <Grid
                        item xs={4}
                        sx={{
                            textAlign: 'center',
                            flexDirection: 'row',  // 수평 정렬
                            alignItems: 'center',  // 수직 중앙 정렬
                            justifyContent: 'center' // 수평 중앙 정렬
                        }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/main/thridSection/icon2.png`}
                            alt="horizon-logo"
                            style={{ height: '15vh' }}
                        />
                        <Typography
                            variant="h6"
                            component="h5"
                            sx={{
                                color: 'rgb(41, 41, 46)',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                mt: 4,
                                mb: 2,
                            }}
                        >
                            고르는 일에 힘쓰지 마세요.
                        </Typography>
                    </Grid>

                    <Grid
                        item xs={4}
                        sx={{
                            textAlign: 'center',
                            flexDirection: 'row',  // 수평 정렬
                            alignItems: 'center',  // 수직 중앙 정렬
                            justifyContent: 'center' // 수평 중앙 정렬
                        }}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/main/thridSection/icon3.png`}
                            alt="horizon-logo"
                            style={{ height: '15vh' }}
                        />
                        <Typography
                            variant="h6"
                            component="h5"
                            sx={{
                                color: 'rgb(41, 41, 46)',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                mt: 4,
                                mb: 2,
                            }}
                        >
                            쉽게 받아보고, 쉽게 결정하세요.
                        </Typography>
                    </Grid>

                </Grid>
            </Box>


            <Box sx={{ height: '10vh' }} />


            { /* Landing Page fourth section */ }
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '110vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // 세로 중앙 정렬 유지
                    alignItems: 'center', // 가로 방향에서 왼쪽 정렬
                    margin: '0 auto',
                    backgroundColor: 'rgb(249, 249, 249)',
                }}
            >


                <Box sx={{ height: '5vh' }} />


                <Box
                    sx={{
                        boxSizing: 'border-box',
                        width: '75%',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // 세로 중앙 정렬 유지
                        alignItems: 'center', // 가로 방향에서 왼쪽 정렬
                        margin: '0 auto',
                        backgroundColor: 'rgb(249, 249, 249)',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',  // 수평 정렬
                            alignItems: 'flex-start',  // 수정: 왼쪽 정렬
                            justifyContent: 'flex-start',  // 수정: 왼쪽 정렬
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h3"
                            sx={{
                                color: 'rgb(41, 41, 46)',
                                fontSize: '28px',
                                fontWeight: 'bold',
                            }}
                        >
                            샘플비를 <br/>
                            만나야 하는 이유
                            <ArrowForwardIosIcon sx={{
                                fontSize: '30px',
                                verticalAlign: '-5px',
                                ml: 1,
                            }} />
                        </Typography>
                    </Box>



                    <Box sx={{ height: '5vh' }} />


                    <Grid container spacing={3}>

                        {/* 첫 번째 50% */}
                        <Grid item xs={6}>

                            <Box sx={{ height: `45vh`, mb: 3 }}>

                                <Box
                                    sx={{
                                        height: '100%',
                                        maxHeight: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                        borderRadius: '25px',
                                        backgroundImage: `url('${process.env.PUBLIC_URL}/main/fourthSection/left1.png')`,
                                        backgroundSize: 'cover',
                                        transition: 'background-image .5s ease-in-out',
                                        position: 'relative',
                                        overflowY: 'auto', // 필요한 경우 스크롤바 표시
                                    }}
                                >
                                    {/* 오버레이를 위한 별도의 컨테이너 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            zIndex: 1, // 오버레이의 z-index 설정
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0)',
                                            borderRadius: '25px',
                                            transition: 'background-color .5s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                            },
                                        }}
                                    ></Box>

                                    {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                                    <Box
                                        sx={{
                                            ml: 4, mb: 4,
                                            display: 'flex',
                                            flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                            alignItems: 'flex-start', // 오른쪽 정렬
                                            position: 'relative',
                                            zIndex: 2,
                                        }}
                                    >

                                        {/* 텍스트 부분 */}
                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '24px', fontWeight: 'bold',
                                                verticalAlign: 'bottom',
                                                mb: 2,
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            효율적인 <br />
                                            비교
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '16px',
                                                verticalAlign: 'bottom',
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            다양한 업체의 자재 샘플들을 한눈에<br />
                                            비교할 수 있습니다.
                                        </Typography>

                                    </Box>

                                </Box>

                            </Box>

                            <Box sx={{ height: `30vh` }}>

                                <Box
                                    sx={{
                                        height: '100%',
                                        maxHeight: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                        borderRadius: '25px',
                                        backgroundImage: `url('${process.env.PUBLIC_URL}/main/fourthSection/left2.png')`,
                                        backgroundSize: 'cover',
                                        transition: 'background-image .5s ease-in-out',
                                        position: 'relative',
                                        overflowY: 'auto', // 필요한 경우 스크롤바 표시
                                    }}
                                >
                                    {/* 오버레이를 위한 별도의 컨테이너 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            zIndex: 1, // 오버레이의 z-index 설정
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0)',
                                            borderRadius: '25px',
                                            transition: 'background-color .5s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                            },
                                        }}
                                    ></Box>

                                    {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                                    <Box
                                        sx={{
                                            ml: 4, mb: 4,
                                            display: 'flex',
                                            flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                            alignItems: 'flex-start', // 오른쪽 정렬
                                            position: 'relative',
                                            zIndex: 2,
                                        }}
                                    >

                                        {/* 텍스트 부분 */}
                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '24px', fontWeight: 'bold',
                                                verticalAlign: 'bottom',
                                                mb: 2,
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            원스톱 <br />
                                            구매
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '16px',
                                                verticalAlign: 'bottom',
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            그동안 몰랐던 자재, 구하기 어려웠던<br />
                                            자재의 샘플을 직접 받아보실 수 있습니다.
                                        </Typography>

                                    </Box>

                                </Box>

                            </Box>
                        </Grid>

                        <Grid item xs={6}>

                            <Box sx={{ height: `30vh`, mb: 3 }}>

                                <Box
                                    sx={{
                                        height: '100%',
                                        maxHeight: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                        borderRadius: '25px',
                                        backgroundImage: `url('${process.env.PUBLIC_URL}/main/fourthSection/right1.png')`,
                                        backgroundSize: 'cover',
                                        transition: 'background-image .5s ease-in-out',
                                        position: 'relative',
                                        overflowY: 'auto', // 필요한 경우 스크롤바 표시
                                    }}
                                >
                                    {/* 오버레이를 위한 별도의 컨테이너 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            zIndex: 1, // 오버레이의 z-index 설정
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0)',
                                            borderRadius: '25px',
                                            transition: 'background-color .5s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                            },
                                        }}
                                    ></Box>


                                    {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                                    <Box
                                        sx={{
                                            ml: 4, mb: 4,
                                            display: 'flex',
                                            flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                            alignItems: 'flex-start', // 오른쪽 정렬
                                            position: 'relative',
                                            zIndex: 2,
                                        }}
                                    >

                                        {/* 텍스트 부분 */}
                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '24px', fontWeight: 'bold',
                                                verticalAlign: 'bottom',
                                                mb: 2,
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            언제 <br />
                                            어디서나
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '16px',
                                                verticalAlign: 'bottom',
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            번거롭게 자재를 찾아다니지 않아도<br />
                                            빠르게 샘플을 받아볼 수 있습니다.
                                        </Typography>

                                    </Box>


                                </Box>

                            </Box>

                            <Box sx={{ height: `45vh` }}>

                                <Box
                                    sx={{
                                        height: '100%',
                                        maxHeight: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                        borderRadius: '25px',
                                        backgroundImage: `url('${process.env.PUBLIC_URL}/main/fourthSection/right2.png')`,
                                        backgroundSize: 'cover',
                                        transition: 'background-image .5s ease-in-out',
                                        position: 'relative',
                                        overflowY: 'auto', // 필요한 경우 스크롤바 표시
                                    }}
                                >
                                    {/* 오버레이를 위한 별도의 컨테이너 */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            zIndex: 1, // 오버레이의 z-index 설정
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0)',
                                            borderRadius: '25px',
                                            transition: 'background-color .5s ease-in-out',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                            },
                                        }}
                                    ></Box>

                                    {/* 텍스트 및 아이콘은 오버레이 컨테이너 밖에 위치 */}
                                    <Box
                                        sx={{
                                            ml: 4, mb: 4,
                                            display: 'flex',
                                            flexDirection: 'column', // 수직 방향으로 아이템들을 쌓음
                                            alignItems: 'flex-start', // 오른쪽 정렬
                                            position: 'relative',
                                            zIndex: 2,
                                        }}
                                    >

                                        {/* 텍스트 부분 */}
                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '24px', fontWeight: 'bold',
                                                verticalAlign: 'bottom',
                                                mb: 2,
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            다양성 <br />
                                            발견
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            component="h5"
                                            className="hover-text"
                                            sx={{
                                                color: 'white',
                                                fontSize: '16px',
                                                verticalAlign: 'bottom',
                                                transition: 'color .5s ease-in-out',
                                            }}
                                        >
                                            샘플뿐만 아니라 등록된 파트너 업체를 통해<br />
                                            자재를 구매하실 수 있습니다.
                                        </Typography>

                                    </Box>

                                </Box>

                            </Box>

                        </Grid>
                    </Grid>

                </Box>

                <Box sx={{ height: '5vh' }} />

            </Box>


            <Box sx={{ height: '7vh' }} />


            { /* Landing Page fifth section */ }
            <Box
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '65vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto',
                }}
            >

                <Box
                    sx={{
                        width: '90%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    }}
                >

                    <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                            color: 'rgb(41, 41, 46)',
                            fontSize: '28px',
                            fontWeight: 'bold',
                        }}
                    >
                        여러 업체의 제품을 확인해보세요.
                    </Typography>

                </Box>


                <Box sx={{ height: '7vh' }} />


                <ImageCarousel />


                <Box sx={{ height: '10vh' }} />

            </Box>

        </>
    );
}

export default Main;
