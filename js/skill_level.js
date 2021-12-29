// from https://i.redd.it/j0bsovt727i01.png
var notes_fingers = [
    {'stage': '3', 'note': 'B', 'octave': '5', 'fingering': '2'},
    {'stage': '3', 'note': 'Bb', 'octave': '5', 'fingering': '1'},
    {'stage': '3', 'note': 'A', 'octave': '5', 'fingering': '12'},
    {'stage': '3', 'note': 'Ab', 'octave': '5', 'fingering': '23'},
    {'stage': '3', 'note': 'G', 'octave': '5', 'fingering': ''},
    {'stage': '3', 'note': 'F#', 'octave': '5', 'fingering': '2'},
    {'stage': '2', 'note': 'F', 'octave': '5', 'fingering': '1'},
    {'stage': '2', 'note': 'E', 'octave': '5', 'fingering': ''},
    {'stage': '2', 'note': 'Eb', 'octave': '5', 'fingering': '2'},
    {'stage': '2', 'note': 'D', 'octave': '5', 'fingering': '1'},
    {'stage': '2', 'note': 'C#', 'octave': '5', 'fingering': '12'},
    {'stage': '2', 'note': 'C', 'octave': '5', 'fingering': ''},
    {'stage': '1', 'note': 'B', 'octave': '4', 'fingering': '2'},
    {'stage': '1', 'note': 'Bb', 'octave': '4', 'fingering': '1'},
    {'stage': '1', 'note': 'A', 'octave': '4', 'fingering': '12'},
    {'stage': '1', 'note': 'Ab', 'octave': '4', 'fingering': '23'},
    {'stage': '1', 'note': 'G', 'octave': '4', 'fingering': ''},
    {'stage': '1', 'note': 'F#', 'octave': '4', 'fingering': '2'},
    {'stage': '1', 'note': 'F', 'octave': '4', 'fingering': '1'},
    {'stage': '1', 'note': 'E', 'octave': '4', 'fingering': '12'},
    {'stage': '1', 'note': 'Eb', 'octave': '4', 'fingering': '23'},
    {'stage': '1', 'note': 'D', 'octave': '4', 'fingering': '13'},
    {'stage': '1', 'note': 'C#', 'octave': '4', 'fingering': '123'},
    {'stage': '1', 'note': 'C', 'octave': '4', 'fingering': ''},
    {'stage': '1', 'note': 'B', 'octave': '3', 'fingering': '2'},
    {'stage': '2', 'note': 'Bb', 'octave': '3', 'fingering': '1'},
    {'stage': '2', 'note': 'A', 'octave': '3', 'fingering': '12'},
    {'stage': '2', 'note': 'Ab', 'octave': '3', 'fingering': '23'},
    {'stage': '2', 'note': 'G', 'octave': '3', 'fingering': '13'},
    {'stage': '2', 'note': 'F#', 'octave': '3', 'fingering': '123'}
]

var NOTES_TO_NAMES = 'NOTES_TO_NAMES', NAMES_TO_NOTES = 'NAMES_TO_NOTES', NOTES_TO_SOUND = 'NOTES_TO_SOUNDS';

const learn_type = {
    NOTES_TO_NAMES: 'musical notation to note name',
    NAMES_TO_NOTES: 'note name to musical notation',
    NOTES_TO_SOUND: 'musical note to sound',
}

function generate_vocab(level, learn_type){
    if(!level) level = 1;
    var lev_str = level.toString();
    return notes_fingers.filter(function(el){
        return el.stage === lev_str;
    }).map(function(el){
        el['learn_type'] = learn_type
        return el;
    })
}