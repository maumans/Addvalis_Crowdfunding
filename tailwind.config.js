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
            'xs':"1px",
            'sm': '640px',
            'md': '1024px',

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
            width: ['group-hover'],
            height: ['group-hover'],
            translate: ['group-hover'],

        },
    },

    plugins: [require('@tailwindcss/forms')],
};
