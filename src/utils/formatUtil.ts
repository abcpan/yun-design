export function scrollAnimation(ele: any, to: number, duration: number) {
  if (duration <= 0) {
    ele.scrollLeft = to;
    return;
  }
  const diff = to - ele.scrollLeft;
  const tick = (diff / duration) * 16;
  requestAnimationFrame(() => {
    ele.scrollLeft += tick;
    if (ele.scrollLeft == to) { return }
    scrollAnimation(ele, to, duration - 16);
  })
}