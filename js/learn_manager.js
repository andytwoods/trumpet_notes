

function learn_manager(_vocab) {
    var api = {};
    var vocab = _vocab.map(function(el){
        el['score'] = 0;
        return el;
    });

    api._randomise_via_adding_small_val = function(val){
        return val + Math.random() * .001 + val;
    }

    api._hardest_to_easiest = function(my_list){
        return my_list.sort(function(el1, el2){
            return api._randomise_via_adding_small_val(el1.score) - api._randomise_via_adding_small_val(el2.score);
        })
    }

    function get_word(){

        var hardest_to_easiest = api._hardest_to_easiest(vocab);

        if(Math.random()>.75){ // let's make it easy 75% of the time
            return hardest_to_easiest[hardest_to_easiest.length-1]
        }
        return hardest_to_easiest[0];
    }

    function result_meta(word){
        return function(success){
            if(success) word += 1;
            else word -= 1;
        }
    }

    api.next = function(){

        var word = get_word();
        return {
            'word': word,
            'result': result_meta(word)
        }
    }


    // function play(){
    //     if(notes_fingers.length===0)return;
    //     var info = notes_fingers.pop();
    //     setTimeout(function(){
    //         clearNote(); addNote(info.note + '/' + info.octave);
    //         play();
    //
    //     }, 1000);
    // }
    // play();


    return api;
}