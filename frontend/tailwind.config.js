/** @type {import('tailwindcss').Config} */
import * as flowbite from "flowbite-react/tailwind";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js", flowbite.content()],
    theme: {
        extend: {}
    },
    plugins: ["flowbite/plugin", flowbite.plugin()]
};
