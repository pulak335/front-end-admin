import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';




// ==============================|| TABLE - COLLAPSIBLE ||============================== //

export default function TableCollapsible(props: any) {
    const {nearResponder} = props;
    return (
        <MainCard
            content={false}
            title="Nearest zone and Responder list"
        >
            {/* table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>SL No</TableCell>
                        <TableCell>Ranking</TableCell>
                        {/* <TableCell>Responder Id</TableCell> */}
                        <TableCell>Zone</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                    </TableRow>
                    </TableHead>
                    {
                        nearResponder && nearResponder.map((item:any)=>(
                        <TableBody>

                        <TableRow
                        key={item.uuid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{nearResponder.indexOf(item)+1}</TableCell>

                        <TableCell>{item.rank}</TableCell>
                        {/* <TableCell>{item.res_id}</TableCell> */}
                        <TableCell>{item.zone_name}</TableCell>
                        <TableCell>{item.full_name}</TableCell>
                        <TableCell>{item.phone_num}</TableCell>
                        </TableRow>
                    </TableBody> 
                        ))
                    }
                </Table>
                </TableContainer>
        </MainCard>
    );
}
