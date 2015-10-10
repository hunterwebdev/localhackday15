Items = new Mongo.Collection('items');

Meteor.methods({

  addItem:function(itemTitle){

    check(itemTitle, String);

    Items.insert({
      title: itemTitle,
      createdAt: Date()
    });
  },

  updateItem: function(itemAttributes){

    check(itemAttributes, {
      id:    String,
      title: String
    });

    Items.update({ _id:itemAttributes.id },
    {
      $set: {
        title: itemAttributes.title
      }
    });

  },

  removeFromCollection: function(collectionAttributes){

    check(collectionAttributes, {
      collection: String,
      id:         String
    });

    Mongo.Collection.get(collectionAttributes.collection).remove({ _id: collectionAttributes.id });

  }


});


/*checks to see if the current user making the request to update is
   the admin user */

   function adminUser(userId) {
     var adminUser = Meteor.users.findOne({username:"admin"})
     return (userId && adminUser && userId === adminUser._id);
   }

   Items.allow({
     insert: function(userId, doc){
       return adminUser(userId);
     },
     update: function(userId, docs, fields, modifier){
       return adminUser(userId);
     },
     remove: function (userId, docs){
       return adminUser(userId);
     }
});
