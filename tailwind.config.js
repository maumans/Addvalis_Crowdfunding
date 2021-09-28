const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
        minWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        maxWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        }
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            margin:["hover"],
            top:["hover"],
            inset:["hover"],
            transform:["hover"],
            fontSize:["hover","focus"],
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
