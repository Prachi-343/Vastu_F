// Initialize Firebase services
// const db = firebase.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

/**
 * Authentication Logic
 */
/**
 * User Signup Logic
 */
const signupForm = document.getElementById("signup-form");
signupForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const mobile = document.getElementById("signup-mobile").value.trim();
    const gender = document.getElementById("signup-gender").value;

    if (!name || !email || !password || !mobile || !gender) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection("users").doc(user.uid).set({
            name,
            email,
            mobile,
            gender,
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
loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const rememberMe = document.getElementById("remember-me").checked;

    if (!email || !password) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const persistence = rememberMe
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION;

        await auth.setPersistence(persistence);

        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        alert(`Welcome back, ${userCredential.user.email}!`);
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
forgotPassword?.addEventListener("click", async () => {
    const email = prompt("Enter your email address for password reset:");
    if (!email) return;

    try {
        await auth.sendPasswordResetEmail(email);
        alert("Password reset email sent! Check your inbox.");
    } catch (error) {
        console.error("Password reset error:", error.message);
        alert("Password reset failed: " + error.message);
    }
});

/**
 * Navigation Between Forms
 */
document.getElementById("go-to-signup")?.addEventListener("click", () => {
    document.getElementById("login-dialog").style.display = "none";
    document.getElementById("signup-dialog").style.display = "block";
});

document.getElementById("go-to-login")?.addEventListener("click", () => {
    document.getElementById("signup-dialog").style.display = "none";
    document.getElementById("login-dialog").style.display = "block";
});

/**
 * Blog Management
 */
const fetchBlogs = async () => {
    const blogsContainer = document.getElementById("blogs");
    if (!blogsContainer) return;

    blogsContainer.innerHTML = ""; // Clear existing content

    try {
        const querySnapshot = await db.collection("blogs").get();
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

/**
 * Product Management
 */
const fetchProducts = async () => {
    const productsContainer = document.getElementById("products");
    if (!productsContainer) return;

    productsContainer.innerHTML = ""; // Clear existing content

    try {
        const querySnapshot = await db.collection("products").get();
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

/**
 * Event Listeners
 */
document.addEventListener("DOMContentLoaded", () => {
    fetchBlogs();
    fetchProducts();
});
