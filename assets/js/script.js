let time = moment().hours();
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
                $(`#${i}`).remove();
        };

};

$("#time-submit").on("click", function(event){
        let workdayObjCont = [];
        let lowerTime = Number($("#lower-time").val());

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
                };

                if(upperText === timeArr[i]){
                        positionUpper = i;
                };

        };

        if(positionLower > positionUpper){
                let lowerPortionArr = timeArr.slice(positionLower, 24);
                let upperPortionArr = timeArr.slice(0, (positionUpper + 1));
                portionArr = lowerPortionArr.concat(upperPortionArr);
        }else{
                portionArr = timeArr.slice(positionLower, (positionUpper + 1));
        };

        portionArr.forEach((portion) => {
                let dateProp = currentDate;

                let timeBlock = {
                        id: lowerTime - 1,
                        timeBlock: portion,
                        date: null,
                        blockText: null
                };
                
                if(timeBlock.id > 23){
                        timeBlock.id = timeBlock.id - 24;
                        dateProp++;
                };

                timeBlock.date = dateProp;
                lowerTime++;
                workdayObjCont.push(timeBlock);
        });

        generateWorkday(workdayObjCont);
});

function generateWorkday(workdayObjArr){
        $("#save").removeClass("hide");

        clearTimeBlock();

        proxy = [];

        workdayObjArr.forEach((portion) =>{
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                div.textContent = portion.timeBlock;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = portion.id;
                div.title = portion.date;

                if(portion.blockText){
                        textarea.innerText = portion.blockText;
                };
                
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
                proxy.push(portion);
        });

};

// workdayArr.forEach((portion) =>{
                
                
//         let div = document.createElement("div");
//         let textarea = document.createElement("textarea");
//         // let button = document.createElement("button");
//         let dateProp = currentDate;
//         div.textContent = portion;
//         div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
//         div.id = lowerTime - 1;
        
//         if(div.id > 23){
//                 div.id = div.id - 24;
//                 dateProp++;
//         };

//         let timeBlock = portion;
//         div.title = dateProp;
//         lowerTime++;
        
//         if(div.id < time && div.title <= currentDate){
//                 div.classList.add("past");
                
//         }else if(div.id == time){
//                 div.classList.add("present");
                
//         }else if(div.id > time || div.title > currentDate){
//                 div.classList.add("future");
        
//         };
//         timeContainer.append(div);
//         div.append(textarea);
//         textarea.classList.add("text-area", "text-center", "w-75");
//         // div.append(button);
//         // button.classList.add("float-right", "saveBtn", "oi", "oi-file");
//         proxy.push(timeBlock);
// });

$(`#save`).on(`click`, function(){
        workdaySheet = [];

        proxy.forEach((portion) => {
                
                if(document.getElementById(`${portion.id}`).children[0].value){
                        portion.blockText = document.getElementById(`${portion.id}`).children[0].value;
                };
                
        });

        workdaySheet = proxy;
        localStorage.setItem(`workdayShift`, JSON.stringify(workdaySheet));
});

$(`#load`).on(`click`, function(){
        generateWorkday(workdaySheet);
});

/*TODO:
Make time-related color coding dependent on a setInterval function of 10-15min, so the color of 
various tasks are updated as appropriate every 10-20min
        -I believe we'll need to refactor some stuff so that an object contains a date key:value pair, this will mostly be to get PM to
        AM generation working intuitively but will also serve to make set-up and usage of a setInterval function easier also

Provide a general description of app and details of usage(eg. how to save a timeblock, how to add
text to a textarea- also aligns with making textarea more intuitive)
        -Might change how date/time is displayed at top of app

Changes to some CSS
        -Make textarea more intuitive for user to click
        -figure if we keep the m-1 bootstrap class, or more manually affect margins
*/