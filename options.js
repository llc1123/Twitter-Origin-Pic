function saveSettings() {

	select = document.getElementById("fn-twitter");
	localStorage["fn-twitter"] = select.value;

	var status = document.getElementById("status");
	status.innerHTML = "Changes Applied...";
	setTimeout(function() {
		status.innerHTML = "";
	}, 750);
}

function loadSettings() {
	select = document.getElementById("fn-twitter");
	select.value = localStorage["fn-twitter"];
}

window.addEventListener("load", function() {
	loadSettings();
	document.getElementById("saveSettings").addEventListener("click",saveSettings);
});