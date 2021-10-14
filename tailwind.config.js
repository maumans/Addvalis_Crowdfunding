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
            width:{
                "w-50-p":"50vw",
                "w-30-p":"30vw"
            }
        },
        screens: {
            'xs': {'min': '0px', 'max': '639px'},
            ...defaultTheme.screens,
        },
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
