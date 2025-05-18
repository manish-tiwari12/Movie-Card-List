document.addEventListener('DOMContentLoaded', () => {
    // Movie data
    const movieData = {
        1: {
            title: "RRR",
            year: "2022",
            genre: "Action, Drama",
            rating: "8.8",
            description: "A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in the 1920s.",
            cast: "N.T. Rama Rao Jr., Ram Charan, Alia Bhatt, Ajay Devgn",
            director: "S.S. Rajamouli",
            image: "https://source.unsplash.com/300x450/?bollywood,movie"
        },
        2: {
            title: "Jawan",
            year: "2023",
            genre: "Action, Thriller",
            rating: "8.5",
            description: "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in society.",
            cast: "Shah Rukh Khan, Nayanthara, Vijay Sethupathi",
            director: "Atlee",
            image: "https://source.unsplash.com/300x450/?movie,india"
        },
        3: {
            title: "Ponniyin Selvan",
            year: "2022",
            genre: "Historical, Drama",
            rating: "8.2",
            description: "A historical drama based on the novel by Kalki Krishnamurthy, set in the Chola dynasty.",
            cast: "Vikram, Aishwarya Rai, Karthi, Jayam Ravi",
            director: "Mani Ratnam",
            image: "https://source.unsplash.com/300x450/?tamil,movie"
        },
        4: {
            title: "KGF: Chapter 2",
            year: "2022",
            genre: "Action, Drama",
            rating: "8.7",
            description: "The continuation of the story of Rocky, a young man who seeks power and wealth in the gold mines of Kolar.",
            cast: "Yash, Sanjay Dutt, Raveena Tandon",
            director: "Prashanth Neel",
            image: "https://source.unsplash.com/300x450/?malayalam,movie"
        },
        5: {
            title: "Pushpa: The Rise",
            year: "2021",
            genre: "Action, Crime",
            rating: "8.3",
            description: "A story about a laborer who rises through the ranks of a red sandalwood smuggling syndicate.",
            cast: "Allu Arjun, Rashmika Mandanna, Fahadh Faasil",
            director: "Sukumar",
            image: "https://source.unsplash.com/300x450/?telugu,movie"
        },
        6: {
            title: "Kantara",
            year: "2022",
            genre: "Action, Drama",
            rating: "8.9",
            description: "A story about a local demigod and a forest officer who face off in a battle of beliefs and traditions.",
            cast: "Rishab Shetty, Sapthami Gowda, Kishore",
            director: "Rishab Shetty",
            image: "https://source.unsplash.com/300x450/?kannada,movie"
        },
        7: {
            title: "Pathaan",
            year: "2023",
            genre: "Action, Thriller",
            rating: "8.4",
            description: "An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.",
            cast: "Shah Rukh Khan, Deepika Padukone, John Abraham",
            director: "Siddharth Anand",
            image: "https://source.unsplash.com/300x450/?bollywood,action"
        },
        8: {
            title: "Vikram",
            year: "2022",
            genre: "Action, Thriller",
            rating: "8.6",
            description: "A special agent investigates a murder case and uncovers a drug syndicate.",
            cast: "Kamal Haasan, Vijay Sethupathi, Fahadh Faasil",
            director: "Lokesh Kanagaraj",
            image: "https://source.unsplash.com/300x450/?tamil,action"
        }
    };

    // Load More Functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hiddenMovies = document.querySelectorAll('.movie-card.hidden');
    let currentIndex = 0;
    const moviesPerLoad = 4;

    loadMoreBtn.addEventListener('click', () => {
        const moviesToShow = Array.from(hiddenMovies).slice(currentIndex, currentIndex + moviesPerLoad);
        moviesToShow.forEach(movie => {
            movie.classList.remove('hidden');
        });
        currentIndex += moviesPerLoad;

        if (currentIndex >= hiddenMovies.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Modal Functionality
    const modal = document.getElementById('movieModal');
    const closeModal = document.querySelector('.close-modal');
    const movieCards = document.querySelectorAll('.movie-card');

    function openModal(movieId) {
        const movie = movieData[movieId];
        if (!movie) {
            console.error(`Movie data not found for ID: ${movieId}`);
            return;
        }

        // Update modal content
        const modalElements = {
            image: modal.querySelector('.modal-image img'),
            title: modal.querySelector('.modal-title'),
            year: modal.querySelector('.modal-year'),
            genre: modal.querySelector('.modal-genre'),
            rating: modal.querySelector('.modal-rating'),
            description: modal.querySelector('.modal-description'),
            cast: modal.querySelector('.cast-list'),
            director: modal.querySelector('.director-name')
        };

        modalElements.image.src = movie.image;
        modalElements.title.textContent = movie.title;
        modalElements.year.textContent = movie.year;
        modalElements.genre.textContent = movie.genre;
        modalElements.rating.innerHTML = `<i class="fas fa-star"></i> ${movie.rating}`;
        modalElements.description.textContent = movie.description;
        modalElements.cast.textContent = movie.cast;
        modalElements.director.textContent = movie.director;

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Add click event to all movie cards
    movieCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.like-btn')) {
                const movieId = card.dataset.movieId;
                if (movieId) {
                    openModal(movieId);
                } else {
                    console.error('Movie ID not found on card');
                }
            }
        });
    });

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Existing Like Button Functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            button.classList.toggle('active');
            button.classList.add('animate');
            
            setTimeout(() => {
                button.classList.remove('animate');
            }, 300);
            
            const movieCard = button.closest('.movie-card');
            const movieTitle = movieCard.querySelector('h3').textContent;
            const isLiked = button.classList.contains('active');
            
            const likes = JSON.parse(localStorage.getItem('movieLikes') || '{}');
            likes[movieTitle] = isLiked;
            localStorage.setItem('movieLikes', JSON.stringify(likes));
        });
    });
    
    // Restore like states
    const likes = JSON.parse(localStorage.getItem('movieLikes') || '{}');
    likeButtons.forEach(button => {
        const movieTitle = button.closest('.movie-card').querySelector('h3').textContent;
        if (likes[movieTitle]) {
            button.classList.add('active');
        }
    });

    // Add click event to movie cards
    movieCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add a subtle click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}); 