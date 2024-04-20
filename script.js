function makeGraph(arr, id) {
  let conatiner = document.getElementById(id);
  let graphContainer = document.createElement("div");
  graphContainer.setAttribute("id", "graph");
  let yaxis = document.createElement("div");
  yaxis.setAttribute("class", "yaxis");
  yaxis.style.width = `${arr.length * 50}px `;
  graphContainer.setAttribute("class", "graphContaimer");
  for (let i = 0; i < arr.length; i++) {
    let outerChild = document.createElement("div");
    outerChild.style.height = `${arr[i].value * 50}px`;
    outerChild.style.backgroundColor = `${arr[i].bg}`;
    outerChild.setAttribute("class", "block");
    graphContainer.appendChild(outerChild);
  }
  conatiner.appendChild(graphContainer);
  conatiner.appendChild(yaxis);
}

function submitInput() {
  //checking whether it has child node or not if is there remove it and append new one
  const container = document.getElementById("brickandwater");
  if (container.hasChildNodes()) {
    const graphContainer = document.getElementById("graph");
    container.removeChild(graphContainer);
    const yaxis = document.getElementsByClassName("yaxis");
    container.removeChild(yaxis[0]);
  }

  const waterContainer = document.getElementById("waterContainer");

  if (waterContainer.hasChildNodes()) {
    const graphContainer = document.getElementById("graph");
    waterContainer.removeChild(graphContainer);
    const yaxis = document.getElementsByClassName("yaxis");
    waterContainer.removeChild(yaxis[0]);
  }

  //getting number from input element and convert in to number
  const inputVal = document.getElementById("input");
  const arr = inputVal.value.split("").map(Number);

  waterAndBricks(arr);
  maxWaterHold(arr);
  onlyWater(arr);
}

function waterAndBricks(arr) {
  let forwardCase = [];
  let reverseCase = [];
  let finalCase = [];
  let result = [];
  let prevValue = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      forwardCase.push(prevValue);
    } else {
      forwardCase.push("-");
      prevValue = arr[i];
    }
  }

  prevValue = 0;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == 0) {
      reverseCase[i] = prevValue;
    } else {
      reverseCase[i] = "-";
      prevValue = arr[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (forwardCase[i] == "-") {
      finalCase[i] = "-";
    } else {
      finalCase[i] =
        forwardCase[i] < reverseCase[i] ? forwardCase[i] : reverseCase[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      result.push({
        value: finalCase[i],
        bg: "aqua",
      });
    } else {
      result.push({
        value: arr[i],
        bg: "yellow",
      });
    }
  }
  makeGraph(result, "brickandwater");
  const brickElem = document.getElementById("bricks");
  brickElem.innerText = "Bricks with Water";
}

function maxWaterHold(arr) {
  let total = 0;
  let wallStart;
  let wallEnd;
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(arr[i]);
    if (wallStart && arr[i] === 0) {
      count++;
    }
    if (wallStart && arr[i] > 0) {
      wallEnd = arr[i];
      total += Math.min(wallStart, wallEnd) * count;
      count = 0;
      wallStart = wallEnd;
      wallEnd = undefined;
    }
    if (parseInt(arr[i]) > 0 && !wallStart) {
      wallStart = arr[i];
    }
  }

  const h2Elem = document.getElementById("total");
  h2Elem.innerText = `This input can contain ${total}`;
}

//Function for Onlywater
function onlyWater(arr) {
  let forwardCase = [];
  let reverseCase = [];
  let finalCase = [];
  let result = [];
  let prevValue = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      forwardCase.push(prevValue);
    } else {
      forwardCase.push("-");
      prevValue = arr[i];
    }
  }

  prevValue = 0;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == 0) {
      reverseCase[i] = prevValue;
    } else {
      reverseCase[i] = "-";
      prevValue = arr[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (forwardCase[i] == "-") {
      finalCase[i] = "-";
    } else {
      finalCase[i] =
        forwardCase[i] < reverseCase[i] ? forwardCase[i] : reverseCase[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      result.push({
        value: finalCase[i],
        bg: "aqua",
      });
    } else {
      result.push({
        value: 0,
        bg: "yellow",
      });
    }
  }

  makeGraph(result, "waterContainer");
  document.getElementById("water").innerText = "Only Water";
}
