function elements_manager() {
    var api = {};

    function get_id_safe_note(note) {
        return note.split('#').join('s');
    }

    function setup_note_buttons() {
        var api = {};
        var notes_buttons = $('#notes_buttons');
        var notes_container = $('#notes_container');

        var notes = ['Ab', 'A', 'Bb', 'B', 'C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G'];

        for (var note of notes) {
            var safe_note_id = get_id_safe_note(note);
            $(notes_buttons).append('<button type="button" id="buttonnote_' + safe_note_id + '" class="btn btn-outline-primary note-buttons">'
                + note + '</button>');
        }

        $('.note-buttons').click(function () {
            var response = $(this).text();
            if (api.answer) api.answer(response);
        })

        api.flare = function (note, flare_cls, dur, callback) {
            var safe_note_id = get_id_safe_note(note);
            var b = $('#buttonnote_' + safe_note_id);
            b.addClass(flare_cls);
            setTimeout(function () {
                b.removeClass(flare_cls);
                callback();
            }, dur)
        }

        api.answer = undefined;

        api.show = function () {
            notes_container.show();
            console.log('show notes')
        }
        api.hide = function () {
            notes_container.hide();
            console.log('hide notes')
        }

        return api;
    }

    function setup_valves() {
        var api = {};

        var visible = false;
        var valves = $('#valves');
        var valves_container = $('#valves_container');

        var my_valves = ['1', '2', '3'];

        for (var valve of my_valves) {
            $(valves).append('<button type="button" id="valve_' + valve + '" class="btn btn-outline-primary raised valve-buttons" data-bs-toggle="button" autocomplete="off">'
                + valve + '</button>');
        }

        $(valves_container).append('<div class="text-center d-block mt-3"><button type="button" id="valves_selected" class="btn btn-outline-primary ' +
            'raised">Answer</button></div>');

        $(valves_container).append('<small class="text-center d-block mt-3">Press 1, 2 or 3 to select valves. Space to answer.</small>');

        $(document).keypress(function (event) {
            var pressed = event.which;
            var space = 32;
            if ([space, 49, 50, 51].indexOf(pressed)===-1) return;
            event.preventDefault();
            if(pressed===space){
                evaluate_valves();
            }
            else {
                var num_pressed = pressed - 48;
                $('#valve_' + num_pressed.toString()).toggleClass('active');
            }
        });

        $('#valves_selected').click(evaluate_valves);

        function evaluate_valves () {
            if(!visible) return;
            var selected = my_valves.filter(function(my_valve){
                return $('#valve_' + my_valve).hasClass('active')? my_valve: '';
            });
            if (api.answer) api.answer(selected.join(''));
        }

        api.all_up = function(){
            my_valves.map(function(my_valve){
                $('#valve_' + my_valve).removeClass('active');
            });
        }
        api.flare = function (fingering_str, flare_cls, dur, callback) {
            var fingering = fingering_str.split('').map(function(el){
                return '#valve_' + el;
            });

            fingering.push('#valves_selected');

            fingering.forEach(function(el){
                $(el).addClass(flare_cls);
            });

            setTimeout(function () {
                fingering.forEach(function(el){
                     $(el).removeClass(flare_cls);
                });
                callback();
            }, dur);
        }

        api.show = function () {
            visible = true;
            valves_container.show();
            console.log('show valves')
        }
        api.hide = function () {
            visible = false;
            valves_container.hide();
            console.log('hide valves');
        }
        return api;
    }

    function setup_text_inputs() {
        var api = {};

        var text_input_container = $('#text_input_container');

        api.show = function () {
            text_input_container.show();
            console.log('show text-input');
        }

        api.hide = function () {
            text_input_container.hide();
            console.log('hide text-input');
        }

        return api;
    }

    function setup_sheet_display() {
        var api = {};

        var text_input_container = $('#sheet');

        api.show = function () {
            text_input_container.show();
            console.log('show sheet display');
        }

        api.hide = function () {
            text_input_container.hide();
            console.log('hide sheet-display');
        }

        return api;
    }

    api.NOTE_BUTTONS = setup_note_buttons();
    api.VALVES = setup_valves();
    api.TEXT_INPUT = setup_text_inputs();
    api.SHEET_MUSIC = setup_sheet_display();

    api.currently_present = [];

    // Perhaps OTT but here we don't remove elements already onscreen if they are needed in the next trial.
    // We also remove all elements to be removed, at once (and add all elements needed, at once).
    api.display_requirements = function (els) {
        var needed_again = [];
        var to_be_removed = [];

        for (var el of api.currently_present) {
            if (els.indexOf(el) !== -1) {
                needed_again.push(el);
            } else {
                to_be_removed.push(el);
            }
        }

        to_be_removed.forEach(function (el) {
            el.hide()
        });

        els
            .filter(function (el) {
                    return needed_again.indexOf(el) === -1
                }
            )
            .forEach(function (el) {
                    el.show();
                }
            );
        api.currently_present = els;
    }

    return api;
}