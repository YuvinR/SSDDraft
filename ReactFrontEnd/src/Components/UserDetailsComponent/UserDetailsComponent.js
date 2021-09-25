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
        margin: '0.5rem'
    }
}));

export function UserDetailsComponent({ test }) {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.cardShadow}>
                <CardContent>
                    user
                </CardContent>
            </Card>
        </div>
    )
}