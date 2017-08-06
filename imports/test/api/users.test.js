import {
  Meteor
} from 'meteor/meteor';
import expect from 'expect';
import {
  validateNewUser
} from '../../api/users';

if (Meteor.isServer) {
  describe('Users', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [{
          address: 'admin@admin.com'
        }]
      };

      const actual = validateNewUser(testUser);
      expect(actual).toBe(true);
    });

    it('should reject invalid email', function () {
      const testUser = {
        emails: [{
          address: 'adminadmincom'
        }]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();

    });
  });
}
