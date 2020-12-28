

$(document).ready(() => {
    let i, $leftData, $rightData, leftDataNum, rightDataNum, leftWins = 0, rightWins = 0;
    let $leftTeamData = $(".left-team-data");
    let $rightTeamData = $(".right-team-data");
    let iterationNumber = $leftTeamData.length; 

    for (i = 0 ; i < iterationNumber ; i++ ) {
        $leftData = $($leftTeamData[i]);
        $rightData = $($rightTeamData[i]);
        leftDataNum = Number($leftData.text());
        rightDataNum = Number($rightData.text());

        if (leftDataNum > rightDataNum) {
            $leftData.addClass("winning-stat");
            leftWins ++;
        } else if (rightDataNum > leftDataNum) {
            $rightData.addClass("winning-stat");
            rightWins ++;
        }

    }

    

    $(".left-total-wins").append(leftWins);
    $(".right-total-wins").append(rightWins);


})