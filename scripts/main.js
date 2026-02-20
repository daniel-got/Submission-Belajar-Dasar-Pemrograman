/**
 * TechPulse — Blog Teknologi & Digital
 * scripts/main.js
 */

/* ---- NAV TOGGLE (Mobile Hamburger) ---- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---- ACTIVE NAV LINK (Scroll Spy) ---- */
const sections = document.querySelectorAll(
  "main[id], section[id], article[id]",
);
const navAnchors = document.querySelectorAll('.nav-link[href^="#"]');

const observerOptions = { rootMargin: "-30% 0px -60% 0px" };

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach((s) => sectionObserver.observe(s));

/* ---- NEWSLETTER FORM ---- */
const newsletterBtn = document.querySelector(".newsletter-btn");
const newsletterInput = document.querySelector(".newsletter-input");

if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener("click", () => {
    const email = newsletterInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      shakeInput(newsletterInput);
      showToast("Masukkan alamat email kamu terlebih dahulu.", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      shakeInput(newsletterInput);
      showToast("Format email tidak valid.", "error");
      return;
    }

    newsletterInput.value = "";
    newsletterBtn.textContent = "✓ Berhasil!";
    newsletterBtn.style.backgroundColor = "#4caf50";
    showToast(`Email ${email} berhasil didaftarkan! 🎉`, "success");

    setTimeout(() => {
      newsletterBtn.textContent = "Langganan";
      newsletterBtn.style.backgroundColor = "";
    }, 3000);
  });

  newsletterInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") newsletterBtn.click();
  });
}

function shakeInput(el) {
  el.style.animation = "shake 0.4s ease";
  el.addEventListener(
    "animationend",
    () => {
      el.style.animation = "";
    },
    { once: true },
  );
}

/* ---- TOAST NOTIFICATION ---- */
function showToast(message, type = "info") {
  // Remove existing toast
  const existing = document.getElementById("tp-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "tp-toast";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;

  const colors = {
    success: "#4caf50",
    error: "#f44336",
    info: "#4fc3f7",
  };

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    background: colors[type] || colors.info,
    color: "#fff",
    padding: "0.85rem 1.5rem",
    borderRadius: "8px",
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "0.82rem",
    fontWeight: "600",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    zIndex: "9999",
    transform: "translateY(20px)",
    opacity: "0",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    maxWidth: "320px",
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    });
  });

  setTimeout(() => {
    toast.style.transform = "translateY(20px)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ---- INJECT SHAKE ANIMATION ---- */
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ---- SMOOTH SCROLL OFFSET (sticky nav) ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = document.querySelector(".site-nav")?.offsetHeight || 60;
    const top =
      target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

/* ---- READ TIME DISPLAY ---- */
const articleBody = document.querySelector(".article__body");
const readTimeEl = document.querySelector(".article__read-time");

if (articleBody && readTimeEl) {
  const wordCount = articleBody.innerText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  readTimeEl.textContent = `⏱ ${minutes} menit baca`;
}

/* ---- BACK TO TOP ---- */
const backToTop = document.createElement("button");
backToTop.textContent = "↑";
backToTop.setAttribute("aria-label", "Kembali ke atas");
Object.assign(backToTop.style, {
  position: "fixed",
  bottom: "2rem",
  left: "2rem",
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  background: "rgba(245, 166, 35, 0.15)",
  border: "1px solid rgba(245, 166, 35, 0.4)",
  color: "#f5a623",
  fontSize: "1.1rem",
  cursor: "pointer",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "9998",
  transition: "all 0.2s",
  fontFamily: "inherit",
});

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

backToTop.addEventListener("mouseenter", () => {
  backToTop.style.background = "#f5a623";
  backToTop.style.color = "#0d0f14";
});

backToTop.addEventListener("mouseleave", () => {
  backToTop.style.background = "rgba(245, 166, 35, 0.15)";
  backToTop.style.color = "#f5a623";
});

console.log(
  "%cTechPulse 🔸 Blog Teknologi & Digital",
  "color: #f5a623; font-size: 14px; font-weight: bold;",
);
console.log(
  "%cDibuat dengan HTML, CSS, dan JavaScript Vanilla",
  "color: #4fc3f7; font-size: 11px;",
);
