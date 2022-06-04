var time = moment().hours(); //this line uses moment.js to get the time in hours of day
var dayDisplay = document.querySelector("#currentDay"); 
var getDate = new Date();                            //lines 2-3 get and display the current date+time+timezone
dayDisplay.innerText = "Today is " + getDate;

var colorCode = function(){
        for(let i = 8; i <= 17; i++){                //lines 6-17 act as a function which color-codes our timeblocks as time passes in the day
                if(i < time){
                        $("#" + i).addClass("past");
                          
                }else if(i === time){
                        $("#" + i).addClass("present");
                }else if(i > time){
                        $("#" + i).addClass("future");
                }
        }
};

$(".text-area").on("click", function(){
    console.log("text clicked");
    var text = $(this)                                      //lines 19-27 allow us to edit our textareas in our timeblocks
    .text()
    .trim()
  var textInput = $("<textarea>").val(text).addClass("w-75");
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

$(".saveBtn").on("click", saveLocal) //this line targets the save button on a click, to run the function saveLocal

function saveLocal(event){
//     console.log($(event.target).siblings()[0].value)
    var textValue = $(event.target).siblings()[0].value    //lines 31-36 determine what is saved to localstorage, with timeKey being the timeblock and textValue being the textarea's content
    var timeKey = $(event.target).parent()[0].id
    localStorage.setItem(timeKey, textValue);
};

function renderStorage(){
        for(let i = 8; i <= 17; i++){
                // console.log(localStorage.getItem(i))                                    //lines 38-44 allow us to load items from localstorage onto their appropriate timeblocks
                $("#" + i).children(".text-area")[0].value = localStorage.getItem(i);
                // console.log($("#" + i).children())
        }
};

colorCode();            //lines 46 and 47 simply call functions which the user would need to be loaded upon page load.
renderStorage();
console.log("hours is: ",time); 