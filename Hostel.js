// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (for future mobile responsiveness)
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(mobileMenuToggle);
    
    // Registration Form Validation
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // In a real app, you would send this data to your server
            alert('Registration successful! Redirecting to login...');
            window.location.href = 'login.html';
        });
    }
    
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would validate credentials with your server
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'index.html';
        });
    }
    
    // Payment Method Toggle
    const paymentOptions = document.querySelectorAll('.payment-option');
    if (paymentOptions.length > 0) {
        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                paymentOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Show the corresponding form
                const method = this.getAttribute('data-method');
                document.querySelectorAll('#paymentForm, #creditCardForm, #bankTransferForm').forEach(form => {
                    form.style.display = 'none';
                });
                document.querySelector(`.${method}-form`).style.display = 'block';
            });
        });
    }
    
    // Payment Form Submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Payment successful! Thank you for your booking.');
            window.location.href = 'index.html';
        });
    }
    
    // Star Rating in Reviews
    const stars = document.querySelectorAll('.star-rating i');
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                const starContainer = this.parentElement;
                
                // Update star display
                starContainer.querySelectorAll('i').forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
                
                // Update hidden input value
                document.getElementById('review-rating').value = rating;
            });
        });
    }
    
    // Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const rating = document.getElementById('review-rating').value;
            if (rating === '0') {
                alert('Please select a rating');
                return;
            }
            
            alert('Thank you for your review!');
            this.reset();
            
            // Reset stars
            document.querySelectorAll('.star-rating i').forEach(star => {
                star.classList.remove('active', 'fas');
                star.classList.add('far');
            });
            document.getElementById('review-rating').value = '0';
        });
    }
    
    // Hostel Filter in Gallery
    const hostelFilter = document.getElementById('hostel-filter');
    const roomTypeFilter = document.getElementById('room-type-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (hostelFilter && roomTypeFilter && galleryItems.length > 0) {
        function filterGallery() {
            const selectedHostel = hostelFilter.value;
            const selectedRoomType = roomTypeFilter.value;
            
            galleryItems.forEach(item => {
                const hostel = item.getAttribute('data-hostel');
                const roomType = item.getAttribute('data-room');
                
                const hostelMatch = selectedHostel === 'all' || hostel === selectedHostel;
                const roomTypeMatch = selectedRoomType === 'all' || roomType === selectedRoomType;
                
                if (hostelMatch && roomTypeMatch) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        hostelFilter.addEventListener('change', filterGallery);
        roomTypeFilter.addEventListener('change', filterGallery);
    }
    
    // Hostel Filter in Reviews
    const hostelSelect = document.getElementById('hostel-select');
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (hostelSelect && reviewCards.length > 0) {
        hostelSelect.addEventListener('change', function() {
            const selectedHostel = this.value;
            
            reviewCards.forEach(card => {
                const hostel = card.getAttribute('data-hostel');
                
                if (selectedHostel === 'all' || hostel === selectedHostel) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Reservation Form Updates
    const roomTypeSelect = document.getElementById('room-type');
    const durationSelect = document.getElementById('duration');
    const selectedRoom = document.getElementById('selected-room');
    const selectedDuration = document.getElementById('selected-duration');
    const totalPrice = document.getElementById('total-price');
    
    if (roomTypeSelect && durationSelect) {
        function updateReservationSummary() {
            const roomType = roomTypeSelect.value || 'Not selected';
            const duration = durationSelect.value || 'Not selected';
            
            // Update displayed values
            selectedRoom.textContent = roomType === 'Not selected' ? roomType : 
                                      roomType.charAt(0).toUpperCase() + roomType.slice(1) + ' Room';
            selectedDuration.textContent = duration === 'Not selected' ? duration : 
                                          duration === 'semester' ? 'One Semester' :
                                          duration === 'year' ? 'Academic Year' : 'Short Term (1-3 months)';
            
            // Calculate price (simplified for demo)
            if (roomType && duration) {
                let price = 0;
                
                if (roomType === 'single') {
                    price = duration === 'semester' ? 250000 : 
                            duration === 'year' ? 450000 : 100000;
                } else if (roomType === 'shared') {
                    price = duration === 'semester' ? 150000 : 
                            duration === 'year' ? 280000 : 60000;
                } else if (roomType === 'apartment') {
                    price = duration === 'semester' ? 400000 : 
                            duration === 'year' ? 750000 : 180000;
                }
                
                totalPrice.textContent = 'XAF ' + price.toLocaleString();
            } else {
                totalPrice.textContent = 'XAF 0';
            }
        }
        
        roomTypeSelect.addEventListener('change', updateReservationSummary);
        durationSelect.addEventListener('change', updateReservationSummary);
    }
    
    // Hostel Selection in Reservation
    const hostelOptions = document.querySelectorAll('.hostel-option');
    if (hostelOptions.length > 0) {
        hostelOptions.forEach(option => {
            option.addEventListener('click', function() {
                hostelOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Add fade-in animation to elements
    const animateElements = document.querySelectorAll('.featured-hostels, .how-it-works, .registration-form, .login-form, .payment-section, .gallery-section, .reservation-section, .reviews-section, .contact-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});