// Import Firebase services from firebaseConfig.js
import { db, auth, storage } from "./firebaseConfig.js";
import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    setDoc,
    deleteDoc, 
    updateDoc 
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendPasswordResetEmail, 
    setPersistence, 
    browserSessionPersistence, 
    browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

/**
 * Authentication Logic
 */
/**
 * User Signup Logic
 */
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const mobile = document.getElementById("signup-mobile").value;
    const gender = document.getElementById("signup-gender").value;

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            mobile,
            gender
        });

        alert("Signup successful! You can now log in.");
        signupForm.reset();
    } catch (error) {
        console.error("Signup error:", error.message);
        alert("Signup failed: " + error.message);
    }
});

/**
 * User Login Logic
 */
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    try {
        // Set persistence based on "remember me" checkbox
        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);

        // Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert(`Welcome back, ${user.email}!`);
        loginForm.reset();
    } catch (error) {
        console.error("Login error:", error.message);
        alert("Login failed: " + error.message);
    }
});

/**
 * Forgot Password Logic
 */
const forgotPassword = document.getElementById("forgot-password");
forgotPassword.addEventListener("click", async () => {
    const email = prompt("Enter your email address for password reset:");
    if (!email) return;

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Check your inbox.");
    } catch (error) {
        console.error("Password reset error:", error.message);
        alert("Password reset failed: " + error.message);
    }
});

/**
 * Navigation Between Forms
 */
document.getElementById("go-to-signup").addEventListener("click", () => {
    document.getElementById("login-dialog").style.display = "none";
    document.getElementById("signup-dialog").style.display = "block";
});

document.getElementById("go-to-login").addEventListener("click", () => {
    document.getElementById("signup-dialog").style.display = "none";
    document.getElementById("login-dialog").style.display = "block";
});

/**
 * Blog Management
 */

// Fetch and display all blogs
const fetchBlogs = async () => {
    const blogsContainer = document.getElementById("blogs");
    blogsContainer.innerHTML = ""; // Clear existing content

    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            const blog = doc.data();
            blogsContainer.innerHTML += `
                <div class="blog">
                    <h2>${blog.title}</h2>
                    <p>${blog.content}</p>
                    <small>Author: ${blog.author}</small>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching blogs:", error.message);
    }
};

// Add a new blog
const addBlog = async (title, content, author) => {
    try {
        await addDoc(collection(db, "blogs"), { title, content, author });
        alert("Blog added successfully!");
    } catch (error) {
        console.error("Error adding blog:", error.message);
    }
};

/**
 * Product Management
 */

// Fetch and display products
const fetchProducts = async () => {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ""; // Clear existing content

    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            productsContainer.innerHTML += `
                <div class="product">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Stock: ${product.stock}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
    }
};

// Add a new product
const addProduct = async (name, description, price, stock, file) => {
    try {
        // Upload product image
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);

        // Add product details to Firestore
        await addDoc(collection(db, "products"), { name, description, price, stock, imageUrl });
        alert("Product added successfully!");
    } catch (error) {
        console.error("Error adding product:", error.message);
    }
};

/**
 * Appointment Booking
 */

// Fetch and display appointments
const fetchAppointments = async () => {
    const appointmentsContainer = document.getElementById("appointments");
    appointmentsContainer.innerHTML = ""; // Clear existing content

    try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        querySnapshot.forEach((doc) => {
            const appointment = doc.data();
            appointmentsContainer.innerHTML += `
                <div class="appointment">
                    <p>Date: ${appointment.date}</p>
                    <p>Time: ${appointment.time}</p>
                    <p>Status: ${appointment.status}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
    }
};

// Book a new appointment
const bookAppointment = async (date, time, userID) => {
    try {
        await addDoc(collection(db, "appointments"), { date, time, userID, status: "Pending" });
        alert("Appointment booked successfully!");
    } catch (error) {
        console.error("Error booking appointment:", error.message);
    }
};

/**
 * Event Listeners
 * Add your event listeners here for buttons in your HTML template.
 */

// Example usage for login
document.getElementById("loginButton").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    logIn(email, password);
});

// Example usage for fetching blogs
document.addEventListener("DOMContentLoaded", fetchBlogs);

