const table = document.getElementById('example');
 function updateLaneStatus(laneId, time) {
    var countdownElement = document.getElementById(laneId + 'Countdown');
    var redElement = document.getElementById(laneId + 'Red');
    var yellowElement = document.getElementById(laneId + 'Yellow');
     var greenElement = document.getElementById( laneId + 'Green' );
     


  
  const tensDigit = Math.floor(time / 10);
  const onesDigit = time % 10;
   
   const time1 = document.createElement( 'div' )
   const time2 = document.createElement( 'div' )
time1.classList.add('digit')
   time2.classList.add( 'digit' )
   time1.innerText = tensDigit;

    time2.innerText = onesDigit;

    time1.innerText = tensDigit;
   time2.innerText = onesDigit;
   


    countdownElement.innerHTML = '';
    countdownElement.appendChild(time1);
   countdownElement.appendChild( time2 );



   

   
    

    redElement.style.background = 'black';
    yellowElement.style.background = 'black';
   greenElement.style.background = 'black';

  redElement.style.boxShadow= "none"
  yellowElement.style.boxShadow= "none"
  greenElement.style.boxShadow= "none"
   

   


    if (time > 5) {
    
          greenElement.style.borderRadius= "50%"
 greenElement.style.background= "linear-gradient(145deg, #12ff00, #0fe600)";
 greenElement.style.boxShadow= " 5px 5px 30px #076600,-5px -5px 30px #1bff00"
    } else if (time <= 5 && time > 0) {
    
           yellowElement.style.borderRadius= "50%"
  yellowElement.style.background= "linear-gradient(145deg, #ffec00, #e6c700)";
  yellowElement.style.boxShadow= "5px 5px 30px #665800,  -5px -5px 30px #ffff00"
    } else {

           redElement.style.borderRadius= "50%"
  redElement.style.background= "linear-gradient(145deg, #ff0000, #e60000)";
  redElement.style.boxShadow= " 5px 5px 30px #660000,  -5px -5px 30px #ff0000"
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
   
      
      
      if (seconds === 0) {
          fetchData()
        clearInterval(timer);
      }
    }, 1000);
  }


  // trafficCounter({
  //   'x_green_time': 90,
  //   'y_green_time': 30
  // });






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




const uploadForm = document.querySelector('form');

uploadForm.addEventListener('submit', uploadFiles);

function uploadFiles(event) {
    event.preventDefault(); // Prevent default form submission

    // Access uploaded files
    const files = uploadForm.querySelectorAll('input[type="file"]');

    // Check if any files are selected
    if (!files.length) {
        alert('Please select files to upload!');
        return;
    }

    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData
    for (const file of files) {
        formData.append(file.name, file.files[0]); // Use file.files[0] for single selection
    }

    // Send the FormData object to your server using Fetch API
    fetch('https://computer-vision-traffic-control.onrender.com/process/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
        // Display the uploaded data (extracted from the response)
        console.log('Upload successful:', data);
        // Update your UI with the processed data from the server (replace with your logic)

        const a = document.getElementById( 'uploadResult' )
        a.innerHTML`
       
<div class="card">
  <div class="card-header">
    Upload Result
  </div>
  <div class="card-body">
    <pre id="uploadResult"></pre>
    <div>

      <div>${data.gotten_data.x1_vehicles}</div>
      <div>${data.gotten_data.x2_vehicles}</div>
      <div>${data.gotten_data.y1_vehicles}</div>
      <div>${data.gotten_data.y2_vehicles}</div>
      <div>${data.gotten_data.x_green_time}</div>
      <div>${data.gotten_data.y_green_time}</div>
      <div>${formatTimestamp(data.gotten_data.created_at)}</div>
      <div>${formatTimestamp(data.gotten_data.updated_at)}</div>


  </div>


</div>



        `
        .textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Upload failed:', error);
        // Handle upload errors (display error message to the user)
        alert('An error occurred while uploading files!');
    });
}






























// Function to create a flip digit element
function createFlipDigit() {
  const flipDigit = document.createElement('div');
  flipDigit.classList.add('flip-digit');
  flipDigit.innerHTML = `
    <div class="flip-digit-upper"></div>
    <div class="flip-digit-lower"></div>
  `;
  return flipDigit;
}

// Function to create and initialize flip clock elements
function createFlipClock() {
  const flipClock = document.createElement('div');
  flipClock.classList.add('flip-clock');
  const minutesDigit1 = createFlipDigit();
  const minutesDigit2 = createFlipDigit();
  const secondsDigit1 = createFlipDigit();
  const secondsDigit2 = createFlipDigit();
  flipClock.append(minutesDigit1, minutesDigit2, document.createTextNode(':'), secondsDigit1, secondsDigit2);
  return {
    flipClock,
    minutesDigit1,
    minutesDigit2,
    secondsDigit1,
    secondsDigit2
  };
}

// Function to update the flip clock with new digits
function updateFlipClock(flipClock, minutes, seconds) {
  flipClock.minutesDigit1.innerText = Math.floor(minutes / 10);
  flipClock.minutesDigit2.innerText = minutes % 10;
  flipClock.secondsDigit1.innerText = Math.floor(seconds / 10);
  flipClock.secondsDigit2.innerText = seconds % 10;
}


