import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import React, { ReactElement, useEffect, useState } from 'react';

import dummyData from '../../../dummyData.json';
import { getMonthName } from './UserDashboardView';

const useStyles = makeStyles(() => ({
  dashboardWrapper: {
    width: '100%',
  },
}));

const getKeysFromArr = (arr: RewardHistory[]): string[] => Object.keys(arr[0]);

export const UserHistoryView = (): ReactElement => {
  const classes = useStyles();
  const [historyData, setHistoryData] = useState<RewardHistory[]>([]);
  const [historyDataKeys, setHistoryDataKeys] = useState<string[]>([]);

  useEffect(() => {
    const fetchStaticData = async () => {
      const data = dummyData.HISTORY_DATA;
      const sortedData = data.sort((a: RewardHistory, b: RewardHistory) => {
        if (a.year - b.year != 0) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
      const dataKeys = getKeysFromArr(data);

      setHistoryData(sortedData);
      setHistoryDataKeys(dataKeys);
    };

    fetchStaticData();
  }, []);

  return (
    <div className={classes.dashboardWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {historyDataKeys.map((header) => (
                <React.Fragment key={header}>
                  <TableCell>{header}</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map(({ month, year, co2_saved, reward }) => (
              <TableRow
                key={`${year}-${month}-${co2_saved}-${reward}`}
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
