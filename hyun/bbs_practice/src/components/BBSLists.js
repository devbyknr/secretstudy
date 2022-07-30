import React from "react";
// import BBSList from './BBSList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

  
function BBSLists({ postListData, setPostListData }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">제목</TableCell>
            <TableCell align="center">작성일</TableCell>
            <TableCell align="center">조회수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postListData.map((data, index) => (
            <TableRow
              key={data.id}
            >
              <TableCell scope="row" align="center">
                {data.title}
              </TableCell>
              <TableCell align="center">{data.date}</TableCell>
              <TableCell align="center">{data.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BBSLists;
