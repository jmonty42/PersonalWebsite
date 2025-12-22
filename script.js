// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .social-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Change navbar background on scroll
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 20, 25, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 20, 25, 0.95)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe experience items and other content
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    const educationItem = document.querySelector('.education-item');
    if (educationItem) {
        educationItem.style.opacity = '0';
        educationItem.style.transform = 'translateY(20px)';
        educationItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(educationItem);
    }

    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(20px)';
        aboutContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutContent);
    }

    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        contactContent.style.opacity = '0';
        contactContent.style.transform = 'translateY(20px)';
        contactContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactContent);
    }

    // PDF Modal Viewer
    const modal = document.getElementById('resume-modal');
    const resumeLinks = document.querySelectorAll('.resume-link');
    const closeBtn = document.querySelector('.modal-close');
    const canvas = document.getElementById('pdf-canvas');
    const ctx = canvas.getContext('2d');

    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    const scale = 1.5;

    // Configure PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Render PDF page
    function renderPage(num) {
        pageRendering = true;
        pdfDoc.getPage(num).then(function(page) {
            const viewport = page.getViewport({scale: scale});
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            const renderTask = page.render(renderContext);
            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });

        document.getElementById('page-num').textContent = num;

        // Update button states
        document.getElementById('prev-page').disabled = (num <= 1);
        document.getElementById('next-page').disabled = (num >= pdfDoc.numPages);
    }

    // Queue page render
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    // Previous page
    document.getElementById('prev-page').addEventListener('click', function() {
        if (pageNum <= 1) return;
        pageNum--;
        queueRenderPage(pageNum);
    });

    // Next page
    document.getElementById('next-page').addEventListener('click', function() {
        if (pageNum >= pdfDoc.numPages) return;
        pageNum++;
        queueRenderPage(pageNum);
    });

    // Open modal and load PDF
    resumeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Load PDF
            pdfjsLib.getDocument('resume.pdf').promise.then(function(pdf) {
                pdfDoc = pdf;
                document.getElementById('page-count').textContent = pdf.numPages;
                pageNum = 1;
                renderPage(pageNum);
            }).catch(function(error) {
                console.error('Error loading PDF:', error);
                alert('Error loading PDF: ' + error.message);
            });
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
