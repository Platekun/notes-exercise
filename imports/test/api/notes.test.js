import {
  Meteor
} from 'meteor/meteor';
import Notes from '../../api/notes';
import expect from 'expect';

if (Meteor.isServer) {
  describe('Notes', function () {
    const Note1 = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const Note2 = {
      _id: 'testNoteId2',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(Note1);
      Notes.insert(Note2);
    });

    it('it should insert new note.', function () {
      const userId = 'test_id';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({
        userId
      });
      expect(Notes.findOne({
        _id,
        userId
      })).toExist();
    });

    it('it should not insert new note if unauthorized.', function () {
      const userId = 'test_id';

      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove a note.', function () {
      Meteor.server.method_handlers['notes.remove']
        .apply({
          userId: Note1.userId
        }, [Note1._id]);
      expect(Notes.findOne({
        _id: Note1._id
      })).toNotExist();
    });

    it('should not remove a note if unauthorized.', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, []);
      }).toThrow();
    });

    it('should not remove a note if invalid id.', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({
          userId: 'x'
        });
      }).toThrow();
    });

    it('should update a note.', function () {
      const title = 'This is an updated title.';
      Meteor.server.method_handlers['notes.update']
        .apply({
          userId: Note1.userId
        }, [Note1._id, {
          title
        }]);

      const actual = Notes.findOne({
        _id: Note1._id
      });
      expect(actual.updatedAt).toBeGreaterThan(Note1.updatedAt);
      expect(actual).toInclude({
        title,
        body: Note1.body
      });
    });

    it('should throw error if extra updates.', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update']
          .apply({
            userId: Note1.userId
          }, [Note1._id, {
            updatedAt: -1
          }]);
      }).toThrow();
    });

    it('should not update note if user was not creator.', function () {
      const title = 'This is an updated title.';
      Meteor.server.method_handlers['notes.update']
        .apply({
          userId: Note2.userId
        }, [Note1._id, {
          title
        }]);

      const actual = Notes.findOne({
        _id: Note1._id
      });
      expect(actual.updatedAt).toBe(Note1.updatedAt);
      expect(actual).toInclude({
        title: Note1.title,
        body: Note1.body
      });
    });

    it('should not update a note if unauthorized.', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, []);
      }).toThrow();
    });

    it('should not update a note if invalid id.', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: 'x'
        }, [false, {
          title: 'x'
        }]);
      }).toThrow();
    });

    it('should return a users notes.', function () {
      const actual = Meteor.server.publish_handlers.notes.apply({
        userId: Note1.userId
      }).fetch();
      expect(actual.length).toBe(1);
      expect(actual[0]).toEqual(Note1);
    });

    it('should return zero notes for user that has no notes.', function () {
      const actual = Meteor.server.publish_handlers.notes.apply({
        userId: ''
      }).fetch();
      expect(actual.length).toBe(0);
    });
  });
}
