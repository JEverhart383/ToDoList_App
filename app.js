$("document").ready(function(){


//Define globals
var newTask_array = [];
var doneTask_array = [];

function createNewTask(name, date, importance){
	this.taskName = name;
	this.taskDate = date;
	this.taskImport = importance;
}

function writeList(listArray, domElement){

	//clear ul for new sorted list
	domElement.children().remove();

	var importSymbol; 
	var panelClass;

	for (i=0; i < listArray.length; i++){

		
		var todayDate = new Date();
		var checkDate = new Date(listArray[i].taskDate);

		var oneDays = 1000 * 60 * 60 * 24;
		var threeDays = 1000 * 60 * 60 * 24 * 3;

		if ((checkDate.getTime()-todayDate.getTime()) < oneDays){
			panelClass = "panel-danger";

		} else if ((checkDate.getTime()-todayDate.getTime()) < threeDays){
			panelClass = "panel-warning";
		} else {
			panelClass = "panel-default";

		}


		//compare importance value and create HTML element 
		if (listArray[i].taskImport == true){
			importSymbol = "<span class='glyphicon glyphicon-exclamation-sign'></span>";
		} else {
			importSymbol = "<span class='glyphicon glyphicon-minus-sign'></span>";
		}

		//Remove double quotes and add class and styling to LIs

		var todo_string = "<li><div class='panel " + panelClass + "'>";
		todo_string += "<div class='panel-heading'><h4 class='panel-title'>" + listArray[i].taskName + "</h4></div>";
		todo_string += "<div class='panel-body'>" + listArray[i].taskDate + " " + importSymbol;
		todo_string += "</br></br><button class='done_btn btn btn-success'><span class='glyphicon glyphicon-ok'></span> DONE</button>";
		todo_string +=" </div></li>";
		
		domElement.append(todo_string); 

	}//End for loop 

	$("input").val("");// clear input elements after addition
	$("input[type=checkbox]").attr("checked", false);

	var todo_list = domElement.html();
	
	//functionto write newTask_array to local storage
	//localStorage.setItem('newTask_array', JSON.stringify(listArray)); 

} //End writeList function

function writeDoneList(listArray, domElement){

	//clear ul for new sorted list
	domElement.children().remove();

	var importSymbol; 

	for (i=0; i < listArray.length; i++){

		if (typeof listArray[i] === "undefined"){
			listArray.splice(i, 1);
		} else {

			//compare importance value and create HTML element 
			if (listArray[i].taskImport == true){
				importSymbol = "<span class='glyphicon glyphicon-exclamation-sign'></span>";
			} else {
				importSymbol = "<span class='glyphicon glyphicon-minus-sign'></span>";
			}

			//Remove double quotes and add class and styling to LIs

			//var done_string = "<li>" + listArray[i].taskName + " " + listArray[i].taskDate + " " + importSymbol + " " + "<button class='remove btn btn-danger'><span class='glyphicon glyphicon-remove'></span>  Remove</button></li>";
			
			var done_string = "<li><div class='panel panel-default'>";
			done_string += "<div class='panel-heading'><h4 class='panel-title'><s>" + listArray[i].taskName + "</s></h4></div>";
			done_string += "<div class='panel-body'>" + listArray[i].taskDate + " " + importSymbol;
			done_string += "</br></br><button class='remove btn btn-danger'><span class='glyphicon glyphicon-remove'></span> Remove</button>";
			done_string +=" </div></li>";



			$(".done_list").append(done_string);
		}//End else to check for undefined 


	}//End for loop 

	$("input").val("");// clear input elements after addition
	$("input[type=checkbox]").attr("checked", false);
	
	var todo_list = domElement.html();
	
	//functionto write newTask_array to local storage
	//localStorage.setItem('doneTask_array', JSON.stringify(listArray)); 


} //End writeDoneList function


//If statement to load newTask_array from localStorage and write to todoList

if (localStorage.getItem("newTask_array")) {

		newTask_array = JSON.parse(localStorage.getItem("newTask_array"));

		writeList(newTask_array, $(".todo_list"));


}//End load LocalStorage if statement 

if (localStorage.getItem("doneTask_array")){

		doneTask_array = JSON.parse(localStorage.getItem("doneTask_array"));

		writeDoneList(doneTask_array, $(".done_list"));

}//End load LocalStorage if statement 

//Collect all input values and attach to object, then push to newTask_array
$(".add_task").click(function(){
	var new_date = $(".datepicker").val();
	var new_task = $(".task_name").val();
	var new_import = $("input[type=checkbox]").prop("checked");	

	var newTask = new createNewTask(new_task, new_date, new_import);

	newTask_array.push(newTask);

	newTask_array = newTask_array.sort(function(a , b){

		var dateA = new Date(a.taskDate); 
		var dateB = new Date(b.taskDate);

		if (+dateA === +dateB){

			var importA = a.taskImport
			var importB = b.taskImport
			return importB - importA; 
		}

		return dateA - dateB;
	}); //End sort function

	console.log(newTask_array);

	writeList(newTask_array, $(".todo_list"));

	//functionto write newTask_array to local storage
	localStorage.setItem('newTask_array', JSON.stringify(newTask_array)); 
	
});//End on click function for add button 	



//Start MARK TASK DONE list item function
$(".todo_list").on('click','.done_btn', function (){

	//get index of clicked item, add to doneTask_array, remove from newTask_array
	var list_index = $(this).parents("li").index();
	var doneTask = newTask_array[list_index];

	doneTask_array.push(doneTask);
	newTask_array.splice(list_index, 1);

	//clear .todo_list, resort newTask_array, print out newly sorted newTask_array 

	newTask_array = newTask_array.sort(function(a , b){

		var dateA = new Date(a.taskDate); 
		var dateB = new Date(b.taskDate);

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

	//get index of clicked item, remove from doneTask_array, rewrite doneTask_array
	var list_index = $(this).parents("li").index();
	doneTask_array.splice(list_index, 1);

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

});//End document ready  
