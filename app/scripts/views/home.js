/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/home',
  'models/test'
], function ($, _, Backbone, JST, MyCollection, MyModel) {
  'use strict';

  var HomeView = Backbone.View.extend({
    template: JST['app/scripts/templates/home.ejs'],

    tagName: 'div',

    el: '#container',

    id: '',

    className: '',

    events: {
      'click #getDataBtn' : 'getData'
    },

    initialize: function () {
      this.collection = new MyCollection();
      this.model = new MyModel();
      this.listenTo(this.collection, 'reset', this.renderData);
      this.listenTo(this.model, 'change', this.renderModelData);
    },

    render: function () {
      this.$el.html(this.template());
    },

    renderData: function(data){
      var obj = data.models[0].toJSON();
      var h1 = document.createElement('h1');
      $(h1).html('From Collection: ' + obj.title);
      var p = document .createElement('p');
      $(p).html(obj.body);
      $('#result').empty().append(h1,p);
    },

    renderModelData: function(data){
      var obj = data.toJSON();
      var h1 = document.createElement('h1');
      $(h1).html('From Model: '+ obj.title);
      var p = document .createElement('p');
      $(p).html(obj.body);
      $('#result').append(h1,p);
    },

    getData: function(){
      var input = $('#inputText').val();
      var url = this.collection.baseUrl;
      url = url + input;
      this.collection.url = url;
      this.model.url = url;
      this.collection.fetch();
      this.model.fetch();
    }

  });

  return HomeView;
});
