import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { ReactElement } from 'react';

interface HistoryDataProps {
  year: number;
  month: number;
  co2_saved: number;
  reward: number;
}

const useStyles = makeStyles(() => ({
  dashboardWrapper: {
    width: '100%',
  },
}));

const rows = [
  { year: 2021, month: 12, co2_saved: 560.0, reward: 599 },
  { year: 2021, month: 5, co2_saved: 37.5, reward: 0 },
  { year: 2022, month: 1, co2_saved: 232.0, reward: 605 },
  { year: 2022, month: 2, co2_saved: 340, reward: 12 },
  { year: 2022, month: 3, co2_saved: 0, reward: 0 },
  { year: 2022, month: 4, co2_saved: 543.0, reward: 599 },
];

// get the keys of the objects in the array
const getKeys = (arr: HistoryDataProps[]) => Object.keys(arr[0]);

const tabelHeaders = getKeys(rows);
// sort by year and month
const sortByYearAndMonth = (a: HistoryDataProps, b: HistoryDataProps) => {
  if (Number(a.year) - Number(b.year) != 0) {
    return b.year - a.year;
  }
  return b.month - a.month;
};

const sortedRows = rows.sort(sortByYearAndMonth);

console.log(sortedRows);

export const UserHistoryView = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.dashboardWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tabelHeaders.map((header) => (
                <React.Fragment key={header}>
                  <TableCell>{header}</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ month, year, co2_saved, reward }) => (
              <TableRow
                key={`${year}-${month}-${co2_saved}-${reward}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{year}</TableCell>
                <TableCell>{month}</TableCell>
                <TableCell>{co2_saved}</TableCell>
                <TableCell>{reward}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
