import React,{useState,useEffect} from "react";
import './CoinsDetails.css'
import axios  from "axios";
import Loading from "./Loading";
import { useParams} from 'react-router-dom'
import CoinChart from "./CoinChart";
import Header from "./Header";

const CoinsDetails = () =>{

    const[singleCoin,setSingleCoin] = useState([]);
    const[loading,setLoading] = useState(true);
    const[currency,setCurrency] = useState('inr');
    const currencySymbol = currency === 'inr' ? '₹': '$'
    const profit = singleCoin.market_data?.price_change_percentage_24h > 0   

    const {id} = useParams();

    const fetchSingleData = async () =>{
        try {
            const Singledata = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            console.log(Singledata.data);
            setSingleCoin(Singledata.data);
            setLoading(false);
        } 
        catch (error) {
            console.log(error);
            setLoading(false);    
        }
    }

    useEffect(() => {
        fetchSingleData()
    },[id])


    return (
        <div>
            {
                loading ? <Loading/> : 
                <>
                    <Header/>
                    <div className="two_part">
                        <div className="firstPart">
                            <div className="two_btns_singlecoins">
                                <button className="btninr" onClick={() => setCurrency('inr')}>INR</button>
                                <button className="btnusd"  onClick={() => setCurrency('usd')}>USD</button>
                            </div>

                            <div className="last_update">
                            Last Updated on {singleCoin.last_updated}
                            </div>

                            <div style={{marginTop:"1rem"}}>
                                <img height={"160px"} src={singleCoin.image.large} alt="img" />
                            </div>

                            <div className="coins_name">
                                {singleCoin.name}
                            </div>

                            <div className="coins_price">
                            <span style={{color:"orange"}}>Price :</span> {currencySymbol} {singleCoin.market_data.current_price[currency]}
                            </div>

                            <div className="coins_per">
                            <span style={{color:"orange"}}>Profite :</span>{profit ? 
                                <svg height={"20px"}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg> :  <svg   height={"20px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path  d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg> }
                            {singleCoin.market_data.price_change_percentage_24h.toFixed(2)} % 
                            </div>

                            <div className="coins_curr_rank">
                                <span style={{color:"orange"}}>Rank : #</span>{singleCoin.market_cap_rank}
                            </div>

                            <div className="text_description">
                                {singleCoin.description['en'].split('.')[0]}.
                            </div>
                        </div>
                        <div className="secondPart">
                        <CoinChart currency={currency} /> 
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default CoinsDetails;