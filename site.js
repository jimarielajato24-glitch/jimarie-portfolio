const toolkit = document.querySelector(".toolkit");
const motionButton = toolkit.querySelector(".tool-motion");
const toolList = toolkit.querySelector(".tool-list");
const copy = toolList.cloneNode(true);
copy.classList.add("tool-list-copy");
copy.setAttribute("aria-hidden", "true");
toolList.after(copy);
toolkit.classList.add("has-tool-motion");
motionButton.hidden = false;

if ("IntersectionObserver" in window) {
  const observeToolkit = new IntersectionObserver(([entry]) => {
    toolkit.classList.toggle("tools-in-view", entry.isIntersecting);
  });
  observeToolkit.observe(toolkit);
} else {
  toolkit.classList.add("tools-in-view");
}

motionButton.addEventListener("click", () => {
  const paused = toolkit.classList.toggle("tools-paused");
  motionButton.firstChild.nodeValue = paused ? "Resume" : "Pause";
});

if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      entry.target.classList.add("art-in-view");
    }
  }, { threshold: 0.25 });
  document.querySelectorAll(".work-visual, .contact-art").forEach(art => reveal.observe(art));
}
