//current date and time section
document.addEventListener('DOMContentLoaded', function() {
    // Function to update the current date and time
    function updateDateTime() {
        const currentDate = new Date();

        // Format the date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);

        // Format the time
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        // Display the formatted date and time
        const currentDateTimeElement = document.getElementById('currentDateTime');
        currentDateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
    }

    // Initial call to updateDateTime
    updateDateTime();

    // Function to toggle between light and dark mode
    const toggleThemeBtn = document.getElementById('toggleTheme');
    toggleThemeBtn.addEventListener('click', function() {
        // Toggle the 'dark-mode' class on the body element
        document.body.classList.toggle('dark-mode');
    });
});