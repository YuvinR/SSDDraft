import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Button,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonUpload: {
        margin: "5 auto"
    },
    cardShadow: {
        boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.33)",
        margin: '0.5rem'
    }
}));

export function FileUploaderComponent({ test }) {
    const classes = useStyles();
    const [PdfFile, setPdfFile] = useState(null)
    function test(e) {
        var selectedFile = e.target.files[0]
        var fileToLoad = selectedFile;
        var fileReader = new FileReader();
        var base64;
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            setPdfFile(base64);
            // Print data in console
            console.log(base64);
        };
        fileReader.readAsDataURL(fileToLoad);
    }
    return (
        <div>
            <Card className={classes.cardShadow}>
                <CardContent>
                    <div style={{ width: '100%', float: 'left' }}>
                        <h3>{PdfFile}</h3> <br />
                    </div>
                    <input
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        onChange={(e) => test(e)}
                    />
                    <label htmlFor="contained-button-file">
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </Box>
                    </label>
                </CardContent>
            </Card>
        </div>
    )
}