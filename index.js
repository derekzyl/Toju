const table = document.getElementById('example');
 function updateLaneStatus(laneId, time) {
    var countdownElement = document.getElementById(laneId + 'Countdown');
    var redElement = document.getElementById(laneId + 'Red');
    var yellowElement = document.getElementById(laneId + 'Yellow');
     var greenElement = document.getElementById( laneId + 'Green' );
     

    countdownElement.innerText = time;

    redElement.style.background = 'black';
    yellowElement.style.background = 'black';
    greenElement.style.background = 'black';

    if (time > 5) {
      greenElement.style.background = 'green';
    } else if (time <= 5 && time > 0) {
      yellowElement.style.background = 'yellow';
    } else {
      redElement.style.background = 'red';
    }
  }
      function updateTrafficLights(data) {
      console.log("was called")
      // Update lane 1 and lane 3
      updateLaneStatus('lane1', data.x_green_time);
      updateLaneStatus('lane3', data.x_green_time);

      // Update lane 2 and lane 4
      updateLaneStatus('lane2', data.y_green_time);
      updateLaneStatus('lane4', data.y_green_time);
    }


  function trafficCounter(data) {
    let seconds = data.x_green_time + data.y_green_time;

    var timer = setInterval(function() {
        seconds--;
   

      if (seconds <= data.x_green_time) {
        updateTrafficLights({
          'x_green_time': seconds,
          'y_green_time': 0
        });
      } else {
        updateTrafficLights({
          'x_green_time': 0,
          'y_green_time': seconds - data.x_green_time
        });
      }
   
      
      
      if (seconds < 0) {
          fetchData()
        clearInterval(timer);
      }
    }, 1000);
  }


  trafficCounter({
    'x_green_time': 90,
    'y_green_time': 30
  });






  function fetchData() {
    fetch( 
          'https://computer-vision-traffic-control.onrender.com/process/',
        {
            method: "GET", 
            headers: {
            "content-type":"application/json"
        }
        }
       )
        .then( response => response.json() ).then( data =>
        { 
            trafficCounter( data.gotten_data[ 0 ] )
               populateTable(data.gotten_data)
            console.log( data.gotten_data )
            
        } )
    //   .then(data => updateTrafficLights(data));
}
  
  fetchData()


  function populateTable(data) {
  const tableBody = document.querySelector('tbody');
  // Clear existing table rows
  tableBody.innerHTML = '';
  // Iterate through the data array and create table rows
  data.forEach((item) => {
      const row = document.createElement( 'tr' );
      row.style.backgroundColor = 'hsl(0, 10%, 95%)'
      row.style.alignItems='center'

    row.innerHTML = `
      <td>${item.x1_vehicles}</td>
      <td>${item.x2_vehicles}</td>
      <td>${item.y1_vehicles}</td>
      <td>${item.y2_vehicles}</td>
      <td>${item.x_green_time}</td>
      <td>${item.y_green_time}</td>
      <td>${formatTimestamp(item.created_at)}</td>
      <td>${formatTimestamp(item.updated_at)}</td>
    `;
    tableBody.appendChild(row);
  });
}


function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  // Format the date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  // Construct the readable date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}