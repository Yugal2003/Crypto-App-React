import React,{useState,useEffect} from "react";
import './Coins.css'
import Header from "./Header";
import Loading from "./Loading";
import axios  from "axios";
import { NavLink } from "react-router-dom";

const Coins = () =>{
    const [loading,setLoading] = useState(true)
    const [coins ,setCoins] = useState([]);
    
    const [currency ,setCurrency] = useState('inr');
    const currencySymbol = currency === 'inr' ? '₹': '$';
    const [search, setSearch]=useState('')
    
    
    const getCoinsData = async () =>{
        try {
            let CoinData = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`)
            console.log(CoinData.data);
            setCoins(CoinData.data);
            setLoading(false)
        } 
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() =>{
        getCoinsData()
    },[currency])
    

    return (
        <div>
            {
                loading ? <Loading/> : 
                <>
                    <Header/>
                    
                    <div className="serchbar_and_btns">
                        <div className="two_btns">
                            <button onClick={() => setCurrency('inr')}>
                                INR
                            </button>
                            <button className="sec_btn" onClick={() => setCurrency('usd')}>
                                USD
                            </button>
                        </div>
                        <div className="search_input">
                            <span className="span">Search :</span> <input type="text" placeholder="Search Your Coins" onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    
                    <table className="table_tr_tag"> 
                        <tr>Brand Logo</tr>
                        <tr>Coins Name</tr>
                        <tr>Trade Value</tr>
                        <tr>Percentage</tr>
                    </table>
                    
                    {
                        coins.filter((data) => {
                            if(data === ''){
                                return data;
                            } 
                            else if(data.name.toLowerCase().includes(search.toLowerCase())){
                                return data
                            }
                         }).map((item,index) => {
                            return(
                                <>
                                    <CoinCard id={item.id} index={index} key={index} item={item} currencySymbol={currencySymbol}  />
                                </>
                            )
                        })
                    }
                </>
            }
        </div>
    )
}

const CoinCard = ({index, item, currencySymbol,id}) =>{
    const profit = item.price_change_percentage_24h > 0;
    return(
        <NavLink to={`/coins/${id}`} style={{color : "white",textDecoration : "none"}}>
            <div className="single_coins_details">
                <div>
                    <img height={"100px"} src={item.image} alt="img" />
                </div>
                <div>{item.name}</div>
                <div>{currencySymbol} {item.current_price.toFixed(0)}</div>
                <div style={profit ? {color : "green"} : {color : "red"}}>
                    {profit ? "+   "  + item.price_change_percentage_24h.toFixed(2) : item.price_change_percentage_24h.toFixed(2)}
                </div>
            </div>
        </NavLink>
    )
}

export default Coins;