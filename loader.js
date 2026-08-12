(function () {
    const script = document.createElement('script');

    script.src =
        'https://mathews-marketing.github.io/plaza-dental-arts/chatbot.js?cb='
        + Date.now();

    script.defer = true;

    document.head.appendChild(script);
})();
