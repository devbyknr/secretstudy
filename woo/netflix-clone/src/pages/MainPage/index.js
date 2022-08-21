import React from "react";
import requests from "../../api/requests";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
const MainPage = () => {
  return (
    <div>
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Action Moves" id="AM" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Moves" id="CM" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
    </div>
  );
};

export default MainPage;
