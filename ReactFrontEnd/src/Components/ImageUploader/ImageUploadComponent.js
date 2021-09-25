import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Button,
    Box
} from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    buttonUpload: {
        margin: "5 auto"
    },
    cardShadow: {
        boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.33)",
        margin: '0.5rem',
        height: "20rem",
        overflowY: "scroll"
    }

}));

export function ImageUploadComponent({ test }) {
    const classes = useStyles();
    const [ImageObject, setImageObject] = useState();
    const Compress = require("compress.js")
    // const compress = new Compress;


    function onDrop(picture, imageUrl) {
        console.log("pri ", picture)
        console.log("imageUrl ", imageUrl[0])
        setImageObject(imageUrl[0]);
        console.log("setImageObject ", ImageObject)
    }

    async function UploadImage() {
        alert("Clocked")
    }

    return (
        <div>
            <Card className={classes.cardShadow}>
                <CardContent>
                    <ImageUploader
                        withIcon={false}
                        singleImage={true}
                        withPreview={true}
                        buttonText='Upload Your Image'
                        onChange={onDrop}
                        // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" className={classes.buttonUpload} onClick={UploadImage}>
                            Upload
                        </Button>
                    </Box>

                </CardContent>
            </Card>
        </div>
    )
}