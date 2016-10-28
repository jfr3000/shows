const inputField = $("input");
const templates = $('script[type="text/handlebars"]');
Handlebars.templates = Handlebars.templates || {};
Array.prototype.slice.call(templates).forEach((script) => {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});

const Show = Backbone.Model.extend({
    initialize: function(options) {
        this.name = options;
    },
    render: function() {
        console.log("render");
        return Handlebars.templates.showItem(this.name);
    },
    url: '/show',
});
let show = new Show();

const Shows = Backbone.Collection.extend({
    initialize: function() {
        this.fetch({
            success: function(result) {
                this.attributes = result;
            }
        });
    },
    model: Show,
    url: "/shows"
});

var showsCollection = new Shows();

let ShowsView = Backbone.View.extend({
    initialize: function(options) {
        this.render(options);
    },
    render: function(shows) {
        let html = "";
        shows.models.forEach(function(show) {
            html += new Show(show.attributes).render();
        });
        this.$el.html(html);
    },
    el: "#shows"
});
new ShowsView(new Shows());

let FormView = Backbone.View.extend({
    events: {
        submit: function(e) {
            e.preventDefault();
            show.save({name: inputField.val()});
            showsCollection.fetch({
                success: function (result) {
                    new ShowsView(result);
                },
                error: function(err) {
                    console.log(err);
                }
            });
            inputField.val("");
        }
    },
    el: "#new"
});
new FormView();
