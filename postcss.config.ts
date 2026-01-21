export default {
  plugins: {
    "@tailwindcss/postcss": {},
    'postcss-preset-env': {
      stage: 2, // Use moderately stable features
      features: {
        'nesting-rules': true, // Enable CSS nesting
        'custom-media-queries': true, // Enable custom @media
        'custom-properties': false, // Don't transform CSS variables (we want them!)
      },
      autoprefixer: {
        flexbox: 'no-2009', // Only use modern flexbox
        grid: 'autoplace', // Enable IE Grid support with -ms- prefix
      },
    },
    'autoprefixer': {},
  },
}
