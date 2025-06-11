
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const protectedRoutes = ["/client-dashboard.html", "/admin-dashboard.html"];

  if (protectedRoutes.includes(path)) {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Unauthorized. Please login first.");
      window.location.href = "index.html";
    }
  }

  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const role = document.getElementById("role").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const res = await fetch(\`http://localhost:5000/api/\${role}/login\`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = role === "admin" ? "admin-dashboard.html" : "client-dashboard.html";
        } else {
          document.getElementById("message").innerHTML = `<span class='text-danger'>\${data.message}</span>`;
        }
      } catch (err) {
        document.getElementById("message").innerHTML = "<span class='text-danger'>Server error. Please try again.</span>";
        console.error(err);
      }
    });
  }
});
