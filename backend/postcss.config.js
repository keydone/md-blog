// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
    plugins: [
        require('postcss-units')({
            size:      75,
            fallback:  false,
            precision: 4,
        }),
        require('autoprefixer')(),
    ],
};
