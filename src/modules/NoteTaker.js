import { Component, useEffect, useRef, useState } from "react";
import "../styles/NoteTaker.css";
import { FaArrowRight } from "react-icons/fa";
import Cookies from "js-cookie";

// TODO: Track total currency
const defualtCurrencies = {
	usd: {
		name: "United States Dollar",
		acronym: "USD",
		symbol: "$",
		decimal_places: 2,
	},
	// mc: {
	// 	name: "MineCoin",
	// 	acronym: "MC",
	// 	symbol: "",
	//     decimal_places: 0
	// },
};

const testPosts = {
    1700258632032: {
        amount: 30,
        operation: "deposit",
        date: 221700258632032,
        currency: "USD"
    }
}

function Post(props) {
    // TODO: Add total currency under amount
	return (
		<div className="note">
			<div className="note-left-side">
				<h1 className="note-currency">{props.currency}</h1>
				<p className="note-date">{new Date(parseInt(props.date)).toDateString()}</p>
			</div>

			<div className="note-right-side">
				<p className={"note-amount " + props.operation}>{props.symbol + props.amount}</p>
			</div>
		</div>
	);
}

function NoteTaker() {
	const [posts, setPosts] = useState({});
	function updatePosts(note) {
		setPosts(note);
	}
	const [currencies, setCurrencies] = useState(defualtCurrencies);
	function updateCurrencies(currency) {
		setCurrencies(currency);
	}

	const [currency, setCurrency] = useState(Object.keys(currencies)[0]);
	const [operation, setOperation] = useState("withdraw");
	const [amount, setAmount] = useState();

    const notesRef = useRef();
    const dummyDivRef = useRef();

	function handleSubmit(event) {
		event.preventDefault();
		handleNote({ amount, operation, date: new Date().getTime().toString(), currency });
	}
	function handleNote(note) {
        // TODO: Handle cookie size restraints
		var currentNotes = Cookies.get("notes");
		if (currentNotes === null) {
			currentNotes = JSON.stringify({});
		}
		currentNotes = JSON.parse(currentNotes);
		currentNotes[note.date] = note;
		Cookies.set("notes", JSON.stringify(currentNotes));
		updatePosts(JSON.parse(Cookies.get("notes")));
	}

    function scrollToBottom() {
        dummyDivRef.current.scrollIntoView({ behavior:"smooth" });
    }
    useEffect(() => {
        scrollToBottom();
    }, [posts])

    useEffect(() => {
		if (Cookies.get("notes") === undefined) {
			Cookies.set("notes", JSON.stringify(posts));
		}
        
		if (Cookies.get("currencies") === undefined) {
			Cookies.set("currencies", JSON.stringify(currencies));
		}
        
        updatePosts(JSON.parse(Cookies.get("notes")));
		updateCurrencies(JSON.parse(Cookies.get("currencies")));

        Object.keys(posts).map((key, i) => {
            console.log(key);
        })
	}, []);

	return (
		<div id="notetaker-wrapper">
			<div id="notetaker-notes" ref={notesRef}>
				{Object.keys(posts).map((key, i) => (
					<Post
						key={i}
						amount={posts[key].amount}
						operation={posts[key].operation}
						date={posts[key].date}
						currency={currencies[posts[key].currency].acronym}
						symbol={currencies[posts[key].currency].symbol}
					/>
				))}
                <div style={{ float:"left", clear:"both" }} ref={dummyDivRef}></div>
			</div>
			<form id="write-note" onSubmit={handleSubmit}>
				<div id="note-currency-form">
					<select
						id="note-currency-select"
						name="currency"
						onChange={(value) => {
							setCurrency(value.target.value.toLowerCase());
						}}
					>
						{/* <option value="" disabled selected>
							Currency
						</option> */}
						{Object.keys(currencies).map((key, i) => (
							<option key={i} value={currencies[key].acronym}>
								{currencies[key].name}
							</option>
						))}
					</select>
				</div>
				<div id="note-operation-form">
					<select
						id="note-operation-select"
						name="operation"
						onChange={(value) => {
							setOperation(value.target.value);
						}}
					>
						{/* <option value="" disabled selected>
							Operation
						</option> */}
						<option value="withdraw">Withdraw</option>
						<option value="deposit">Deposit</option>
					</select>
				</div>
				<div id="note-submit-wrapper">
					<input
						id="note-value"
						type="number"
						// min={1 / Math.pow(10, currencies[currency].decimal_places)}
						// step={1 / Math.pow(10, currencies[currency].decimal_places)}
						onChange={(value) => {
							setAmount(parseFloat(value.target.value));
						}}
					/>
					<button id="note-post" type="submit">
						<FaArrowRight />
					</button>
				</div>
			</form>
		</div>
	);
}

export default NoteTaker;
