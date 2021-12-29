
function assert(test, bool){
    if(!bool) throw('failed test: ' + test)
    else{
        console.log('passed test: ' + test)
    }
}

function test_learn_manager(){
    var lm = learn_manager([]);
    var outcome = lm._hardest_to_easiest([{'name': '1', 'score': 1},
        {'name': '2', 'score': 2}, {'name': '3', 'score': 3}])
    assert('learn manager hardest to easiest function',
        outcome[0].score < outcome[1].score < outcome[2].score);

    // testing random sort when equal score
    // if there is NO randomisation, we expect there always to be fixed order
    // therefore, one item will ALWAYS have rank 1, therefore score 10.
    var scores = {'1': 0, '2': 0, '3': 0}
    var checks = 10;
    for(var i=0;i<checks;i++){
        var outcome = lm._hardest_to_easiest([{'name': '1', 'score': 1},
            {'name': '2', 'score': 1}, {'name': '3', 'score': 1}]);
        var rank = 1;
        for(var ob of outcome){
            scores[ob['name']] += rank;
            rank++;
        }
    }

    assert('learn manager hardest to easiest function, but randomises when equal val',
        scores['1'] > checks &&  scores['2'] > checks &&  scores['3'] > checks);

}

test_learn_manager();