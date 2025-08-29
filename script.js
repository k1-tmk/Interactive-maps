// Tokyo Temples Map Application
// This is a complete web application that displays temples and shrines in Tokyo on an interactive map
// It demonstrates modern JavaScript concepts including classes, event handling, DOM manipulation, and API usage

// Main class that manages the entire application
// Using ES6 class syntax for better organization and object-oriented programming
class TokyoTemplesMap {
    // Constructor function - runs when a new instance of the class is created
    // Initializes all the properties that will be used throughout the application
    constructor() {
        // Store reference to the Leaflet map object (will be created later)
        this.map = null;
        
        // Array to store all temple data objects
        this.temples = [];
        
        // Array to store all map marker objects for easy management
        this.markers = [];
        
        // Track which filter is currently active (default: show all temples)
        this.currentFilter = 'all';
        
        // Store the current search term entered by user
        this.searchTerm = '';
        
        // Call the init method to start the application
        this.init();
    }

    // Main initialization method that sets up all components
    // This is called automatically when the class is instantiated
    init() {
        // Step 1: Create and configure the interactive map
        this.initializeMap();
        
        // Step 2: Load temple data into the application
        this.loadTempleData();
        
        // Step 3: Set up event listeners for user interactions
        this.setupEventListeners();
        
        // Step 4: Display the list of temples in the sidebar
        this.renderTempleList();
    }

    // Method to create and configure the Leaflet map
    // Leaflet is a popular open-source JavaScript library for interactive maps
    initializeMap() {
        // Create a new Leaflet map instance
        // L.map() creates a new map object
        // 'map' is the ID of the HTML div where the map will be displayed
        // setView() sets the initial center coordinates and zoom level
        // [35.6762, 139.6503] are the latitude and longitude coordinates for central Tokyo
        // 11 is the zoom level (higher numbers = more zoomed in)
        this.map = L.map('map').setView([35.6762, 139.6503], 11);
        
        // Add map tiles (the actual map images) from OpenStreetMap
        // L.tileLayer() creates a layer of map tiles
        // The URL pattern {s}, {z}, {x}, {y} are placeholders that Leaflet fills in automatically
        // {s} = server (a, b, c), {z} = zoom level, {x} and {y} = tile coordinates
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors', // Required attribution for OpenStreetMap
            maxZoom: 18 // Maximum zoom level allowed
        }).addTo(this.map); // Add the tile layer to our map

        // Optional: Add a custom event listener for when the map loads
        // This can be used for additional styling or functionality
        this.map.on('load', () => {
            // When map loads, make it fully visible (useful for loading animations)
            document.querySelector('#map').style.opacity = '1';
        });
    }

    // Method to load temple data into the application
    // This data could also come from an external API or database
    loadTempleData() {
        // Define an array of temple objects, each containing detailed information
        // This is a static data structure - in a real application, this might come from a database
        this.temples = [
            // Temple 1: Senso-ji - Tokyo's oldest temple
            {
                id: 1, // Unique identifier for each temple
                name: "Senso-ji Temple", // English name
                japanese: "浅草寺", // Japanese name in kanji
                type: "buddhist", // Religious type (used for filtering and styling)
                category: "famous", // Category for additional filtering
                coordinates: [35.7148, 139.7967], // [latitude, longitude] for map positioning
                address: "2-3-1 Asakusa, Taito City, Tokyo", // Physical address
                description: "Tokyo's oldest temple, founded in 628 AD. Famous for its massive red lantern and traditional atmosphere.",
                history: "According to legend, two fishermen found a statue of Kannon (goddess of mercy) in the Sumida River. The temple was built to enshrine this statue.",
                highlights: ["Thunder Gate (Kaminarimon)", "Five-story Pagoda", "Traditional shopping street (Nakamise)"], // Array of key features
                bestTime: "Early morning or evening for fewer crowds" // Travel tip
            },
            
            // Temple 2: Meiji Shrine - Dedicated to Emperor Meiji
            {
                id: 2,
                name: "Meiji Shrine",
                japanese: "明治神宮",
                type: "shinto", // Shinto shrine (different from Buddhist temple)
                category: "famous",
                coordinates: [35.6762, 139.6993], // Different coordinates for different location
                address: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
                description: "A Shinto shrine dedicated to Emperor Meiji and Empress Shoken, surrounded by a lush forest.",
                history: "Built in 1920, the shrine was destroyed during WWII and rebuilt in 1958. The surrounding forest was planted with 100,000 trees donated from all over Japan.",
                highlights: ["Torii gates", "Forest walking paths", "Traditional wedding ceremonies"],
                bestTime: "Early morning for peaceful atmosphere"
            },
            
            // Temple 3: Zojo-ji - Tokugawa family temple
            {
                id: 3,
                name: "Zojo-ji Temple",
                japanese: "増上寺",
                type: "buddhist",
                category: "famous",
                coordinates: [35.6574, 139.7494],
                address: "4-7-35 Shibakoen, Minato City, Tokyo",
                description: "The main temple of the Jodo-shu (Pure Land) sect, located near Tokyo Tower.",
                history: "Founded in 1393, it was moved to its current location in 1598 by Tokugawa Ieyasu. It served as the family temple of the Tokugawa shoguns.",
                highlights: ["Tokyo Tower views", "Garden with cherry blossoms", "Historical artifacts"],
                bestTime: "Spring for cherry blossoms"
            },
            
            // Temple 4: Hie Shrine - Historic Shinto shrine
            {
                id: 4,
                name: "Hie Shrine",
                japanese: "日枝神社",
                type: "shinto",
                category: "famous",
                coordinates: [35.6734, 139.7364],
                address: "2-10-5 Nagatacho, Chiyoda City, Tokyo",
                description: "A historic Shinto shrine known for its Sanno Matsuri festival and beautiful architecture.",
                history: "Founded in 1478, it was moved to its current location in 1657. The shrine is dedicated to Oyamakui-no-kami, the god of Mount Hiei.",
                highlights: ["Sanno Matsuri festival", "Traditional architecture", "Peaceful atmosphere"],
                bestTime: "Weekdays for quiet visits"
            },
            
            // Temple 5: Kanda Myojin - Famous for Kanda Matsuri
            {
                id: 5,
                name: "Kanda Myojin Shrine",
                japanese: "神田明神",
                type: "shinto",
                category: "famous",
                coordinates: [35.7015, 139.7675],
                address: "2-16-2 Sotokanda, Chiyoda City, Tokyo",
                description: "A Shinto shrine with over 1,300 years of history, famous for its Kanda Matsuri festival.",
                history: "Founded in 730 AD, it was moved to its current location in 1616. The shrine is dedicated to three deities: Daikokuten, Ebisu, and Taira no Masakado.",
                highlights: ["Kanda Matsuri festival", "Traditional architecture", "Cultural events"],
                bestTime: "During festivals for cultural experience"
            }
        ];

        // After loading the data, create map markers for each temple
        this.addTempleMarkers();
    }

    // Method to create and add map markers for each temple
    // This converts the temple data into visual markers on the map
    addTempleMarkers() {
        // Loop through each temple in the temples array
        // forEach is a modern JavaScript method that executes a function for each array element
        this.temples.forEach(temple => {
            // Get the appropriate icon for this temple type
            // Different temple types get different colored markers
            const icon = this.getMarkerIcon(temple.type);
            
            // Create a new Leaflet marker
            // L.marker() creates a clickable marker at the specified coordinates
            // temple.coordinates contains [latitude, longitude]
            // { icon: icon } sets the custom icon for this marker
            const marker = L.marker(temple.coordinates, { icon: icon })
                .bindPopup(this.createPopupContent(temple)) // Attach a popup with temple info
                .addTo(this.map); // Add the marker to our map

            // Store a reference to the temple data in the marker object
            // This allows us to access temple info when the marker is clicked
            marker.templeData = temple;
            
            // Add the marker to our markers array for easy management
            this.markers.push(marker);

            // Add a click event listener to the marker
            // When clicked, show detailed temple information in a modal
            marker.on('click', () => {
                this.showTempleModal(temple);
            });
        });
    }

    // Method to create custom marker icons based on temple type
    // This gives visual distinction between different types of religious sites
    getMarkerIcon(type) {
        // Define color scheme for different temple types
        // Using an object to map temple types to specific colors
        const iconColors = {
            buddhist: '#8B4513', // Brown for Buddhist temples
            shinto: '#DC143C',   // Red for Shinto shrines
            famous: '#FFD700'    // Gold for famous sites
        };

        // Create a custom Leaflet icon using L.divIcon()
        // divIcon allows us to create custom HTML-based markers instead of default images
        return L.divIcon({
            className: 'custom-marker', // CSS class for styling
            // HTML content for the marker - creates a colored circle
            // Using template literals (backticks) for string interpolation
            html: `<div style="background-color: ${iconColors[type] || '#666'}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],     // Size of the icon in pixels [width, height]
            iconAnchor: [10, 10]    // Point of the icon that corresponds to the marker's location
        });
    }

    // Method to create popup content for map markers
    // This shows basic temple info when hovering over or clicking a marker
    createPopupContent(temple) {
        // Return HTML string for the popup
        // Using template literals to insert temple data dynamically
        return `
            <div class="popup-content">
                <h3>${temple.name}</h3>
                <p><strong>${temple.japanese}</strong></p>
                <p>${temple.description}</p>
                <p><em>Click for more details</em></p>
            </div>
        `;
    }

    // Method to set up all event listeners for user interactions
    // Event listeners wait for user actions and execute code when they happen
    setupEventListeners() {
        // Get reference to the search input field
        const searchInput = document.getElementById('searchInput');
        
        // Add input event listener to search box
        // 'input' event fires every time the user types or deletes text
        searchInput.addEventListener('input', (e) => {
            // Store the current search term in lowercase for case-insensitive searching
            this.searchTerm = e.target.value.toLowerCase();
            
            // Call filterTemples to update the display based on search
            this.filterTemples();
        });

        // Get all filter buttons (All Temples, Buddhist, Shinto, Famous)
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Add click event listener to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove 'active' class from all buttons first
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add 'active' class to the clicked button
                e.target.classList.add('active');
                
                // Update the current filter based on the button's data-filter attribute
                this.currentFilter = e.target.dataset.filter;
                
                // Apply the filter to update the display
                this.filterTemples();
            });
        });

        // Get references to modal elements
        const modal = document.getElementById('templeModal');
        const closeBtn = document.querySelector('.close');
        
        // Add click event to close button (X) in modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none'; // Hide the modal
        });

        // Add click event to window to close modal when clicking outside
        window.addEventListener('click', (e) => {
            // If the clicked element is the modal background (not the content)
            if (e.target === modal) {
                modal.style.display = 'none'; // Hide the modal
            }
        });
    }

    // Method to filter temples based on search term and current filter
    // This is the core logic for the search and filter functionality
    filterTemples() {
        // Use Array.filter() to create a new array with only matching temples
        const filteredTemples = this.temples.filter(temple => {
            // Check if temple matches the search term
            // Search in name, Japanese name, and description
            const matchesSearch = temple.name.toLowerCase().includes(this.searchTerm) ||
                                temple.japanese.toLowerCase().includes(this.searchTerm) ||
                                temple.description.toLowerCase().includes(this.searchTerm);
            
            // Check if temple matches the current filter
            // 'all' shows everything, otherwise check type or category
            const matchesFilter = this.currentFilter === 'all' || 
                                temple.type === this.currentFilter ||
                                temple.category === this.currentFilter;

            // Return true only if temple matches BOTH search AND filter
            return matchesSearch && matchesFilter;
        });

        // Update the map and sidebar with filtered results
        this.updateMapMarkers(filteredTemples);
        this.renderTempleList(filteredTemples);
        this.updateTempleCount(filteredTemples.length);
    }

    // Method to update map markers based on filtered results
    // This shows/hides markers to match the current search and filter
    updateMapMarkers(filteredTemples) {
        // Remove all existing markers from the map
        this.markers.forEach(marker => {
            marker.remove(); // Leaflet method to remove marker
        });

        // Clear the markers array
        this.markers = [];
        
        // Create new markers for the filtered temples
        filteredTemples.forEach(temple => {
            // Create marker with appropriate icon
            const icon = this.getMarkerIcon(temple.type);
            const marker = L.marker(temple.coordinates, { icon: icon })
                .bindPopup(this.createPopupContent(temple))
                .addTo(this.map);

            // Store temple data and add to markers array
            marker.templeData = temple;
            this.markers.push(marker);

            // Add click event to show temple details
            marker.on('click', () => {
                this.showTempleModal(temple);
            });
        });
    }

    // Method to render the temple list in the sidebar
    // This creates the clickable list items that show temple information
    renderTempleList(temples = this.temples) {
        // Get reference to the temple list container
        const templeList = document.getElementById('templeList');
        
        // Clear existing content
        templeList.innerHTML = '';

        // Loop through temples and create list items
        temples.forEach(temple => {
            // Create a new div element for this temple
            const templeItem = document.createElement('div');
            
            // Add CSS class for styling
            templeItem.className = 'temple-item';
            
            // Set the HTML content using template literals
            templeItem.innerHTML = `
                <h4>${temple.name}</h4>
                <p>${temple.japanese}</p>
                <p>${temple.address}</p>
                <span class="temple-type">${temple.type}</span>
            `;

            // Add click event to the list item
            templeItem.addEventListener('click', () => {
                // Show detailed temple information
                this.showTempleModal(temple);
                
                // Center the map on this temple's location
                // setView() moves the map to new coordinates and zoom level
                this.map.setView(temple.coordinates, 16);
            });

            // Add the temple item to the list
            templeList.appendChild(templeItem);
        });
    }

    // Method to update the temple count display
    // Shows how many temples are currently visible
    updateTempleCount(count) {
        // Get the count element and update its text content
        document.getElementById('templeCount').textContent = `${count} temples`;
    }

    // Method to show detailed temple information in a modal popup
    // This creates a comprehensive view of temple details
    showTempleModal(temple) {
        // Get references to modal elements
        const modal = document.getElementById('templeModal');
        const modalContent = document.getElementById('modalContent');

        // Create HTML content for the modal using template literals
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${temple.name}</h2>
                <p>${temple.japanese}</p>
                <span class="temple-type-badge">${temple.type}</span>
            </div>
            <div class="modal-body">
                <div class="highlight">
                    <strong>Description:</strong> ${temple.description}
                </div>
                <p><strong>Address:</strong> ${temple.address}</p>
                <p><strong>History:</strong> ${temple.history}</p>
                <p><strong>Highlights:</strong></p>
                <ul>
                    ${temple.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
                <p><strong>Best Time to Visit:</strong> ${temple.bestTime}</p>
            </div>
        `;

        // Show the modal by changing its display style
        modal.style.display = 'block';
    }
}

// Event listener that waits for the HTML document to fully load
// This ensures all DOM elements exist before running our JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Create a new instance of our TokyoTemplesMap class
    // This starts the entire application
    new TokyoTemplesMap();
});

// Add custom CSS styles for the map markers
// This ensures the custom markers display correctly
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        background: transparent;
        border: none;
    }
`;
// Append the style element to the document head
document.head.appendChild(style);
