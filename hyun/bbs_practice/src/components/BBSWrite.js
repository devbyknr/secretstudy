import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import subUtils from "../utils/subUtils";
import { useNavigate } from 'react-router-dom';

function BBSWrite() {

 let navigate =  useNavigate();

  const [textValue, setTextValue] = useState("");
  const [titleValue, setTitleValue] = useState("");

  useEffect(() => {
    axios.get("/api/getCount").then((res) => {
      console.log(res.data);
    });
  }, []);

  let goHome = () => {
    navigate("/");
  };

  let handleTextBox = (e) => {
    setTextValue(e.target.value);
  };
  let handleTitleBox = (e) => {
    setTitleValue(e.target.value);
  };
  let handleSubmit = (e) => {
    let count = 0;
    axios.get("/api/getCount").then((res) => {
      console.log(res.data);
      count = res.data.count + 1;

      let param = {
        _id: count,
        title: titleValue,
        content: textValue,
        date: subUtils.getToday(),
        views: 0,
      };

      axios
        .post("/api/write", param)
        .then((res) => {
          console.log("/api/write success",res.data);
          alert("writing success");
          goHome();
        })
        .catch((err) => {
          alert(err);
        });
    });

    // _id: { type: Number, required: true, unique: true },
    // title: { type: String, required: true },
    // date: { type: String },
    // views: { type: Number }
  };

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
        <TextField
          fullWidth
          margin="dense"
          id="outlined-multiline-static fullWidth"
          label="Title"
          placeholder="input your Title"
          multiline
          rows={1}
          defaultValue=""
          onChange={handleTitleBox}
        />

        <TextField
          fullWidth
          margin="dense"
          id="outlined-multiline-static fullWidth margin-dense"
          label="Content"
          placeholder="input your Text"
          multiline
          rows={20}
          defaultValue=""
          onChange={handleTextBox}
        />
        <Stack direction="row" spacing={2}>
          <Button onClick={handleSubmit}>Write</Button>
          <Button onClick={goHome}>BACK</Button>
          {/* <Button disabled>Disabled</Button>
          <Button href="#text-buttons">Link</Button> */}
        </Stack>
      </Box>
    </div>
  );
}

export default BBSWrite;
