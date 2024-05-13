document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle between light and dark mode
    const toggleThemeBtn = document.getElementById('toggleTheme');
    toggleThemeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Function to update the current date and time
    function updateDateTime() {
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        const currentDateTimeElement = document.getElementById('currentDateTime');
        currentDateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
    }

    // Function to update the date and time every second
    function updateTimeContinuously() {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    // Function to add a new task
    function addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskList = document.getElementById('taskList');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            listItem.classList.add('list-group-item');
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Done';
            completeBtn.classList.add('btn', 'btn-sm', 'btn-success', 'ml-2');
            completeBtn.addEventListener('click', function() {
                listItem.classList.toggle('completed');
            });
            listItem.appendChild(completeBtn);
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    }

    // Function to clear the task list
    function clearList() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
    }

    // Event listeners
    updateTimeContinuously();
    const addTaskBtn = document.getElementById('addTaskBtn');
    addTaskBtn.addEventListener('click', addTask);
    const clearListBtn = document.getElementById('clearListBtn');
    clearListBtn.addEventListener('click', clearList);

    // Show Pomodoro modal when button is clicked
    const pomodoroModalBtn = document.getElementById('pomodoroModalBtn');
    pomodoroModalBtn.addEventListener('click', function() {
        $('#pomodoroModal').modal('show');
    });
});

//pomodorro timer
document.addEventListener('DOMContentLoaded', function() {
    const focusTime = 25; // in minutes
    const shortBreakTime = 5; // in minutes
    const longBreakTime = 15; // in minutes
    
    let currentTimer = focusTime * 60; // Initial timer duration in seconds
    let timerInterval = null;
    
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerBtn = document.getElementById('startTimerBtn');
    const stopTimerBtn = document.getElementById('stopTimerBtn');
    
    function updateTimerDisplay() {
      const minutes = Math.floor(currentTimer / 60);
      const seconds = currentTimer % 60;
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    function startTimer() {
      timerInterval = setInterval(function() {
        currentTimer--;
        updateTimerDisplay();
        
        if (currentTimer <= 0) {
          clearInterval(timerInterval);
          // Play alarm sound or do any other actions when the timer ends
        }
      }, 1000);
    }
    
    function stopTimer() {
      clearInterval(timerInterval);
    }
    
    document.getElementById('focusTimerBtn').addEventListener('click', function() {
      currentTimer = focusTime * 60;
      updateTimerDisplay();
    });
    
    document.getElementById('shortBreakBtn').addEventListener('click', function() {
      currentTimer = shortBreakTime * 60;
      updateTimerDisplay();
    });
    
    document.getElementById('longBreakBtn').addEventListener('click', function() {
      currentTimer = longBreakTime * 60;
      updateTimerDisplay();
    });
    
    startTimerBtn.addEventListener('click', startTimer);
    stopTimerBtn.addEventListener('click', stopTimer);
  });

  
  //alarm section
  document.addEventListener('DOMContentLoaded', function() {
    const alarmTimeInput = document.getElementById('alarmTime');
    const reminderTextInput = document.getElementById('reminderText');
    const setAlarmBtn = document.getElementById('setAlarmBtn');
    const alarmList = document.getElementById('alarmList');
    let alarms = [];

    setAlarmBtn.addEventListener('click', function() {
        const alarmTime = alarmTimeInput.value;
        const reminderText = reminderTextInput.value;
        const [hours, minutes] = alarmTime.split(':');

        const alarm = {
            time: { hours: parseInt(hours), minutes: parseInt(minutes) },
            text: reminderText
        };

        alarms.push(alarm);
        renderAlarm(alarm);

        // Clear input fields after adding the alarm
        alarmTimeInput.value = '';
        reminderTextInput.value = '';
    });

    function renderAlarm(alarm) {
        const alarmItem = document.createElement('li');
        alarmItem.classList.add('list-group-item');
        alarmItem.textContent = `${alarm.time.hours}:${alarm.time.minutes} - ${alarm.text || 'No reminder text'}`;
        alarmItem.addEventListener('click', function() {
            displayAlarmModal(alarm);
        });
        alarmList.appendChild(alarmItem);
    }

    function displayAlarmModal(alarm) {
        const modalTitle = document.getElementById('alarmModalLabel');
        const modalContent = document.getElementById('alarmContent');

        modalTitle.textContent = 'Alarm';
        modalContent.textContent = alarm.text || 'No reminder text';

        $('#alarmModal').modal('show');
    }

    function checkAlarms() {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        alarms.forEach((alarm, index) => {
            if (currentHours === alarm.time.hours && currentMinutes === alarm.time.minutes) {
                displayAlarmModal(alarm);
                alarms.splice(index, 1);
                renderAlarms();
            }
        });
    }

    setInterval(checkAlarms, 1000); // Check every second
});
