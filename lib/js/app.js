$("document").ready(function(){


//Define globals
var newTask_array = [];
var doneTask_array = [];
var deletedTask_array = [];
var defaultSettings; 
var prioritaskSettings; 


function createNewTask(name, date, importance, completeDate, taskTime, dtObject, taskNote){
	this.taskName = name;
	this.taskDate = date;
	this.taskImport = importance;
	this.completeDate = completeDate;
	this.taskTime = taskTime;
	this.dtObject = dtObject;
	this.taskNote = taskNote; 
}

function createNewSettings(warningDays, dangerDays, completedStore, deletedStore){
	this.warningDays = warningDays;
	this.dangerDays = dangerDays;
	this.completedStore = completedStore;
	this.deletedStore = deletedStore; 
}

//Possible hide/show functions for add task panel 

/*function hideAddList(domElement){
	domElement.hide();	

}

function showAddList(domElement){
	domElement.show();

}*/ 

function writeSettings(settingsObject, domElement){

	$(".btn").removeClass("active");

	$(".warning_days").val(" ");
	if (settingsObject.warningDays == 1){
		$(".warning_task_settings").text(settingsObject.warningDays + " Day");
	} else {
		$(".warning_task_settings").text(settingsObject.warningDays + " Days");
	}

	$(".danger_days").val(" ");

	if (settingsObject.dangerDays == 1){
		 $(".danger_task_settings").text(settingsObject.dangerDays + " Day");
	} else {
		 $(".danger_task_settings").text(settingsObject.dangerDays + " Days");
	}

	if(isNaN(settingsObject.completedStore)){
		$("label.btn.btn-primary.completed_manual").addClass("active");

	} else if(settingsObject.completedStore == 10 ){
		$("label.btn.btn-primary.completed_ten").addClass("active");
	} else {
		$("label.btn.btn-primary.completed_fifty").addClass("active");

	}

	if(isNaN(settingsObject.deletedStore)){
		$("label.btn.btn-primary.deleted_manual").addClass("active");

	} else if(settingsObject.deletedStore == 10 ){
		$("label.btn.btn-primary.deleted_ten").addClass("active");
	} else {
		$("label.btn.btn-primary.deleted_fifty").addClass("active");

	}

	$("label.btn.btn-primary.completed_manual").click(function(){

		settingsObject.completedStore = "manually";

	});

	$("label.btn.btn-primary.completed_ten").click(function(){

		settingsObject.completedStore = 10;
	});

	$("label.btn.btn-primary.completed_fifty").click(function(){

		settingsObject.completedStore = 50;
	});

	$("label.btn.btn-primary.deleted_manual").click(function(){

		settingsObject.deletedStore = "manually";

	});

	$("label.btn.btn-primary.deleted_ten").click(function(){

		settingsObject.deletedStore = 10;
	});

	$("label.btn.btn-primary.deleted_fifty").click(function(){

		settingsObject.deletedStore = 50;

	});


}//End write settings 

function writeList(listArray, domElement){


	//clear ul for new sorted list
	domElement.children().remove();

	var importSymbol; 
	var panelClass;

	for (i=0; i < listArray.length; i++){

		
		var todayDate = new Date();
		var checkDate = new Date(listArray[i].taskDate);

		var oneDay = 1000 * 60 * 60 * 24;

		if ((checkDate.getTime()-todayDate.getTime()) < (oneDay * prioritaskSettings.dangerDays)) {
			panelClass = "panel-danger";

		} else if ((checkDate.getTime()-todayDate.getTime()) < (oneDay * prioritaskSettings.warningDays)){
			panelClass = "panel-warning";
		} else {
			panelClass = "panel-default";

		}


		//compare importance value and create HTML element 
		if (listArray[i].taskImport == true){
			importSymbol = "<span class='glyphicon glyphicon-star'></span>";
		} else {
			importSymbol = "<span></span>";
		}

		//Remove double quotes and add class and styling to LIs

		var todo_string = "<li><div class='panel " + panelClass + "'>";
		todo_string += "<div class='panel-heading'><h4 class='panel-title'>" + listArray[i].taskName + " " + importSymbol + "</h4></div>";
		todo_string += "<div class='panel-body'>" + "<span class='glyphicon glyphicon-calendar'></span>" + " " + listArray[i].taskDate;
		todo_string += "<br><span class='glyphicon glyphicon-time'></span>" + " " + listArray[i].taskTime;
		todo_string += "<br><span class='glyphicon glyphicon-pencil'></span> Notes"; 
		todo_string += "</br></br><button class='done_btn btn btn-success'><span class='glyphicon glyphicon-ok'></span> DONE</button>";
		todo_string +=" </div></li>";
		
		domElement.append(todo_string); 

	}//End for loop 

	$("input").val("");// clear input elements after addition
	$("input[type=checkbox]").attr("checked", false);

	var todo_list = domElement.html();


} //End writeList function

function writeDoneList(listArray, domElement){

	//clear ul for new sorted list
	domElement.children().remove();

	//settings while loop

	if (!isNaN(prioritaskSettings.completedStore)){
		while (listArray.length > prioritaskSettings.completedStore){
			listArray.pop();
		}

	}

	var importSymbol; 

	for (i=0; i < listArray.length; i++){

		if (typeof listArray[i] === "undefined"){
			listArray.splice(i, 1);
		} else {

			//compare importance value and create HTML element 
		if (listArray[i].taskImport == true){
			importSymbol = "<span class='glyphicon glyphicon-star'></span>";
		} else {
			importSymbol = "<span></span>";
		}


			
			var done_string = "<li><div class='panel panel-default'>";
			done_string += "<div class='panel-heading'><h4 class='panel-title'><s>" + listArray[i].taskName + " " + importSymbol + "</s></h4></div>";
			done_string += "<div class='panel-body'>" + "<span class='glyphicon glyphicon-calendar'></span>" + " " + listArray[i].taskDate;
			done_string += "<br><span class='glyphicon glyphicon-time'></span>" + " " + listArray[i].taskTime;
			done_string += "</br> <span class='glyphicon glyphicon-ok'></span>&nbsp;Date Completed: " + listArray[i].completeDate;
			done_string += "</br></br><button class='remove btn btn-danger'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
			done_string +=" </div></li>";



			$(".done_list").append(done_string);
		}//End else to check for undefined 


	}//End for loop 

	$("input").val("");// clear input elements after addition
	$("input[type=checkbox]").attr("checked", false);
	
	var todo_list = domElement.html();


} //End writeDoneList function

function writeDeletedList(listArray, domElement){

	//clear ul for new sorted list
	domElement.children().remove();


	//Settings if and while
	if (!isNaN(prioritaskSettings.completedStore)){
		while (listArray.length > prioritaskSettings.completedStore){
			listArray.pop();
		}

	}

	var importSymbol; 

	for (i=0; i < listArray.length; i++){

		//compare importance value and create HTML element 
		if (listArray[i].taskImport == true){
			importSymbol = "<span class='glyphicon glyphicon-star'></span>";
		} else {
			importSymbol = "<span></span>";
		}

		var todo_string = "<li><div class='panel panel-default'>";
		todo_string += "<div class='panel-heading'><h4 class='panel-title'>" + listArray[i].taskName + " " + importSymbol + "</h4></div>";
		todo_string += "<div class='panel-body'>" + "<span class='glyphicon glyphicon-calendar'></span>" + " " + listArray[i].taskDate;
		todo_string += "<br><span class='glyphicon glyphicon-time'></span>" + " " + listArray[i].taskTime;
		todo_string += "</br> <span class='glyphicon glyphicon-ok'></span>&nbsp;Date Completed: " + listArray[i].completeDate;
		todo_string += "</br></br><button class='restore_btn btn btn-default'><span class='glyphicon glyphicon-refresh'></span> Restore</button>" + "      ";
		todo_string += "<button class='trash_btn btn btn-danger'><span class='glyphicon glyphicon-trash'></span> Trash</button>";
		todo_string +=" </div></li>";
		
		domElement.append(todo_string); 

	}//End for loop 

} //End writeDeletedList function



//generate default settings


defaultSettings = new createNewSettings(3, 1, "manually", "manually");

prioritaskSettings = defaultSettings;


//if statement to load prioirtaskSettings from localStroage

if (localStorage.getItem("prioritaskSettings")){
	prioritaskSettings = JSON.parse(localStorage.getItem("prioritaskSettings"));
	}


//If statement to load newTask_array from localStorage and write to todoList

	if (localStorage.getItem("newTask_array")) {

			newTask_array = JSON.parse(localStorage.getItem("newTask_array"));

			writeList(newTask_array, $(".todo_list"));

		}//End load LocalStorage if statement 

	if (localStorage.getItem("doneTask_array")){

			doneTask_array = JSON.parse(localStorage.getItem("doneTask_array"));

			writeDoneList(doneTask_array, $(".done_list"));

		}//End load LocalStorage if statement 

	if (localStorage.getItem("deletedTask_array")){
		deletedTask_array = JSON.parse(localStorage.getItem("deletedTask_array"));
	} else {
		localStorage.setItem("deletedTask_array", JSON.stringify(deletedTask_array));
	}	

//Collect all input values and attach to object, then push to newTask_array
$(".add_task").click(function(){
	var new_date = $(".datepicker").val();
	var new_time = $(".timepicker").val();
	var new_task = $(".task_name").val();
	var new_import = $("input[type=checkbox]").prop("checked");	
	var new_dtObject = new Date(new_date + " " + new_time);

	

	var newTask = new createNewTask(new_task, new_date, new_import, " ", new_time, new_dtObject);



	newTask_array.push(newTask);

	newTask_array = newTask_array.sort(function(a , b){


		var dateA = new Date(a.dtObject); 
		var dateB = new Date(b.dtObject);

		if (+dateA === +dateB){

			var importA = a.taskImport
			var importB = b.taskImport
			return importB - importA; 
		}

		return dateA - dateB;
	}); //End sort function

	writeList(newTask_array, $(".todo_list"));

	//functionto write newTask_array to local storage
	localStorage.setItem('newTask_array', JSON.stringify(newTask_array)); 

});//End on click function for add button 	



//Start MARK TASK DONE list item function
$(".todo_list").on('click','.done_btn', function (){

	//get index of clicked item, add to doneTask_array, remove from newTask_array
	var list_index = $(this).parents("li").index();
	var doneTask = newTask_array[list_index];



	var dateConstructor = new Date();

	var monthCompleted; 
	var monthConstructor = dateConstructor.getMonth();

	if (monthConstructor == 0){
		monthCompleted = "January";
	} 
	if (monthConstructor == 1){
		monthCompleted = "February";
	}
	if (monthConstructor == 2){
		monthCompleted = "March";
	}
	if (monthConstructor == 3){
		monthCompleted = "April";
	}
	if (monthConstructor == 4){
		monthCompleted = "May";
	}
	if (monthConstructor == 5){
		monthCompleted = "June";
	}
	if (monthConstructor == 6){
		monthCompleted = "July";
	}
	if (monthConstructor == 7){
		monthCompleted = "August";
	}
	if (monthConstructor == 8){
		monthCompleted = "September";
	}
	if (monthConstructor == 9){
		monthCompleted = "October";
	}
	if (monthConstructor == 10){
		monthCompleted = "November";
	}
	if (monthConstructor == 11){
		monthCompleted = "December";
	}

	var dateCompleted = monthCompleted + " " + dateConstructor.getDate() + ", " + dateConstructor.getFullYear();

	doneTask.completeDate = dateCompleted;

	doneTask_array.push(doneTask);
	newTask_array.splice(list_index, 1);

	//resort newTask_array

	newTask_array = newTask_array.sort(function(a , b){

		var dateA = new Date(a.dtObject); 
		var dateB = new Date(b.dtObject);

		if (+dateA === +dateB){

			var importA = a.taskImport;
			var importB = b.taskImport;
			return importB - importA;  
		}

		return dateA - dateB;
	}); //End sort function

	writeList(newTask_array, $(".todo_list"));

	writeDoneList(doneTask_array, $(".done_list"));

	//functionto write newTask_array to local storage
	localStorage.setItem('newTask_array', JSON.stringify(newTask_array)); 
	//functionto write newTask_array to local storage
	localStorage.setItem('doneTask_array', JSON.stringify(doneTask_array)); 


});// End on click for DONE button


//BEGIN REMOVE BUTTON

$(".done_list").on('click','.remove', function (){
	console.log(deletedTask_array);

	//get index of clicked item, remove from doneTask_array, rewrite doneTask_array
	var list_index = $(this).parents("li").index();
	var deleteTask = doneTask_array[list_index];
	deletedTask_array.push(deleteTask);
	doneTask_array.splice(list_index, 1);

	localStorage.setItem('deletedTask_array', JSON.stringify(deletedTask_array));

	if(doneTask_array.length == 0){
		
		//clear .done_list ul and write doneTask_array to ul 
		$(".done_list").children().remove();

		localStorage.setItem('doneTask_array', JSON.stringify(doneTask_array)); 

	} else {

		writeDoneList(doneTask_array, $(".done_list"));
		//functionto write newTask_array to local storage
		localStorage.setItem('doneTask_array', JSON.stringify(doneTask_array)); 


	}//End Else 

});//End Remove button 


///START SDK for deleted.html

if ($(".deleted_items")){

	deletedTask_array = JSON.parse(localStorage.getItem('deletedTask_array'));

	writeDeletedList(deletedTask_array,$(".deleted_items"));

	//Start on click for restore button
	$(".deleted_items").on('click','.restore_btn', function(){
		var list_index = $(this).parents('li').index();

		console.log(list_index);

		var restoredTask = deletedTask_array[list_index];

		console.log(restoredTask);

		newTask_array.push(restoredTask);

		newTask_array = newTask_array.sort(function(a , b){

			var dateA = new Date(a.dtObject); 
			var dateB = new Date(b.dtObject);

			if (+dateA === +dateB){

				var importA = a.taskImport
				var importB = b.taskImport
				return importB - importA; 
			}

			return dateA - dateB;
		}); //End sort function

		deletedTask_array.splice(list_index, 1);


		writeDeletedList(deletedTask_array, $(".deleted_items"));

		localStorage.setItem('deletedTask_array', JSON.stringify(deletedTask_array));
		localStorage.setItem('newTask_array', JSON.stringify(newTask_array));

	}); //End restore on click call back 

	//Start Trash on click 

	$('.deleted_items').on('click', '.trash_btn', function(){
		var list_index = $(this).parents('li').index();

		deletedTask_array.splice(list_index, 1);


		writeDeletedList(deletedTask_array, $(".deleted_items"));
		localStorage.setItem('deletedTask_array', JSON.stringify(deletedTask_array));


	});//End trash on click callback
}//End deleted items if */


//Start SDK for Settings Panel 
if ($(".settings_panel")){ 
		

	writeSettings(prioritaskSettings, $(".settings_panel"));


	$(".restore_settings").click(function(event){
			event.preventDefault();
			prioritaskSettings = defaultSettings;
			localStorage.setItem("prioritaskSettings", JSON.stringify(prioritaskSettings));
			writeSettings(prioritaskSettings, $(".settings_panel"));

	});

	$(".update_settings").click(function(event){
			event.preventDefault();

			var newDangerDay = parseInt($(".danger_days").val());

			var newWarningDay = parseInt($(".warning_days").val());

			if (newDangerDay === "" || isNaN(newDangerDay)){
				newDangerDay = prioritaskSettings.dangerDays;
			} else {
				prioritaskSettings.dangerDays = newDangerDay;
			}

			if (newWarningDay === "" || isNaN(newWarningDay)){
				newWarningDay = prioritaskSettings.warningDays;
			} else{
				prioritaskSettings.warningDays = newWarningDay;
			}

			localStorage.setItem("prioritaskSettings", JSON.stringify(prioritaskSettings));
			writeSettings(prioritaskSettings, $(".settings_panel"));

	}); 

}//End Setting Panel if 


});//End document ready  
