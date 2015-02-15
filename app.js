$("document").ready(function(){


//Define globals
var newTask_array = [];
var doneTask_array = [];

function createNewTask(name, date, importance){
	this.taskName = name;
	this.taskDate = date;
	this.taskImport = importance;


}

//If statement to load newTask_array from localStorage and write to todoList

if (localStorage.getItem("newTask_array")) {

	newTask_array = JSON.parse(localStorage.getItem("newTask_array"));
	console.log(newTask_array);

	//clear ul for new sorted list
	$(".todo_list").children().remove();

	for (i=0; i < newTask_array.length; i++){

		//Remove double quotes and add class and styling to LIs

		var todo_string = "<li>" + newTask_array[i].taskName + " " + newTask_array[i].taskDate + newTask_array[i].taskImport  + "<button class='done_btn'> DONE</button></li>";
		$(".todo_list").append(todo_string); 


	}//End for loop 



}

//Collect all input values and attach to object, then push to newTask_array
$(".add_task").click(function(){
	var new_date = $(".datepicker").val();
	var new_task = $(".task_name").val();
	var new_import = $("input[type=radio]:checked").val();	

	var newTask = new createNewTask(new_task, new_date, new_import);

	newTask_array.push(newTask);

	newTask_array = newTask_array.sort(function(a , b){

		var dateA = new Date(a.taskDate); 
		var dateB = new Date(b.taskDate);

		if (+dateA === +dateB){

			var importA = parseInt(a.taskImport);
			var importB = parseInt(b.taskImport);
			return importA - importB; 
		}

		return dateA - dateB;
	}); //End sort function

	//clear ul for new sorted list
	$(".todo_list").children().remove();

	var importSymbol; 

	for (i=0; i < newTask_array.length; i++){

		//compare importance value and create HTML element 
		if (newTask_array[i].taskImport == 1){
			importSymbol = "!!!!!";
		} else {
			importSymbol = "00000";
		}

		//Remove double quotes and add class and styling to LIs

		var todo_string = "<li>" + newTask_array[i].taskName + " " + newTask_array[i].taskDate + " " + importSymbol + "<button class='done_btn'> DONE</button></li>";
		$(".todo_list").append(todo_string); 


	}//End for loop 

	$("input").val("");// clear input elements after addition

	
	var todo_list = $('.todo_list').html();
	console.log(todo_list);
	

	//functionto write newTask_array to local storage
	localStorage.setItem('newTask_array', JSON.stringify(newTask_array)); 
	
});//End on click function for add button 	

//Start MARK TASK DONE list item function
$(".todo_list").on('click','.done_btn', function (){

	//get index of clicked item, add to doneTask_array, remove from newTask_array
	var list_index = $(this).parent().index();
	var doneTask = newTask_array[list_index];

	doneTask_array.push(doneTask);
	newTask_array.splice(list_index, 1);

	//clear .todo_list, resort newTask_array, print out newly sorted newTask_array 

	newTask_array = newTask_array.sort(function(a , b){

		var dateA = new Date(a.taskDate); 
		var dateB = new Date(b.taskDate);

		if (+dateA === +dateB){

			var importA = parseInt(a.taskImport);
			var importB = parseInt(b.taskImport);
			return importA - importB; 
		}

		return dateA - dateB;
	}); //End sort function

	//functionto write newTask_array to local storage
		localStorage.setItem('newTask_array', JSON.stringify(newTask_array)); 

	//clear ul for new sorted list
	$(".todo_list").children().remove();

	var importSymbol; 

	for (i=0; i < newTask_array.length; i++){

		//compare importance value and create HTML element 
		if (newTask_array[i].taskImport === 1){
			importSymbol = "!!!!!";
		} else {
			importSymbol = "00000";
		}

		//Remove double quotes and add class and styling to LIs

		var todo_string = "<li>" + newTask_array[i].taskName + " " + newTask_array[i].taskDate + " important" + "<button class='done_btn'> DONE</button></li>";
		$(".todo_list").append(todo_string);
	
	}//end for loop 


	


	//clear .done_list ul and write doneTask_array to ul 
	$(".done_list").children().remove();

	var importSymbol;

	for (i=0; i < doneTask_array.length; i++){

		//compare importance value and create HTML element 
		if (newTask_array[i].taskImport == 1){
			importSymbol = "!!!!!";
		} else {
			importSymbol = "00000";
		}

		//Remove double quotes and add class and styling to LIs

		var done_string = "<li>" + doneTask_array[i].taskName + " " + doneTask_array[i].taskDate + " important " + "<button class='remove'> Remove</button></li>";
		$(".done_list").append(done_string);


	}//End for loop  
});// End on click for DONE button

//BEGIN REMOVE BUTTON

$(".done_list").on('click','.remove', function (){

//get index of clicked item, remove from doneTask_array, rewrite doneTask_array
	var list_index = $(this).parent().index();
	doneTask_array.splice(list_index, 1);

	if(doneTask_array.length == 0){
		
		//clear .done_list ul and write doneTask_array to ul 
		$(".done_list").children().remove();

	} else {

		//clear .done_list ul and write doneTask_array to ul 
		$(".done_list").children().remove();

	for (i=0; i <= doneTask_array.length; i++){

		//Remove double quotes and add class and styling to LIs

		var done_string = "<li>" + doneTask_array[i].taskName + " " + doneTask_array[i].taskDate + " important" + "<button class='remove'> Remove</button></li>";
		$(".done_list").append(done_string);


	}//End for loop  
}//End Else 

});





});//End document ready  
