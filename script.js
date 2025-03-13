// Get references to elements
const appointmentForm = document.getElementById("appointmentForm");
const appointmentList = document.getElementById("appointmentList");
const upcomingSection = document.getElementById("upcomingSection");

// Load appointments from Local Storage on page load
document.addEventListener("DOMContentLoaded", () => {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // Hide section if no appointments
    if (appointments.length === 0) {
        upcomingSection.style.display = "none";
    } else {
        upcomingSection.style.display = "block";
        appointments.forEach(addAppointmentToUI);
    }
});

// Handle form submission
appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form values
    const patientName = document.getElementById("patientName").value.trim();
    const mobileNumber = document.getElementById("mobileNumber").value.trim();
    const emailId = document.getElementById("emailId").value.trim();
    const age = document.getElementById("age").value.trim();
    const sex = document.getElementById("sex").value;
    const appointmentDate = document.getElementById("appointmentDate").value;

    // Validate input
    if (!patientName || !mobileNumber || !emailId || !age || !sex || !appointmentDate) {
        alert("Please fill in all fields.");
        return;
    }

    // Create appointment object with unique ID
    const appointment = { 
        id: Date.now(),  // Unique ID for deletion
        patientName, 
        mobileNumber, 
        emailId, 
        age, 
        sex, 
        appointmentDate 
    };

    // Save to Local Storage
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Update UI
    addAppointmentToUI(appointment);

    // Show the Upcoming Appointments section
    upcomingSection.style.display = "block";

    // Clear form
    appointmentForm.reset();
});

// Function to display an appointment in the UI
function addAppointmentToUI(appointment) {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${appointment.patientName}</strong> <br>
        📞 ${appointment.mobileNumber} | ✉️ ${appointment.emailId} <br>
        🏥 Age: ${appointment.age} | Gender: ${appointment.sex} <br>
        📅 ${new Date(appointment.appointmentDate).toLocaleString()} <br>
        <button class="delete-btn" onclick="deleteAppointment(${appointment.id})">❌ Delete</button>
    `;
    li.setAttribute("data-id", appointment.id);
    appointmentList.appendChild(li);
}

// Function to delete an appointment
function deleteAppointment(id) {
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    
    // Filter out the appointment to delete
    appointments = appointments.filter(apt => apt.id !== id);
    
    // Save updated list to Local Storage
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Remove from UI
    document.querySelector(`[data-id='${id}']`).remove();

    // Hide Upcoming Appointments if empty
    if (appointments.length === 0) {
        upcomingSection.style.display = "none";
    }
}
