# Personal Website

A modern, dark-themed personal website built with vanilla HTML, CSS, and JavaScript. No build tools or frameworks required.

## Features

- Clean, modern dark theme design
- Responsive layout that works on all devices
- Smooth scrolling navigation
- Fade-in animations for content sections
- Professional timeline layout for experience
- Easy to update and maintain

## Structure

```
.
├── index.html      # Main HTML file with all content
├── styles.css      # All styling and dark theme
├── script.js       # Interactive features and animations
└── img/            # Directory for images
    └── me.jpg      # Profile photo (add your own)
```

## Getting Started

1. Add your profile photo to the `img/` directory as `me.jpg`
2. Open `index.html` in a web browser to view locally
3. To deploy, simply upload all files to your web hosting

## Updating Content

All content is in `index.html`. To update:

- **Personal info**: Edit the hero section with your name and tagline
- **About text**: Modify the content in the `#about` section
- **Experience**: Add/edit timeline items in the `#experience` section
- **Education**: Update the `#education` section
- **Contact**: Change email and social links in the `#contact` section

## Customizing the Theme

Colors and styling are defined in `styles.css` using CSS variables at the top:

```css
:root {
    --bg-primary: #0f1419;
    --bg-secondary: #1a1f2e;
    --accent-primary: #58a6ff;
    /* ... etc */
}
```

Simply adjust these values to change the entire color scheme.

## Deployment

This is a static site, so you can deploy it anywhere:

- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

Just upload the files and point your domain to the hosting location.

## Browser Support

Works on all modern browsers including:
- Chrome/Edge
- Firefox
- Safari
- Opera

## License

Feel free to use this template for your own personal website.
