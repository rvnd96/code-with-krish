// get minimum value from two numbers
function getMinimumValue(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return {
      status: 400,
      data: {
        error: "both values must be numbers",
      },
    };
  }
  return {
    status: 200,
    data: {
      min: Math.min(a, b),
    },
  };
}

// get the maximum value from a list
function getMaximumValue(numbers) {
  const stringArray = numbers.split(",");
  const numberArray = stringArray.map((number) => parseFloat(number));
  const maximumNumber = Math.max(...numberArray);

  if (isNaN(maximumNumber)) {
    return {
      status: 400,
      data: {
        error: "values must be numbers",
      },
    };
  }
  return {
    status: 200,
    data: {
      max: maximumNumber,
    },
  };
}

// get the average from a list
function getAverage(numbers) {
  const stringArray = numbers.split(",");
  const numberArray = stringArray.map((number) => parseFloat(number));
  const numberArrayLength = numberArray.length;
  let sum = 0;

  for (let i = 0; i < numberArray.length; i++) {
    sum += numberArray[i];
  }

  const average = sum / numberArrayLength;

  if (isNaN(sum) || isNaN(average)) {
    return {
      status: 400,
      data: {
        error: "All values must be a number",
      },
    };
  }

  return {
    status: 200,
    data: {
      numbersArray: numberArray,
      sumOfNumbersArray: sum,
      average: average,
    },
  };
}

// sort array
function sort(numbers, type) {
  const stringArray = numbers.split(",");
  const numberArray = stringArray.map((number) => parseFloat(number));
  console.log(numberArray);

  if (numberArray.some(isNaN)) {
    return {
      status: 400,
      data: {
        error: "Some values are not numbers",
      },
    };
  }

  if (type === "asc") {
    return {
      status: 200,
      data: {
        sortedArray: bubbleSort(numberArray, type),
      },
    };
  } else if (type === "desc") {
    return {
      status: 200,
      data: {
        sortedArray: bubbleSort(numberArray, type),
      },
    };
  } else {
    return {
      status: 400,
      data: {
        error: "Invalid type",
      },
    };
  }
}

function bubbleSort(arr, type) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (type === "asc") {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      } else if (type === "desc") {
        if (arr[j] < arr[j + 1]) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
  return arr;
}

// count occurrences
function countOccurrences(arr, searchTerm) {
  const stringArray = arr.split(",");
  let count = 0;
  for (let i = 0; i < stringArray.length; i++) {
    if (stringArray[i] === searchTerm) {
      count++;
    }
  }
  return {
    status: 200,
    data: {
        count: count,
    }
  };
}

module.exports = { getMinimumValue, getMaximumValue, getAverage, sort, countOccurrences };
