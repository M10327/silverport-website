window.addEventListener('load', LoadNav, false); 
function LoadNav() {
	var nav = document.getElementById("navigation");
	nav.innerHTML = `<nav-top>Navigation</nav-top>
					<a id="nav-entry" href="rules.html">Rules</a><br>
					<a id="nav-entry" href="guide.html">Guide</a><br>
					<a id="nav-entry" href="faq.html">FAQ</a><br>
					<a id="nav-entry" href="commands.html">Commands</a><br>
					<a id="nav-entry" href="wiki.html">Wiki</a><br>
					<a id="nav-entry" href="gun-stats.html">Gun Stats</a><br>
					<a id="nav-entry" href="donator-get.html">Donator</a><br>
					<a id="nav-sub" href="donator-get.html">└How to Get</a><br>
					<a id="nav-sub" href="donator-benefits.html">└Benefits</a><br>
					<a id="nav-sub" href="donator-commands.html">└Commands</a><br>`;
};