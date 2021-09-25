import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent
} from '@material-ui/core';
import ImageUploader from 'react-images-upload';


export function ImageUploadComponent({ test }) {
    const [ImageObject, setImageObject] = useState();

    function onDrop(picture) {
        console.log("pri ", picture)
        setImageObject(picture);
        console.log("setImageObject ", ImageObject)
    }

    return (
        <div>
            <ImageUploader
                withIcon={true}
                singleImage={true}
                withPreview={true}
                buttonText='Upload Your Image'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        </div>
    )
}