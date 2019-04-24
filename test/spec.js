const assert = require('assert');

describe('Test extractor', () => {

    const extractor = require('../extractor');
    it('should extract extra', function (done) {
        assert.equal("+4", extractor.extractExtras("Ruslan Mikhalev +4 guest@chest.one"));
        assert.equal("+4", extractor.extractExtras("Ruslan Mikhalev guest@chest.one +4"));
        assert.equal("+4", extractor.extractExtras("guest@chest.one Ruslan Mikhalev +4"));
        assert.equal("+4", extractor.extractExtras("+4 guest@chest.one Ruslan Mikhalev  "));
        done()
    });

    it('should undefined if no extras', function (done) {
        assert.equal(undefined, extractor.extractExtras("Ruslan Mikhalev guest@chest.one"));
        done()
    });

    it('should extract extra with space between plus and number', function (done) {
        assert.equal("+4", extractor.extractExtras("guest@chest.one + 4 Ruslan Mikhalev  "));
        done()
    });

    it('should extract email', function (done) {
        assert.equal("guest@chest.one", extractor.extractEmail("Ruslan Mikhalev guest@chest.one +4"));
        assert.equal("guest@chest.one", extractor.extractEmail("Ruslan Mikhalev guest@chest.one second@chest.one +4"));
        assert.equal("second@chest.one", extractor.extractEmail("Ruslan Mikhalev @guechest.one second@chest.one +4"));
        done()
    });

    it('should extract name', function (done) {
        assert.equal("Ruslan Mikhalev", extractor.extractName("Ruslan Mikhalev guest@chest.one +4"));
        assert.equal("Ruslan Mikhalev", extractor.extractName("Ruslan Mikhalev"));
        done()
    });

});
