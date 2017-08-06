import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({
      userId: this.userId
    });
  });
}

Meteor.methods({
  'notes.insert' () {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    return Notes.insert({
      userId: this.userId,
      title: '',
      body: '',
      updatedAt: moment().valueOf()
    });
  },

  'notes.remove' (_id) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({
      _id
    });
    return Notes.remove({
      _id,
      userId: this.userId
    });
  },

  'notes.update' (_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: { ...updates,
        updatedAt: moment().valueOf()
      }
    });
  }
});

export default Notes;
