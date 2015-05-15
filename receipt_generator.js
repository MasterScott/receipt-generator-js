var maxItems = 25;

function generate_content() {
	document.getElementById("dateInput").value = new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
	
	var rightSide = document.getElementById("rightSide");

	for (var i = 0; i < maxItems; i++) {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var quantityText = document.createTextNode("Quantity:");
		td.appendChild(quantityText);
		tr.appendChild(td);
		var td = document.createElement("td");
		var quantityInput = document.createElement("input");
		quantityInput.id = "quantityInput" + i.toString();
		quantityInput.type = "text";
		quantityInput.size = "4";
		td.appendChild(quantityInput);
		tr.appendChild(td);
		var td = document.createElement("td");
		var partText = document.createTextNode("Part No.:");
		td.appendChild(partText);
		tr.appendChild(td);
		var td = document.createElement("td");
		var partInput = document.createElement("input");
		partInput.id = "partInput" + i.toString();
		partInput.type = "text";
		partInput.size = "15";
		td.appendChild(partInput);
		tr.appendChild(td);
		var td = document.createElement("td");
		var descText = document.createTextNode("Description:");
		td.appendChild(descText);
		tr.appendChild(td);
		var td = document.createElement("td");
		var descInput = document.createElement("input");
		descInput.id = "descInput" + i.toString();
		descInput.type = "text";
		descInput.size = "40";
		td.appendChild(descInput);
		tr.appendChild(td);
		var td = document.createElement("td");
		var priceText = document.createTextNode("Unit Price: $");
		td.appendChild(priceText);
		tr.appendChild(td);
		var td = document.createElement("td");
		var priceInput = document.createElement("input");
		priceInput.id = "priceInput" + i.toString();
		priceInput.type = "text";
		priceInput.size = "4";
		td.appendChild(priceInput);
		tr.appendChild(td);
		rightSide.appendChild(tr);
	}
}

function generate_document() {
	var docuWin = window.open();

	var documentNumber = document.getElementById("typeChoice").value.substr(0, 1) + document.getElementById("numInput").value;
	var hstNumString = "HST # 811480060 RT 0001";

	var docuHTML =
		'<html>' +
		'<head>' +
		'<style>' +
		'body { font-family:Arial }' +
		'p { margin:0 }' +
		'table#main, table#main th, table#main td { border:1px solid black; border-collapse:collapse }' +
		'table#main th, table#main td { padding:0.2em 0.2em 0.2em 0.2em }' +
		'table#main tr td:nth-child(1) { text-align:right }' +
		'table#main tr td:nth-child(2) { text-align:right }' +
		'table#main tr td:nth-child(3) { text-align:left }' +
		'table#main tr td:nth-child(4) { text-align:left }' +
		'table#main tr td:nth-child(5) { text-align:right }' +
		'table#main tr td:nth-child(6) { text-align:right }' +
		'</style>' +
		'<title>' + documentNumber + '</title>' +
		'</head>' +
		'<body style="width:680px; margin-left:auto; margin-right:auto">' +
		'<hr>' +
		'<div style="float:left; font-weight:bold; font-size:40px">Icewire Technologies</div>' +
		'<div style="float:right; font-weight:bold; font-size:40px; color:grey">' + document.getElementById("typeChoice").value + '</div>' +
		'<div style="clear:both; margin-bottom:20px"><hr></div>' +
		'<table style="width:100%">' +
		'<tr>' +
		'<td style="width:33%; text-align:left; font-style:italic; font-size:16px">' +
		'<p>1560 Bayview Ave, #302</p><p>Toronto, Ontario</p><p>M4G 3B8</p>' +
		'</td>' +
		'<td style="width:33%; text-align:center; vertical-align:bottom">' +
		'<p style="font-style:italic; font-weight:bold; font-size:16px">make@icewire.ca</p>' +
		'<p style="font-style:italic; font-weight:bold; font-size:16px">647-478-9946</p>' +
		'<p style="font-weight:bold; font-size:18px">http://make.icewire.ca</p>' +
		'</td>' +
		'<td style="width:33%; text-align:right">' +
		'<p style="font-family:serif; font-weight:bold; font-size:30px">' + documentNumber + '</p>' +
		'<p style="font-size:20px">Date: ' + document.getElementById("dateInput").value + '</p>' +
		'</td>' +
		'</tr>' +
		'</table>' +
		'<div style="background-color:#1f497d; width:100%; height:26px; margin:10px 0 10px 0"></div>';

	if (document.getElementById("orgInput").value || document.getElementById("nameInput").value || document.getElementById("emailInput").value) {
		docuHTML = docuHTML +
			'<table style="width:100%">' +
			'<tr>' +
			'<td style="width:33%; text-align:left">' +
			'<p style="font-weight:bold">Purchaser:</p>' +
			'<p style="font-style:italic">' + document.getElementById("orgInput").value + '</p>' +
			'<p style="font-style:italic">' + document.getElementById("nameInput").value + '</p>' +
			'<p style="font-style:italic">' + document.getElementById("emailInput").value + '</p>' +
			'</td>';
		if (document.getElementById("typeChoice").value == "Quote") {
			docuHTML += '<td style="width:33%; text-align:center">This quote is valid for 30 days</td>';
		}
		docuHTML = docuHTML +
			'<td style="width:33%; text-align:right"></td>' +
			'</tr>' +
			'</table>' +
			'</div>';
	}

	docuHTML = docuHTML +
		'<div style="float:right; margin-top:100px">Currency in ' + document.getElementById("currencyChoice").value + '</div>' +
		'<table id="main" style="width:100%">' +
		'<tr style="font-weight:bold; font-size:20px">' +
		'<th style="width:1em; padding:0 0.5em 0 0.5em">Item</th>' +
		'<th style="width:1em; padding:0 0.5em 0 0.5em">Quantity</th>' +
		'<th>Part No.</th>' +
		'<th>Description</th>' +
		'<th style="width:1em; padding:0 1em 0 1em">Price</th>' +
		'<th style="width:1em; padding:0 1em 0 1em">Total</th>' +
		'</tr>';

	var totalPriceAll = 0;
	for (var i = 0; i < maxItems; i++) {
		if (document.getElementById("quantityInput" + i.toString()).value) {
			var quantity = document.getElementById("quantityInput" + i.toString()).value;
			var part = document.getElementById("partInput" + i.toString()).value;
			var desc = document.getElementById("descInput" + i.toString()).value;
			var price = document.getElementById("priceInput" + i.toString()).value;
			var total = parseInt(quantity) * parseInt(price);
			totalPriceAll += total;
			docuHTML = docuHTML +
				'<tr>' +
				'<td>' + (i + 1).toString() + '</td>' +
				'<td>' + quantity + '</td>' +
				'<td>' + part + '</td>' +
				'<td>' + desc + '</td>' +
				'<td>$' + parseInt(price).toFixed(2).toString() + '</td>' +
				'<td>$' + total.toFixed(2).toString() + '</td>' +
				'</tr>';
		}
	}

	docuHTML = docuHTML +
		'<tr>' +
		'<td>&nbsp;</td>' +
		'<td>&nbsp;</td>' +
		'<td>&nbsp;</td>' +
		'<td>&nbsp;</td>' +
		'<td>&nbsp;</td>' +
		'<td>&nbsp;</td>' +
		'</tr>';

	if (document.getElementById("currencyChoice").value == "CAD") {
		var hst = totalPriceAll * 0.13;
		docuHTML = docuHTML +
			'<tr>' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>Subtotal</td>' +
			'<td>&nbsp;</td>' +
			'<td>$' + totalPriceAll.toFixed(2).toString() + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>HST</td>' +
			'<td>&nbsp;</td>' +
			'<td>$' + hst.toFixed(2).toString() + '</td>' +
			'</tr>' +
			'<tr style="font-weight:bold; font-size:18px">' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>Total</td>' +
			'<td>&nbsp;</td>' +
			'<td>$' + (totalPriceAll + hst).toFixed(2).toString() + '</td>' +
			'</tr>';
	} else {
		docuHTML = docuHTML +
			'<tr style="font-weight:bold; font-size:18px">' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>&nbsp;</td>' +
			'<td>Total</td>' +
			'<td>&nbsp;</td>' +
			'<td>$' + totalPriceAll.toFixed(2).toString() + '</td>' +
			'</tr>';
	}

	docuHTML = docuHTML +
		'</table>' +
		'<div>' + hstNumString + '</div>' +
		'<hr style="margin-bottom:50px">' +
		'<hr>' +
		'</body>' +
		'</html>';
	
	docuWin.document.write(docuHTML);
}

window.onload = generate_content;