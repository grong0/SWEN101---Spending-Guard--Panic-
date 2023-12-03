import { Component, useEffect, useRef, useState } from "react";
import "../styles/NoteTaker.css";
import { FaArrowRight } from "react-icons/fa";
import Cookies from "js-cookie";
import * as Joy from "@mui/joy";
import DefaultCurrencies from "./DefaultCurrencies";

const testPosts = {
	1700258632032: {
		amount: 30,
		operation: "deposit",
		date: 221700258632032,
		currency: "usd",
	},
};

function Post(props) {
	return (
		<Joy.Card
			sx={{ mb: props.workingKey != props.numofPosts - 1 ? "8px" : "0px" }}
			variant="soft"
			color="primary"
		>
			<Joy.CardContent sx={{ display: "flex", flexDirection: "row" }}>
				<div className="note-left-side">
					<Joy.Typography level="h2" className="note-currency">
						{props.currency}
					</Joy.Typography>
					<Joy.Typography level="body-sm" className="note-date">
						{new Date(parseInt(props.date)).toDateString()}
					</Joy.Typography>
				</div>

				<div className="note-right-side">
					<Joy.Typography
						level="h2"
						sx={{ ml: "auto", alignSelf: "center" }}
						color={props.operation == "withdraw" ? "danger" : "success"}
					>
						{(props.operation == "withdraw" ? "-" : "+") + props.symbol + props.amount.toFixed(props.decimal_places)}
					</Joy.Typography>
					<Joy.Typography level="body-sm" sx={{ alignSelf: "center", float: "right" }}>
						{props.symbol + props.total.toFixed(props.decimal_places)}
					</Joy.Typography>
				</div>
			</Joy.CardContent>
		</Joy.Card>
	);
}

function NoteTaker() {
	const [posts, setPosts] = useState({});
	function updatePosts(note) {
		setPosts(note);
	}
	const [currencies, setCurrencies] = useState({});
	function updateCurrencies(currency) {
		setCurrencies(currency);
	}

	const [currency, setCurrency] = useState();
	function updateCurrency(newCurrency) {
		setCurrency(newCurrency);
	}
	const [operation, setOperation] = useState("withdraw");
	function updateOperation(newOperation) {
		setOperation(newOperation);
	}
	const [amount, setAmount] = useState(0);
	function updateAmount(newAmount) {
		setAmount(newAmount);
	}

	const notesRef = useRef();
	const dummyDivRef = useRef();

	// Handle Cookies
	function handleSubmit(event) {
		event.preventDefault();
		handleNote({
			amount,
			total: parseFloat(getTotal(currency) + (operation == "withdraw" ? amount * -1 : amount)),
			operation,
			date: new Date().getTime().toString(),
			currency,
		});
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

	function getTotal(currency) {
		var total = 0;
		Object.keys(posts).forEach((postKey) => {
			if (posts[postKey].currency == currency) {
				if (posts[postKey].operation == "withdraw") {
					total -= parseFloat(posts[postKey].amount);
				} else if (posts[postKey].operation == "deposit") {
					total += parseFloat(posts[postKey].amount);
				}
			}
		});
		return total;
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
			Cookies.set("currencies", JSON.stringify(DefaultCurrencies));
		}

		updatePosts(JSON.parse(Cookies.get("notes")));
		updateCurrencies(JSON.parse(Cookies.get("currencies")));
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
						total={posts[key].total}
                        decimal_places={currencies[posts[key].currency].decimal_places}
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
						required
						onChange={(e, value) => {
							updateCurrency(value);
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
						required
						onChange={(e, value) => {
							updateOperation(value);
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
						required
						slotProps={{
							input: {
								step: currency != null ? 1 / Math.pow(10, currencies[currency].decimal_places) : 1,
							},
						}}
						startDecorator={currency != null ? currencies[currency].symbol : ""}
						onChange={(value) => {
							updateAmount(parseFloat(value.target.value));
						}}
					/>
					<Joy.IconButton color="primary" variant="soft" type="submit">
						<FaArrowRight />
					</Joy.IconButton>
				</div>
			</form>
		</div>
	);
}

export default NoteTaker;
