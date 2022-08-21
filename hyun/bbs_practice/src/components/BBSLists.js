import React from "react";
import BBSList from './BBSList';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
  
function BBSLists() {

    const [postListData, setPostListData] = useState([
        {
          // id : "1",
          // title : "제목",
          // date : "날짜",
          // views : "조회수"
        },
      ]);
    
    let navigate = useNavigate();

    let handleWrite = () => navigate('/write');

    useEffect(() => {
        axios.get("/api/find_all").then((res) => {
          console.log("/api/find_all data",res.data);
          setPostListData(res.data.reverse());
        });
      }, []);
    
    
  return (
    <div>
      <div>
        <Stack direction="row" spacing={2}>
          <Button onClick={handleWrite}>Write</Button>
          {/* <Button disabled>Disabled</Button>
          <Button href="#text-buttons">Link</Button> */}
        </Stack>
      </div>
      <TableContainer component={Paper} >
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
              <BBSList key={data.id} data={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BBSLists;
