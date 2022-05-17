import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import dummyData from '../../../dummyData.json';
import { getMonthName } from './UserDashboardView';

type HistoryDataProps = RewardHistory;

type HistoryKeysArr = Array<keyof HistoryDataProps>;

const useStyles = makeStyles(() => ({
  dashboardWrapper: {
    width: '100%',
  },
}));

export const UserHistoryView = (): ReactElement => {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState<HistoryDataProps[]>([]);
  const [historyKeys, setHistoryKeys] = useState<HistoryKeysArr>([]);

  // callback for getting the keys of the objects in the array
  const getKeys = useCallback((arr: HistoryDataProps[]) => Object.keys(arr[0]), []);

  // sort callback =>  by year and month
  const sortByYearAndMonth = useCallback((a: HistoryDataProps, b: HistoryDataProps) => {
    if (Number(a.year) - Number(b.year) != 0) {
      return b.year - a.year;
    }
    return b.month - a.month;
  }, []);

  useEffect(() => {
    const fetchStaticData = async () => {
      const data = dummyData.HISTORY_DATA;
      const sortedRows = data.sort(sortByYearAndMonth);
      const keys = getKeys(data) as HistoryKeysArr;

      setHistoryData(sortedRows);
      setHistoryKeys(keys);
    };

    fetchStaticData();
  }, []);

  if (historyData.length === 0) return <p> Nothing to show for now</p>;

  return (
    <div className={classes.dashboardWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {historyKeys.map((header) => (
                <React.Fragment key={header}>
                  <TableCell>{header}</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map(({ month, year, co2_saved, reward }) => (
              <TableRow
                key={`${year}${month}${co2_saved}${reward}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{year}</TableCell>
                <TableCell>{`${getMonthName(month)}`}</TableCell>
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
