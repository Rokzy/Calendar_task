# Calendar_task
FE calendar task for coding academy

SportStat Calendar
A minimalist, interactive calendar built with HTML, CSS, and vanilla JavaScript, specifically designed for tracking sports matches and recording their scores.
✨ Features
•	Dynamic Calendar View: Navigate seamlessly between months and years.
•	Today Highlight: Easily identify the current date.
•	Event Marking: Days with scheduled matches are visually marked.
•	Sports Match-Focused Event Creation: Add matches with all critical sports data:
o	Game Title (e.g., "Premier League Match")
o	Team 1 Name
o	Team 2 Name
o	Game Time (24-hour format)
o	Score Tracking: Record and display Team 1 Score and Team 2 Score.
•	Local Storage Persistence: All scheduled events are saved locally in the browser, ensuring data remains intact between sessions.

🛠️ Tech Stack
Component	Technology	Purpose
Structure	HTML5	Defines the calendar and event form structure.
Styling	CSS3	Provides modern, responsive styling and layout.
Logic	Vanilla JavaScript	Handles all dynamic calendar rendering, event creation, data validation, and local storage management.
Icons	Font Awesome	Used for navigation and action icons.

🚀 Getting Started
To run this project, you only need a web browser.
Prerequisites
No special dependencies or build tools are required.
Installation
1.	Clone the repository:
Bash
git clone https://github.com/YourUsername/SportStat-Calendar.git
2.	Navigate to the project folder:
Bash
cd SportStat-Calendar
3.	Open in Browser: Open the index.html file directly in your preferred web browser (e.g., Chrome, Firefox, Safari).

⚙️ Project Structure
The project follows a standard file structure:
SportStat-Calendar/
├── index.html        # Main HTML file for the calendar interface.
├── script.js         # Core JavaScript logic for calendar rendering and event management.
└── style.css         # Styling for the application.


📝 Usage
Adding a New Match
1.	Click the + button in the bottom right corner of the calendar.
2.	Select the day on the calendar for which you want to schedule a match.
3.	Fill in the following details in the "Add Event" panel:
o	Game Title
o	Team 1 Name
o	Team 2 Name
o	Game Time (Must be in HH:MM format, 24-hour clock)
o	Team 1 Score (Optional at first, must be a number)
o	Team 2 Score (Optional at first, must be a number)
4.	Click the Add Event button.
Viewing Scores
Once an event is added, it appears in the right-hand Events panel:
•	The display shows the Team Names and the Game Time.
•	If scores were entered, the score will be prominently displayed next to the time (e.g., 19:30 ➡️ 3 - 2).
•	Scores can be updated by editing the event data in local storage (for advanced users) or simply deleting and re-adding the event with final scores.
🤝 Contribution
Contributions are welcome! Feel free to fork the repository and submit a Pull Request.
1.	Fork the repository.
2.	Create your feature branch (git checkout -b feature/AmazingFeature).
3.	Commit your changes (git commit -m 'Add some AmazingFeature').
4.	Push to the branch (git push origin feature/AmazingFeature).
5.	Open a Pull Request.

*created readme file with gemini

