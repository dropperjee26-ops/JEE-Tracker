const weeklyPlan = [
    { day: "Sun", date: "Oct 26", type: "Regular Study Day (11.5 Hr)",
        tasks: [
            { name: "Chem Lecture 1 (Haloalkane/Alc)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 1 (COM)", subject: "Physics", hours: 2.0 },
            { name: "Math Lecture 1 (V&3D)", subject: "Maths", hours: 2.5 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "4th Lecture/Revision", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Mon", date: "Oct 27", type: "Anchor Day (11.5 Hr)",
        tasks: [
            { name: "Math Lecture 2 (V&3D)", subject: "Maths", hours: 2.5 },
            { name: "Chem Lecture 2 (Haloalkane/Alc)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 2 (COM)", subject: "Physics", hours: 2.0 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "4th Lecture/Short Notes", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Tue", date: "Oct 28", type: "Anchor Day (11.5 Hr)",
        tasks: [
            { name: "Math Lecture 3 (V&3D)", subject: "Maths", hours: 2.5 },
            { name: "Chem Lecture 3 (Haloalkane/Alc)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 3 (COM)", subject: "Physics", hours: 2.0 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "4th Lecture/Short Notes", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Wed", date: "Oct 29", type: "Anchor Day (11.5 Hr)",
        tasks: [
            { name: "Math Lecture 4 (Matrices)", subject: "Maths", hours: 2.5 },
            { name: "Chem Lecture 4 (Alcohol)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 4 (Rotation)", subject: "Physics", hours: 2.0 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "4th Lecture/Short Notes", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Thu", date: "Oct 30", type: "Anchor Day (11.5 Hr)",
        tasks: [
            { name: "Math Lecture 5 (Matrices)", subject: "Maths", hours: 2.5 },
            { name: "Chem Lecture 5 (Alcohol)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 5 (Rotation)", subject: "Physics", hours: 2.0 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "4th Lecture/Short Notes", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Fri", date: "Oct 31", type: "Anchor Day (11.5 Hr)",
        tasks: [
            { name: "Math Lecture 6 (Matrices)", subject: "Maths", hours: 2.5 },
            { name: "Chem Lecture 6 (Alcohol)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 6 (Rotation)", subject: "Physics", hours: 2.0 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "4th Lecture/Short Notes", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Sat", date: "Nov 01", type: "Pre-Test Day (11.5 Hr)",
        tasks: [
            { name: "Math Lecture 7 (Matrices)", subject: "Maths", hours: 2.5 },
            { name: "Chem Lecture 7 (Alcohol)", subject: "Chemistry", hours: 2.5 },
            { name: "Phys Lecture 7 (Rotation)", subject: "Physics", hours: 2.0 },
            { name: "PYQs/HW for 3 Lectures", subject: "Practice", hours: 2.5 },
            { name: "Mock Test Prep/Revision", subject: "Bonus", hours: 2.0 },
        ]
    },
    { day: "Sun", date: "Nov 02", type: "MOCK TEST DAY",
        tasks: [
            { name: "Full Mock Test (9AM - 12PM)", subject: "Test", hours: 3.0 },
            { name: "Detailed Analysis & Error Log", subject: "Test", hours: 2.5 },
            { name: "Focused Revision (Weak Areas)", subject: "Revision", hours: 4.0 },
            { name: "New Content Catch-up (If needed)", subject: "Bonus", hours: 2.0 },
        ]
    }
];

const taskList = document.getElementById('task-list');
let taskStatus = JSON.parse(localStorage.getItem('dailyTaskStatus')) || {};

function renderTasks() {
    taskList.innerHTML = '';
    
    // Calculate total possible tasks to track progress accurately
    let totalTasks = 0;
    weeklyPlan.forEach(dayPlan => totalTasks += dayPlan.tasks.length);
    let completedCount = 0;

    weeklyPlan.forEach((dayPlan, dayIndex) => {
        // Create the header row for the day
        const headerRow = document.createElement('tr');
        headerRow.classList.add('day-header');
        headerRow.innerHTML = `<td colspan="5"><strong>${dayPlan.day}, ${dayPlan.date}</strong>: ${dayPlan.type}</td>`;
        taskList.appendChild(headerRow);

        // Render individual tasks for the day
        dayPlan.tasks.forEach((task, taskIndex) => {
            const taskId = `${dayPlan.date}-${taskIndex}`;
            const isCompleted = taskStatus[taskId] || false;
            
            if (isCompleted) {
                completedCount++;
            }

            const row = document.createElement('tr');
            row.className = isCompleted ? 'completed' : '';
            
            // Add a class to the row based on the subject for better visualization (optional styling)
            row.classList.add(task.subject.toLowerCase().replace(/[^a-z]/g, '')); 
            
            row.innerHTML = `
                <td><input type="checkbox" data-id="${taskId}" ${isCompleted ? 'checked' : ''} onchange="toggleTask(this)"></td>
                <td>${task.subject}</td>
                <td>${task.name}</td>
                <td>${task.hours} Hrs</td>
                <td>-</td> `;
            taskList.appendChild(row);
        });
    });

    updateProgress(completedCount, totalTasks);
}

window.toggleTask = function(checkbox) {
    const id = checkbox.getAttribute('data-id');
    taskStatus[id] = checkbox.checked;
    localStorage.setItem('dailyTaskStatus', JSON.stringify(taskStatus));
    renderTasks();
};

function updateProgress(completedCount, totalTasks) {
    const percentage = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);
    
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
    
    if (percentage > 0) {
        progressBar.textContent = percentage + '%'; 
    }
}

// Initial render when the page loads
renderTasks();
