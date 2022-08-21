import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import requests from "../api/requests";
import styled from "styled-components";

export default function Banner() {
  const [isClicked, setIsClicked] = useState(false);
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화데이터들을 가져오기
    //async 및 awit를 하지 않으면 pending상태가 될 수 있다.
    //금융인증서 init로 await를 해줘야 될거 같은데..
    const request = await axios.get(requests.fetchNowPlaying);
    console.log(request);

    //여러영화중 영화 하나의 id를 가져오기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    //특정영화의 더 상세정보 가져오기
    const { data: movieInfo } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieInfo);
  };
  const truncate = (str, len) => {
    return str?.length > len ? str.substr(0, len - 1) + "..." : str;
  };
  if (isClicked) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos?.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  } else {
    return (
      <div>
        <header
          className="banner"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "top center",
            backgroundSize: "cover",
          }}
        >
          <div className="banner__contents">
            <h1 className="banner__title">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="banner__buttons">
              <button
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
              <button className="banner__button info">More Information</button>
            </div>

            <h1 className="banner__description">
              {truncate(movie?.overview, 100)}
            </h1>
          </div>
          <div className="banner--fadeBottom" />
        </header>
      </div>
    );
  }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
