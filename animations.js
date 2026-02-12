// ============================================
// SCROLL ANIMATIONS & INTERACTIONS
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for fade-in animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");

        // Stagger reveal for children that have data-anim
        const revealables = entry.target.querySelectorAll("[data-anim]");
        if (revealables && revealables.length) {
          revealables.forEach((el, idx) => {
            const delay = idx * 90; // 90ms stagger
            el.classList.add("reveal");
            el.style.setProperty("--reveal-delay", delay + "ms");
            // Use timeout to add visible class so transition-delay works
            setTimeout(() => el.classList.add("visible"), delay + 20);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Parallax effect for hero section (optimized with requestAnimationFrame)
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    let latestKnownScrollY = 0;
    let ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        latestKnownScrollY = window.pageYOffset;
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const heroImage = heroSection.querySelector(".hero-image");
            if (heroImage) {
              heroImage.style.transform = `translate3d(0, ${latestKnownScrollY * 0.5}px, 0)`;
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  // Button ripple effect
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Card hover tilt effect
  document.querySelectorAll(".expertise-card, .media-item").forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Scroll progress indicator
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Add a visual indicator if needed
    document.documentElement.style.setProperty(
      "--scroll-percent",
      scrollPercent + "%",
    );
  });

  // Counter animation for stats
  const statsSection = document.querySelector(".about-stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("animated")
          ) {
            animateCounters();
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(statsSection);
  }

  function animateCounters() {
    document.querySelectorAll(".stat-number").forEach((stat) => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = Math.ceil(target / 30);

      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          stat.textContent =
            target + (stat.textContent.includes("+") ? "+" : "");
        } else {
          stat.textContent =
            current + (stat.textContent.includes("+") ? "+" : "");
          setTimeout(updateCounter, 30);
        }
      };

      updateCounter();
    });
  }

  // Text reveal animation on hover
  document.querySelectorAll(".section-title").forEach((title) => {
    title.addEventListener("mouseenter", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);
    });
  });

  // Navigation highlight on scroll
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  window.addEventListener("scroll", function () {
    let current = "";

    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Lazy load images with fade animation
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "0";
          img.style.transition = "opacity 0.6s ease";

          const checkImageLoad = () => {
            if (img.complete) {
              img.style.opacity = "1";
            } else {
              img.addEventListener("load", () => {
                img.style.opacity = "1";
              });
            }
          };

          checkImageLoad();
          observer.unobserve(img);
        }
      });
    },
    { threshold: 0.1 },
  );

  images.forEach((img) => imageObserver.observe(img));

  // Mobile menu toggle if needed
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
    });
  }
});

// Reduce motion for accessibility
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty("--transition-fast", "0ms");
  document.documentElement.style.setProperty("--transition-base", "0ms");
  document.documentElement.style.setProperty("--transition-slow", "0ms");
}
