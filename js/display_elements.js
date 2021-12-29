function setup_notes() {
    var api = {};
    var notes_buttons = $('#notes_buttons');
    var notes_container = $('#notes_container')

    var notes = ['Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G'];

    for(var note of notes) {
        $(notes_buttons).append('<button type="button" class="btn btn-outline-primary note-buttons">'
            +note + '</button>');
    }

    $('.note-buttons').click(function(){
        console.log($(this).text())
    })

    api.show = function(){
        notes_container.show();
        console.log('show notes')
    }
    api.hide = function(){
        notes_container.hide();
        console.log('hide notes')
    }

    return api;
}

function setup_text_inputs() {
    var api = {};

    var text_input_container = $('#text_input_container');

    api.show = function(){
        text_input_container.show();
        console.log('show text-input');
    }

    api.hide = function(){
        text_input_container.hide();
        console.log('hide text-input');
    }

    return api;
}

function setup_sheet_display() {
    var api = {};

    var text_input_container = $('#sheet');

    api.show = function(){
        text_input_container.show();
        console.log('show sheet display');
    }

    api.hide = function(){
        text_input_container.hide();
        console.log('hide sheet-display');
    }

    return api;
}

function setup_elements(){
    var note_inputs = setup_notes();
    var text_inputs = setup_text_inputs();
    var sheet_display = setup_sheet_display();
    window.note_inputs = note_inputs;
    window.text_inputs = text_inputs;
    window.sheet_display = sheet_display;
}