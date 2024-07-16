import { useState, useRef, useEffect } from "react";
import axios from "axios";
import './App.css';

function Converter() {
    const rAmt = useRef();
    const [dollar, setDollar] = useState("");
    const [amt, setAmt] = useState("");
    const [msg, setMsg] = useState("");

    const hAmt = (event) => { setAmt(event.target.value); }

    useEffect(() => {
        let url = "https://api.exchangerate-api.com/v4/latest/USD";
        axios.get(url)
            .then(res => setDollar(res.data.rates.INR))
            .catch(err => console.log("Issue" + err));
    }, [])

    const find = (event) => {
        event.preventDefault();
        if (amt === "") {
            alert("You didn't enter any number");
            setMsg("");
            rAmt.current.focus();
            return;
        }

        let a = parseFloat(amt);
        let r = a * dollar;
        setMsg("\u20B9" + r.toFixed(2));
    }

    return (
        <>
            <center>
                <h1>Live Currency Converter App</h1>
                <form onSubmit={find}>
                    <label htmlFor="amount">Enter amount in $</label> &nbsp;
                    <input id="amount" type="number" step="any" placeholder="Enter amount in $" onChange={hAmt} ref={rAmt} />
                    <br /> <br />
                    <input type="submit" value="Convert" />
                </form>
                <h2>{msg}</h2>
            </center>
            <footer>
                Made by <a href="https://www.linkedin.com/in/vinesh-ryapak-73693a227/">Vinesh Ryapak</a>
            </footer>
        </>
    );
}

export default Converter;
