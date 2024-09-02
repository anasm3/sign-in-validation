function throttle(func,delay) {
    let lastRun = 0;
    return function (...args) {
        const now = new Date().getTime();
        if(now - lastRun < delay) {
            return;
        }
        lastRun = now;
        func(...args);
    };
}

function debounce(func,delay) {
    let debounceId;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceId);
        debounceId = setTimeout( () => {
            func.apply(context,args);
        }, delay);
    };
}

document.getElementById("email").addEventListener("input",debounce(validateEmail,500));
document.getElementById("password").addEventListener("input",debounce(validatePassword,500));

function validateEmail() {
    const email = document.getElementById("email").value;
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            if(email === "taken@example.com") {
                document.getElementById("emailError").textContent = "Email is already taken.";
                reject("Email is taken.");
            }
            else {
                document.getElementById("emailError").textContent = "";
                resolve("Email is available");
            }
        },1000);
    });
}

function validatePassword() {
    const password = document.getElementById("password").value;
    return new Promise ((resolve,reject) => {
        setTimeout(()=> {
            if(password.length < 8) {
                document.getElementById("passwordError").textContent = "Password is too Short";
                reject("Password is Short");
            }
            else {
                document.getElementById("passwordError").textContent = "Password is upto mark.";
                resolve("Password is good to go.");
            }
        },1000);
    });
}

document.getElementById("sign_In_form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const emailPromise = validateEmail();
    const passwordPromise = validatePassword();
    await Promise.all([emailPromise, passwordPromise])
    .then(()=> {
        alert("Form Submitted Successfully!");
        document.getElementById("sign_In_form").submit();
    })
    .catch((error) => {
        console.error("Validation Failed:",error);
    });
});