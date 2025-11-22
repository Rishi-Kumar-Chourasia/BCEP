document.addEventListener("DOMContentLoaded", function() {
    document.documentElement.classList.add('loading');
    document.body.classList.add('loading');
    
    const startTime = Date.now();

    window.addEventListener('load', function() {
        const loadTime = Date.now() - startTime;
        const minWaitTime = 1000; 
        const waitTime = Math.max(0, minWaitTime - loadTime);

        setTimeout(() => {
            document.documentElement.classList.remove('loading');
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, waitTime);
    });
});

