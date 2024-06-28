// const body = document.querySelector('body');

// const p = document.createElement("p"); 
// p.textContent = "Hi I'm red";
// p.style.color = 'red';
// body.appendChild(p);


// const h3 = document.createElement("h3");
// h3.textContent = "I'm a blue h3!";
// h3.style.color = 'blue';
// body.appendChild(h3);


// const div = document.createElement("div");
// div.style.border = '1px solid black';
// div.style.backgroundColor = 'pink';
// const h1 = document.createElement("h1");
// h1.textContent = "I'm a div";
// p2 = document.createElement("p");
// p2.textContent = "Me too!";
// div.appendChild(h1);
// div.appendChild(p2);
// body.appendChild(div);

const buttons = document.querySelectorAll("button");

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener("click", () => {
    alert(button.id);
  });
});