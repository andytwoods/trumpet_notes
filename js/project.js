window.addEventListener("load", main);

function main() {
    notation_manager();
    spectrum_manager();

    var vocab, learn, learning_type;

    function setup() {
        vocab = generate_vocab(1, learning_type);
        learn = learn_manager(vocab);
        console.log('Started learning environment with learning style: ' + learning_type);
        setup_elements();
    }

    function set_learning_type() {
        learning_type = $("input[name='learning_type']:checked").val();
        console.log(learning_type,22)
        if(!learn_type[learning_type]){
            throw 'unknown learning type'
        }
    }

    $("input[name='learning_type']").click(function(){
        set_learning_type();
        setup();
    });

    set_learning_type();
    setup();
    run_trial();

    function run_trial() {
        var trial = learn.next();
        var word = trial.word;
        var learn_type = word.learn_type;
        switch(trial.word.learn_type){
            case NAMES_TO_NOTES:
                break;
            case NOTES_TO_NAMES:
                addNote(word.note + '/' + word.octave);
                break;
            case NOTES_TO_SOUND:
                break;
            default:
                throw 'dont know this learn-type: ' + trial.word.learn_type;

        }
        //run_trial();
    }

}
