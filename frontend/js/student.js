window.onload = () => {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const course = localStorage.getItem("course");
  const paymentStatus = localStorage.getItem("paymentStatus");

  if (!email || role !== "student") {
    alert("Unauthorized access. Please login.");
    window.location.href = "/login.html";
    return;
  }

  if (!course || course === "null") {
    document.getElementById("course-selection").style.display = "block";
    fetchCourses();
  } else if (paymentStatus === "pending") {
    document.getElementById("payment-pending").style.display = "block";
    document.getElementById("selectedCourse").textContent = course;
  } else {
    document.getElementById("dashboard").style.display = "block";
  }
};

async function fetchCourses() {
  try {
    const res = await fetch("http://localhost:5000/courses/all");
    const courses = await res.json();
    const courseGrid = document.getElementById("courseGrid");

    courseGrid.innerHTML = "";

    courses.forEach(course => {
      const div = document.createElement("div");
      div.className = "course-card";

      div.innerHTML = `
        <h4>${course.name}</h4>
        <p><strong>Duration:</strong> ${course.duration || 'N/A'}</p>
        <p><strong>Price:</strong> ₹${course.price || 500}</p>
        <button onclick="selectCourse('${course.name}', ${course.price || 500})">Pay Now</button>
      `;

      courseGrid.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load courses:", err);
    alert("Unable to load courses. Try again later.");
  }
}

async function selectCourse(course, price) {
  const email = localStorage.getItem("email");

  try {
    const res = await fetch("http://localhost:5000/courses/select-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, course })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("course", course);
      localStorage.setItem("paymentStatus", "pending");
      localStorage.setItem("price", price);
      alert("Course selected! Redirecting to payment...");
      window.location.href = "/payment.html";
    } else {
      alert(data.message || "Error selecting course.");
    }
  } catch (err) {
    console.error("Course selection error:", err);
    alert("Could not select course.");
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "\login.html";
}
