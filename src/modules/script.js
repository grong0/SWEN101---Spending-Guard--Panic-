// import "fs";
// const fs = require("fs");
// const FILE_LOCATION = "../data/data.json";
const CURRENCY_SELECT = document.getElementById("currency-select");
const OPERATION_SELECT = document.getElementById("operation-select");
const NOTE_VALUE = document.getElementById("note-value");
const NOTE_POST = document.getElementById("note-post");
const PAST_NOTES = document.getElementById("past-notes");
const POST_SPACER = document.getElementById("post-spacer");
// const data = require("../data/data.json");

var currencies = {
	usd: {
		acronym: "usd",
		name: "United States Dollar",
		dp: 2,
	},
};
var notes = {
	11_2_2023_13_45: {
		currency: {
			acronym: "usd",
			name: "United States Dollar",
			dp: 2,
		},
		operation: "deposit",
		amount: 45.25,
	},
};

function addData(type, key, data) {
	if (type == "currencies") {
		if (Object.keys(currencies).indexOf(key) == -1) {
			currencies[key] = data;
		} else {
			console.log("key of '" + key + "' already exists.");
		}
	} else if (type == "notes") {
		if (Object.keys(notes).indexOf(key) == -1) {
			notes[key] = data;
		} else {
			console.log("key of '" + key + "' already exists.");
		}
	}
}

function createCurrency(abbreviatedName, fullName, decimalPoints = 0) {
	var currency = {
		acronym: abbreviatedName,
		name: fullName,
		dp: decimalPoints,
	};
	addData("currencies", abbreviatedName, currency);
}

function createNote(currency, operation, amount) {
	var note = {
		currency: currency,
		operation: operation,
		amount: amount,
	};
	addData("notes", Date.now(), note);
	console.log(notes);
}

function submitNote() {
	var currency = currencies[CURRENCY_SELECT.value];
	var operation = OPERATION_SELECT.value;
	var amount = parseFloat(NOTE_VALUE.value).toFixed(currency.dp);
	createNote(currency, operation, amount);
    refreshNotes();
}

function totalChildrenHeight(element) {
    var totalHeight = 0.0;
    for (var i = 1; i < element.children.length; i++) {
        console.log(element.children.item(i).clientHeight)
        totalHeight += element.children.item(i).clientHeight;
    }
    return totalHeight;
}
function createNoteNode(date, currency, amount) {
	var post = document.createElement("div");
	post.setAttribute("class", "post");

	var date = document.createElement("div");
	date.setAttribute("class", "post-date");
	date.innerText = date;
	var content = document.createElement("div");
	content.setAttribute("class", "post-content");

	var currency = document.createElement("span");
	currency.setAttribute("class", "post-currency");
	currency.innerText = currency;
	var amount = document.createElement("p");
	amount.setAttribute("class", "post-amount");
	amount.innerText = amount;

	content.appendChild(currency);
	content.appendChild(amount);

	post.appendChild(date);
	post.appendChild(content);

	return post;
}
function refreshNotes() {
	if (PAST_NOTES != null) {
		Object.keys(notes).forEach((key) => {
			PAST_NOTES.appendChild(
				createNoteNode(key, notes[key]["currency"]["acronym"], notes[key]["amount"])
			);
		});
        var marginTop = (PAST_NOTES.clientHeight - totalChildrenHeight(PAST_NOTES) < 0 ? 0 : PAST_NOTES.clientHeight - totalChildrenHeight(PAST_NOTES));
        // PAST_NOTES.children.item(0).style.marginTop = marginTop;
        console.log("past-posts height: " + PAST_NOTES.clientHeight);
        console.log("children height: " + totalChildrenHeight(PAST_NOTES));
        console.log("height: " + marginTop);
        POST_SPACER.style.height = marginTop;
        console.log("spacer height: " + POST_SPACER.style.height);
        PAST_NOTES.scrollTop = PAST_NOTES.scrollHeight - PAST_NOTES.clientHeight;
	}
}

function createOptionNode(value, name) {
	var node = document.createElement("option");
	node.setAttribute("value", value);
	node.innerText = name;
	return node;
}
function refreshCurrencies() {
	if (CURRENCY_SELECT != null) {
		Object.keys(currencies).forEach((key) => {
			CURRENCY_SELECT.appendChild(
				createOptionNode(currencies[key]["acronym"], currencies[key]["name"])
			);
		});
	}
}

refreshCurrencies();
refreshNotes();

NOTE_POST.addEventListener("click", submitNote);

// fs.readFile(FILE_LOCATION, "utf8", (err, content) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		var obj = JSON.parse(content);
// 		Object.keys(obj).forEach((element) => {
// 			console.log("Added " + element["fullName"] + " to currencies.");
// 			CURRENCY_SELECT.appendChild(
// 				createOptionNode(element["abbreviatedName"], element["fullName"])
// 			);
// 		});
// 	}
// });
