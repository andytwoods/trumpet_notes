window.addEventListener("load", main);

function main() {

    notation_manager();
    spectrum_manager();

    var vocab, learn, elements;
    elements = elements_manager();

    setup_learn_params(setup);

    function setup(learning_type, learning_level) {
        vocab = generate_vocab(learning_type, learning_level);
        learn = learn_manager(vocab);
        console.log('Started learning environment with learning style: ' + learning_type);
        run_trial();
    }

    function run_trial(prev_trial) {
        var trial = learn.next();

        // avoiding 2 identical trials in a row...
        while(prev_trial && trial.word.id===prev_trial.word.id){
            trial = learn.next();
        }

        var word = trial.word;
        switch(trial.word.learn_type){
            case NAMES_TO_NOTES:
                elements.display_requirements([]);
                break;
            case NOTES_TO_NAMES:
                elements.display_requirements([elements.SHEET_MUSIC, elements.NOTE_BUTTONS]);
                addNote(word.note + '/' + word.octave);
                elements.NOTE_BUTTONS.answer = function(response){
                    elements.NOTE_BUTTONS.answer = undefined;
                    var correct = word.note === response;
                    var dur = correct? 800:1000;
                    var col_class = correct?'correct-key':'wrong-key';
                    elements.NOTE_BUTTONS.flare(word.note, col_class, dur, function(){
                        trial.result(correct);
                        run_trial(trial);
                    });
                }
                break;
            case NOTES_TO_VALVES:
                elements.display_requirements([elements.SHEET_MUSIC, elements.VALVES]);
                addNote(word.note + '/' + word.octave);
                elements.VALVES.answer = function(response){
                    elements.VALVES.answer = undefined;
                    var fingering = _.clone(word.fingering);
                    var correct = fingering.indexOf(response)!==-1;
                    var dur = correct? 800:1000;
                    var col_class = correct?'correct-key':'wrong-key';
                    elements.VALVES.all_up();

                    function do_flare(current_fingering_i) {
                        var current_fingering = fingering[current_fingering_i];
                        var last = fingering.length === current_fingering_i + 1;
                        elements.VALVES.flare(current_fingering, fingering, col_class, dur, function () {
                            if(last) {
                                trial.result(correct);
                                run_trial(trial);
                            }
                            else{
                                do_flare(current_fingering_i + 1);
                            }
                        });
                    }
                    do_flare(0);
                }
                break;
            case NOTES_TO_SOUND:
                elements.display_requirements([elements.SHEET_MUSIC, ]);
                break;
            default:
                throw 'dont know this learn-type: ' + trial.word.learn_type;

        }
        //run_trial();
    }

}
