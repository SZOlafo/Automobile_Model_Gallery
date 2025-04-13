import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom';

export default function TitlebarImageList() {
    return (<>
        <ImageList id="image-list" sx={{ width: "100%", height: "100%" }}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <Link to='sth'>
                        <img
                            src='https://img.freepik.com/free-psd/red-isolated-car_23-2151852884.jpg'
                            alt={item.title}
                            loading="lazy"
                            width="100%"
                        />
                    </Link>
                    <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    </>)
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'FSO Polonez',
        author: '@CarVault3D',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Volkswagen Karmann',
        author: '@CarVault3D',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Fiat 125P',
        author: '@CarVault3D',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Nysa 522',
        author: '@CarVault3D',
    },
];