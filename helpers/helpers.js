function generateRandomNumberInRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prepareFlyPosition(screenWidth, screenHeight) {

    //console.log('I am here')

    let flyWidthRange = screenWidth - 50;
    //console.log('flyWidthRange: ' + flyWidthRange)
    let flyHeightRangeBottom = screenHeight - (screenHeight / 3);
    //console.log('flyHeightRangeBottom' + flyHeightRangeBottom)
    let flyHeightRangeTop = screenHeight - flyHeightRangeBottom;
    //console.log('flyHeightRangeTop' + flyHeightRangeTop)

    let flyPositionX = generateRandomNumberInRange(0, flyWidthRange);
    //console.log('flyPositionX' + flyPositionX)
    let flyPositionY = generateRandomNumberInRange(flyHeightRangeBottom, flyHeightRangeTop);
    //console.log('flyPositionY' + flyPositionY)

    let flyPosition = [flyPositionX, flyPositionY];
    //console.log('flyPosition' + flyPosition)

    return flyPosition;
}

//This function generates the random number in range 0 - 1
//and if number is 1 than Stork decided to go down 
//and catch the frog
function doesStorkGoDown() {
    let decision =  generateRandomNumberInRange(0,1);

    if (decision === 1){
        return true
    }
    else {
        return false
    }
}

export {prepareFlyPosition, doesStorkGoDown};