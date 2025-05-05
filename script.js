// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll to top button
const scrollIndicator = document.querySelector(".scroll-indicator");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollIndicator.classList.add("visible");
  } else {
    scrollIndicator.classList.remove("visible");
  }
});

scrollIndicator.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1
  }
);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Animated counters for stats section
function animateCount(id, end, duration) {
  const el = document.getElementById(id);
  let start = 0;
  const increment = end / (duration / 16); // 16ms per frame
  function update() {
    start += increment;
    if (start < end) {
      el.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      el.textContent = end.toLocaleString();
    }
  }
  update();
}
// Trigger animation when stats section is in view
const statsSection = document.getElementById("stats");
let statsAnimated = false;
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          animateCount("websitesCount", 12, 1200); // Change 12 to your real number
          animateCount("visitorsCount", 75500, 1500); // Updated to match total from chart data
          // Draw the visitors chart
          const ctx = document.getElementById("visitorsChart").getContext("2d");
          new Chart(ctx, {
            type: "line",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                {
                  label: "Visitors",
                  data: [500, 1200, 2100, 3400, 4200, 6000, 7200, 8500, 9200, 10500, 11800, 12500],
                  borderColor: "#cbdee7",
                  backgroundColor: "rgba(203,222,231,0.15)",
                  pointBackgroundColor: "#cbdee7",
                  pointBorderColor: "#fff",
                  pointRadius: 5,
                  fill: true,
                  tension: 0.4
                }
              ]
            },
            options: {
              responsive: true,
              layout: {
                padding: isMobile() ? { left: 10, right: 30 } : 0
              },
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  backgroundColor: "#23242a",
                  titleColor: "#fff",
                  bodyColor: "#cbdee7",
                  callbacks: {
                    label: function(context) {
                      return `Visitors: ${context.raw.toLocaleString()}`;
                    }
                  }
                }
              },
              scales: {
                x: {
                  ticks: { 
                    color: "#a8a9bc",
                    font: { size: isMobile() ? 10 : 14 }
                  },
                  grid: { color: "rgba(76,110,245,0.05)" }
                },
                y: {
                  ticks: { 
                    color: "#a8a9bc",
                    font: { size: isMobile() ? 10 : 14 },
                    callback: function(value) {
                      return value >= 1000 ? (value/1000).toFixed(1) + 'k' : value;
                    }
                  },
                  grid: { color: "rgba(76,110,245,0.05)" }
                }
              }
            }
          });
          statsAnimated = true;
        }
      });
    },
    { threshold: 0.3 }
  );
  statsObserver.observe(statsSection);
}

// Chart for client before/after results
const clientResultsSection = document.getElementById("results-testimonials");
let clientChartDrawn = false;
if (clientResultsSection) {
  const clientChartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !clientChartDrawn) {
          const ctx = document
            .getElementById("clientResultsChart")
            .getContext("2d");
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ["Alex", "Taylor", "Morgan"],
              datasets: [
                {
                  label: "Before",
                  data: [1200, 800, 950],
                  backgroundColor: "rgba(203,222,231,0.5)",
                  borderRadius: 8
                },
                {
                  label: "After",
                  data: [2600, 2100, 2000],
                  backgroundColor: "rgba(203,222,231,0.7)",
                  borderRadius: 8
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: "#a8a9bc", font: { weight: "bold" } }
                },
                tooltip: {
                  backgroundColor: "#23242a",
                  titleColor: "#fff",
                  bodyColor: "#cbdee7"
                }
              },
              scales: {
                x: {
                  ticks: { color: "#a8a9bc" },
                  grid: { color: "rgba(76,110,245,0.05)" }
                },
                y: {
                  ticks: { color: "#a8a9bc" },
                  grid: { color: "rgba(76,110,245,0.05)" }
                }
              }
            }
          });
          clientChartDrawn = true;
        }s
      });
    },
    { threshold: 0.3 }
  );
  clientChartObserver.observe(clientResultsSection);
}

// Testimonial carousel
const testimonials = [
  {
    name: "Alex (Client)",
    color: "#2563eb",
    review: '"Great service! The website exceeded my expectations. Communication was clear and timely."'
  },
  {
    name: "Taylor (Client)",
    color: "#5EA972",
    review: '"Amazing work! Attention to detail and responsiveness made the experience stress-free."'
  },
  {
    name: "Morgan (Client)",
    color: "#E06FA3",
    review: '"Excellent experience! The final product looked fantastic and was delivered on time."'
  }
];

let testimonialIndex = 0;

function fadeContent(wrapperSelector, newContent, className = "") {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;
  const current = wrapper.querySelector("div:not(.fade-out)");
  if (current) {
    current.classList.add("fade-out");
    setTimeout(() => {
      current.remove();
    }, 600);
  }
  const newDiv = document.createElement("div");
  newDiv.innerHTML = newContent;
  if (className) newDiv.classList.add(className);
  newDiv.classList.add("fade-in");
  wrapper.appendChild(newDiv);
}

function updateTestimonial(index) {
  const t = testimonials[index];
  // Avatar icon fade only
  const avatar = document.getElementById("testimonialAvatar");
  if (avatar) {
    const icon = avatar.querySelector("i");
    if (icon) {
      icon.style.opacity = 0;
      setTimeout(() => {
        avatar.style.background = t.color;
        icon.style.opacity = 1;
      }, 600);
    } else {
      avatar.style.background = t.color;
    }
  }
  // Name
  fadeContent(".testimonial-title-wrapper", t.name, "testimonial-title");
  // Remove subtitle rendering
  fadeContent(
    ".testimonial-subtitle-wrapper",
    "",
    "testimonial-subtitle"
  );
  // Review
  fadeContent(".testimonial-feature-wrapper", t.review);
}

// Initial render
updateTestimonial(testimonialIndex);

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  updateTestimonial(testimonialIndex);
}, 3000);

// Helper for mobile detection
function isMobile() {
  return window.innerWidth < 769;
}
