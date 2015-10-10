Template.workshops.helpers({
  allItems: function () {
    return Items.find();
  }
});

Template.workshops.events({

  'click .edit-item': function () {
    Template.instance().editableItem.set(this._id);
  },

  'click .cancel-edit': function () {
    Template.instance().editableItem.set("");
  },

  "submit .update-item": function(event, template){
    event.preventDefault();

    var itemAttributes = {
      id:    this._id,
      title: template.find('.update-item .item-title').value
    };

    Meteor.call('updateItem', itemAttributes, function(error, result){
      if (error){
        console.log(error.reason);
      } ;
    });

    Template.instance().editableItem.set("");
  }

});
