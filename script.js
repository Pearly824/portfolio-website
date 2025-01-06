const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a'); // Select all menu links

// Toggle the menu when clicking the hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close the menu when clicking any menu item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
    
// FORM
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault(); // Prevent form submission
            alert('Please fill out all the fields.');
        } else if (!validateEmail(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }




// Web Development Projects

if (window.location.pathname.includes('calculator.html')) {
    let currentInput = "";
    let operator = "";
    let previousInput = "";

    const calcInput = document.getElementById("calc-input");

    function updateDisplay(value) {
        calcInput.value = value;
    }

    document.querySelectorAll("#calculator button").forEach(button => {
        const value = button.getAttribute("data-value");
        const op = button.getAttribute("data-operator");

        if (value) {
            button.addEventListener("click", () => {
                console.log("Number clicked:", value);
                currentInput += value;
                updateDisplay(currentInput);
            });
        } else if (op) {
            button.addEventListener("click", () => {
                console.log("Operator clicked:", op);
                if (previousInput && currentInput) compute();
                operator = op;
                previousInput = currentInput;
                currentInput = "";
            });
        }
    });

    document.getElementById("equals").addEventListener("click", () => {
        console.log("Equals clicked");
        compute();
    });
    document.getElementById("clear").addEventListener("click", () => {
        console.log("Clear clicked");
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay("0");
    });

    function compute() {
        if (!previousInput || !currentInput || !operator) return;
        console.log("Computing:", previousInput, operator, currentInput);
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num2 === 0 ? "Error" : num1 / num2;
                break;
        }

        console.log("Result:", result);
        updateDisplay(result);
        previousInput = result.toString();
        currentInput = "";
        operator = "";
    }
}

// To-Do List Logic

// Function to add a new task
function addTodo() {
    // Get the input value
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();  // Get the trimmed text from the input field
    
    // Get the list where tasks will be displayed
    const list = document.getElementById('todo-list');
    
    // Check if the input is not empty
    if (taskText) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;  // Set the task text

        // Create a delete button for the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        
        // Add an event listener to the delete button to remove the task when clicked
        deleteButton.onclick = function() {
            list.removeChild(listItem);
        };
        
        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        // Add the list item to the to-do list
        list.appendChild(listItem);
        
        // Clear the input field after adding the task
        input.value = '';
    }
}


// script.js

// Function to fetch recipes based on user input
async function findRecipe() {
    const recipeInput = document.getElementById("recipe-input").value;
    const recipeResult = document.getElementById("recipe-result");

    if (!recipeInput) {
        recipeResult.innerHTML = "<p>Please enter a recipe name.</p>";
        return;
    }

    const apiKey = '565451608bdf44608540a952a5db4480'; // Replace with your API key
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput}&apiKey=${apiKey}`;

    try {
        recipeResult.innerHTML = "<p>Loading...</p>"; // Display a loading message
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch recipes. Please check your API key or input.");
        }

        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        recipeResult.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Function to display fetched recipes
function displayRecipes(recipes) {
    const recipeResult = document.getElementById("recipe-result");

    if (recipes.length === 0) {
        recipeResult.innerHTML = "<p>No recipes found. Please try another search term.</p>";
        return;
    }

    const recipeHTML = recipes
        .map(recipe => {
            return `
                <div class="recipe-item">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">View Recipe</a>
                </div>
            `;
        })
        .join("");

    recipeResult.innerHTML = recipeHTML;
}


// Weather Forecast Logic
function getWeather() {
    // Get the city name entered by the user
    const city = document.getElementById('weather-input').value.trim();
    const resultDiv = document.getElementById('weather-result');
    const apiKey = 'b62f22efb8a45ee0b9e5bfe73ca3f30e'; // Replace with your OpenWeatherMap API key

    // If the user enters a city name
    if (city) {
        // Construct the URL to fetch weather data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Make the API request
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Check if the response is valid
                if (data.cod === 200) {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;

                    // Display the weather details in the result section
                    resultDiv.innerHTML = `
                        <p><strong>Weather in ${city}:</strong></p>
                        <p>${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;
                } else {
                    // Display an error if the city is not found
                    resultDiv.innerHTML = `<p>City not found. Please try again.</p>`;
                }
            })
            .catch(error => {
                // Handle any errors that occur during the API request
                console.error('Error fetching weather data:', error);
                resultDiv.innerHTML = '<p>Something went wrong. Please try again.</p>';
            });
    } else {
        // If no city is entered, prompt the user
        resultDiv.innerHTML = '<p>Please enter a city name to check the weather.</p>';
    }
}



// English Grammar Checker JavaScript

function checkGrammar() {
    const inputText = document.getElementById('grammar-input').value;
    const resultDiv = document.getElementById('grammar-result');
    let errors = [];
    
    // Check for common grammar issues
    const grammarRules = [
        { regex: /\s{2,}/, message: "Double spaces found." }, // Double spaces
        { regex: /\bi\b/g, message: "Use capital 'I' for the personal pronoun." }, // 'i' instead of 'I'
        { regex: /their\s+there|there\s+their/, message: "Check the usage of 'their' and 'there'." }, // 'their' and 'there' confusion
        { regex: /([a-zA-Z])\.\s([a-zA-Z])/g, message: "Ensure there is only one space after a period." }, // Double space after period
    ];
    
    // Check each grammar rule against the input text
    grammarRules.forEach(rule => {
        if (rule.regex.test(inputText)) {
            errors.push(rule.message);
        }
    });
    
    // Display errors or confirm correct grammar
    if (errors.length > 0) {
        resultDiv.innerHTML = `<p>Grammar Issues Found:</p><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`;
    } else {
        resultDiv.innerHTML = '<p>Grammar looks fine!</p>';
    }
}


let score = 0;  // Initialize score

// Array of questions with answers
const questions = [
    { question: "What is 5 + 3?", answer: 8 },
    { question: "What is 7 - 2?", answer: 5 },
    { question: "What is 6 * 4?", answer: 24 },
    { question: "What is 12 / 3?", answer: 4 }
];

let currentQuestion = 0;  // Track the current question

// Load the current question
function loadQuestion() {
    const questionElement = document.getElementById('quiz-question');
    questionElement.textContent = questions[currentQuestion].question;
}

// Check the answer when the user submits
function checkAnswer() {
    const answer = document.getElementById('quiz-answer').value;
    const resultDiv = document.getElementById('quiz-result');
    const submitButton = document.getElementById('submit-btn');
    const parsedAnswer = parseInt(answer);

    if (isNaN(parsedAnswer)) {
        resultDiv.innerHTML = `<p>Please enter a valid number.</p>`;
        return;
    }

    if (parsedAnswer === questions[currentQuestion].answer) {
        score++;
        resultDiv.innerHTML = `<p>Correct!</p>`;
    } else {
        resultDiv.innerHTML = `<p>Incorrect. Try again.</p>`;
    }

    // Move to the next question
    currentQuestion = (currentQuestion + 1) % questions.length;
    loadQuestion();
    document.getElementById('score').textContent = `Score: ${score}`;

    // Disable the submit button temporarily
    submitButton.disabled = true;

    // Re-enable the submit button after 1 second (adjust the delay as necessary)
    setTimeout(() => {
        submitButton.disabled = false;
    }, 1000);  // Adjust delay as needed
}

// Initial question load when the page is first loaded
loadQuestion();

// Event listener for the submit button
document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent page reload on button click
    checkAnswer();
});
