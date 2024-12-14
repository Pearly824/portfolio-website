// Web Development Projects

// Calculator
const calculatorDiv = document.getElementById('calculator');
calculatorDiv.innerHTML = `
    <input id="calc-input" type="text" placeholder="0" disabled>
    <div>
        <button onclick="calc('1')">1</button>
        <button onclick="calc('2')">2</button>
        <button onclick="calc('3')">3</button>
        <button onclick="operate('+')">+</button>
    </div>
    <div>
        <button onclick="calc('4')">4</button>
        <button onclick="calc('5')">5</button>
        <button onclick="calc('6')">6</button>
        <button onclick="operate('-')">-</button>
    </div>
    <div>
        <button onclick="calc('7')">7</button>
        <button onclick="calc('8')">8</button>
        <button onclick="calc('9')">9</button>
        <button onclick="operate('*')">*</button>
    </div>
    <div>
        <button onclick="calc('0')">0</button>
        <button onclick="clearCalc()">C</button>
        <button onclick="equals()">=</button>
        <button onclick="operate('/')">/</button>
    </div>
`;

// To-Do List
const todoAppDiv = document.getElementById('todo-app');
todoAppDiv.innerHTML = `
    <input id="todo-input" type="text" placeholder="Add a new task">
    <button onclick="addTodo()">Add</button>
    <ul id="todo-list"></ul>
`;

// Logic for Calculator and To-Do List
let currentCalc = '';
function calc(num) {
    currentCalc += num;
    document.getElementById('calc-input').value = currentCalc;
}
function operate(op) {
    currentCalc += ` ${op} `;
    document.getElementById('calc-input').value = currentCalc;
}
function clearCalc() {
    currentCalc = '';
    document.getElementById('calc-input').value = '';
}
function equals() {
    currentCalc = eval(currentCalc).toString();
    document.getElementById('calc-input').value = currentCalc;
}

// To-Do List Logic
function addTodo() {
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    if (input.value.trim()) {
        const listItem = document.createElement('li');
        listItem.textContent = input.value.trim();
        list.appendChild(listItem);
        input.value = '';
    }
}  

// Recipe Finder App - Fetching from Spoonacular API
function findRecipe() {
    const query = document.getElementById('recipe-search').value;
    const resultDiv = document.getElementById('recipe-results');
    const apiKey = 'ac6258ec2c1841f58ba4b1a716d17585';  // Replace with your Spoonacular API key

    if (query.trim()) {
        const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    let htmlContent = '<ul>';
                    data.results.forEach(recipe => {
                        htmlContent += `<li><a href="https://spoonacular.com/recipes/${recipe.title}-${recipe.id}" target="_blank">${recipe.title}</a></li>`;
                    });
                    htmlContent += '</ul>';
                    resultDiv.innerHTML = htmlContent;
                } else {
                    resultDiv.innerHTML = '<p>No recipes found. Try something else!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching recipe data:', error);
                resultDiv.innerHTML = '<p>Something went wrong. Please try again.</p>';
            });
    } else {
        resultDiv.innerHTML = '<p>Please enter a recipe name to search.</p>';
    }
}

// Weather Forecast App - Fetching from OpenWeatherMap API
function getWeather() {
    const city = document.getElementById('weather-search').value;
    const resultDiv = document.getElementById('weather-result');
    const apiKey = 'b62f22efb8a45ee0b9e5bfe73ca3f30e';  // Replace with your OpenWeatherMap API key

    if (city.trim()) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;

                    resultDiv.innerHTML = `
                        <p><strong>Weather in ${city}:</strong></p>
                        <p>${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Humidity: ${humidity}%</p>
                        <p>Wind Speed: ${windSpeed} m/s</p>
                    `;
                } else {
                    resultDiv.innerHTML = `<p>City not found. Please try again.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                resultDiv.innerHTML = '<p>Something went wrong. Please try again.</p>';
            });
    } else {
        resultDiv.innerHTML = '<p>Please enter a city name to check the weather.</p>';
    }
}




// Tutoring Projects (English Grammar Checker, Math Quiz)
function checkGrammar() {
    const inputText = document.getElementById('grammar-input').value;
    const resultDiv = document.getElementById('grammar-result');
    let errors = [];
    
    // Check for common errors
    const grammarRules = [
        { regex: /\s{2,}/, message: "Double spaces found." }, // Check for double spaces
        { regex: /\bi\b/g, message: "Use capital 'I' for the personal pronoun." }, // Capital 'I' in the sentence
        { regex: /their\s+there|there\s+their/, message: "Check the usage of 'their' and 'there'." }, // Confusing 'their' and 'there'
        { regex: /([a-zA-Z])\.\s([a-zA-Z])/g, message: "Ensure there is only one space after a period." }, // Double space after period
    ];
    
    grammarRules.forEach(rule => {
        if (rule.regex.test(inputText)) {
            errors.push(rule.message);
        }
    });
    
    if (errors.length > 0) {
        resultDiv.innerHTML = `<p>Grammar Issues Found:</p><ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`;
    } else {
        resultDiv.innerHTML = '<p>Grammar looks fine!</p>';
    }
}

let score = 0;

const questions = [
    { question: "What is 5 + 3?", answer: 8 },
    { question: "What is 7 - 2?", answer: 5 },
    { question: "What is 6 * 4?", answer: 24 },
    { question: "What is 12 / 3?", answer: 4 },
];

let currentQuestion = 0;

function loadQuestion() {
    const questionElement = document.getElementById('math-question');
    questionElement.textContent = questions[currentQuestion].question;
}

function checkMathAnswer() {
    const answer = document.getElementById('math-answer').value;
    const resultDiv = document.getElementById('math-result');
    
    if (parseInt(answer) === questions[currentQuestion].answer) {
        score++;
        resultDiv.innerHTML = `<p>Correct!</p>`;
    } else {
        resultDiv.innerHTML = `<p>Incorrect. Try again.</p>`;
    }
    
    currentQuestion = (currentQuestion + 1) % questions.length;
    loadQuestion();
    document.getElementById('math-score').textContent = `Score: ${score}`;
}

loadQuestion(); // Initial question load
