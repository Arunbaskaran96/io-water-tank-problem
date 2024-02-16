//Generate Input Function
function generateInput() {
  let input = document.getElementById("input");
  input.value = "0400060640";
}

//Submit Handler
function submitHandler() {
  let input = document.getElementById("input");
  if (!input.value) {
    alert("Enter valid input");
  } else {
    let arr = input.value.split("");
    waterAndBricks(arr);
    onlyWater(arr);
    maxWaterHold(arr);
  }
}

//function for find maximum amount of water can hold
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
  let totalSum = document.getElementById("totalSum");
  totalSum.innerText = `This input can contain ${total}`;
}

//Function for BricksWithWater
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

  let maximum = Math.max(...arr);
  for (let i = 0; i < result.length; i++) {
    createRow(i, maximum, result, "brickwithwater");
  }
  document.getElementById("heading1").innerText = "Bricks with Water";
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

  let maximum = Math.max(...arr);
  for (let i = 0; i < result.length; i++) {
    createRow(i, maximum, result, "onlywater");
  }
  document.getElementById("heading2").innerText = "Only Water";
}

//Creating DOM
function createRow(index, maximum, result, id) {
  let container = document.getElementById(id);
  let rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "rowContainer");
  let emptySpace = maximum - result[index].value;
  for (let i = 0; i < emptySpace; i++) {
    let child = document.createElement("div");
    child.setAttribute("class", "child");
    child.style.height = "50px";
    child.style.width = "50px";
    rowContainer.appendChild(child);
  }
  for (let i = emptySpace; i < maximum; i++) {
    let child = document.createElement("div");
    child.setAttribute("class", "child");
    child.style.height = "50px";
    child.style.width = "50px";
    child.style.backgroundColor = result[index].bg;
    rowContainer.appendChild(child);
  }
  container.appendChild(rowContainer);
}
