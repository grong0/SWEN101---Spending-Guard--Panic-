import { Component, useEffect, useRef, useState } from "react";
import "../styles/NoteTaker.css";
import { FaArrowRight } from "react-icons/fa";
import Cookies from "js-cookie";
import * as Joy from "@mui/joy";

// TODO: Track total currency
const defualtCurrencies = {
	usd: {
		name: "United States Dollar",
		acronym: "USD",
		symbol: "$",
		decimal_places: 2,
		total: 0,
	},
	// mc: {
	// 	name: "MineCoin",
	// 	acronym: "MC",
	// 	symbol: "",
	// 	decimal_places: 0,
	// 	total: 0,
	// },
};

const testPosts = {
	1700258632032: {
		amount: 30,
		operation: "deposit",
		date: 221700258632032,
		currency: "USD",
	},
};

function Post(props) {
	// TODO: Add total currency under amount
	return (
		<Joy.Card sx={{ mb: props.workingKey != props.numofPosts-1 ? "8px" : "0px" }} variant="soft" color="primary">
			<Joy.CardContent sx={{ display: "flex", flexDirection: "row" }}>
				<div className="note-left-side">
					<Joy.Typography level="h2" className="note-currency">
						{props.currency}
					</Joy.Typography>
					<Joy.Typography level="body-sm" className="note-date">
						{new Date(parseInt(props.date)).toDateString()}
					</Joy.Typography>
				</div>

				<Joy.Typography
					level="h3"
					sx={{ ml: "auto", alignSelf: "center" }}
					color={props.operation == "withdraw" ? "danger" : "success"}
				>
					{(props.operation == "withdraw" ? "-" : "+") + props.symbol + props.amount}
				</Joy.Typography>
			</Joy.CardContent>
		</Joy.Card>
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

	// Handle Cookies
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

	// Scroll Update Functionality
	function scrollToBottom() {
		dummyDivRef.current.scrollIntoView({ behavior: "smooth" });
	}
	useEffect(() => {
		scrollToBottom();
	}, [posts]);

	// Code on startup
	useEffect(() => {
		if (Cookies.get("notes") === undefined) {
			console.log("creating new notes");
			Cookies.set("notes", JSON.stringify(posts));
		}

		if (Cookies.get("currencies") === undefined) {
			console.log("creating new currencies");
			Cookies.set("currencies", JSON.stringify(currencies));
		}

		updatePosts(JSON.parse(Cookies.get("notes")));
		updateCurrencies(JSON.parse(Cookies.get("currencies")));

		// Object.keys(posts).forEach((key) => {
		//     currencies[posts[key].currency.toLowerCase].total += posts[key].amount
		// })

		// Object.keys(posts).map((key, i) => {
		// 	console.log(key);
		// });
	}, []);

	return (
		<div className="content-wrapper" id="notetaker-wrapper">
			<div id="notetaker-notes" ref={notesRef}>
				{Object.keys(posts).map((key, i) => (
					<Post
						key={i}
                        workingKey={i}
                        numofPosts={Object.keys(posts).length}
						amount={posts[key].amount}
						operation={posts[key].operation}
						date={posts[key].date}
						currency={currencies[posts[key].currency].acronym}
						symbol={currencies[posts[key].currency].symbol}
					/>
				))}
				<div style={{ float: "left", clear: "both" }} ref={dummyDivRef}></div>
			</div>
			<form id="write-note" onSubmit={handleSubmit}>
				<div id="note-options">
					<Joy.Select
						id="note-currency-select"
						variant="soft"
						name="currency"
                        color="primary"
                        placeholder="Currency"
						onChange={(e, value) => {
							setCurrency(value);
						}}
					>
						{Object.keys(currencies).map((key, i) => (
							<Joy.Option key={i} value={currencies[key].acronym.toLowerCase()}>
								{currencies[key].name}
							</Joy.Option>
						))}
					</Joy.Select>
					<Joy.Select
						id="note-operation-select"
						variant="soft"
						name="operation"
                        color="primary"
                        placeholder="Operation"
						onChange={(e, value) => {
							setOperation(value);
						}}
					>
						<Joy.Option value={"withdraw"}>Withdraw</Joy.Option>
						<Joy.Option value={"deposit"}>Deposit</Joy.Option>
					</Joy.Select>
				</div>
				<div id="note-submit-wrapper">
					<Joy.Input
						variant="soft"
						type="number"
                        color="primary"
                        placeholder="Amount"
						// step={currencies[currency].decimal_places}
						onChange={(value) => {
							setAmount(parseFloat(value.target.value));
						}}
					/>
					{/* <Joy.AspectRatio ratio="1" objectFit="cover"> */}
					<Joy.IconButton color="primary" variant="soft" type="submit">
						<FaArrowRight />
					</Joy.IconButton>
					{/* </Joy.AspectRatio> */}
				</div>
			</form>
		</div>
	);
}

export default NoteTaker;
