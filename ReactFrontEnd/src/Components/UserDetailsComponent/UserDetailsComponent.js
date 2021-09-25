import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Button,
    Box,
    Typography,
    TextField,
    Avatar
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
    },
    avatar: {
        height: "10rem",
        width: "10rem",
        margin: "0 auto"
    }
}));

export function UserDetailsComponent({ userDetails }) {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.cardShadow}>
                <CardContent>
                    <Grid container md={12} xs={12} >
                        <Grid item md={12} xs={12} >
                            <Avatar
                                alt={userDetails.name}
                                src={userDetails.picture}
                                className={classes.avatar}
                            />
                        </Grid>
                    </Grid>

                    <Grid container md={12} xs={12} style={{ marginTop: "1rem" }}>
                        <Grid item md={12} xs={12} >
                            <TextField id="outlined-basic" label="Name" fullWidth variant="outlined" defaultValue={userDetails.name} disabled={true} />
                        </Grid>
                    </Grid>
                    <Grid container md={12} xs={12} style={{ marginTop: "1rem" }} >
                        <Grid item md={12} xs={12} >
                            <TextField id="outlined-basic" label="Nickname" fullWidth variant="outlined" defaultValue={userDetails.nickname} disabled={true} />
                        </Grid>
                    </Grid>
                    <Grid container md={12} xs={12} style={{ marginTop: "1rem" }}>
                        <Grid item md={12} xs={12} >
                            <TextField id="outlined-basic" label="Email" fullWidth variant="outlined" defaultValue={userDetails.email} disabled={true} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}