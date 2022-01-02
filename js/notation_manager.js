var sheet_width = 400;
var sheet_height = 300;

function notation_manager() {

// adapted from https://jsfiddle.net/ncda8ywh/1/
    var Note = function (options) {
        options['auto_stem'] =  true;
        this.StaveNote = new Vex.Flow.StaveNote(options);
        this.removed = false;
        /**
         * moves the note right from its ORIGINAL position by x pixels
         * (sets the trasform: translate(x) value to x)
         */
        this.setOffsetX = (x) => {
            if (this.removed) {
                return this;
            }
            $.each(this.getElem(true), (index, node) => {
                var x_y = this.getTransformXY(node);
                x_y.x = x;
                node.setAttribute('transform', `translate(${x_y.x},${x_y.y})`);
            })

            return this;
        }
        /**
         * removes the SVG elements
         */
        this.remove = () => {
            if (this.removed) {
                return this;
            }
            var note = $(this.StaveNote.attrs.el);
            var bar = this.getBar();
            // remove line that go though the stave
            bar.remove();
            note.remove();
            this.removed = true;
            return this;
        }


        /**
         * returns the <svg>
         */
        this.getSvg = () => {
            return $(this.StaveNote.attrs.el).closest('svg');
        }
        /**
         * Gets the StaveNote.attrs.el as a jQuery object
         * @param {boolean} include_bar - whether to include the <rect> bar with it
         */
        this.getElem = (include_bar) => {
            var return_jquery = $(this.StaveNote.attrs.el);

            if (include_bar) {
                var bar = this.getBar();
                if (bar.length) {
                    return_jquery = return_jquery.add(bar);
                }
            }

            return return_jquery;
        }
        /**
         * returns the <rect> before the StaveNote.attrs.el
         * if it exists
         */
        this.getBar = () => {
            return $(this.StaveNote.attrs.el).prev('rect');
        }

        /**
         * gets the {x, y} of transform=translate(x,y)
         * @param {HTMLElement} html_element
         */
        this.getTransformXY = (html_element) => {
            var xforms = html_element.getAttribute('transform');
            if (xforms === null) {
                return {
                    x: 0,
                    y: 0
                };
            }
            var parts = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(xforms);
            return {
                x: parseInt(parts[1]),
                y: parseInt(parts[2])
            }
        }
    }

    var Sheet = function (selector) {
        this.context = null;
        this.stave = null;
        this.width = sheet_width;
        this.height = sheet_height;
        this.drawn_notes = [];
        this.selector = selector;
        this.createSheet = () => {
            var sheet_elem = $('#' + this.selector);

            var renderer = new Vex.Flow.Renderer(sheet_elem[0], Vex.Flow.Renderer.Backends.SVG);

            // Configure the rendering context.
            renderer.resize(this.width, this.height);
            this.context = renderer.getContext();
            this.context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

            // Create a stave of width this.width at position 0, 0 on the canvas.
            this.stave = new Vex.Flow.Stave(0, 0, this.width);

            // Add a clef and time signature.
            this.stave.addClef("treble");//.addTimeSignature("4/4");

            // Connect it to the rendering context and draw!
            this.stave.setContext(this.context).draw();

            sheet_elem.find('svg')[0].setAttribute('width', '100%');
            sheet_elem.find('svg')[0].setAttribute('viewBox', '0 0 ' + this.width + ' ' + this.height);
        }

        this.addNotes = (notes) => {
            var num_notes = notes.length;

            var voice = new Vex.Flow.Voice({
                num_beats: num_notes,
                beat_value: 4
            });
            voice.addTickables(notes.map(note => note.StaveNote));

            Vex.Flow.Accidental.applyAccidentals([voice], 'C');
            var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], this.width);
            // apply accidentals


            voice.draw(this.context, this.stave);

            for (var i = 0, l = notes.length; i < l; i++) {
                this.drawn_notes.push(notes[i]);
            }
            return notes;
        }
        this.clearNotes = () => {
            for (let note of this.drawn_notes) {
                if (note.removed) {
                    continue;
                }
                note.remove()
            }
        }
    }

    var sheet = new Sheet('sheet');

    sheet.createSheet();

    function getNote(my_note) {
        if (!(typeof my_note === 'string' || my_note instanceof String)) my_note = 'b'
        return new Note({
            keys: [my_note],
            clef: 'treble',
            duration: 'q',
        })
    }

    var addNote = function (my_note) {
        sheet.clearNotes();
        var notes = sheet.addNotes([getNote(my_note)]);
        var modifier = 0;
        if(my_note.indexOf('b') !== -1 || my_note.indexOf('#') !== -1){
            modifier -= 15.5; // this will relate to fontsize in some fashion
        }
        for (var i in notes) {
            notes[i].setOffsetX(sheet_width * .5 - 55 + modifier);
        }
    }

    window.addNote = addNote;
    window.clearNote = sheet.clearNotes;

}

