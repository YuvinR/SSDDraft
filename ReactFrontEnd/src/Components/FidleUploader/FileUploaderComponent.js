import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent
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

    return (
        <div>
            <Card className={classes.cardShadow}>
                <CardContent>
                    file
                </CardContent>
            </Card>
        </div>
    )
}