const transformOR = document.querySelector(".transformOnResize");
const when1244 = 0.96;
const when992 = (647 - 15) / 900;
// when1244
// width 900
// outer 958 (958-900 = 58 > margin is 29px eachside)
// when922
// therefore widht have to 647

// outer 705
// to acheve this scal has to be 0.8477777777777777777 (900/763)
//15 is correction for some reason ther is some error

const when992_ = 0.975;
const when800 = 0.775;
const c = {
  m: -(when992 - when1244) / (1244 - 1000),
  b: -(1244 * (when992 - when1244)) / (1244 - 1000) - when1244,
};
const c2 = {
  m: -(when800 - when992_) / (992 - 800),
  b: -(992 * (when800 - when992_)) / (992 - 800) - when992_,
};
let width = window.innerWidth;
const onscale = () => {
  width = window.innerWidth;
  if (width > 1244) {
    transformOR.style.transform = "";
    transformOR.style.width = "";
  } else if (width <= 1244 && width > 992) {
    transformOR.style.transform = `scale(${width * c.m - c.b})`;
    transformOR.style.width = "";
  } else if (width <= 992) {
    transformOR.style.transform = `scale(${width * c2.m - c2.b})`;
    transformOR.style.width = "86vw";
  }
};
window.addEventListener("resize", onscale);
onscale();

window.addEventListener("load", () => {
  const embed = document.querySelector("embed");
  embed.style.height = `${
    window.frames[0].document.querySelector(".pdf").offsetHeight + 100
  }px`;
  console.log("hello");
  console.log();
  window.frames[0].addEventListener("load", () => {
    console.log(window.frames[0].document.querySelector(".pdf").offsetHeight);
  });
});
