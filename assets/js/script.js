let time = moment().hours();
// let time = 23;
let timeTest = moment().date();
let dayDisplay = document.querySelector("#currentDay"); 
let getDate = new Date();
dayDisplay.innerText = `Today is ${getDate}.`;
let timeContainer = document.querySelector(".time-container");
let lowerTime = Number($("#lower-time").val());
let upperTime = Number($("#upper-time").val());
let timeArr = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
let idNum;

$("#time-submit").on("click", function(event){
        // console.log(`hours`,time);
        // console.log(`date`,timeTest)
        // console.log(`date class`, getDate)
        event.preventDefault();
        let positionLower;
        let positionUpper;
        let portionArr = [];
        let timeBlockArr = [];
        
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
        /*Everything generates pretty neatly at the moment. Still having problems with PM-to-AM generation, and I believe its because
        of the transition to a new day. Generation of the fields still happens in PM-to-AM, but the color coding is absent. The current
        way which the elements are color coded is by compairison to the time variable. time represents itself as a number relating to
        the days actual time, then we compair the id of our elements to that number in the colorCode function. This explains why we're
        seeing issues with PM-to-AM, as there are no 25th, 26th, etc. hours to a day; we'll either need some sort of date compairison to
        pair with the hour compairison, some way to accurately manipulate the values of the time variable and the numbers generated as
        id's to match-up with the hours they represent, or some sort of reformatting of the current mostly-working code to get the
        functionality we want. We will need a different empty array for pushing objects to, then will need to read from that array*/
        if(positionLower > positionUpper){
                let lowerPortionArr = timeArr.slice(positionLower, 24);
                let upperPortionArr = timeArr.slice(0, (positionUpper + 1));
                portionArr = lowerPortionArr.concat(upperPortionArr);
        }else{
                portionArr = timeArr.slice(positionLower, (positionUpper + 1));
        };
        console.log(portionArr); //console.logging the array which times(1AM, 8PM etc) are pushed to
        portionArr.forEach((portion) =>{
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                let button = document.createElement("button");
                div.textContent = portion;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = lowerTime - 1;
                //added this if to test what happens and illuminate what may be good avenues of changing current code
                // if(div.id > 23){
                //         div.id = div.id - 24;
                // };

                let timeBlockObj = {
                        id: div.id,
                        date: timeTest,
                        timeBlock: portion
                };
                idNum = div.id;
                console.log(`id`, div.id);
                lowerTime++;
                timeContainer.append(div);
                div.append(textarea);
                textarea.classList.add("text-area", "text-center", "w-75");
                div.append(button);
                button.classList.add("float-right", "saveBtn", "oi", "oi-file");
                timeBlockArr.push(timeBlockObj);
        });
        colorCode(positionLower, positionUpper, timeBlockArr);
        console.log(`timeBlockObj`, timeBlockArr);
});

/*Reason that colorCode currently doesn't properly color code the PM-to-AM time-blocks is because start(or i) will be greater than stop
upon initialization of the function. Therefore, --i <= stop-- never happens*/
let colorCode = function(start, stop, workdayArr){
        console.log($('.time-container'));
        console.log("colorCode", start, stop);
        console.log(`idNum`,idNum)

        /*Working great! Iterates the date property of the timeBlockObj's contained in workdayArr when the id is greater than 23. So
        we'll check if the date property is different between two workdayArr entries. If it is, we will take the id property of each
        entry with a higher date, and subtract 23 from it. We'll also need to make our color coding, for PM to AM shifts specifically,
        account for, react to, and correctly color code time-blocks based off the date property of the workdayArr entries.
        
        */
        for(let i = 0; i < workdayArr.length; i++){

                if(workdayArr[i].id > 23){
                        workdayArr[i].date++;
                }
        }

        if(start < stop){

                for(let i = start; i <= stop; i++){

                        if(i < time){
                                $("#" + i).addClass("past");

                        }else if(i === time){
                                $("#" + i).addClass("present");

                        }else if(i > time){
                                $("#" + i).addClass("future");
                        };
                };
                /*
                for(let i = 0; i < workdayArr.length; i++){
                        if(workdayArr[0].date < workdayArr[i].date){
                                workdayArr[i].id = workdayArr[i].id - 23
                        }
                }
                        below is what targets PM to AM shifts.
                */
        }else if(start > stop){

                // for(let i = 0; i < workdayArr.length; i++){
                        
                //         if(workdayArr[0].date < workdayArr[i].date){
                //                 workdayArr[i].id = workdayArr[i].id - 24;
                //         };
                // };

                for(let i = start; i <= idNum; i++){
                        console.log(`inside forloop`, i)
                        let internalTime = time;
                        /*These will need to be editted, if left as is color coding on PM to AM shift still only depends on the number
                        value of the time-blocks id properties. It will also need to account for a time-blocks date property.
                        
                        current issue being worked on; we need a way to distinguish a PM to AM shift as having taken place between two
                        days
                        current problem; we've been determining color coding based off the relation a time-block cell's id(in the DOM)
                        has to the time variable. So we can have id's of 24, 25, 26+ but the time variable will only EVER reach 23. This
                        will cause any time-block cells above 23 to ALWAYS trigger the last else if that gives them a class of 'future'.
                        We'll have to change the above for loop, as it starts us at start(which will be greater than stop in a PM to AM
                        shift) and iterates us to the highest id the user-selected time-block reaches.
                        We're going to have to affect how we iterate the date property in workdayArr(current method is based on changing
                        date property when id is above 23), or we're going to have to change how/why a time-block is selected for color
                        coding(current method is selecting via i's relation to time, and $("#" + i), which is the id a time-block has)*/
                        // for(let j = 0; j < workdayArr.length; j++){

                                
                        // }
                        if(i > 23){
                                internalTime = internalTime + 1;
                        };
                        console.log(`time`, time)
                        console.log(`internaltime`,internalTime)
                        if(i < internalTime){
                                $("#" + i).addClass("past");

                        }else if(i === internalTime){
                                $("#" + i).addClass("present");

                        }else if(i > internalTime){
                                $("#" + i).addClass("future");
                        };
                        
                }
                console.log(`inside PM2AM`,workdayArr);
        }//last possible case would be --if(start === stop)--, unsure how needed this is and making a note of it here/now.
        // for(let i = 0; i < workdayArr.length; i++){

        //         if(workdayArr[i].id > 23){
        //                 workdayArr[i].date++;
        //         }
        // }

        // if(start < stop){

        //         for(let i = start; i <= stop; i++){

        //                 if(i < time){
        //                         $("#" + i).addClass("past");
        //                 }else if(i === time){
        //                         $("#" + i).addClass("present");
        //                 }else if(i > time){
        //                         $("#" + i).addClass("future");
        //                 };
        //         };
        //         /*
        //         for(let i = 0; i < workdayArr.length; i++){
        //                 if(workdayArr[0].date < workdayArr[i].date){
        //                         workdayArr[i].id = workdayArr[i].id - 23
        //                 }
        //         }
        //                 below is what targets PM to AM shifts.
        //         */
        // }else if(start > stop){

        //         for(let i = 0; i < workdayArr.length; i++){
                        
        //                 if(workdayArr[0].date < workdayArr[i].date){
        //                         workdayArr[i].id = workdayArr[i].id - 23;
        //                 };
        //         };

        //         for(let i = start; i <= idNum; i++){

        //                 /*These will need to be editted, if left as is color coding on PM to AM shift still only depends on the number
        //                 value of the time-blocks id properties. It will also need to account for a time-blocks date property.*/
        //                 if(i < time){
        //                         $("#" + i).addClass("past");
        //                 }else if(i === time){
        //                         $("#" + i).addClass("present");
        //                 }else if(i > time){
        //                         $("#" + i).addClass("future");
        //                 };
        //         }
        //         console.log(`inside PM2AM`,workdayArr);
        // }
};

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
        -if user selects different time-block, need to override previously generated time-block
        -need to test if we can save the state of the app, rather than individual time-blocks(if
        user selects a time-frame, page should load with that time-frame. if user enters text into
        time-blocks app should load those saved time-blocks)
        -color-coding doesn't always generate upon selecting a time-block you'd like generated, page reload often fixes this

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