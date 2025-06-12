import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TitlebarImageList() {

    const [modelList, setModelList] = useState([]);

    useEffect(() => {
        getModels();
    }, [])

    function getModels(){
        fetch("/api/carList")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setModelList(data);
        })
    }

    return (<>
        <ImageList id="image-list" sx={{ width: "100%", height: "100%" }}>
            {modelList.map((item) => (
                <ImageListItem key={item.carId}>
                    <Link to={item.carId}>
                        <img
                            src={item.previewImageUrl}
                            alt={item.carName}
                            loading="lazy"
                            width="100%"
                        />
                    </Link>
                    <ImageListItemBar
                        title={item.carName}
                        subtitle="@CarVault3D"
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.carName}`}
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
