import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ImageCarousel() {
    const carouselItems = [
        {
            img: 'main/fifthSection/film_1.png',
            text: 'Interior Architectural Film',
            text2: 'NF36'
        },
        {
            img: 'main/fifthSection/film_2.png',
            text: 'Interior Architectural Film',
            text2: 'B3'
        },
        {
            img: 'main/fifthSection/film_3.png',
            text: 'Interior Architectural Film',
            text2: 'NE24'
        },
        {
            img: 'main/fifthSection/film_4.png',
            text: 'Interior Architectural Film',
            text2: 'B8'
        },
        {
            img: 'main/fifthSection/film_5.png',
            text: 'Interior Architectural Film',
            text2: 'J2'
        },
        {
            img: 'main/fifthSection/film_6.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_1.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_2.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_3.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_4.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_5.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_6.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_1.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_2.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_3.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_4.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_5.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_6.png',
            text: 'Interior Architectural Film',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_1.png',
            text: '텍스트 1',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_2.png',
            text: '텍스트 2',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_3.png',
            text: '텍스트 3',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_4.png',
            text: '텍스트 4',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_5.png',
            text: '텍스트 5',
            text2: 'NE68'
        },
        {
            img: 'main/fifthSection/film_6.png',
            text: '텍스트 6',
            text2: 'NE68'
        },
    ];

    const [activePageIndex, setActivePageIndex] = useState(0);

    const itemsToShow = 6; // 한 번에 표시할 아이템 수
    const totalPages = Math.ceil(carouselItems.length / itemsToShow); // 전체 페이지 수

    const handlePrev = () => {
        setActivePageIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    };

    const handleNext = () => {
        setActivePageIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };

    return (
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handlePrev} sx={{ mr: 2 }}>
                    <ArrowBackIosNewIcon sx={{ fontSize: '24px', color: 'rgb(148, 148, 148)' }}  />
                </IconButton>
                <Grid container spacing={2} sx={{ width: '100%', height: '100%' }}>
                    {carouselItems.slice(activePageIndex * itemsToShow, (activePageIndex + 1) * itemsToShow).map((item, index) => (
                        <Grid item xs={2} key={index}>
                            <img src={item.img} alt={`carousel-image-${index}`} style={{ width: '100%' }} />
                            <Typography sx={{ textAlign: 'left', mt: 2, fontSize: '16px', fontWeight: 'bold', color: 'rgb(41, 41, 46)' }}>
                                {item.text}
                            </Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '16px', color: 'rgb(148, 148, 148)' }}>
                                Coala Interior Film Wood <br />
                                {item.text2}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <IconButton onClick={handleNext} sx={{ ml: 2 }}>
                    <ArrowForwardIosIcon sx={{ fontSize: '24px', color: 'rgb(148, 148, 148)' }} />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', mt: 8 }}>
                {[...Array(totalPages)].map((_, idx) => (
                    <Box
                        key={idx}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: idx === activePageIndex ? 'rgb(41, 41, 46)' : 'rgb(217, 217, 217)',
                            margin: '0 20px',
                        }}
                    />
                ))}
            </Box>
        </Box>

    );
}

export default ImageCarousel;
