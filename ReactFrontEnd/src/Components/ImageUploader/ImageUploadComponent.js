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
import { useAuth0 } from "@auth0/auth0-react";


const useStyles = makeStyles((theme) => ({
    buttonUpload: {
        margin: "5 auto"
    },
    cardShadow: {
        boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.33)",
        margin: '0.5rem',
        maxHeight: "25rem",
        overflowY: "scroll"
    }

}));

export function ImageUploadComponent({ test }) {
    const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect, getIdTokenClaims, logout } = useAuth0();
    const classes = useStyles();
    const [ImageObject, setImageObject] = useState();
    const Compress = require("compress.js")
    // const compress = new Compress;


    function onDrop(picture, imageUrl) {
        console.log("pri ", picture)
        console.log("imageUrl ", imageUrl[0])
        var convertedString = imageUrl[0];
        var fields = convertedString.split(",");
        console.log("feildname",fields[0]);
        console.log("feildnamexxx",fields[1]);
        setImageObject(fields[1]);
       
    }

    async function UploadImage() {
        const token = await getAccessTokenSilently();
        console.log("tokenggi", token);

        var gg = {
            userName:user.name,
            imageData:ImageObject
        }

        console.log("setImageObject ", gg)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`,  'Accept': 'application/json'},
            body: JSON.stringify(gg)
        };
        const response = await fetch(
            'http://localhost:5020/api/ImagesHandler/ImageDataSave', requestOptions
        );

        const responseData = await response.json();
        console.log("data", responseData)
    }

    const callSecureApi = async () => {
        const token = await getAccessTokenSilently();
        console.log("tokenggi", token);

        var gg = {
            userName:user.name,
            imageData:ImageObject
        }

        console.log("setImageObject ", gg)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`,  'Accept': 'application/json'},
            body: gg
        };
        const response = await fetch(
            'http://localhost:5020/ImagesHandler/ImageDataSave', requestOptions
        );

        const responseData = await response.json();
        console.log("data", responseData)
      };

    return (
        <div>
            <Card className={classes.cardShadow}>
                <CardContent>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained"  color="primary" className={classes.buttonUpload} onClick={UploadImage}>
                            Upload
                        </Button>
                    </Box>
                    <ImageUploader
                        withIcon={false}
                        singleImage={true}
                        withPreview={true}
                        buttonText='Upload Your Image'
                        onChange={onDrop}
                        // imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </CardContent>
            </Card>
        </div>
    )
}