const assert = require('assert');

describe('Test extractor', () => {

    const extractor = require('../extractor');
    it('should extract extra', function (done) {
        assert.equal(4, extractor.extractExtras("Симпсон Гомер +4 guest@chest.one"));
        assert.equal(5, extractor.extractExtras("Симпсон Гомер и Симпсон Мардж guest@chest.one +4"));
        assert.equal(4, extractor.extractExtras("guest@chest.one Симпсон Гомер +4"));
        assert.equal(4, extractor.extractExtras("+4 guest@chest.one Симпсон Гомер  "));
        done()
    });

    it('should undefined if no extras', function (done) {
        assert.equal(undefined, extractor.extractExtras("Симпсон Гомер guest@chest.one"));
        done()
    });

    it('should extract extra with space between plus and number', function (done) {
        assert.equal("+4", extractor.extractExtras("guest@chest.one + 4 Симпсон Гомер  "));
        done()
    });

    it('should extract email', function (done) {
        assert.equal("guest@chest.one", extractor.extractEmail("Симпсон Гомер guest@chest.one +4"));
        assert.equal("guest@chest.one", extractor.extractEmail("Симпсон Гомер guest@chest.one second@chest.one +4"));
        assert.equal("second@chest.one", extractor.extractEmail("Симпсон Гомер @guechest.one second@chest.one +4"));
        done()
    });

    it('should extract email with line break', function (done) {
        assert.equal("guest@chest.one", extractor.extractEmail("guest@chest.one\\n+79139139139"));
        assert.equal("guest@chest.one", extractor.extractEmail("+79139139139\\nguest@chest.one"));
        done()
    });

    it('should undefined if no email', function (done) {
        assert.equal(undefined, extractor.extractEmail("Симпсон Гомер +4"));
        done()
    });

    it('should extract name', function (done) {
        assert.equal("Симпсон Гомер", extractor.extractName("Симпсон Гомер guest@chest.one +4"));
        assert.equal("Симпсон Гомер", extractor.extractName("Симпсон Гомер"));
        assert.equal("Симпсон Гомер", extractor.extractName("Симпсон Гомер +4"));
        assert.equal("Симпсон Гомер", extractor.extractName("Симпсон Гомер и Симпсон Мардж guest@chest.one +4"));
        done()
    });

    it('should extract phone number', function (done) {
        assert.equal("+79139139139", extractor.extractPhoneNumber("Симпсон Гомер +4 +79139139139 guest@chest.one"));
        done()
    });

    it('should extract phone number with line break', function (done) {
        assert.equal("+79139139139", extractor.extractPhoneNumber("guest@chest.one\\n+79139139139"));
        assert.equal("+79139139139", extractor.extractPhoneNumber("+79139139139\\nguest@chest.one"));
        done()
    });

    it('should undefined if no phone number', function (done) {
        assert.equal(undefined, extractor.extractPhoneNumber("Симпсон Гомер +4 guest@chest.one"));
        done()
    });

    it('should extract greeting', function (done) {
        assert.equal("Гомер", extractor.extractGreeting("Симпсон Гомер"));
        done()
    });

    it('should extract greeting with extras', function (done) {
        assert.equal("Гомер", extractor.extractGreeting("Симпсон Гомер +4"));
        assert.equal("Гомер и Мардж", extractor.extractGreeting("Симпсон Гомер и Симпсон Мардж +1"));
        done()
    });
});
