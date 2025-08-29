# Tokyo Temples Map 🗾⛩️

A beautiful, interactive web application built with Leaflet.js to explore and discover temples and shrines throughout Tokyo, Japan.

## ✨ Features

- **Interactive Map**: Explore Tokyo temples using Leaflet.js with OpenStreetMap tiles
- **Comprehensive Temple Database**: 10+ major temples and shrines with detailed information
- **Smart Filtering**: Filter temples by type (Buddhist, Shinto) and category (Famous)
- **Search Functionality**: Search temples by name, Japanese characters, or description
- **Detailed Information**: Click on any temple for comprehensive details including history, highlights, and visiting tips
- **Responsive Design**: Beautiful, modern UI that works on desktop and mobile devices
- **Cultural Information**: Learn about Japanese religious sites with historical context

## 🗺️ Included Temples

### Famous Temples
- **Senso-ji Temple** (浅草寺) - Tokyo's oldest temple
- **Meiji Shrine** (明治神宮) - Dedicated to Emperor Meiji
- **Zojo-ji Temple** (増上寺) - Tokugawa family temple
- **Hie Shrine** (日枝神社) - Historic Shinto shrine
- **Kanda Myojin Shrine** (神田明神) - Famous for Kanda Matsuri

### Buddhist Temples
- **Gokoku-ji Temple** (護国寺) - Peaceful garden temple
- **Fukagawa Fudo Temple** (深川不動堂) - Fire rituals temple
- **Tsukiji Hongan-ji Temple** (築地本願寺) - Unique Indian architecture

### Shinto Shrines
- **Yasukuni Shrine** (靖国神社) - Historical significance
- **Tomioka Hachiman Shrine** (富岡八幡宮) - Sumo wrestling history

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for map tiles and external resources)

### Installation & Usage

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Explore** the map and temples!

### Alternative: Local Server (Recommended)

For the best experience, run a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎯 How to Use

### Map Navigation
- **Zoom**: Use mouse wheel or +/- buttons
- **Pan**: Click and drag to move around
- **Click Markers**: View temple information and details

### Search & Filter
- **Search Box**: Type to search temple names, Japanese characters, or descriptions
- **Filter Buttons**: 
  - All Temples: Show all locations
  - Buddhist: Buddhist temples only
  - Shinto: Shinto shrines only
  - Famous: Famous and popular sites

### Temple Information
- **Sidebar List**: Browse all temples with basic info
- **Click Temple**: Opens detailed modal with comprehensive information
- **Map Markers**: Color-coded by temple type
  - 🟤 Brown: Buddhist temples
  - 🔴 Red: Shinto shrines
  - 🟡 Gold: Famous sites

## 🛠️ Technical Details

### Built With
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Map tiles and data
- **Vanilla JavaScript** - No frameworks required
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic markup

### Architecture
- **Object-Oriented Design** - Clean, maintainable code
- **Event-Driven** - Responsive user interactions
- **Responsive Layout** - CSS Grid and Flexbox
- **Progressive Enhancement** - Works without JavaScript

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Features

- **Desktop**: Full layout with sidebar and map
- **Tablet**: Responsive grid layout
- **Mobile**: Stacked layout optimized for touch

## 🎨 Customization

### Adding More Temples
Edit the `temples` array in `script.js`:

```javascript
{
    id: 11,
    name: "New Temple Name",
    japanese: "新しい寺院名",
    type: "buddhist", // or "shinto"
    category: "famous", // or "buddhist", "shinto"
    coordinates: [35.6762, 139.6503], // [latitude, longitude]
    address: "Temple address",
    description: "Temple description",
    history: "Historical information",
    highlights: ["Highlight 1", "Highlight 2"],
    bestTime: "Best time to visit"
}
```

### Styling Changes
- Modify `styles.css` for visual changes
- Update color schemes in the CSS variables
- Customize marker icons in `getMarkerIcon()` function

## 🌟 Future Enhancements

- [ ] Add more temples and shrines
- [ ] Include temple photos and galleries
- [ ] Add directions and transportation info
- [ ] Implement user reviews and ratings
- [ ] Add seasonal event information
- [ ] Include virtual tours
- [ ] Add offline map support
- [ ] Implement bookmarking system

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding more temples and shrines
- Improving the UI/UX
- Adding new features
- Fixing bugs
- Improving documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **OpenStreetMap** contributors for map data
- **Leaflet.js** team for the mapping library
- **Font Awesome** for beautiful icons
- **Japanese culture** and spiritual heritage

## 📞 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ for exploring Tokyo's spiritual heritage**

*Discover the ancient temples and shrines that make Tokyo a city of both modern innovation and deep cultural tradition.*
