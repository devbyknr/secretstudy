import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';


function BBSInq() {

    let navigate = useNavigate();
    let location = useLocation();

    console.log("location =>",location);
    let state = location.state;
    console.log("state",state);


    // useEffect(() => {
    //     axios.get("/api/getCount").then((res) => {
    //       console.log(res.data);
    //     });
    //   }, []);

      let goHome = ()=>{
        navigate('/');
      }
    
  return (
    <div>
      <Box
        component="form"
        mt={2}
        mb={3}
        ml={5}
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <table>
          <tbody>
            <tr>
              <td>Title : {state.title}</td>
            </tr>
            <tr>
              <td>Content : {state.content}</td>
            </tr>
            <tr>
              <td>date : {state.date}</td>
            </tr>
          </tbody>
        </table>
        <Stack direction="row" spacing={2}>
          <Button onClick={goHome}>BACK</Button>
          {/* <Button disabled>Disabled</Button>
          <Button href="#text-buttons">Link</Button> */}
        </Stack>
      </Box>
    </div>
  );
}

export default BBSInq