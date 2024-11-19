/*We have variables for time related needs. The variables time, currentDate, and getDate all are used as containers for different measurments of time.*/
let time = moment().hours();
let currentDate = moment().date();
let getDate = new Date();

/*Here we have an array containing each hour of the day, from 12AM to 11PM. This array is used to select and seperate a chunk of time out from a user selected time-block.*/
let timeArr = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

/*We have four container variables of various functionality. workdaySheet is used as a container for saving/loading previously generated time-blocks, and initializes as
either the item saved to localStorage, or an empty array if no savedata exists. proxy acts as a intermediary container for functionality related to saving/loading.
timeContainer and dayDisplay both act as ways to access specific DOM/HTML elements on the app page.*/
let workdaySheet = JSON.parse(localStorage.getItem("workdayShift")) || [];
let proxy = [];
let timeContainer = document.querySelector(".time-container");
let dayDisplay = document.querySelector("#currentDay");

/*Here we set the innerText property of dayDisplay to a string containing a template literal, determining the date-info displayed to the user.*/
dayDisplay.innerText = `Today is ${getDate}.`;

/*clearTimeBlock is a function called to clear a previously generated time-block from the DOM. We use a for loop, initializing i as 0, checking if i is less than or equal
to 23, and if so we iterate i. Within the for loop we use jQuery shorthand($()) to select an element by id(#), injecting a template literal to leverage our i variable,
and calling the .remove() method on the selected elements.*/
function clearTimeBlock(){

        for(let i = 0; i <= 23; i++){
                $(`#${i}`).remove();
        };

};

// setInterval(function(){
//         dayDisplay.innerText = `Today is ${getDate}.`;
//         generateWorkday(workdaySheet);
// }, /*600000*/10000);

/*Here we have more jQuery shorthand for selecting an element, this time by the id of #time-submit. We attach a on click event to this selected element and utilize an
anonymous function with an event parameter passed to it. Within the anonymous function we initialize the variable workdayObjCont as an empty array, and the variable
lowerTime as the value attached to selecting an element by the id #lower-time, as a number(using the Number constructor). Then we use the .preventDefault() method on our
event parameter, preventing the page from reloading on the user sumbitting their time-block times. We use the .removeClass() method to remove a class of hide on an 
element with the id of #save. After, we initialize the variables positionLower and positionUpper for assignment later, and portionArr as an empty array, then call the
clearTimeBlock() function, removing any previously generated time-block from the DOM. We define the lowerText and upperText variables as the innerText of the first index
of the selectedOptions properties, on the selection of elements with the id's of #lower-time and #upper-time. Cont...*/
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

        /*...Here we enter a for loop, initializing i as 0, checking if i is less than the length property of timeArr, and iterating i if so. Within the for loop, we
        see two if statements that are very similar. One checks the lowerText variable and the other checks the upperText variable, but both see if it is equal to the
        timeArr variable at an index, and if so each set either the positionLower or positionUpper variables equal to that index. We exit the for loop and encounter
        another if statement, which checks if positionLower is greater than positionUpper, and if so we define two variables. First we have lowerPortionArr, which uses
        the .slice method on timeArr to select a portion that begins with positionLower(the user selected start-time), and ends at the last index(24, which is null and
        evals to 11PM), and second we have upperPortionArr, which uses the .slice method on timeArr to select a portion that begins at 0(indicating a new day,
        12AM) and ends at positionUpper + 1(evaluating to the user selected end-time). We then set portionArr equal to calling the .concat method on lowerPortionArr with
        upperPortionArr as a parameter, combining the two arrays into one. However, if positionLower is not greater than positionUpper we enter the else of our if
        statement, which sets portionArr equal to calling the .slice method on timeArr with the parameters on positionLower(user selected start time) and
        positionUpper + 1(user selected end time). This ensures that all user selected time-frames are properly captured(AMtoAM, AMtoPM, PMtoPM, and PMtoAM). Cont...*/
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
                console.log(`for notes`, lowerPortionArr, upperPortionArr, portionArr);
        }else{
                portionArr = timeArr.slice(positionLower, (positionUpper + 1));
                console.log(`for notes2`, portionArr);
        };

        /*...Here we enter into a .forEach loop on portionArr, setting portion as our referrence to each entry. Within the loop we define the dateProp variable as
        currentDate. We then define the object timeBlock as a variable, with the properties of: 
        id- set to lowerTime - 1(.val prop of user selected start time)
        timeBlock- set to portion(each time within portionArr)
        date- null(to be set just lines later)
        blockText- null(to be set later)
        Then we enter into an if statement, which checks if the id property on our timeBlock object is greater than 23(12AM-11PM indexed between 0 and 23), and if so we
        set the id property of that timeBlock to itself - 24, then iterate dateProp(this ensures that no timeBlock id properties will generate above 23, AND that the
        to-be-set date property will be iterated properly for PMtoAM shifts). We then set the date property of our timeBlock object to dateProp, iterate lowerTime, and
        use the .push method on workdayObjCont with timeBlock as a parameter(this saves each timeBlock object to an array). Finally, we call the generateWorkday function
        with the argument of workdayObjCont.*/
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

/*generateWorkday is a function with a parameter of workdayObjArr. Within, we start with some jQuery shorthand for selecting an element by the id of #save, and call the
.removeClass method on it to remove a class of hide- this ensures the element with the hide class will become visible once this function is called. We then call the
function clearTimeBlock to remove anything previously rendered. We set the variable proxy to an empty array, which ensures the user generated workday will be contained
and saved in an environment that is its own. Cont...*/
function generateWorkday(workdayObjArr){
        $("#save").removeClass("hide");

        clearTimeBlock();

        proxy = [];
        /*...Here, we enter into a .forEach loop on workdayObjArr, setting portion as a referrence to each object-entry. Within the .forEach loop, we initialize the
        variable div as calling the .createElement method on our document object- with an option of "div", and initialize the variable textarea as calling the
        .createElement method on our document object- with an option of "textarea". Then we set the .textContent property of div to the .timeBlock property of portion,
        access the .classList property of div and use the .add method to add several classes to div, set the .id property of div to the .id property of portion, and set
        the .title property of div to the .date property of portion(remember, portion is a referrence to each entry-object in workdayObjArr). Cont...*/
        workdayObjArr.forEach((portion) =>{
                let div = document.createElement("div");
                let textarea = document.createElement("textarea");
                div.textContent = portion.timeBlock;
                div.classList.add("m-1", "border-top", "border-bottom", "border-dark");
                div.id = portion.id;
                div.title = portion.date;

                /*...Here, we enter a quick if statement, checking if the .blockText property on portion evaluates to truthy(if it exists), and if so it sets the
                .innerText property of textarea to the .blockText property of portion. After exiting that initial if statement, we encounter another if statement,
                checking between 4 different conditions. In the first conditional check, we check if the .id property on div is less than our time variable and(&&) if
                the .title property on div is less than or equal to our currentDate variable- if both these conditions are met we access the .classList property on div,
                and use the .add method to add a class of "past" to that div. In the second conditional check, we check if the .id property on div is equal(non strict,
                or ==) to our time variable, and if so we access the .classList property on div, and use the .add method to add a class of "present" to that div. In the
                third conditional check, we check if the .id property on div is greater than our time variable or(||) if the .title property on div is greater than our
                currentDate variable- if either one of these checks are true we access the .classList property on div, and use the .add method to add a class of "future"
                to that div.(The classes of past, present, and future have specifications in our CSS file, which will affect the coloration of div's within the user
                created time-block relative to what time it currently is) Cont...*/
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

                /*..Here, we've exited the previous if statement, but are still within the .forEach loop. We call the .append method on our timeContainer variable and
                pass a parameter of div to it, call the .append method on our div variable and pass a parameter of textarea to it, access the .classList property of
                textarea and use the .add method to add some classes to textarea, and use the .push method on our proxy variable and pass a parameter of portion to it- 
                which will save each portion(each entry within workdayObjArr) to proxy.*/
                timeContainer.append(div);
                div.append(textarea);
                textarea.classList.add("text-area", "text-center", "w-75");
                proxy.push(portion);
        });

};

/*Here we have more jQuery shorthand for selecting an element by an id of #save. Upon clicking that element, we run an anonymous function which handles our app's save
functionality. Within the function, we start by setting workdaySheet equal to an empty array. We then enter into a .forEach loop, setting portion as a referrence to each
entry within proxy. Inside the .forEach loop we enter an if statement, checking if the .value property of a child element at index 0(.children[0], or the first child)
belonging to an element selected by an id matching a template literal(`${portion.id}`) is truthy. If so, we set the .blockText property of portion equal to the .value
property of the child element at index 0 belonging to an element selected by an id matching a template literal.
(To explain more simply, we're checking the .value property of each div's(.getElementById(`${portion.id}`)) textarea- being that textarea would be the first
child(children[0]) of each div. In checking for truthyness of the .value property, we're seeing if the user has written anything within the textarea of each div. For each
div which does have something written in it we're saving that user-written text to the .blockText property of each portion within proxy, by setting .blockText equal to
that .value property) Cont...*/
$(`#save`).on(`click`, function(){
        workdaySheet = [];

        proxy.forEach((portion) => {
                
                if(document.getElementById(`${portion.id}`).children[0].value){
                        portion.blockText = document.getElementById(`${portion.id}`).children[0].value;
                };
                
        });

        /*...Here, we've exited both the if statement and .forEach loop. We set workdaySheet equal to our proxy variable, then we save this data to localStorage by using
        the .setItem method, saving our entry in localStorage as `workdayShift` and using the .stringify method with workdaySheet as a parameter to convert the data into
        JSON format.*/
        workdaySheet = proxy;
        localStorage.setItem(`workdayShift`, JSON.stringify(workdaySheet));
});

/*Here we have more jQuery shorthand for selecting an element by an id of #load. Upon clicking that element, we run a very simple anonymous function which handles our
app's load functionality. Within the function, we simply call the generateWorkday function with an argument of workdaySheet. This will run the generateWorkday function
as it typically does, but with data saved to workdaySheet as it's dependant parameter.*/
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