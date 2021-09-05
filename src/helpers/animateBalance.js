export function animateBalance(targetEl, start, end, duration) {
  const element = document.getElementById(targetEl);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    if (element)
      element.innerHTML = (progress * (end - start) + start).toFixed(2);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
//   animateBalance(obj, 100, 0, 5000);
