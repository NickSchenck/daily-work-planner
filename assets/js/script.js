let time = moment().hours();
// let time = 23;
let currentDate = moment().date();
let dayDisplay = document.querySelector("#currentDay"); 
let getDate = new Date();
dayDisplay.innerText = `Today is ${getDate}.`;
let timeContainer = document.querySelector(".time-container");
let timeArr = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

let workdaySheet = JSON.parse(localStorage.getItem("workdayShift")) || [];
let proxy = [];
console.log(workdaySheet);

function clearTimeBlock(){

        for(let i = 0; i <= 23; i++){
                // console.log(`lower & upper`, lowerTime, upperTime)
                $(`#${i}`).remove();
        };

};

$("#time-submit").on("click", function(event){
        
        // let upperTime = Number($("#upper-time").val());

        event.preventDefault();

        $("#save").removeClass("hide");
        let positionLower;
        let positionUpper;
        let portionArr = [];

        clearTimeBlock();
        
        let lowerText = document.querySelector("#lower-time").selectedOptions[0].innerText;
        let upperText = document.querySelector("#upper-time").selectedOptions[0].innerText;

        for(let i = 0; i < timeArr.length; i++){

                if(lowerText === timeArr[i]){
                        positionLower = i;
                        // console.log('lower', positionLower);
                };

                if(upperText === timeArr[i]){
                        positionUpper = i;
                        // console.log('upper', positionUpper);
                };
        };

        if(positionLower > positionUpper){
                let lowerPortionArr = timeArr.slice(positionLower, 24);
                let upperPortionArr = timeArr.slice(0, (positionUpper + 1));
                portionArr = lowerPortionArr.concat(upperPortionArr);
        }else{
                portionArr = timeArr.slice(positionLower, (positionUpper + 1));
        };
        console.log(`portionArr`,portionArr);
        
        generateWorkday(portionArr);
});

function generateWorkday(workdayArr){
        clearTimeBlock();
        let lowerTime = Number($("#lower-time").val());
        proxy = [];

        workdayArr.forEach((portion) =>{
                
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                // let button = document.createElement("button");
                let dateProp = currentDate;
                div.textContent = portion;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = lowerTime - 1;
                
                if(div.id > 23){
                        div.id = div.id - 24;
                        dateProp++;
                };

                // let timeBlockObj = {
                //         id: div.id,
                //         date: dateProp,
                //         timeBlock: portion
                // };
                let timeBlock = portion;
                div.title = dateProp;
                lowerTime++;
                
                if(div.id < time && div.title <= currentDate){
                        div.classList.add("past");
                        
                }else if(div.id == time){
                        div.classList.add("present");
                        
                }else if(div.id > time || div.title > currentDate){
                        div.classList.add("future");
                
                };
                timeContainer.append(div);
                div.append(textarea);
                textarea.classList.add("text-area", "text-center", "w-75");
                // div.append(button);
                // button.classList.add("float-right", "saveBtn", "oi", "oi-file");
                proxy.push(timeBlock);
        });
};

/*This function does not currently affect save functionality. It allows the user to affect the textarea elements inside time-blocks.
!!!!!!!!!!!!!This function seeems to have been doing nothing!!!!!!!! Can still click and enter text within the textarea's, need to mess
around with to trigger a console.log, then we'll know we're effectivly triggering a response from interaction.*/
// $(".text-area").on("click", function(){
//         console.log(text, textInput)
//         let text = $(this).text().trim();
//         let textInput = $("<textarea>").val(text).addClass("w-75");
//         this.text() = text;
//         $(this).innerText.replaceWith(textInput);
//         textInput.trigger("focus");
// });

$(`#save`).on(`click`, function(){
        // localStorage.removeItem("workdayShift");
        workdaySheet = [];
        workdaySheet = proxy;

        console.log(workdaySheet);
        // console.log($(`.time-container`)[0].children);
        
        localStorage.setItem(`workdayShift`, JSON.stringify(workdaySheet));
});

$(`#load`).on(`click`, function(){

        clearTimeBlock();

        generateWorkday(workdaySheet);
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
        -need to test if we can save the state of the app, rather than individual time-blocks(if
        user selects a time-frame, page should load with that time-frame. if user enters text into
        time-blocks then app should load those saved time-blocks. Also, user would want the saved state of the app to load-in updated to
        current time of day, unsure if this is an issue right now, but making note as it'd otherwise be more efficient to always generate
        a new time-block)

Make time-related color coding dependent on a setInterval function of 10-15min, so the color of 
various tasks are updated as appropriate every 10-20min
        -I believe we'll need to refactor some stuff so that an object contains a date key:value pair, this will mostly be to get PM to
        AM generation working intuitively but will also serve to make set-up and usage of a setInterval function easier also

Make textarea more visible/intuitive to interact with and add tasks to
        -Make previously saved text remain visible upon user clicking textarea containing it

Provide a general description of app and details of usage(eg. how to save a timeblock, how to add
text to a textarea- also aligns with making textarea more intuitive)
        -Might change how date/time is displayed at top of app

Changes to some CSS
        -should add boarder-radius to divs, make them match/line-up better with save buttons
        -figure if we keep the m-1 bootstrap class, or more manually affect margins
*/