
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Quiz functionality
let selectedAnswers = {};

// Handle option selection
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function () {
        const question = this.closest('.question');
        const questionNum = question.getAttribute('data-question');

        // Remove previous selection
        question.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add selection to clicked option
        this.classList.add('selected');

        // Store answer
        selectedAnswers[questionNum] = this.getAttribute('data-answer');
    });
});

function submitQuiz() {
    const totalQuestions = 5;
    const answeredQuestions = Object.keys(selectedAnswers).length;

    if (answeredQuestions < totalQuestions) {
        alert('Please answer all questions before submitting!');
        return;
    }

    // Calculate score
    let correctAnswers = 0;
    for (let answer of Object.values(selectedAnswers)) {
        if (answer === 'correct') {
            correctAnswers++;
        }
    }

    const percentage = (correctAnswers / totalQuestions) * 100;

    // Show results
    document.getElementById('quiz-questions').style.display = 'none';
    document.querySelector('button[onclick="submitQuiz()"]').style.display = 'none';

    const resultDiv = document.getElementById('quiz-result');
    const scoreText = document.getElementById('score-text');
    const feedbackText = document.getElementById('feedback-text');

    scoreText.textContent = `You scored ${correctAnswers} out of ${totalQuestions} (${percentage}%)`;

    if (percentage >= 80) {
        feedbackText.textContent = 'Excellent! You have a great understanding of food hygiene practices.';
    } else if (percentage >= 60) {
        feedbackText.textContent = 'Good job! Review the knowledge center for additional tips.';
    } else {
        feedbackText.textContent = 'Keep learning! Check out our knowledge center for important food hygiene information.';
    }

    resultDiv.style.display = 'block';
}

function resetQuiz() {
    selectedAnswers = {};

    // Clear all selections
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });

    // Show questions again
    document.getElementById('quiz-questions').style.display = 'block';
    document.querySelector('button[onclick="submitQuiz()"]').style.display = 'inline-block';
    document.getElementById('quiz-result').style.display = 'none';
}

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Gallery item click handling (for future image expansion)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        // Add lightbox functionality here when real images are added
        console.log('Gallery item clicked - add lightbox functionality');
    });
});

// Mobile menu toggle (for future mobile optimization)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add scroll animations for elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .gallery-item, .knowledge-card, .team-member');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);

// Set initial styles for animation elements
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.about-card, .gallery-item, .knowledge-card, .team-member');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger initial animation check
    animateOnScroll();
});