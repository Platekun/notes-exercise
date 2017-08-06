import {
  Meteor
} from 'meteor/meteor';
import {
  Accounts
} from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';

export const validateNewUser = user => {
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({
    email: user.emails[0]['address']
  });

  return true;
};

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}
