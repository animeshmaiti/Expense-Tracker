import React from 'react';
import { Card,CardHeader,CardContent,Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';

export const Details = () => {
    const classes = useStyles();

  return (
    <Card className={classes.income}>
      <CardHeader title="Income" />
      <CardContent>
        <Typography variant="h5" component="p">
          $50
        </Typography>
        {/* <Doughnut data="DATA" /> */}
      </CardContent>
    </Card>
  )
}
