/*GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist*/
var textInput = {};
var time = moment().hours();
var dayDisplay = document.querySelector("#currentDay");
var getDate = new Date();
dayDisplay.innerText = "Today is " + getDate;

$(".text-area").html("Edit me");
$(".text-area").on("click", function(){
    console.log("text clicked");
    var text = $(this)
    .text()
    .trim()
    

  
  var textInput = $("<textarea>").val(text).addClass("w-50");
  $(this).replaceWith(textInput);

  
  textInput.trigger("focus");
});
$(".m-1").on( "click", function(event) {
    $(event.delegateTarget).addClass("past");
  });
$(".saveBtn").on("click", function(textInput){
    localStorage.setItem("text", JSON.stringify(textInput));
    console.log(textInput)
});

  
console.log("hours is: ",time); 


//how to save each seperate timeblock to localstorage w/ click of save button
        //ONCLICK Savebutton TARGETS its corrisponding TEXT and SAVES it to localstorage
//how to write localstorage data to it's corrisponding timeblock on page reload
        //On page LOAD unique identifiers are TARGETED and PASSED to the appropriate timeblocks
//how to dynamically color-code timeblocks as time passes
        //IF <timeblock> < currentTime ADD .past
        //IF <timeblock> = currentTime ADD .present
        //IF <timeblock> > currentTime ADD .future

//could I save each timeblock-text into a whole array item for ease of access?