window.addEventListener("load", () => {
    setTimeout(() => {
        const intro = document.getElementById("intro");
        intro.classList.add("fade-out");

        setTimeout(() => {
            // Redirect to main.html after fade-out animation
            window.location.href = "main.html";
        }, 1000); // Wait for fade-out animation to finish
    }, 3000); // Show intro for 3 seconds
});