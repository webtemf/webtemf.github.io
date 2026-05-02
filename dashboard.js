document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    const progressFills = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => {
        progressObserver.observe(fill);
    });

    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(valueEl => {
        const finalValue = valueEl.textContent;
        if (!isNaN(parseInt(finalValue))) {
            const target = parseInt(finalValue);
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                valueEl.textContent = Math.floor(current);
            }, 30);
        }
    });
});
