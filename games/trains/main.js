/* borrowed code for math purposes */
/**
 * Adjusts a number to the specified digit.
 *
 * @param {"round" | "floor" | "ceil"} type The type of adjustment.
 * @param {number} value The number.
 * @param {number} exp The exponent (the 10 logarithm of the adjustment base).
 * @returns {number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
    type = String(type);
    if (!["round", "floor", "ceil"].includes(type)) {
      throw new TypeError(
        "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'.",
      );
    }
    exp = Number(exp);
    value = Number(value);
    if (exp % 1 !== 0 || Number.isNaN(value)) {
      return NaN;
    } else if (exp === 0) {
      return Math[type](value);
    }
    const [magnitude, exponent = 0] = value.toString().split("e");
    const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
    // Shift back
    const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
    return Number(`${newMagnitude}e${+newExponent + exp}`);
}

// Decimal round
const round10 = (value, exp) => decimalAdjust("round", value, exp);
// Decimal floor
const floor10 = (value, exp) => decimalAdjust("floor", value, exp);
// Decimal ceil
const ceil10 = (value, exp) => decimalAdjust("ceil", value, exp);


/* CLOCK.JS */

// updateTime function runs on a loop
// game events are scheduled according to the clock

const clockElement = document.getElementById("clock");
const dayCountElement = document.getElementById("dayCount");

let timeHours = 0;
let timeMinutes = 0;
let timeSeconds = 0;
let timeSecondsFloat = 0.0; // seconds is always floored to an int
// we don't need greater precision than that

/* UPDATE: demand varies by time!
   index is the time in hours (0 is midnight, 23 is 11pm)
   value is the demand factor where 100 is the highest, 1 is the lowest.
   roughly based on Google Maps data for Grand Central Station.
*/

const timeDemandMap = [8,4,2,1,4,10,15,25,45,60,70,75,80,85,90,93,95,95,92,83,70,45,30,15]

const frequency = 5; // update time interval fixed to 5 ms
let secondInterval = frequency / 1000; // seconds that pass each time updateTime is called

let dayCount = 0;

const getTimeFmtStr = (hours, minutes, seconds) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const setTime = () => {
    clockElement.innerHTML = "<strong>Current time:</strong> " + getTimeFmtStr(timeHours, timeMinutes, timeSeconds);
    dayCountElement.innerHTML = dayCount;
}
setTime();

const updateTime = () => {
    timeSecondsFloat += secondInterval;
    timeSeconds = Math.floor(timeSecondsFloat);

    while (timeSeconds >= 60) {
        timeMinutes += 1;
        timeSeconds -= 60;
        timeSecondsFloat -= 60;
    }
    while (timeMinutes >= 60) {
        timeHours += 1;
        timeMinutes -= 60;
    }
    while (timeHours >= 24) {
        dayCount += 1;
        timeHours -= 24;
    }

    checkForEvents();
    checkForRecurringEvents();
    setTime();

    // update city demand (since it depends on the time of day now)
    for (let i = 0; i < cities.length; i++) {
        updateDemand(i);
    }
}

const updateDemand = (i) => {
    // encapsulate demand update to a function
    cities[i]["demand"] = calculateDemand(cities[i]["ticketPrice"], cities[i]["population"])
    cities[i]["demandElement"].innerHTML = floor10(cities[i]["demand"], -2);
}

/* clock speed */

const speedSliderElement = document.getElementById("speedSlider");
const speedElement = document.getElementById("speed");

const setSpeed = (newSpeed) => {
    // Min speed is 1: 5 ms per 5 ms = 1 sec per sec
    // Max speed is 100: 50 seconds per 5 ms = 10000 sec or 2.7 hours per sec
    secondInterval = (frequency * Math.pow(newSpeed, 2)) / 1000;
    speedElement.innerHTML = newSpeed;
}

speedSliderElement.oninput = function() {
    setSpeed(this.value);
}

setInterval(updateTime, frequency)





/* EVENTS.JS */

// To schedule something to happen, add an object to the events array
// with the following object keys:
// days, hours, minutes, seconds, execute
// where the first four are numbers and the last is a function
// to execute at the specified time.

const events = []

const checkForEvents = () => {
    for (let i = 0; i < events.length; i++) {
        if (events[i]["days"] <= dayCount
            && events[i]["hours"] <= timeHours
            && events[i]["minutes"] <= timeMinutes
            && events[i]["seconds"] <= timeSeconds)
        {
            events[i]["execute"]()
            events.splice(i, 1);
        }
    }
}



// To make an event happen on a recurring basis,
// add an object to the recurringEvents array
// with the following object keys:
// id, execute
// where id is a unique int to identify the item
// and execute is the function that is called on each call of updateTime

const recurringEvents = [];

const checkForRecurringEvents = () => {
    for (let i = 0; i < recurringEvents.length; i++) {
        recurringEvents[i]["execute"]()
    }
}

const removeRecurringEvent = (id) => {
    for (let i = 0; i < recurringEvents.length; i++) {
        if (recurringEvents[i]["id"] == id) {
            recurringEvents.splice(i, 1);
        }
    } 
}





/* CITIES.JS */

const leftColumnElement = document.getElementById("left-column");

const cities = [
    {
        "name": "New York",
        "x": 90,
        "y": 75,
        "population": 8800000
    },
    {
        "name": "Boston",
        "x": 100,
        "y": 90,
        "population": 654800
    },
    {
        "name": "Philadelphia",
        "x": 85,
        "y": 70,
        "population": 1600000
    },
    {
        "name": "Buffalo",
        "x": 81,
        "y": 91,
        "population": 276807
    },
    {
        "name": "Baltimore",
        "x": 83,
        "y": 66,
        "population": 576498
    },
    {
        "name": "Washington DC",
        "x": 82,
        "y": 65,
        "population": 670000
    },
    {
        "name": "Richmond",
        "x": 81,
        "y": 62,
        "population": 226604
    },
    {
        "name": "Charlotte",
        "x": 78,
        "y": 35,
        "population": 879700
    },
    {
        "name": "Atlanta",
        "x": 72,
        "y": 32,
        "population": 496461
    },
    {
        "name": "Jacksonville",
        "x": 75,
        "y": 11,
        "population": 954600
    },
    {
        "name": "Miami",
        "x": 80,
        "y": 0,
        "population": 439890
    },
    {
        "name": "Pittsburgh",
        "x": 80,
        "y": 75,
        "population": 300431
    },
    {
        "name": "Cleveland",
        "x": 78,
        "y": 78,
        "population": 368000
    },
    {
        "name": "Columbus",
        "x": 75,
        "y": 70,
        "population": 906500
    },
    {
        "name": "Detroit",
        "x": 75,
        "y": 80,
        "population": 632500
    },
    {
        "name": "Indianapolis",
        "x": 70,
        "y": 68,
        "population": 882000
    },
    {
        "name": "Chicago",
        "x": 65,
        "y": 80,
        "population": 2750000
    },
    {
        "name": "Milwaukee",
        "x": 65,
        "y": 82,
        "population": 569330
    },
    {
        "name": "Minneapolis",
        "x": 57,
        "y": 88,
        "population": 425336
    },
    {
        "name": "Louisville",
        "x": 71,
        "y": 65,
        "population": 628594
    },
    {
        "name": "Nashville",
        "x": 70,
        "y": 40,
        "population": 678900
    },
    {
        "name": "Memphis",
        "x": 60,
        "y": 35,
        "population": 628127
    },
    {
        "name": "St. Louis",
        "x": 60,
        "y": 66,
        "population": 293310
    },
    {
        "name": "Kansas City",
        "x": 56,
        "y": 65,
        "population": 508394
    },
    {
        "name": "Wichita",
        "x": 53,
        "y": 40,
        "population": 395699
    },
    {
        "name": "Oklahoma City",
        "x": 52,
        "y": 30,
        "population": 687725
    },
    {
        "name": "Omaha",
        "x": 54,
        "y": 70,
        "population": 487300
    },
    {
        "name": "Denver",
        "x": 30,
        "y": 65,
        "population": 711500
    },
    {
        "name": "New Orleans",
        "x": 65,
        "y": 10,
        "population": 376971
    },
    {
        "name": "Dallas",
        "x": 52,
        "y": 16,
        "population": 1288000
    },
    {
        "name": "Houston",
        "x": 55,
        "y": 11,
        "population": 2300000
    },
    {
        "name": "Austin",
        "x": 51,
        "y": 12,
        "population": 964200
    },
    {
        "name": "San Antonio",
        "x": 50,
        "y": 10,
        "population": 1450000
    },
    {
        "name": "Albuquerque",
        "x": 28,
        "y": 16,
        "population": 562599
    },
    {
        "name": "Phoenix",
        "x": 15,
        "y": 14,
        "population": 1625000
    },
    {
        "name": "Tucson",
        "x": 16,
        "y": 10,
        "population": 543242
    },
    {
        "name": "Las Vegas",
        "x": 10,
        "y": 32,
        "population": 646800
    },
    {
        "name": "San Diego",
        "x": 6,
        "y": 12,
        "population": 1382000
    },
    {
        "name": "Los Angeles",
        "x": 5,
        "y": 15,
        "population": 3900000
    },
    {
        "name": "San Jose",
        "x": 1,
        "y": 36,
        "population": 983500
    },
    {
        "name": "San Francisco",
        "x": 0,
        "y": 40,
        "population": 815200
    },
    {
        "name": "Sacramento",
        "x": 2,
        "y": 45,
        "population": 525041
    },
    {
        "name": "Boise",
        "x": 9,
        "y": 85,
        "population": 237446
    },
    {
        "name": "Portland",
        "x": 0,
        "y": 90,
        "population": 641200
    },
    {
        "name": "Spokane",
        "x": 8,
        "y": 100,
        "population": 229071
    },
    {
        "name": "Seattle",
        "x": 2,
        "y": 100,
        "population": 733900
    }
];


const createCity = (city) => {
    return `
    <div class="city border-box" id="${city["name"]}">
        <h2>${city["name"]}</h2>
        <p>
            <button id="${city["name"]}AddTrain">Add train</button>
            <em><strong>Cost:</strong> $<span id="${city["name"]}TrainCost"></span></em>
        </p>
        <p>
            <button id="${city["name"]}SendTrain">Send train</button>
            <select id="${city["name"]}SelectStation"></select>
            <input id="${city["name"]}SendTrainTime" type="time" value="00:00" />
        </p>
        <p>
            <strong>Ticket price:</strong> $<span id="${city["name"]}TicketPrice">5</span>
            <button id="${city["name"]}IncreaseTicketPrice">+</button>
            <button id="${city["name"]}DecreaseTicketPrice">-</button>
        </p>
        <p>
            <strong>Demand:</strong> <span id="${city["name"]}Demand"></span>%
        </p>
        <p>
            <strong>Trains:</strong> <span id="${city["name"]}NumTrains"></span>
        </p>
    </div>`;
}



// create cities
let text = "";

for (let i = 0; i < cities.length; i++) {
    text += createCity(cities[i])
}
leftColumnElement.innerHTML = text;



// formula for calculating demand based on ticket price

const calculateDemand = (ticketPrice, cityPop) => {
    // Demand is inversely proportional to ticket price
    // set at a standard of $1 per ticket = 100% demand
    
    // UPDATE: factor in city population
    // New York's population is 200% demand at $1 per ticket,
    // anything less than that gives less demand

    const newYorkPop = cities[0]["population"];
    const popFactor = cityPop / newYorkPop;

    // UPDATE: factor in time of day
    demandFactor = timeDemandMap[timeHours] / 50;

    const result = (100 / ticketPrice) * popFactor * demandFactor;

    return result;
}



// fill cities with info

for (let i = 0; i < cities.length; i++) {

    cities[i]["cityElement"] = document.getElementById(cities[i]["name"]);

    cities[i]["trainCost"] = 1000;
    cities[i]["trainCostElement"] = document.getElementById(cities[i]["name"] + "TrainCost")
    cities[i]["trainCostElement"].innerHTML = cities[i]["trainCost"];

    cities[i]["addTrainsElement"] = document.getElementById(cities[i]["name"] + "AddTrain");

    cities[i]["sendTrainsElement"] = document.getElementById(cities[i]["name"] + "SendTrain");
    cities[i]["selectStationElement"] = document.getElementById(cities[i]["name"] + "SelectStation");
    cities[i]["sendTrainTimeElement"] = document.getElementById(cities[i]["name"] + "SendTrainTime");

    cities[i]["ticketPrice"] = 5;
    cities[i]["ticketPriceElement"] = document.getElementById(cities[i]["name"] + "TicketPrice");
    cities[i]["increaseTicketPriceElement"] = document.getElementById(cities[i]["name"] + "IncreaseTicketPrice");
    cities[i]["decreaseTicketPriceElement"] = document.getElementById(cities[i]["name"] + "DecreaseTicketPrice");

    cities[i]["demandElement"] = document.getElementById(cities[i]["name"] + "Demand");
    updateDemand(i);

    cities[i]["increaseTicketPriceElement"].onclick = function() {
        cities[i]["ticketPrice"]++;
        cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
        updateDemand(i);
    }
    cities[i]["decreaseTicketPriceElement"].onclick = function() {
        if (cities[i]["ticketPrice"] > 1) {
            cities[i]["ticketPrice"]--;
            cities[i]["ticketPriceElement"].innerHTML = cities[i]["ticketPrice"];
            updateDemand(i);
        }
    }

    cities[i]["numTrains"] = 0;
    cities[i]["numTrainsElement"] = document.getElementById(cities[i]["name"] + "NumTrains");
    cities[i]["numTrainsElement"].innerHTML = cities[i]["numTrains"];
}





/* ADD_CITIES.JS */

const nextCityNameElement = document.getElementById("nextCityName");
const nextCityCostElement = document.getElementById("nextCityCost");
const addNextCityElement = document.getElementById("addNextCity");

let nextCityIndex = 0;
let nextCityCost;

const setNextCity = () => {
    nextCityNameElement.innerHTML = cities[nextCityIndex]["name"];
    nextCityCost = Math.floor(cities[nextCityIndex]["population"] / 500);
    nextCityCostElement.innerHTML = nextCityCost;
}
setNextCity();

const setCityOptions = (i) => {
    // Clear options
    cities[i]["selectStationElement"].options.length = 0;

    for (let j = 0; j < cities.length; j++) {
        // For each city that is not the current city
        if (j != i && cities[j]["cityElement"].style.visibility == "visible") {
            const stationOptionElement = cities[i]["selectStationElement"].appendChild(
                document.createElement("option")
            )
            stationOptionElement.innerHTML = cities[j]["name"];
        }
    }
}

addNextCityElement.onclick = function() {
    try {
        subtractMoney(nextCityCost);
    } catch (e) {
        console.error(e);
        return;
    }
    cities[nextCityIndex]["cityElement"].style.visibility = "visible";

    let i = nextCityIndex;
    while (i >= 0) {
        setCityOptions(i);
        i--;
    }

    nextCityIndex++;
    setNextCity();
    checkButtons();
};






/* PASSENGERS.JS */

const debug = true;
let debugNow = false;
let debugIncrement = 0;
const debugLimit = 1000;

const getPassengerIncrement = (sourceIndex, destIndex, departureHour) => {
    let increment = 0;

    // increment increases at a rate affected by the demand and an element of randomness.
    // demand has already been calculated based on city population, time of day, and ticket price.
    let sourceDemandInc = (cities[sourceIndex]["demand"] / 1500) * Math.random();
    let destDemandInc = (cities[destIndex]["demand"] / 10000) * Math.random();

    // also at play, but less significant, is the hour of departure for the train
    let departureTimeInc = (timeDemandMap[departureHour] / 100000) * Math.random();

    // cut off really small increments to 0
    if (sourceDemandInc < 0.001) {
        sourceDemandInc = 0.0;
    }
    if (destDemandInc < 0.001) {
        destDemandInc = 0.0;
    }
    if (departureTimeInc < 0.0001) {
        departureTimeInc = 0.0;
    }
     
    // add it all together to get the increment
    increment += sourceDemandInc;
    increment += destDemandInc;
    increment += departureTimeInc;

    // make sure we're incrementing at the correct speed
    increment *= secondInterval;
    
    // debug code
    debugIncrement++;
    if (debugIncrement >= debugLimit){
        debugNow = true;
    } else {
        debugNow = false;
    }

    if (debug && debugNow) {
        console.log(`sourceDemandInc: ${sourceDemandInc}`);
        console.log(`destDemandInc: ${destDemandInc}`);
        console.log(`departureTimeInc: ${departureTimeInc}`);
        console.log(`increment: ${increment}`);
        console.log(`secondInterval: ${secondInterval}`)
        debugIncrement = 0;
    }

    return increment;
}





/* MONEY.JS */

let fundsAvailable = 20000;
const fundsAvailableElement = document.getElementById("fundsAvailable")
fundsAvailableElement.innerHTML = fundsAvailable;

const checkButtons = () => {

    // Disable buttons if there's not enough money,
    // enable them if there is.

    const nextCityCost = parseInt(document.getElementById("nextCityCost").innerHTML);
    document.getElementById("addNextCity").disabled = nextCityCost > fundsAvailable;

    for (let i = 0; i < cities.length; i++) {
        cities[i]["addTrainsElement"].disabled = cities[i]["trainCost"] > fundsAvailable;
        cities[i]["sendTrainsElement"].disabled = cities[i]["numTrains"] <= 0 || cities[i]["selectStationElement"].options.length <= 0;
    }
}

const addMoney = (amountToAdd) => {
    fundsAvailable += amountToAdd;
    fundsAvailableElement.innerHTML = fundsAvailable;
    checkButtons();
} 

const subtractMoney = (amountToSubtract) => {
    if (fundsAvailable > amountToSubtract) {
        fundsAvailable -= amountToSubtract;
        fundsAvailableElement.innerHTML = fundsAvailable;
        checkButtons();
    } else {
        throw new Error("insufficient funds!");
    }
}






/* TRAINS.JS */

const trainCostGrowthRatio = 1.6;
let trainCapacity = 200;
const trainCapacityElement = document.getElementById("trainCapacity");
trainCapacityElement.innerHTML = trainCapacity;

const transitElement = document.getElementById("transit");



// utilities

const calculateDepartureTime = (departureTimeStr) => {
    // Converts time string as returned by html input time element
    // to 4-element array:
    // [days, hours, minutes, seconds]

    let days = dayCount;

    let hours = parseInt(departureTimeStr.slice(0, 2));
    let minutes = parseInt(departureTimeStr.slice(3, 5));

    // Departure time can't be before current time,
    // so if that's the case, assume next day departure
    if (hours < timeHours
        || (hours == timeHours && minutes <= timeMinutes)) {
        days += 1;
    }

    let seconds = 0;

    return [days, hours, minutes, seconds]
}

const calculateArrivalTime = (departureTime, distance) => {
    // expects departure time as 4-element array:
    // [days, hours, minutes, seconds]

    // distance of 5 is equivalent to one hour

    // return arrival time as 4-element array:
    // [days, hours, minutes, seconds]

    let distanceRemaining = distance;

    let days = departureTime[0];
    let hours = departureTime[1];
    let minutes = departureTime[2];
    let seconds = departureTime[3];

    // hours
    while (distanceRemaining >= 5) {
        distanceRemaining -= 5;
        hours += 1;
    }
    while (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    // minutes
    const distanceRemainingInMinutes = (distanceRemaining / 5) * 60;
    const minutesAdded = Math.floor(distanceRemainingInMinutes);
    minutes += minutesAdded;
    while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    while (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    // seconds
    const distanceRemainingInSeconds = (distanceRemainingInMinutes - minutesAdded) * 60;
    const secondsAdded = Math.floor(distanceRemainingInSeconds);
    seconds += secondsAdded;
    while (seconds >= 60) {
        seconds -= 60;
        minutes += 1;
    }
    while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }
    while (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    return [days, hours, minutes, seconds]
}

const calculateDistance = (sourceIndex, destIndex) => {
    // Get x and y coordinates of both cities
    const sourceX = cities[sourceIndex]["x"];
    const sourceY = cities[sourceIndex]["y"];
    const destX = cities[destIndex]["x"];
    const destY = cities[destIndex]["y"];

    // Pythagorean theorem to get distance between cities
    const distA = Math.abs(sourceX - destX);
    const distB = Math.abs(sourceY - destY);
    const distance = Math.pow(Math.pow(distA, 2) + Math.pow(distB, 2), 0.5)

    return distance;
}



// add train

const addTrain = (index) => {
    // Pay for the cost of the train
    try {
        subtractMoney(cities[index]["trainCost"]);
    } catch (e) {
        console.error(e);
        return;
    }

    // Cost of the train increases
    cities[index]["trainCost"] *= trainCostGrowthRatio;
    cities[index]["trainCostElement"].innerHTML = cities[index]["trainCost"]

    // Add the train
    cities[index]["numTrains"] += 1;
    cities[index]["numTrainsElement"].innerHTML = cities[index]["numTrains"]

    checkButtons();
}



// send train

let tripIdCounter = 0;

const sendTrain = (sourceIndex, destIndex) => {

    if (cities[sourceIndex]["selectStationElement"].options.length == 0) {
        alert("No stations available")
        return;
    }

    tripIdCounter++;

    const transitBoxElement = document.getElementById("transitBox");
    transitBoxElement.style.visibility = "visible";

    const source = cities[sourceIndex]["name"];
    const dest = cities[destIndex]["name"];

    if (cities[sourceIndex]["numTrains"] > 0) {

        const departureTimeStr = cities[sourceIndex]["sendTrainTimeElement"].value;
        const departureTime = calculateDepartureTime(departureTimeStr);
        const distance = calculateDistance(sourceIndex, destIndex);
        const arrivalTime = calculateArrivalTime(departureTime, distance);

        cities[sourceIndex]["numTrains"] -= 1;
        cities[sourceIndex]["numTrainsElement"].innerHTML = cities[sourceIndex]["numTrains"]

        const newChild = transitElement.appendChild(
            document.createElement("p")
        );
        newChild.innerHTML = `
            <strong> ${source} -> ${dest} </strong><br/>
            <strong> Status: </strong> <em><span id="tripStatus${tripIdCounter}"> Awaiting departure</span></em><br/>
            <strong> Passengers: </strong> <span id="passengers${tripIdCounter}">0</span><br/>
            <strong> Departure: </strong> day ${departureTime[0]} at ${getTimeFmtStr(departureTime[1], departureTime[2], departureTime[3])}<br/>
            <strong> Arrival: </strong> day ${arrivalTime[0]} at ${getTimeFmtStr(arrivalTime[1], arrivalTime[2], arrivalTime[3])}
        `;
        const tripStatusElement = document.getElementById(`tripStatus${tripIdCounter}`);
        const passengersElement = document.getElementById(`passengers${tripIdCounter}`)

        // push recurring event to add passengers
        let passengers = 0;
        let passengersFloat = 0.0;

        recurringEvents.push({
            "id": tripIdCounter,
            "execute": function() {
                // if train is at capacity, this function does nothing
                if (passengers < trainCapacity) {

                    // the function called below determines how much closer we are to a 
                    // passenger buying a ticket for this train.
                    // factors include source and dest city populations as well as hour of departure time.

                    passengersFloat += getPassengerIncrement(sourceIndex, destIndex, departureTime[1]);
                    const passengerChange = passengersFloat - passengers;
                    if (debugNow) {
                        console.log(`passengers float: ${passengersFloat}`);
                    }
    
                    // if we're adding a passenger,
                    // then they've "bought a ticket", so we get money
                    if (passengerChange >= 1) {
                        console.log(`Purchased 1 ticket at ${timeHours}:${timeMinutes}`)
                        passengers = Math.floor(passengersFloat);
                        passengersElement.innerHTML = passengers;
    
                        addMoney(cities[sourceIndex]["ticketPrice"]);
                    }
                } else {
                    if (tripStatusElement.innerHTML != "Capacity reached - Awaiting departure") {
                        tripStatusElement.innerHTML = "Capacity reached - Awaiting departure";
                    }
                }
            }
        })

        // push departure event
        events.push({
            "days": departureTime[0],
            "hours": departureTime[1],
            "minutes": departureTime[2],
            "seconds": departureTime[3],
            "id": tripIdCounter,
            "execute": function() {
                removeRecurringEvent(this["id"]);
                tripStatusElement.innerHTML = "Departed";
            }
        })

        // push arrival event
        events.push({
            "days": arrivalTime[0],
            "hours": arrivalTime[1],
            "minutes": arrivalTime[2],
            "seconds": arrivalTime[3],
            "execute": function() {
                cities[destIndex]["numTrains"] += 1;
                cities[destIndex]["numTrainsElement"].innerHTML = cities[destIndex]["numTrains"]

                tripStatusElement.innerHTML = "Arrived"
                checkButtons();

                // After arrival, remove event after timeout
                setTimeout(() => {
                    transitElement.removeChild(newChild);
                    if (transitElement.children.length == 0) {
                        transitBoxElement.style.visibility = "hidden";
                    }
                }, 4000);
            }
        });

    } else {
        alert(`No trains available in ${source} to send`)
    }
}



// add train functionality to cities

for (let i = 0; i < cities.length; i++) {

    cities[i]["addTrainsElement"].addEventListener('click', function(){
        addTrain(i);
    })

    cities[i]["sendTrainsElement"].addEventListener('click', function() {
        let destIndex = cities[i]["selectStationElement"].selectedIndex;

        if (destIndex >= i) {
            destIndex += 1; // offset by the source station
        }

        sendTrain(i, destIndex);
        checkButtons();
    })
}