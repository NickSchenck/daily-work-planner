var textInput = {};
var time = moment().hours();
var dayDisplay = document.querySelector("#currentDay");
var getDate = new Date();
dayDisplay.innerText = "Today is " + getDate;

var colorCode = function(){
        for(let i = 8; i <= 17; i++){
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
    var text = $(this)
    .text()
    .trim()
  var textInput = $("<textarea>").val(text).addClass("w-75");
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

$(".saveBtn").on("click", saveLocal)

function saveLocal(event){
    console.log($(event.target).siblings()[0].value)
    var textValue = $(event.target).siblings()[0].value
    var timeKey = $(event.target).parent()[0].id
    localStorage.setItem(timeKey, textValue);
};

function renderStorage(){
        for(let i = 8; i <= 17; i++){
                console.log(localStorage.getItem(i))
                $("#" + i).children(".text-area")[0].value = localStorage.getItem(i);
                console.log($("#" + i).children())
        }
};

colorCode();
renderStorage();
console.log("hours is: ",time); 