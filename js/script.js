const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// -------- Hero section-------

const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 70 + 30;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.text = this.getRandomText();
        this.color = this.getRandomColor();
    }

    getRandomText() {
        const words = ['Learn', 'Speak', 'Read', 'Write', 'Listen', 'Grammar', 'Vocabulary'];
        return words[Math.floor(Math.random() * words.length)];
    }

    getRandomColor() {
        const colors = ['#FF6F61','yellow','red', 'blue', 'green', '#6B5B95', '#88B04B', '#F7CAC9', '#0077b6', '#92A8D1'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.font = `${this.size / 3}px 'Poppins', sans-serif`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x, this.y);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.size / 2 > canvas.width || this.x - this.size / 2 < 0) {
            this.speedX *= -1;
        }

        if (this.y + this.size / 2 > canvas.height || this.y - this.size / 2 < 0) {
            this.speedY *= -1;
        }
    }
}

function initParticles() {
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();




// --------Scrool efect Hero and Lesson sections

document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const lessons = document.querySelector("#lessons");

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // Scroll qilganda keyingi bo'limlar hero section ustidan chiqadi
        if (scrollPosition >= heroHeight) {
            hero.style.position = "relative";
        } else {
            hero.style.position = "sticky";
        }
    });
});

// Emailni tasdiqlash

document.addEventListener("DOMContentLoaded", () => {
    const allowedEmails = ["example1@gmail.com", "example2@yahoo.com", "test@example.com"]; // Ruxsat etilgan email ro'yxati

    // Email modalni ko'rsatish yoki ko'rsatmaslikni tekshirish
    if (!sessionStorage.getItem("emailVerified")) {
        // Modalni yaratish
        const modal = document.createElement("div");
        modal.id = "email-modal";
        modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85); /* Xiralashgan qora fon */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

        const modalContent = document.createElement("div");
        modalContent.style.cssText = `
            background: linear-gradient(145deg, #ffffff, #f1f1f1); /* Sof oq gradient */
            border-radius: 25px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); /* Chuqur soyalar */
            padding: 50px;
            width: 450px;
            max-width: 90%;
            text-align: center;
            animation: slideDown 0.7s ease; /* Pastdan paydo bo'lish */
            font-family: 'Poppins', sans-serif;
        `;

        modalContent.innerHTML = `
            <h2 style="
                color: #333;
                font-size: 26px;
                margin-bottom: 25px;
                font-weight: bold;
                letter-spacing: 1.5px;
            ">Welcome Back!</h2>
            <p style="
                color: #555;
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.8;
            ">Enter your email below to access the website:</p>
            <input type="email" id="email-input" placeholder="Enter your email" style="
                width: 100%;
                padding: 15px;
                border: 2px solid rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                font-size: 16px;
                margin-bottom: 25px;
                outline: none;
                background: #f9f9f9;
                box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
                transition: border 0.3s ease, box-shadow 0.3s ease;
            " onfocus="this.style.borderColor='#4caf50'; this.style.boxShadow='0 0 10px rgba(76, 175, 80, 0.5)';" onblur="this.style.borderColor='rgba(0, 0, 0, 0.1)'; this.style.boxShadow='inset 0 3px 6px rgba(0, 0, 0, 0.1)';">
            <button id="email-submit" style="
                background: linear-gradient(135deg, #4caf50, #66bb6a); /* Yashil gradient */
                border: none;
                color: white;
                font-size: 18px;
                padding: 15px 30px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
            " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 10px 20px rgba(76, 175, 80, 0.6)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 5px 15px rgba(76, 175, 80, 0.4)';">Submit</button>
            <p id="error-message" style="
                color: red;
                font-size: 14px;
                margin-top: 20px;
                display: none;
            "></p>
        `;


        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Emailni tekshirish
        document.getElementById("email-submit").addEventListener("click", () => {
            const emailInput = document.getElementById("email-input").value.trim();
            const errorMessage = document.getElementById("error-message");

            if (allowedEmails.includes(emailInput)) {
                alert("Welcome! Redirecting to the website...");
                sessionStorage.setItem("emailVerified", true); // Faqat sessiya davomida tekshirildi deb saqlash
                document.body.removeChild(modal); // Modalni yopish
            } else {
                errorMessage.style.display = "block";
                errorMessage.innerText = "Access denied! Your email is not authorized.";
            }
        });
    }
});

