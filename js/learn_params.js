// from https://i.redd.it/j0bsovt727i01.png
var notes_fingers = [ // note we add index via map at end of the array.
    {'stage': 3, 'note': 'B', 'octave': '5', 'fingering': '2'},
    {'stage': 3, 'note': 'Bb', 'octave': '5', 'fingering': '1'},
    {'stage': 3, 'note': 'A', 'octave': '5', 'fingering': '12'},
    {'stage': 3, 'note': 'Ab', 'octave': '5', 'fingering': '23'},
    {'stage': 3, 'note': 'G', 'octave': '5', 'fingering': ''},
    {'stage': 3, 'note': 'F#', 'octave': '5', 'fingering': '2'},
    {'stage': 2, 'note': 'F', 'octave': '5', 'fingering': '1'},
    {'stage': 2, 'note': 'E', 'octave': '5', 'fingering': ''},
    {'stage': 2, 'note': 'Eb', 'octave': '5', 'fingering': '2'},
    {'stage': 2, 'note': 'D', 'octave': '5', 'fingering': '1'},
    {'stage': 2, 'note': 'C#', 'octave': '5', 'fingering': '12'},
    {'stage': 2, 'note': 'C', 'octave': '5', 'fingering': ''},
    {'stage': 1, 'note': 'B', 'octave': '4', 'fingering': '2'},
    {'stage': 1, 'note': 'Bb', 'octave': '4', 'fingering': '1'},
    {'stage': 1, 'note': 'A', 'octave': '4', 'fingering': '12'},
    {'stage': 1, 'note': 'Ab', 'octave': '4', 'fingering': '23'},
    {'stage': 0, 'note': 'G', 'octave': '4', 'fingering': ''},
    {'stage': 1, 'note': 'F#', 'octave': '4', 'fingering': '2'},
    {'stage': 0, 'note': 'F', 'octave': '4', 'fingering': '1'},
    {'stage': 0, 'note': 'E', 'octave': '4', 'fingering': '12'},
    {'stage': 1, 'note': 'Eb', 'octave': '4', 'fingering': '23'},
    {'stage': 0, 'note': 'D', 'octave': '4', 'fingering': '13'},
    {'stage': 1, 'note': 'C#', 'octave': '4', 'fingering': '123'},
    {'stage': 0, 'note': 'C', 'octave': '4', 'fingering': ''},
    {'stage': 1, 'note': 'B', 'octave': '3', 'fingering': '2'},
    {'stage': 2, 'note': 'Bb', 'octave': '3', 'fingering': '1'},
    {'stage': 2, 'note': 'A', 'octave': '3', 'fingering': '12'},
    {'stage': 2, 'note': 'Ab', 'octave': '3', 'fingering': '23'},
    {'stage': 2, 'note': 'G', 'octave': '3', 'fingering': '13'},
    {'stage': 2, 'note': 'F#', 'octave': '3', 'fingering': '123'}
].map(function(el, index){
    el['id'] = index;
    return el;
});

var NOTES_TO_NAMES = 'NOTES_TO_NAMES', NOTES_TO_VALVES = 'NOTES_TO_VALVES', NAMES_TO_NOTES = 'NAMES_TO_NOTES', NOTES_TO_SOUND = 'NOTES_TO_SOUND';

const learn_type = {
    NOTES_TO_NAMES: 'music notation to note name',
    NOTES_TO_VALVES: 'music notation to valves',
    //NAMES_TO_NOTES: 'note name to musical notation',
    //NOTES_TO_SOUND: 'music note to sound',
}

const default_learn_type = NOTES_TO_NAMES;

function setup_learn_params(setup_callback){

    function _extract_learning_levels() {
        var levels = {};
        for(var note_finger of notes_fingers){
            var stage = note_finger.stage;
            if(!levels[stage]) levels[stage] = [];
            var note = note_finger.note + '/' + note_finger.octave;
            if(levels[stage].indexOf(note)===-1) levels[stage].push(note);
        }
        return levels;
    }

    function gen_option(nam, select_type, info, checked, data){
        if(!data) data = '';
        return '            <div class="form-check">\n' +
            '                <input class="form-check-input" type="radio" '+ data + ' name="'+select_type+'" '+checked+' value="'+nam+'"\n>\n' +
            '                <label class="form-check-label" for="type_1">\n' +
            '                    '+ info +'\n' +
            '                </label>\n' +
            '            </div>'
    }
    var testing_types_container = $('#testing_types_container');
    $(testing_types_container).append('<b>Learning type</b>');
    for(var id in learn_type){
        var checked = id===NOTES_TO_NAMES?'checked':'';
        $(testing_types_container).append(gen_option(id, 'learning_type', learn_type[id], checked));
    }

    var learning_levels = _extract_learning_levels();

    $(testing_types_container).append('<div class="mt-3"><b>Learning level (lower options include notes from above options)</b></div>');
    var first = true;
    for(var key in learning_levels){
        var checked = first?'checked':'';
        var info = 'level ' + key + ': ' + learning_levels[key].join(', ');
        var data = 'data-learn_level="'+key+'"';
        $(testing_types_container).append(gen_option(id, 'learning_level', info, checked, data));
        first = false;
    }

    $("input[name='learning_type']").click(function(){
        refresh_everything();
    });

    $("input[name='learning_level']").click(function(){
        refresh_everything();
    });

    function refresh_everything(){
        var learning_type = $("input[name='learning_type']:checked").val();
        var learning_level = parseInt($("input[name='learning_level']:checked").data('learn_level'));
        setup_callback(learning_type, learning_level);
    }

    refresh_everything();

}

function generate_vocab(learn_type, level){

    return notes_fingers.filter(function(el){
        return el.stage <= level;
    }).map(function(el){
        el['learn_type'] = learn_type
        return el;
    })
}