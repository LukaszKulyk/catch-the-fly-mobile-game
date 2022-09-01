const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = 'highScores';

function checkHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
    const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;//add here lenght maybe??
    
    //new way to find last score
    //const lenghOfHighScores = highScores.length;
    //const lowestScore = highScores[lenghOfHighScores - 1]
          
    if (score > lowestScore) {
      //console.log("Let's start saving new High Score")
      saveHighScore(score, highScores); // TODO
      //showHighScores(); // TODO
      //console.log(localStorage.getItem(HIGH_SCORES))
    }

}

function saveHighScore(score, highScores) {

    const name = 'Lukasz';
    const newScore = {score, name};
    //console.log("New score to be saved: " + newScore.name + ' ' + newScore.score)

    //Add to the list
    highScores.push(newScore);
    //console.log("Current array of scores (push): " + highScores.name + ' ' + highScores.score)

    //Sort the list
    highScores.sort((a, b) => b.score - a.score);
    //console.log("Current array of scores (sort): " + highScores.name + ' ' + highScores.score)

    //Select new list
    highScores.splice(NO_OF_HIGH_SCORES);
    //console.log("Current array of scores (splice): " + highScores.name + ' ' + highScores.score)

    //Save to local storage
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}

export {checkHighScore, saveHighScore};