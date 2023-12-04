import "../styles/Currency.css";

import * as Joy from "@mui/joy";
import * as JoyIcons from "@mui/icons-material";
import { tabClasses } from "@mui/joy/Tab";
import Cookies from "js-cookie";
import DefaultCurrencies from "./DefaultCurrencies";
import { useEffect, useState } from "react";

function EditCurrency(props) {
	const [currencies, setCurrencies] = useState(props.currencies);
	function updateCurrencies(currencies) {
		setCurrencies(currencies);
	}
	const [currency, setCurrency] = useState();
	function updateCurrency(currency) {
		setCurrency(currency);
	}

	const [name, setName] = useState();
	function updateName(name) {
		setName(name);
	}
	const [acronym, setAcronym] = useState();
	function updateAcronym(acronym) {
		setAcronym(acronym);
	}
	const [symbol, setSymbol] = useState("");
	function updateSymbol(symbol) {
		setSymbol(symbol);
	}
	const [decimal_places, setDecimalPlaces] = useState(0);
	function updateDecimalPlaces(decimal_places) {
		setDecimalPlaces(decimal_places);
	}

	const [error, setError] = useState("primary");
	function updateError(error) {
		setError(error);
	}
	const [helperText, setHelperText] = useState("");
	function updateHelperText(helperText) {
		setHelperText(helperText);
	}

	function getCurrencyNames(currencies) {
		var names = [];
		Object.values(currencies).forEach((item) => {
			names.push(item.name);
		});
		return names;
	}

	function handleSubmit(event) {
		event.preventDefault();
		handleCurrency({
			name,
			acronym,
			symbol,
			decimal_places: parseInt(decimal_places),
		});
	}
	function handleCurrency(newCurrency) {
		var currentCurrencies = Cookies.get("currencies");
		if (currentCurrencies === null) {
			Cookies.set("currencies", JSON.stringify({}));
		}
		currentCurrencies = JSON.parse(currentCurrencies);
		if (
			currencies == undefined &&
			Object.keys(currentCurrencies).includes(newCurrency.acronym.toLowerCase())
		) {
			updateError("danger");
			updateHelperText("A currency with the acronym '" + newCurrency.acronym + "' already exists.");
		} else if (
			currencies == undefined &&
			getCurrencyNames(currentCurrencies).includes(newCurrency.name)
		) {
			updateError("danger");
			updateHelperText("A currency with the name '" + newCurrency.name + "' already exists.");
		} else if (newCurrency.decimal_places < 0 || newCurrency.decimal_places > 100) {
			updateError("danger");
			updateHelperText("A currency's decimal points must be inbetween 0 and 100");
		} else {
			if (currencies != undefined) {
				delete currentCurrencies[currencies[currency].acronym.toLowerCase()];
				var posts = JSON.parse(Cookies.get("notes"));
				console.log("old currency: " + currency);
				console.log("new currency: " + newCurrency.acronym);
				Object.keys(posts).forEach((key) => {
					if (posts[key].currency === currency) {
						posts[key].currency = newCurrency.acronym.toLowerCase();
					}
				});
				console.log("new notes: ");
				console.log(posts);
				Cookies.set("notes", JSON.stringify(posts));
			}
			currentCurrencies[newCurrency.acronym.toLowerCase()] = newCurrency;
			Cookies.set("currencies", JSON.stringify(currentCurrencies));
			if (currencies != undefined) {
				updateCurrencies(JSON.parse(Cookies.get("currencies")));
				updateCurrency(newCurrency.acronym.toLowerCase());
			}

			updateError("success");
			if (currencies == undefined) {
				updateHelperText(newCurrency.name + " was successfully created!");
			} else {
				updateHelperText(newCurrency.name + " has been edited!");
			}
		}
	}

	function getNonDefault() {
		var nonDefaults = [];
		Object.keys(currencies).forEach((key) => {
			if (!Object.keys(DefaultCurrencies).includes(key)) {
				nonDefaults.push(key);
			}
		});
		return nonDefaults;
	}

	useEffect(() => {
		if (currencies != undefined && currency != undefined) {
			setName(currencies[currency].name);
			setAcronym(currencies[currency].acronym);
			setSymbol(currencies[currency].symbol);
			setDecimalPlaces(currencies[currency].decimal_places);
		}
	}, [currency]);

	useEffect(() => {
		if (currencies != undefined && getNonDefault().length != 0) {
			setCurrency(getNonDefault()[0]);
		}
		if (currencies != undefined) {
			setCurrencies(JSON.parse(Cookies.get("currencies")));
		}
	}, []);

	return (
		<>
			{currencies != undefined && getNonDefault().length == 0 ? (
				<Joy.Card variant="soft">
					<Joy.Typography level="h3">No Custom Currencies</Joy.Typography>
					<Joy.CardContent>
						<Joy.Typography level="body-md">
							You have no custom currencies. Create a new one in the{" "}
							<Joy.Typography variant="soft" color="primary">
								Create New
							</Joy.Typography>{" "}
							Tab.
						</Joy.Typography>
					</Joy.CardContent>
				</Joy.Card>
			) : (
				<form className="edit-currency" onSubmit={handleSubmit}>
					{currencies != undefined ? (
						<>
							<Joy.FormControl>
								<Joy.Select
									placeholder="Currency to edit"
									variant="soft"
									value={currency}
									onChange={(e, value) => {
										updateCurrency(value);
									}}
								>
									{getNonDefault().map((key, i) => (
										<Joy.Option key={i} value={key}>
											{currencies[key].name}
										</Joy.Option>
									))}
								</Joy.Select>
							</Joy.FormControl>
							<Joy.Divider />
						</>
					) : (
						console.log("")
					)}
					<Joy.FormControl>
						<Joy.Input
							placeholder="Name"
							variant="soft"
							required
							value={name}
							onChange={(e) => {
								updateName(e.target.value);
							}}
						/>
					</Joy.FormControl>
					<Joy.FormControl>
						<Joy.Input
							placeholder="Acronym"
							variant="soft"
							required
							value={acronym}
							onChange={(e) => {
								updateAcronym(e.target.value);
							}}
						/>
					</Joy.FormControl>
					<Joy.FormControl>
						<Joy.Input
							placeholder="Symbol"
							variant="soft"
							value={symbol}
							onChange={(e) => {
								updateSymbol(e.target.value);
							}}
						/>
					</Joy.FormControl>
					<Joy.FormControl>
						<Joy.Input
							placeholder="Deciaml Places"
							variant="soft"
							value={decimal_places}
							type="number"
							onChange={(e) => {
								updateDecimalPlaces(e.target.value);
							}}
						/>
					</Joy.FormControl>
					<Joy.FormControl error={error == "danger" ? true : false}>
						<Joy.Button color={error} variant="soft" type="submit">
							{currencies == null ? "Create" : "Edit"}
						</Joy.Button>
						<Joy.FormHelperText>
							{error == "danger" ? (
								<JoyIcons.InfoOutlined />
							) : error == "success" ? (
								<JoyIcons.CheckCircleOutlineRounded />
							) : (
								""
							)}
							{helperText}
						</Joy.FormHelperText>
					</Joy.FormControl>
				</form>
			)}
		</>
	);
}

function Currency() {
	const [currencies, setCurrecnies] = useState();
	function updateCurrencies(currency) {
		setCurrecnies(currency);
	}

	useState(() => {
		if (Cookies.get("currencies") === undefined) {
			console.log("creating new currencies");
			Cookies.set("currencies", JSON.stringify(DefaultCurrencies));
		}
		updateCurrencies(JSON.parse(Cookies.get("currencies")));
	}, []);

	return (
		<div id="content-wrapper">
			{/* <Joy.Card variant="soft">
				<Joy.Typography level="h2" sx={{ w: "100%", alignSelf: "center" }}>
					Currency Manager
				</Joy.Typography>
				<Joy.CardActions>
					<Joy.Button sx={{ width: "100%" }}>Create New</Joy.Button>
					<Joy.Button sx={{ width: "100%" }}>Edit Existing</Joy.Button>
				</Joy.CardActions>
			</Joy.Card> */}
			<Joy.Tabs
				sx={{
					// bgcolor: "rgba(0, 0, 0, 0)",
					borderRadius: "lg",
					[`& .${tabClasses.root}`]: {
						py: 1,
						flex: 1,
						transition: "0.3s",
						fontWeight: "md",
						fontSize: "md",
						[`&:not(.${tabClasses.selected}):not(:hover)`]: {
							opacity: 0.7,
						},
					},
				}}
			>
				<Joy.TabList disableUnderline tabFlex={1} sx={{ padding: "8px", borderRadius: "lg" }}>
					<Joy.Tab disableIndicator color="primary" sx={{ borderRadius: "lg" }}>
						Create New
					</Joy.Tab>
					<Joy.Tab disableIndicator color="primary" sx={{ borderRadius: "lg" }}>
						Edit Existing
					</Joy.Tab>
				</Joy.TabList>
				<Joy.TabPanel value={0}>
					<EditCurrency />
				</Joy.TabPanel>
				<Joy.TabPanel value={1}>
					<EditCurrency currencies={currencies} />
				</Joy.TabPanel>
			</Joy.Tabs>
		</div>
	);
}

export default Currency;
