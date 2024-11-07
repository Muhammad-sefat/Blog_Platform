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

window.onload = function () {
  updateAuthSection();
};

// initial fairbase and store data in fairbase
// Import Firebase and Auth SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA37p4yda19AQWpZxa4C4SwAaDLQwdErUk",
  authDomain: "techbd-59851.firebaseapp.com",
  projectId: "techbd-59851",
  storageBucket: "techbd-59851.appspot.com",
  messagingSenderId: "935519118247",
  appId: "1:935519118247:web:e25da6c28961a19ed94c82",
};

// Initialize Firebase and Auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Signup functionality
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get user input values
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const profilePicture = document.getElementById("signupPicture").files[0];

  try {
    // Step 1: Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);

    // Step 2: Upload Profile Picture to Firebase Storage (if provided)
    let profilePicURL = null;
    if (profilePicture) {
      const formData = new FormData();
      formData.append("image", profilePicture);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=d240fe72ec969cb050b454dd62652ed9`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to ImageBB");
      }

      const data = await response.json();
      profilePicURL = data.data.url;
    }

    // Step 3: Update user profile with name and profile picture URL
    await updateProfile(user, {
      displayName: name,
      photoURL: profilePicURL,
    });

    // Step 4: Show SweetAlert success message and redirect
    Swal.fire({
      icon: "success",
      title: "Sign-up Successful!",
      text: "Your account has been created successfully.",
      confirmButtonText: "Go to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html";
      }
    });
  } catch (error) {
    console.error("Error signing up:", error.message);
    // Show error message with SweetAlert
    Swal.fire({
      icon: "error",
      title: "Sign-up Failed",
      text: error.message,
    });
  }
});

// SignIn Functionality
document.getElementById("signinForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("User signed in successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
      alert(error.message);
    });
});
