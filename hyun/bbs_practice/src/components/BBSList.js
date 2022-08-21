import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

function BBSList({ data }) {
    let navigate = useNavigate();

    let handleInq = ()=>{
        navigate('/inq',{state:data})
    }

  return (
    <TableRow key={data.id} onClick={handleInq}>
      <TableCell scope="row" align="center">
        {data.title}
      </TableCell>
      <TableCell align="center">{data.date}</TableCell>
      <TableCell align="center">{data.views}</TableCell>
    </TableRow>
  );
}

export default BBSList;
