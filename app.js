document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    generateCalendar(currentYear);

    document.getElementById('prev-year').addEventListener('click', function () {
        generateCalendar(currentYear - 1);
    });

    document.getElementById('next-year').addEventListener('click', function () {
        generateCalendar(currentYear + 1);
    });
});

function generateCalendar(year) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let calendarHTML = '<h1>' + year + ' Calendar</h1>';
    calendarHTML += '<button id="prev-year">Previous Year</button>';
    calendarHTML += '<button id="next-year">Next Year</button>';
    calendarHTML += '<div class="months-container">';

    for (let i = 0; i < months.length; i++) {
        calendarHTML += '<div class="month">';
        calendarHTML += '<h2>' + months[i] + '</h2>';
        calendarHTML += '<table>';
        calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
        calendarHTML += generateMonthDays(year, i);
        calendarHTML += '</table>';
        calendarHTML += '</div>';
    }

    calendarHTML += '</div>';
    document.getElementById('app').innerHTML = calendarHTML;

    // Add event listeners to each day cell
    const dayCells = document.querySelectorAll('.day-cell');
    dayCells.forEach(function (cell) {
        cell.addEventListener('click', function () {
            makeDayEditable(cell);
        });
    });
}

function generateMonthDays(year, month) {
    const today = new Date();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    let dayHTML = '<tr>';
    for (let i = 0; i < firstDay.getDay(); i++) {
        dayHTML += '<td></td>';
    }

    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(year, month, day);
        const isToday = currentDate.toDateString() === today.toDateString();

        dayHTML += '<td class="day-cell"';
        dayHTML += isToday ? ' class="today"' : '';
        dayHTML += '>';
        dayHTML += '<div class="day-number">' + day + '</div>';
        dayHTML += '<div class="day-content" contenteditable="true"></div>';
        dayHTML += '</td>';

        if ((firstDay.getDay() + day) % 7 === 0) {
            dayHTML += '</tr><tr>';
        }
    }

    dayHTML += '</tr>';
    return dayHTML;
}

function makeDayEditable(cell) {
    const dayContent = cell.querySelector('.day-content');
    dayContent.focus();
}