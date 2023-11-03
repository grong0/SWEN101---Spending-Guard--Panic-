import "../styles/NoteTaker.css";



function NoteTaker() {
	return (
		<div id="notetaker-wrapper">
			<div id="notetaker-notes">
				<div id="notes-spacer"></div>
				<div class="note">
					<div class="note-date"></div>
					<div class="note-content">
						<span class="note-currency"></span>
						<p class="note-amount"></p>
					</div>
				</div>
			</div>
			<div id="write-note">
				<form id="note-currency-form">
					<label>Currency</label>
					<select id="note-currency-select" name="currency"></select>
				</form>
				<form id="operation-form">
					<label>Operation</label>
					<select id="note-operation-select" name="operation">
						<option value="withdraw">Withdraw</option>
						<option value="deposit">Deposit</option>
					</select>
				</form>
				<input id="note-value" type="number" />
				<button id="note-post" type="submit">
					POST
				</button>
			</div>
		</div>
	);
}

export default NoteTaker;
