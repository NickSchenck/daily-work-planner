let time = moment().hours(); //this line uses moment.js to get the time in hours of day
let dayDisplay = document.querySelector("#currentDay"); 
let getDate = new Date();                            //lines 2-3 get and display the current date+time+timezone
dayDisplay.innerText = `Today is ${getDate}.`;
let timeContainer = document.querySelector(".time-container");
let lowerTime = Number($("#lower-time").val());
let upperTime = Number($("#upper-time").val());
let timeArr = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

$("#time-submit").on("click", function(event){
        console.log(time);
        event.preventDefault();
        let positionLower;
        let positionUpper;
        let portionArr = [];
        let lowerText = document.querySelector("#lower-time").selectedOptions[0].innerText;
        let upperText = document.querySelector("#upper-time").selectedOptions[0].innerText;
        for(let i = 0; i < timeArr.length; i++){

                if(lowerText === timeArr[i]){
                        positionLower = i;
                        console.log('lower', positionLower);
                };

                if(upperText === timeArr[i]){
                        positionUpper = i;
                        console.log('upper', positionUpper);
                };
        };
        /*Going to need a conditional here which tests if start > end(AM-AM works, AM to PM works, PM to PM works, now just need PM to
        AM)*/
        if(positionLower > positionUpper){
                let lowerPortionArr = timeArr.slice(positionLower, 24);
                let upperPortionArr = timeArr.slice(0, (positionUpper + 1));
                portionArr = lowerPortionArr.concat(upperPortionArr);
                
        }else{
                portionArr = timeArr.slice(positionLower, (positionUpper + 1));
        };
        console.log(portionArr);
        portionArr.forEach((portion) =>{
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                let button = document.createElement("button");
                div.textContent = portion;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = lowerTime - 1;
                // console.log(`id`, div.id);
                lowerTime++;
                timeContainer.append(div);
                div.append(textarea);
                textarea.classList.add("text-area", "text-center", "w-75");
                div.append(button);
                button.classList.add("float-right", "saveBtn", "oi", "oi-file");
        });
        colorCode(positionLower, positionUpper);
});

let colorCode = function(start, stop){
        // console.log("out of scope", start, stop);
        for(let i = start; i <= stop; i++){    
                // console.log('inside scope', start, stop);  
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
        -generation should occur whether user --starts in AM/ends in AM--, --starts in AM/ends in PM--, --starts in PM/ends in PM--, or
        starts in PM/ends in AM.
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