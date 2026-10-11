document.addEventListener('DOMContentLoaded', function() {
    console.log('ShipDecKK Website Scripts Loaded');
    
    initNavigation();
    initInquiryButtons();
    initServiceButtons();
    initSubscriptionForm();
    initGalleryFilters();
    initScrollAnimations();
});

function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.link a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'Homepage.html')) {
            link.classList.add('active');
        }
        
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initInquiryButtons() {
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    
    if (inquireButtons.length > 0) {
        inquireButtons.forEach(button => {
            button.addEventListener('click', function() {
                const shipCard = this.closest('.ship-card');
                const yachtName = shipCard.querySelector('h3').textContent;
                const yachtPrice = shipCard.querySelector('.price').textContent;
                
                showInquiryModal(yachtName, yachtPrice);
            });
        });
    }
}

function showInquiryModal(yachtName, yachtPrice) {
    const modal = document.createElement('div');
    modal.className = 'inquiry-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Inquire About ${yachtName}</h3>
            <p>Price: ${yachtPrice}</p>
            <form id="inquiryForm">
                <div class="form-group">
                    <label for="inq-name">Full Name:</label>
                    <input type="text" id="inq-name" name="name" required placeholder="Your full name">
                </div>
                <div class="form-group">
                    <label for="inq-email">Email:</label>
                    <input type="email" id="inq-email" name="email" required placeholder="Your email address">
                </div>
                <div class="form-group">
                    <label for="inq-phone">Phone Number:</label>
                    <input type="tel" id="inq-phone" name="phone" placeholder="Your phone number">
                </div>
                <div class="form-group">
                    <label for="inq-message">Message:</label>
                    <textarea id="inq-message" name="message" rows="4" placeholder="Tell us about your interest in this yacht"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn submit-inquiry">Submit Inquiry</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        .inquiry-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateY(20px);
            transition: transform 0.3s ease;
        }
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .close-modal:hover {
            color: #003366;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
    }, 10);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeInquiryModal(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeInquiryModal(modal);
        }
    });
    
    const form = modal.querySelector('#inquiryForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('#inq-name').value;
        const email = form.querySelector('#inq-email').value;
        
        if (name && email) {
            form.innerHTML = `
                <div class="success-message">
                    <h3>Thank You!</h3>
                    <p>Your inquiry about ${yachtName} has been received. Our team will contact you shortly.</p>
                    <button class="btn close-success">Close</button>
                </div>
            `;
            
            const closeSuccessBtn = form.querySelector('.close-success');
            closeSuccessBtn.addEventListener('click', () => {
                closeInquiryModal(modal);
            });
            
            console.log('Inquiry submitted for:', yachtName, {
                name,
                email,
                phone: form.querySelector('#inq-phone').value,
                message: form.querySelector('#inq-message').value
            });
        }
    });
}

function closeInquiryModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    if (serviceButtons.length > 0) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.closest('.service-card').querySelector('h3').textContent;
                alert(`You've selected our ${serviceName} service. Please visit our Subscription page to get in touch with our experts.`);
            });
        });
    }
}

function initSubscriptionForm() {
    const subscriptionForm = document.getElementById('subscriptionForm');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const age = document.getElementById('age').value;
            const newsletter = document.getElementById('newsletter').value;
            
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            if (!email || !email.includes('@')) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (!password || password.length < 6) {
                isValid = false;
                errorMessage += 'Password must be at least 6 characters.\n';
            }
            
            if (!age || age < 18) {
                isValid = false;
                errorMessage += 'You must be at least 18 years old.\n';
            }
            
            if (!newsletter) {
                isValid = false;
                errorMessage += 'Please select a newsletter frequency.\n';
            }
            
            if (isValid) {
                const formSection = document.querySelector('.form-section');
                const originalContent = formSection.innerHTML;
                
                formSection.innerHTML = `
                    <div class="success-message">
                        <h2>Subscription Successful!</h2>
                        <p>Thank you, ${name}, for subscribing to our ${newsletter} newsletter.</p>
                        <p>We've sent a confirmation email to ${email}.</p>
                        <button id="backBtn" class="btn">Back to Home</button>
                    </div>
                `;
                
                document.getElementById('backBtn').addEventListener('click', function() {
                    window.location.href = './Homepage.html';
                });
                
                console.log('Subscription submitted:', {
                    name,
                    email,
                    password,
                    age,
                    newsletter
                });
            } else {
                alert(errorMessage);
            }
        });
    }
}

function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const shipCards = document.querySelectorAll('.ship-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                shipCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

function initScrollAnimations() {
    const typeCards = document.querySelectorAll('.type-card');
    if (typeCards.length > 0) {
        window.addEventListener('scroll', function() {
            typeCards.forEach(card => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (cardPosition < screenPosition) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        });
        
        typeCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
    
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        window.addEventListener('scroll', function() {
            serviceCards.forEach((card, index) => {
                const cardPosition = card.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.1;
                
                if (cardPosition < screenPosition) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150); 
                }
            });
        });
        
        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    window.dispatchEvent(new Event('scroll'));
}

function initLightbox() {
    const shipImages = document.querySelectorAll('.ship-card img');
    
    if (shipImages.length > 0) {
        shipImages.forEach(image => {
            image.style.cursor = 'pointer';
            
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const imgSrc = this.getAttribute('src');
                const shipName = this.closest('.ship-card').querySelector('h3').textContent;
                
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${imgSrc}" alt="${shipName}">
                        <h3>${shipName}</h3>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                const style = document.createElement('style');
                style.textContent = `
                    .lightbox {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.9);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .lightbox-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .lightbox-content img {
                        max-width: 100%;
                        max-height: 80vh;
                        border: 3px solid white;
                    }
                    .lightbox-content h3 {
                        color: white;
                        text-align: center;
                        margin-top: 1rem;
                    }
                    .close-lightbox {
                        position: absolute;
                        top: -40px;
                        right: 0;
                        font-size: 2rem;
                        color: white;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);
                
                const closeBtn = lightbox.querySelector('.close-lightbox');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(lightbox);
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initLightbox();
});

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav.link');
        const header = document.querySelector('header');
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-toggle';
        toggleBtn.innerHTML = '☰';
        
        header.insertBefore(toggleBtn, nav);
        
        const style = document.createElement('style');
        style.textContent = `
            .mobile-toggle {
                display: block;
                background: transparent;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                margin: 0 auto;
            }
            
            @media (max-width: 768px) {
                nav.link {
                    display: none;
                    flex-direction: column;
                    width: 100%;
                    margin-top: 1rem;
                }
                
                nav.link.show {
                    display: flex;
                }
                
                nav.link a {
                    width: 80%;
                    margin: 0.3rem auto;
                }
            }
        `;
        document.head.appendChild(style);
        
        toggleBtn.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
});