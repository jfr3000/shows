const inputField = $("input");
const templates = $('script[type="text/handlebars"]');
Handlebars.templates = Handlebars.templates || {};
Array.prototype.slice.call(templates).forEach((script) => {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

const Shows = Backbone.Model.extend({
    initialize: function() {
        this.fetch();
    },
    url: '/shows',
});

let shows = new Shows();

let ShowsView = Backbone.View.extend({
    initialize: function() {
        this.model.on('change', () => {
            this.render();
        });
    },
    render: function() {
        let html = Handlebars.templates.showsTemplate(this.model.attributes);
        this.$el.html(html);
    },
    el: "#shows",
    model: shows
});

new ShowsView();

let FormView = Backbone.View.extend({
    events: {
        submit: function(e) {
            e.preventDefault();
            let myShows = shows.get('shows').slice();
            myShows.push({name: inputField.val()});
            shows.save({shows: myShows});
            inputField.val("");
        }
    },
    el: "#new"
});
new FormView();
