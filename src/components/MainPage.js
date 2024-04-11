import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
import Header from "./Header";
import Loading from "./Loading";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;
  const totalPages = Math.ceil(exchanges.length / coinsPerPage);

  const fetchExchangeData = async () => {
    try {
      let result = await axios.get("https://api.coingecko.com/api/v3/exchanges");
      setExchanges(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeData();
  }, []);

  // Logic for pagination
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = exchanges.slice(indexOfFirstCoin, indexOfLastCoin);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageClick(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="main">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="mainSection">
            {currentCoins.map((item) => {
              return (
                <div className="mapdata" key={item.id}>
                  <td>
                    <img src={item.image} alt="img" />
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>{item.trade_volume_24h_btc.toFixed(0)}</p>
                  </td>
                  <td>
                    <p style={{ display: "flex", textAlign: "center", gap: "0.5rem" }}>
                      <svg width={"20px"} height={"25px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFD43B" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"/></svg>
                      {item.trust_score_rank}
                    </p>
                  </td>
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>Previous</button>
            {pageButtons}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentCoins.length < coinsPerPage}>Next</button>
          </div>
          
        </>
      )}
    </div>
  );
};

export default MainPage;