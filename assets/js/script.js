let time = moment().hours();
// let time = 23;
let currentDate = moment().date();
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
        portionArr.forEach((portion) =>{
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                let button = document.createElement("button");
                let dateProp = currentDate;
                div.textContent = portion;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = lowerTime - 1;
                
                
                if(div.id > 23){
                        div.id = div.id - 24;
                        dateProp++;
                }

                let timeBlockObj = {
                        id: div.id,
                        date: dateProp,
                        timeBlock: portion
                };
                div.title = dateProp;
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

let colorCode = function(start, stop, workdayArr){
        console.log($('.time-container'));
        console.log("colorCode", start, stop);
        console.log(`idNum`,idNum)

        // for(let i = 0; i < workdayArr.length; i++){

        //         if(workdayArr[i].id > 23){
        //                 workdayArr[i].date++;
        //         }

        //         if(workdayArr[i].id > 23){
        //                 workdayArr[i].id = workdayArr[i].id - 24;
        //         }
        // }

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

                        /*
                        
                        If we want to continue using id to color code the time-blocks in real time(and this IS a GREAT way to accomplish
                        this), we CANNOT ALLOW the i declaration in the below else if get higher than 23(or we have to figure out how to
                        coerce the time variable to appropriately match-up with the time-block, which is harder, will require more code,
                        and probably be more error prone). THIS IS THE FUNDAMENTAL ISSUE, TRYING TO SOLVE THIS PROBLEM W/O ADDRESSING
                        THIS WILL ONLY HAVE YOU SPINNING YOUR TIRES IN THE MUD.
                        
                        id's are now not being allowed above 23, and date properties are now being correctly iterated where needed.
                        FOCUS ON WHAT NEEDS TO CHANGE IN THE for loop.
                        
                        For loop and id generation is looking much better, but there are still fundamental issues with the loop. We're
                        compairing against workdayArr.length right now, which means that, generally, it won't reach values near or
                        greater than 20(unless the user specified shift has that many hours in it). This will prevent time-blocks with
                        id's equal to those numbers from being color coded.
                        
                        Currently thinking we may need to be more general, in that we may need to compair against the number 23, thus
                        generating a whole day. Then we might be able to be more selective in how/where color coding is applied.
                        
                        Only things we can try with current method of compairison is to directly associate workdayArr[i].date with
                        the time-blocks in the DOM, we'll otherwise have false positives on which time-blocks should be color coded.
                        Otherwise, we need to swtich up how we're doing our compairisons to direct manipulation of the time variable to
                        get it higher than 23. */
        }else if(start > stop){
                console.log(`inside startstop`, currentDate, `time`, time);
                // for(let i = 0; i < workdayArr.length; i++){
                        
                //         if(workdayArr[0].date < workdayArr[i].date){
                //                 workdayArr[i].id = workdayArr[i].id - 24;
                //         };
                // };
                // for(let j = 0; j < workdayArr.length; j++){
                              
                /*The closest this has been to working is a near copy of (start < stop).*/
                for(let i = 0; i <= 23; i++){
                        // console.log($("#" + i)[0].title)

                        if(i < time){
                                $("#" + i).addClass("past");

                        }else if(i === time){
                                $("#" + i).addClass("present");

                        }else if(i > time){
                                $("#" + i).addClass("future");
                        };
                };

                // }
                
                // workdayArr.forEach((workTime) =>{
                //         console.log(workTime)
                //         for(let i = 0; i <= 23; i++){

                //                 if(workTime.id < time && workTime.date <= currentDate){
                //                         $("#" + i).addClass("past");

                //                 }else if(workTime.id === time && workTime.date === currentDate){
                //                         $("#" + i).addClass("present");

                //                 }else if(workTime.id > time || workTime.date > currentDate){
                //                         $("#" + i).addClass("future");
                //                 };
                //         };
                // });

                // for(let i = 0; i < workdayArr.length; i++){

                //         for(let j = 0; j <= 23; j++){

                //                 if(workdayArr[i].id < time && workdayArr[i].date <= currentDate){
                //                         /*!!!!!!!!!!!!!!!!!!!!!!!!!!!Here we are selecting the item to addClass to. If the app cannot select the
                //                         appropriate time-block, it will not add correct color coding.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //                         (maybe fixed by above idea, maybe not. We'll soon see)*/
                //                         $("#" + j).addClass("past");
                
                //                 }else if(workdayArr[i].id === time && workdayArr[i].date === currentDate){
                //                         $("#" + j).addClass("present");
                
                //                 }else if(workdayArr[i].id > time || workdayArr[i].date > currentDate){
                //                         $("#" + j).addClass("future");
                //                 };
                //         }
                //         /*Below is checking all the entries of workdayArr, each time. It's why making another loop based off
                //         workdayArr.length and including compairisons in the if statements such as workdayArr[j].date <= currentDate
                //         didn't work */
                        
                // }
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