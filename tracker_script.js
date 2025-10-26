const tasks = [
    // --- MATHS (Priority 1: Foundational/High-Yield) ---
    { id: 1, subject: "Maths", module: "Vector & 3D (3-D Left)", lectures: 7, target: "Oct 30" },
    { id: 2, subject: "Maths", module: "Matrices & Determinants", lectures: 10, target: "Nov 06" },
    { id: 3, subject: "Maths", module: "P&C", lectures: 9, target: "Nov 13" },
    
    // --- CHEMISTRY & PHYSICS (Priority 2: Core/Gap Filling) ---
    { id: 4, subject: "Chemistry", module: "Haloalkane/Arene & Alcohol", lectures: 9, target: "Nov 13" },
    { id: 5, subject: "Physics", module: "Centre of Mass & Rotation", lectures: 12, target: "Nov 20" },
    { id: 6, subject: "Chemistry", module: "Equilibrium & Solution", lectures: 15, target: "Nov 27" },

    // --- MATHS (Priority 3: Largest Block) ---
    { id: 7, subject: "Maths", module: "Straight Line & Conics (35 lec)", lectures: 35, target: "Dec 10" },
    
    // --- PHYSICS (Remaining Core) ---
    { id: 8, subject: "Physics", module: "Thermo, KTG, Waves (23 lec)", lectures: 23, target: "Dec 15" },

    // You can manually add more specific tasks here from your list.
];

const taskList = document.getElementById('task-list');

// Load state from local storage or set default
let taskStatus = JSON.parse(localStorage.getItem('taskStatus')) || {};

window.toggleTask = function(checkbox) {
    const id = checkbox.getAttribute('data-id');
    taskStatus[id] = checkbox.checked;
    localStorage.setItem('taskStatus', JSON.stringify(taskStatus));
    renderTasks(); // Re-render to update the visual state
};

function renderTasks() {
    taskList.innerHTML = '';
    let completedCount = 0;

    tasks.forEach(task => {
        const isCompleted = taskStatus[task.id] || false;
        if (isCompleted) {
            completedCount++;
        }

        const row = document.createElement('tr');
        row.className = isCompleted ? 'completed' : '';
        
        row.innerHTML = `
            <td><input type="checkbox" data-id="${task.id}" ${isCompleted ? 'checked' : ''} onchange="toggleTask(this)"></td>
            <td>${task.subject}</td>
            <td>${task.module}</td>
            <td>${task.lectures}</td>
            <td>${task.target}</td>
        `;
        taskList.appendChild(row);
    });

    updateProgress(completedCount);
}

function updateProgress(completedCount) {
    const totalTasks = tasks.length;
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
