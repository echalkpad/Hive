$(function() {

  App.Views.SettingsForm = Backbone.View.extend({
    
    title: "Settings",

    className: "settings form",

    events: {
      "click #save": "setForm",
      "submit form" : "setFormFromEnterKey"
    },

    render: function() {
      // create the form
      this.form = new Backbone.Form({ model: this.model })
      this.$el.append('<h2>' + this.title + '</h2>')
      this.$el.append(this.form.render().el)
      // give the form a submit button
      var $button = $('<a class="btn" id="save">save</a>')
      this.$el.append($button)
    },

    delete: function() {
      this.model.destroy()
    },

    setFormFromEnterKey: function(event) {
      event.preventDefault()
      this.setForm()
    },

    setForm: function() {
      var form = this
      // Put the form's input into the model in memory
      form.form.commit()
      // Send the updated model to the server
      form.model.once('sync', function() {
        form.trigger('done')
      })
      form.model.save()
    },

  });

});