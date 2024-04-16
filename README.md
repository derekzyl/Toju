## Vehicle Counting and Traffic Light Control using Raspberry  ui simulation

This project implements an intelligent traffic light control system using a Raspberry Pi 3B+. It leverages computer vision and FastAPI to capture video footage, count vehicles in each lane, and dynamically adjust green light timings based on real-time traffic conditions.

**Key Functionalities:**

- **Video Capture:** Employs a camera and servo motor to capture 2-second video clips of vehicles in four lanes (X1, X2, Y1, Y2).
- **Video Transmission:** Sends the captured videos to a FastAPI server for vehicle counting processing.
- **Vehicle Counting:** Utilizes the server-side processing to analyze video frames and accurately count vehicles in each lane.
- **Traffic Light Control:** Uses the received vehicle counts from the server to dynamically adjust green light timings for optimal traffic flow.
- **LED and Countdown Timer:** Controls LED lights and displays countdown timers on each lane based on the allocated green time.

**Project Components:**

- Raspberry Pi 3B+
- Camera
- Servo Motor
- FastAPI Server (running vehicle counting logic)

**Communication Flow:**

1. The Raspberry Pi captures video clips of each lane using the camera and servo motor.
2. It transmits the videos to the FastAPI server via a network connection.
3. The server receives the videos and performs vehicle counting using computer vision techniques.
4. The server sends back the vehicle count information for each lane along with the allocated green light duration.
5. The Raspberry Pi utilizes the returned data to control LEDs and countdown timers for each lane.

**Output Format:**

```json
{
  "id": "20240413060929emkax651ip2ff3e1acea50443b9b6ed854613634e6",
  "x1_vehicles": 0,
  "x2_vehicles": 0,
  "y1_vehicles": 0,
  "y2_vehicles": 0,
  "x_green_time": 60,
  "y_green_time": 60
}
```

- `id`: Unique identifier for the processing session.
- `x1_vehicles`: Count of vehicles detected in lane X1.
- `x2_vehicles`: Count of vehicles detected in lane X2.
- `y1_vehicles`: Count of vehicles detected in lane Y1.
- `y2_vehicles`: Count of vehicles detected in lane Y2.
- `x_green_time`: Current green light duration for lane X (in seconds).
- `y_green_time`: Current green light duration for lane Y (in seconds).

**Additional Notes:**

- The FastAPI server implementation and the code for controlling LEDs and countdown timers are not included in this project.
- This README.md provides a high-level overview of the system.
- Refer to the project's source code (assuming scripts like `capture_video.py`, `send_videos_to_api.py`, and others) for detailed implementation specifics.
