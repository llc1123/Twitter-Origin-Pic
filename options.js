function saveSettings() {

	select = document.getElementById("subfolder");
	localStorage["subfolder"] = select.value;
	select = document.getElementById("fn-twitter");
	localStorage["fn-twitter"] = select.value;
	select = document.getElementById("time-format");
	localStorage["time-format"] = select.value;
	select = document.getElementById("save-as");
	localStorage["save-as"] = select.checked;

	var status = document.getElementById("status");
	status.innerHTML = "Changes Applied...";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

function loadSettings() {
	select = document.getElementById("subfolder");
	select.value = localStorage["subfolder"];
	select = document.getElementById("fn-twitter");
	select.value = localStorage["fn-twitter"];
	select = document.getElementById("time-format");
	select.value = localStorage["time-format"];
	select = document.getElementById("save-as");
	if (localStorage["save-as"] === "true") select.setAttribute("checked", "checked");
	else select.removeAttribute("checked");
}

function showTime(){
	var today = new moment();
	document.getElementById('time').innerHTML = today.format(document.getElementById("time-format").value);
	t = setTimeout(function() {showTime()}, 500);
}

window.onload = function() {
	loadSettings();
	showTime();
	document.getElementById("saveSettings").addEventListener("click",saveSettings);
};