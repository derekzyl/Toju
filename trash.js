



const lane1Red = document.getElementById("lane1Red");
const lane2Red = document.getElementById("lane2Red");
const lane3Red = document.getElementById("lane3Red");
const lane4Red = document.getElementById("lane4Red");
const lane1Green = document.getElementById("lane1Green");
const lane2Green = document.getElementById("lane2Green");
const lane3Green = document.getElementById("lane3Green");
const lane4Green = document.getElementById("lane4Green");
const lane1Yellow = document.getElementById("lane1Yellow");
const lane2Yellow = document.getElementById("lane2Yellow");
const lane3Yellow = document.getElementById("lane3Yellow");
const lane4Yellow = document.getElementById("lane4Yellow");

const lane1Timer = document.getElementById("lane1Timer"); // Assuming an element for lane 1 timer
const lane2Timer = document.getElementById("lane2Timer"); // Assuming an element for lane 2 timer
const lane3Timer = document.getElementById("lane3Timer"); // Assuming an element for lane 3 timer
const lane4Timer = document.getElementById("lane4Timer"); //






function trafficCounter (data){

//{
   
   //     'x1_vehicles': 23,
   //     'x2_vehicles': 12,
    //    'y1_vehicles': 45,
  //      'y2_vehicles': 23,
   //     'x_green_time': 33,
    //    'y_green_time': 23,
  //  }
let seconds = data.x_green_time + data.y_green_time
  var timer = setInterval(function() {
let times = 0
times ++
      seconds--;
      
      if(times<= data.x_green_time -2){
        whichLightToOn("green", "x")
        whichLightToOn("red", "y") 
        startCountdown(data.x_green_time-2)
      }

      if(times > (data.x_green_time -2) && times ===data.x_green_time){
        whichLightToOn("yellow", 'x')
        whichLightToOn("yellow", 'y')
                startCountdown(2)
      }
      if(times > (data.x_green_time -2) && times ===data.x_green_time){
        whichLightToOn("yellow", 'x')
        whichLightToOn("yellow", 'y')    
            startCountdown(data.y_green_time)
      }
      if( times > data.x_green_time){
             whichLightToOn("green", "y")
        whichLightToOn("red", "x") 
      }

      if (seconds < 0) {
        clearInterval(timer);
      }
    }, 1000);
  
  
}

trafficCounter({
   
        'x1_vehicles': 23,
        'x2_vehicles': 12,
        'y1_vehicles': 45,
        'y2_vehicles': 23,
        'x_green_time': 33,
        'y_green_time': 23,
    })
function whichLightToOn(data, lane){

  switch (data){
    case "yellow":
    if(lane==="x"){
      lane1Red.style.background= 'black'
      lane3Red.style.background= 'black'
      lane1Green.style.background ="black"
      lane3Green.style.background ="black"
      lane1Yellow.style.background='yellow'
      lane3Yellow.style.background='yellow'

    }
    else if(lane==="y"){
            lane2Red.style.background= 'black'
      lane4Red.style.background= 'black'
      lane2Green.style.background ="black"
      lane4Green.style.background ="black"
      lane2Yellow.style.background='yellow'
      lane4Yellow.style.background='yellow'

    }
    case "red":
    if(lane==="x"){
      lane1Red.style.background= 'red'
      lane3Red.style.background= 'red'
      lane1Green.style.background ="black"
      lane3Green.style.background ="black"
      lane1Yellow.style.background='black'
      lane3Yellow.style.background='black'

    }else if(lane==="y"){
                 lane2Red.style.background= 'red'
      lane4Red.style.background= 'red'
      lane2Green.style.background ="black"
      lane4Green.style.background ="black"
      lane2Yellow.style.background='black'
      lane4Yellow.style.background='black'
    }

    case "green":
     if(lane==="x"){
      lane1Red.style.background= 'black'
      lane3Red.style.background= 'black'
      lane1Green.style.background ="green"
      lane3Green.style.background ="green"
      lane1Yellow.style.background='black'
      lane3Yellow.style.background='black'

    }else if(lane==='y'){
                 lane2Red.style.background= 'black'
      lane4Red.style.background= 'black'
      lane2Green.style.background ="black"
      lane4Green.style.background ="black"
      lane2Yellow.style.background='yellow'
      lane4Yellow.style.background='yellow'
    }

  }

}

  function startCountdown(seconds) {
  
    var timer = setInterval(function() {
      lane1Timer.textContent = seconds;
      lane2Timer.textContent = seconds;
      lane3Timer.textContent = seconds;
      lane4Timer.textContent = seconds;
      seconds--;
      if (seconds < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }


   // Function to update the traffic light status and countdown
    function updateTrafficLights(data) {
      console.log("was called")
      // Update lane 1 and lane 3
      updateLaneStatus('lane1', data.x_green_time);
      updateLaneStatus('lane3', data.x_green_time);

      // Update lane 2 and lane 4
      updateLaneStatus('lane2', data.y_green_time);
      updateLaneStatus('lane4', data.y_green_time);
    }

    // Function to update the status of a lane



    function updateLaneStatus(laneId, time) {
      var countdownElement = document.getElementById(laneId + 'Countdown');
      var redElement = document.getElementById(laneId + 'Red');
      var yellowElement = document.getElementById(laneId + 'Yellow');
      var greenElement = document.getElementById(laneId + 'Green');

      // Update countdown
      countdownElement.innerText = time;

      // Remove active classes
      redElement.classList.remove('active');
      yellowElement.classList.remove('active');
      greenElement.classList.remove('active');

      // Determine status based on time
      if (time > 5) {
        greenElement.classList.add('active');
        yellowElement.classList.add('black');
        redElement.classList.add('black');
      } else if (time <= 5 && time > 0) {
        yellowElement.classList.add('active');
        greenElement.classList.add('black');
        redElement.classList.add('black');
      } else {
        redElement.classList.add('active');
        greenElement.classList.add('black');
        yellowElement.classList.add('black');
      }
    }
     function fetchData() {
      fetch('your_server_url_here')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Update traffic lights
          updateTrafficLights(data);
          // Fetch data again after a short delay
          setTimeout(fetchData, 5000); // 5 seconds delay
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    // Call fetchData function initially to fetch data when the page loads

    

    // updateTrafficLights({
   
    //     'x1_vehicles': 23,
    //     'x2_vehicles': 12,
    //     'y1_vehicles': 45,
    //     'y2_vehicles': 23,
    //     'x_green_time': 33,
    //     'y_green_time': 23,
    // });

 