export default {
  plugins: {
    "@tailwindcss/postcss": {},
    'postcss-preset-env': {
      stage: 3, // Bump to Stage 3 for better production stability
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'custom-properties': false,
      },
      autoprefixer: {
        flexbox: 'no-2009',
        // backdrop-filter often requires prefixes in Safari, 
        grid: 'autoplace',
        remove: false,
      },
    },
  },
}
