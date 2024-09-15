var ShowUnobtainable = false;


window.addEventListener('load', LoadGunStats, false); 
function LoadGunStats() {
	PopulateSelector();
	WeaponSelectorUpdated();
	var check = document.getElementById("accept");
	check.checked = false;
	UpdateCheckbox();
};

function UpdateCheckbox(){
	var check = document.getElementById("accept");
	ShowUnobtainable = check.checked;
	PopulateSelector();
	WeaponSelectorUpdated();
}

function PopulateSelector(){
	var obj = JSON.parse(json);
	var x = document.getElementById("WeaponSelector");
	var y = document.getElementById("WeaponSelectorComparison");
	x.innerHTML = "";
	y.innerHTML = "";
	y.innerHTML += '<option value="none" selected="selected">none</option>\n';
	var array = [];
	for(var key in obj){
		array.push(obj[key]);
	}
	array.sort((a, b) => a["Name"].localeCompare(b["Name"]));

	var first = true;
	for(var item in array){
			var value = array[item];
			if (value.Name.length < 1) continue;
			if (first){
				if (ShowUnobtainable){
					x.innerHTML += '<option value="' + value.Id + '" selected="selected">' + value.Name + '</option>\n';
					y.innerHTML += '<option value="' + value.Id + '">' + value.Name + '</option>\n';
					first = false;
				}
				else if (value.ObtainLocation != 'Unobtainable'){
					x.innerHTML += '<option value="' + value.Id + '" selected="selected">' + value.Name + '</option>\n';
					y.innerHTML += '<option value="' + value.Id + '">' + value.Name + '</option>\n';
					first = false;
				}
			}
			else{
				if (ShowUnobtainable){
					x.innerHTML += '<option value="' + value.Id + '">' + value.Name + '</option>\n';
					y.innerHTML += '<option value="' + value.Id + '">' + value.Name + '</option>\n';
				}
				else if (value.ObtainLocation != 'Unobtainable'){
					x.innerHTML += '<option value="' + value.Id + '">' + value.Name + '</option>\n';
					y.innerHTML += '<option value="' + value.Id + '">' + value.Name + '</option>\n';
				}
			}
		
	}
}

function WeaponSelectorUpdated() {
    var x = document.getElementById("WeaponSelector").value;
	var y = document.getElementById("WeaponSelectorComparison").value;
	var obj = JSON.parse(json);
	var gun = obj[x];
	var gun2 = gun
	if (y != "none") gun2 = obj[y]
		
	document.getElementById('itemname').innerHTML = `${GetDiff(gun, gun2, "Name")} (${GetDiff(gun, gun2, "Id")})`;
    document.getElementById('itemdesc').innerHTML = GetDiff(gun, gun, "Description");
	// BASIC
    
	document.getElementById('itemfiremode').innerHTML = GetDiff(gun, gun2, "Firemode");
	document.getElementById('itemrps').innerHTML = GetDiff(gun, gun2, "RPS");
	document.getElementById('itemrps').title= `Internal firerate: ${GetDiff(gun, gun2, "Firerate", false)}`;
	document.getElementById('itemrange').innerHTML = `${GetDiff(gun, gun2, "Range")}m`;
	document.getElementById('itemsprint').innerHTML = `${GetDiff(gun, gun2, "SprintADS")}`;
	document.getElementById('itemsizex').innerHTML = GetDiff(gun, gun2, "SizeX");
	document.getElementById('itemsizey').innerHTML = GetDiff(gun, gun2, "SizeY");
	document.getElementById('itemkept').innerHTML = GetDiff(gun, gun2, "IsKeptOnDeath");
	document.getElementById('itemraid').innerHTML = GetDiff(gun, gun2, "CanRaid");
	document.getElementById('itemobtain').innerHTML = `${GetDiff(gun, gun2, "ObtainLocation")}`;
	// RECOIL
	document.getElementById('itemminrecoilx').innerHTML = GetDiff(gun, gun2, "XRecoilMin");
	document.getElementById('itemmaxrecoilx').innerHTML = GetDiff(gun, gun2, "XRecoilMax");
	document.getElementById('itemhrecovery').innerHTML = GetDiff(gun, gun2, "XRecovery");
	document.getElementById('itemminrecoily').innerHTML = GetDiff(gun, gun2, "YRecoilMin");
	document.getElementById('itemmaxrecoily').innerHTML = GetDiff(gun, gun2, "YRecoilMax");
	document.getElementById('itemvrecovery').innerHTML = GetDiff(gun, gun2, "YRecovery");
	// DAMAGE
	document.getElementById('itemdmghead').innerHTML = GetDiff(gun, gun2, "DmgHead");
	document.getElementById('itemdmghead').title = `Internal Multiplier: ${GetDiff(gun, gun2, "MultiHead", false)}`;
	document.getElementById('itemdmgbody').innerHTML = GetDiff(gun, gun2, "DmgBody");
	document.getElementById('itemdmgbody').title = `Internal Multiplier: ${GetDiff(gun, gun2, "MultiBody", false)}`;
	document.getElementById('itemdmgarms').innerHTML = GetDiff(gun, gun2, "DmgArms");
	document.getElementById('itemdmgarms').title = `Internal Multiplier: ${GetDiff(gun, gun2, "MultiArms", false)}`;
	document.getElementById('itemdmglegs').innerHTML = GetDiff(gun, gun2, "DmgLegs");
	document.getElementById('itemdmglegs').title = `Internal Multiplier: ${GetDiff(gun, gun2, "MultiLegs", false)}`;
	// add icon for if you can replace one headshot with a body, and a hover to explain the icon
	document.getElementById('itemshotstokill').innerHTML = GetDiff(gun, gun2, "MinShotsToKill");
	document.getElementById('itemttk').innerHTML = GetDiff(gun, gun2, "TTK");
	document.getElementById('itemttkadaptive').innerHTML = GetDiff(gun, gun2, "TTKWithAdap");
	if (GetDiff(gun, gun2, "TTKWithAdap") < 0)
		document.getElementById('itemttkadaptive').innerHTML = "n/a";
	
	// BALLISTICS
	document.getElementById('itemsteps').innerHTML = GetDiff(gun, gun2, "Steps");
	document.getElementById('itemtravel').innerHTML = GetDiff(gun, gun2, "Travel");
	document.getElementById('itemdrop').innerHTML = GetDiff(gun, gun2, "Drop");
	document.getElementById('itemlaunchforce').innerHTML = GetDiff(gun, gun2, "ProjectileLaunchForce");
	
	// icon
	document.getElementById('itemicon').src = `gunicons/${gun["InternalName"]}_${gun["Id"]}.png`;
}

function GetDiff(gun1, gun2, key, applyColor = true){
	if (gun1[key] == gun2[key]) return gun1[key];
	else if (applyColor) return `<font color="#1b462b">${gun1[key]} -> ${gun2[key]}</font>`;
	else return `${gun1[key]} -> ${gun2[key]}`
}