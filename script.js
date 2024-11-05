const navLinks = document.getElementById("navLinks");
function toggleMenu() {
  navLinks.classList.toggle("hidden");
}

const isLoggedIn = false; // Change to true if user is logged in

function updateAuthSection() {
  const authSection = document.getElementById("authSection");
  if (isLoggedIn) {
    // Show avatar if logged in
    authSection.innerHTML = `
      <img src="https://via.placeholder.com/40" alt="User Avatar" class="rounded-full w-10 h-10 cursor-pointer" />
    `;
  } else {
    // Show "Sign In" link if not logged in
    authSection.innerHTML = `<a href="login.html" class="hover:text-gray-300">Sign In</a>`;
  }
}

updateAuthSection();
