const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
let xValue = 0,
  yValue = 0;
  let rotateDegree =0;
  function update (cursorPosition){
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
    
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;
        el.style.transform = `rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${-xValue * speedx}px))
         translateY(calc(-50% + ${yValue * speedy}px))
       perspective(2300px)  translateZ(${zValue *speedz}px)`;
      });
  }
  update(0);
window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  
  rotateDegree = (xValue / (window.innerWidth / 2))* 20 ;

 update(e.clientX);
});
if ( window.innerWidth >=725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
    
}
else {
    main.style.maxHeight = `${window.innerHeight * 1.6}px`;
}

/* GSAP Animasyon*/
let timeline = gsap.timeline();
Array.from(parallax_el)
.filter(el => !el.classList.contains("text"))
.forEach((el) =>{
    timeline.from(el,{
        top:`${el.offsetHeight
         / 2 + el.dataset.distance}px`,
        duration: 2.5, 
    },
    "1"
    );
})


