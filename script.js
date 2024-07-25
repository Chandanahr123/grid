class Customer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.points = 0;
        this.favorites = {
            drinks: [],
            music: ''
        };
    }
}

// Retrieve customer points
function getCustomerPoints(customerId) {
    const customer = JSON.parse(localStorage.getItem(customerId));
    return customer ? customer.points : 0;
}

// Update customer points
function updateCustomerPoints(customerId, points) {
    let customer = JSON.parse(localStorage.getItem(customerId));
    if (!customer) return;
    customer.points += points;
    localStorage.setItem(customerId, JSON.stringify(customer));
}

// Add a new customer
function addNewCustomer(id, name) {
    const newCustomer = new Customer(id, name);
    localStorage.setItem(id, JSON.stringify(newCustomer));
}

// Check if customer qualifies for a free drink
function checkForFreeDrink(customerId) {
    const customer = JSON.parse(localStorage.getItem(customerId));
    if (!customer) return;
    if (customer.points >= 100) {  // assuming 100 points for a free drink
        alert(`Congratulations ${customer.name}! You have earned a free drink.`);
        customer.points -= 100; // Reset points after redeeming
        localStorage.setItem(customerId, JSON.stringify(customer));
    }
}

// Fetch coffee specials from the server
async function fetchCoffeeSpecials() {
    try {
        const response = await fetch('https://api.thedailygrind.com/specials');
        const specials = await response.json();
        return specials;
    } catch (error) {
        console.error('Error fetching coffee specials:', error);
    }
}

// Display coffee specials on the website
async function displaySpecials() {
    const specials = await fetchCoffeeSpecials();
    const specialsContainer = document.getElementById('specials');
    specialsContainer.innerHTML = '';
    specials.forEach(special => {
        const specialElement = document.createElement('div');
        specialElement.innerHTML = `<h3>${special.name}</h3><p>${special.description}</p>`;
        specialsContainer.appendChild(specialElement);
    });
}

// Categorize customers based on their preferred drinks
function categorizeCustomers() {
    const allCustomers = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));
    const categories = {
        espressoLovers: [],
        teaEnthusiasts: [],
        // Add more categories as needed
    };

    allCustomers.forEach(customer => {
        if (customer.favorites.drinks.includes('espresso')) {
            categories.espressoLovers.push(customer);
        } else if (customer.favorites.drinks.includes('tea')) {
            categories.teaEnthusiasts.push(customer);
        }
        // Add more categorization logic as needed
    });

    return categories;
}

// Update customer's favorite drink
function updateCustomerDrink(customerId, drink) {
    let customer = JSON.parse(localStorage.getItem(customerId));
    if (!customer) return;
    customer.favorites.drinks.push(drink);
    localStorage.setItem(customerId, JSON.stringify(customer));
}

// Update customer's music genre preference
function updateCustomerMusicGenre(customerId, genre) {
    let customer = JSON.parse(localStorage.getItem(customerId));
    if (!customer) return;
    customer.favorites.music = genre;
    localStorage.setItem(customerId, JSON.stringify(customer));
}

// Example usage
addNewCustomer('001', 'John Doe');
updateCustomerPoints('001', 50);
updateCustomerDrink('001', 'espresso');
updateCustomerMusicGenre('001', 'jazz');
checkForFreeDrink('001');
displaySpecials();
console.log(categorizeCustomers());
