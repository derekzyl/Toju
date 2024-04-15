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
    fetch('YOUR_UPLOAD_ENDPOINT', {
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