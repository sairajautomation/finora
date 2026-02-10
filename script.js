/* NAVIGATION */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const navMenu = document.getElementById("navMenu");
const menuToggleBtn = document.getElementById("menuToggleBtn");

// Mobile Toggle functionality
menuToggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show"); // Close mobile menu when a link is clicked
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
    window.scrollTo(0, 0);
  });
});

/* DARK MODE */
document.body.classList.add("dark");
document.getElementById("themeToggle").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});

/* BLOGS */
const BLOG_API_URL = "https://script.google.com/macros/s/AKfycbyQ9vfflC6XdZJnz29w63pwoOLT5og6dbR_qrgiK7djSCnrtZnn-3SEopdB2Juy-5eO7w/exec";

fetch(BLOG_API_URL)
  .then(res => res.json())
  .then(data => {
    const blogList = document.getElementById("blogList");
    blogList.innerHTML = "";
    const grouped = {};
    data.forEach(item => {
      if (!grouped[item.title]) grouped[item.title] = [];
      grouped[item.title].push(item);
    });

    Object.keys(grouped).forEach(title => {
      const blogItem = document.createElement("div");
      blogItem.className = "blog-item";
      
      // FIX: .replace(/\n/g, '<br>') added to entry.content to handle Sheets line breaks
      const subsHTML = grouped[title].map(entry => `
        <div class="sub-item">
          <div class="sub-title"><span>${entry.subtitle}</span><span class="sub-plus">+</span></div>
          <div class="sub-content"><p>${entry.content.replace(/\n/g, '<br>')}</p></div>
        </div>`).join("");

      blogItem.innerHTML = `
        <div class="blog-title"><span>${title}</span><span class="plus">+</span></div>
        <div class="blog-content">${subsHTML}</div>`;
      blogList.appendChild(blogItem);
    });
    initAccordions();
  });

function initAccordions() {
  document.querySelectorAll(".blog-title, .sub-title").forEach(btn => {
    btn.onclick = () => {
      const content = btn.nextElementSibling;
      const plus = btn.querySelector(".plus, .sub-plus");
      const isVisible = content.style.display === "block";
      
      const parent = btn.parentElement.parentElement;
      parent.querySelectorAll(btn.classList.contains('blog-title') ? '.blog-content' : '.sub-content').forEach(c => {
        if(c !== content) c.style.display = 'none';
      });

      content.style.display = isVisible ? "none" : "block";
      plus.innerText = isVisible ? "+" : "−";
    };
  });
}

/* CALCULATORS */
function calculateSIP() {
  const monthly = Number(document.getElementById("sipAmount").value);
  const rate = Number(document.getElementById("sipRate").value) / 100 / 12;
  const years = Number(document.getElementById("sipYears").value);
  const months = years * 12;
  const investedAmount = monthly * months;
  let totalValue = 0;
  for (let i = 0; i < months; i++) { 
    totalValue = (totalValue + monthly) * (1 + rate); 
  }
  const estReturns = totalValue - investedAmount;
  document.getElementById("sipResult").innerHTML = `
    Invested Amount: ₹${Math.round(investedAmount).toLocaleString('en-IN')}<br>
    Est. Returns: ₹${Math.round(estReturns).toLocaleString('en-IN')}<br>
    Total Value: ₹${Math.round(totalValue).toLocaleString('en-IN')}
  `;
}

function calculateInterest() {
  const p = Number(document.getElementById("principal").value);
  const r = Number(document.getElementById("rate").value);
  const t = Number(document.getElementById("time").value);
  const interest = (p * r * t) / 100;
  document.getElementById("interestResult").innerText = "Interest: ₹" + interest.toLocaleString('en-IN') + " | Total: ₹" + (p + interest).toLocaleString('en-IN');
}
