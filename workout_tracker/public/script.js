document.getElementById('inputUsrData').addEventListener('click',function(event){
	var inputUsrExercise = document.getElementById("addExercise");
	var req = new XMLHttpRequest();
	var addCells = "/insert";
	var qParams = "exercise="+inputUsrExercise.elements.exercise.value+
						"&reps="+inputUsrExercise.elements.reps.value+
						"&weight="+inputUsrExercise.elements.weight.value+
						"&date="+inputUsrExercise.elements.date.value;
	if(inputUsrExercise.elements.measurement.checked){
		qParams+="&measurement=1";
	}
	else{
		qParams+="&measurement=0";
	}


	req.open("GET", addCells +"?"+qParams, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){


			var response = JSON.parse(req.responseText);
			var id = response.inserted;


			var table = document.getElementById("makeTable");


			var row = table.insertRow(-1);

		
			var inputName = document.createElement('td');
			inputName.textContent = inputUsrExercise.elements.exercise.value;
			row.appendChild(inputName);

			
			var inputReps = document.createElement('td');
			inputReps.textContent = inputUsrExercise.elements.reps.value;
			row.appendChild(inputReps);


			var inputWeight = document.createElement('td');
			inputWeight.textContent = inputUsrExercise.elements.weight.value;
			row.appendChild(inputWeight);

			var inputUnits = document.createElement('td');
			if(inputUsrExercise.elements.measurement.checked){
				inputUnits.textContent = "kg"
			}
			else{
				inputUnits.textContent = "lbs"
			}
			row.appendChild(inputUnits);


			var inputDate = document.createElement('td');
			inputDate.textContent = inputUsrExercise.elements.date.value;
			row.appendChild(inputDate);

	
			var editButton = document.createElement('td');
			var updateLink = document.createElement('a');
			updateLink.setAttribute('href','/update?id='+id);
			var updateButton = document.createElement('input');
			updateButton.setAttribute('type','button');
			updateButton.setAttribute('value','Update');
			updateLink.appendChild(updateButton);
			editButton.appendChild(updateLink);
			row.appendChild(editButton);

		
			var removeCell = document.createElement('td');
			var deleteButton = document.createElement('input');
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');
			deleteButton.setAttribute('value','Delete');
			deleteButton.setAttribute('onClick', 'deleteRow("makeTable",'+id+')');
			var deleteHidden = document.createElement('input');
			deleteHidden.setAttribute('type','hidden');
			deleteHidden.setAttribute('id', 'delete'+id);
			removeCell.appendChild(deleteButton);
			removeCell.appendChild(deleteHidden);
			row.appendChild(removeCell);


		}
		else {
	    	console.log('Oops! An unexpected error has occurred');
		}
	});
	

	req.send(addCells +"?"+qParams);
	event.preventDefault();
});

function deleteRow(tableId, id){

	var table = document.getElementById(tableId);
	var rowCount = table.rows.length;


	var deleteString = "delete"+id;

	for(var i = 1; i < rowCount; i++){
		var row = table.rows[i];
		var cellData = row.getElementsByTagName("td");
		var removeCell = cellData[cellData.length -1];
	
		if(removeCell.children[1].id === deleteString){
			
			table.deleteRow(i);
		}

	}


	var req = new XMLHttpRequest();
	var addCells = "/delete";

	req.open("GET", addCells+"?id="+id, true);

	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('delete request sent');
		} else {
		    console.log('there was an error');
		}
	});

	req.send(addCells+"?id="+id );

}