import requests from "./api/requests";
import "./App.css";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Row from "./components/Row";

function App() {
  return (
    <div className="app">
      <Nav />
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
      <Footer />
    </div>
  );
}

export default App;
