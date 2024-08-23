let time = moment().hours(); //this line uses moment.js to get the time in hours of day
let dayDisplay = document.querySelector("#currentDay"); 
let getDate = new Date();                            //lines 2-3 get and display the current date+time+timezone
dayDisplay.innerText = `Today is ${getDate}.`;
let timeContainer = document.querySelector(".time-container");
let lowerTime = Number($("#lower-time").val());
let upperTime = Number($("#upper-time").val());
let testLower = document.querySelector("#lower-time");
let testUpper = document.querySelector("#upper-time");

$("#time-submit").on("click", function(event){
        event.preventDefault();
        let workdayTimes = [];
        let genLowerTime = lowerTime;
        let genUpperTime = upperTime;
        console.log('test', testLower, testUpper); /*Have to test if there are any differences between selecting via document.querySelector
        and $("#"), but I did discover here that we can access saved nodes text through selectedOptions property in devtools.*/
        console.log($("#lower-time"), $("#upper-time")); 
        console.log(genLowerTime, genUpperTime);
        
        while(genLowerTime < genUpperTime){ //these are a referrence to value(can see in html), wont be able to compair so neatly
                workdayTimes.push(genLowerTime); /*I think we have to push an object, so we can articulate
                from multiple pieces of data*/
                genLowerTime++;
        };
        workdayTimes.push(genUpperTime);
        console.log(workdayTimes);

        workdayTimes.forEach((time) =>{
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                let button = document.createElement("button");
                div.textContent = time;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = time;
                timeContainer.append(div);
                div.append(textarea);
                textarea.classList.add("text-area", "text-center", "w-75");
                div.append(button);
                button.classList.add("float-right", "saveBtn", "oi", "oi-file");
        });
        colorCode(lowerTime, upperTime);
});

let colorCode = function(start, stop){
        console.log("out of scope", start, stop);
        for(let i = start; i <= stop; i++){    
                console.log('inside scope', start, stop);  
                          //lines 6-17 act as a function which color-codes our timeblocks as time passes in the day
                if(i < time){
                        $("#" + i).addClass("past");
                }else if(i === time){
                        $("#" + i).addClass("present");
                }else if(i > time){
                        $("#" + i).addClass("future");
                };
        };
};

// let colorCode = function(){

//         for(let i = 8; i <= 17; i++){      
//                           //lines 6-17 act as a function which color-codes our timeblocks as time passes in the day
//                 if(i < time){
//                         $("#" + i).addClass("past");
//                 }else if(i === time){
//                         $("#" + i).addClass("present");
//                 }else if(i > time){
//                         $("#" + i).addClass("future");
//                 };
//         };
// };

$(".text-area").on("click", function(){
        let text = $(this).text().trim();
        let textInput = $("<textarea>").val(text).addClass("w-75");
        $(this).replaceWith(textInput);
        textInput.trigger("focus");
});

// $(".saveBtn").on("click", saveLocal) //this line targets the save button on a click, to run the function saveLocal

// function saveLocal(event){
//     let textValue = $(event.target).siblings()[0].value    //lines 31-36 determine what is saved to localstorage, with timeKey being the timeblock and textValue being the textarea's content
//     let timeKey = $(event.target).parent()[0].id
//     localStorage.setItem(timeKey, textValue);
// };

// function renderStorage(){

//         for(let i = 8; i <= 17; i++){
//                 // console.log(localStorage.getItem(i))                                    //lines 38-44 allow us to load items from localstorage onto their appropriate timeblocks
//                 $("#" + i).children(".text-area")[0].value = localStorage.getItem(i);
//                 // console.log($("#" + i).children())
//         };
// };
//       //lines 46 and 47 simply call functions which the user would need to be loaded upon page load.
// renderStorage();

/*TODO:
Add ability for user to select/edit the time-frame to be displayed as their workday
        -add functionality which appends AM/PM as appropriate
        -if user selects different time-block, need to override previous
        -need to test if we can save the state of the app, rather than individual time-blocks(if
        user selects a time-frame, page should load with that time-frame. if user enters text into
        time-blocks app should load those saved time-blocks)
        -time-blocks after 12(PM or AM) encountering unintended behavior; need a way to distinguish
        from eachother so appropriate, user-specified times are pushed and generated

Make time-related color coding dependent on a setInterval function of 10-15min, so the color of 
various tasks are updated as appropriate every 1/6 to 1/3 of an hour

Make textarea more visible/intuitive to interact with and add tasks to
        -Make previously saved text remain visible upon user clicking textarea containing it

Provide a general description of app and details of usage(eg. how to save a timeblock, how to add
text to a textarea- also aligns with making textarea more intuitive)
        -Might change how date/time is displayed at top of app

Changes to some CSS
        -should add boarder-radius to divs, make them match/line-up better with save buttons
        -figure if we keep the m-1 bootstrap class, or more manually affect margins
*/