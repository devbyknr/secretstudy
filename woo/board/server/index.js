const express = require("express");
const app = express();
const port = 3300;
const bodyParser = require("body-parser");
const config = require("./config/key");
const mongoose = require("mongoose");
const { Board } = require("./models/Board");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));
//application/x-ww-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
//application/json형태를 분석해서 가져옴
app.use(bodyParser.json());

app.get("/api/list", (req, res) => {
  Board.findAll()
    .then((contents) => {
      if (!contents) {
        return res.status(404).send({ err: "Content not found" });
      } else {
        return res.json({
          listLoadSuccess: true,
          boardList: contents,
        });
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/api/create", (req, res) => {
  const board = new Board(req.body);
  board.save((err) => {
    if (err) {
      return res.json({ registSuccess: false, err });
    } else {
      return res.json({
        registSuccess: true,
      });
    }
  });
});

app.post("/api/view", (req, res) => {
  Board.findOneByTodoid(req.body.id)
    .then((content) => {
      console.log(content);
      if (!content) {
        return res.json({
          loadBoardSuccess: false,
        });
      } else {
        return res.json({
          loadBoardSuccess: true,
          board: content,
        });
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/api/modify", (req, res) => {
  console.log(req.body.id);
  console.log(req.body);
  Board.updateByTodoid(req.body.id, req.body)
    .then((content) => {
      if (!content) {
        return res.json({
          modifyBoardSuccess: false,
        });
      } else {
        return res.json({
          modifyBoardSuccess: true,
        });
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.post("/api/delete", (req, res) => {
  Board.deleteByTodoid(req.body.id)
    .then((results) => {
      if (!results) {
        return res.json({
          deleteSuccess: false,
        });
      } else {
        return res.json({
          deleteSuccess: true,
        });
      }
      console.log(results);
      return res.sendStatus(200);
    })
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
