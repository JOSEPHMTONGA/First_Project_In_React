module.exports = {
	content: ['./src/**/*.{html,js,ts,jsx,tsx}'], // Adjust based on your file structure
	theme: {
	  extend: {
		colors: {
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  border: 'hsl(var(--border))',
		  // Add other colors here, e.g., card, primary, etc.
		},
	  },
	},
	plugins: [],
  };
  