const assert = require('assert');

describe('Test extractor', () => {

    const extractor = require('../extractor');
    it('should extract extra', function (done) {
        assert.equal(4, extractor.extractExtras("Гомер Симпсон +4 guest@chest.one"));
        assert.equal(4, extractor.extractExtras("Гомер Симпсон и Мардж Симпсон guest@chest.one +4"));
        assert.equal(4, extractor.extractExtras("guest@chest.one Гомер Симпсон +4"));
        assert.equal(4, extractor.extractExtras("+4 guest@chest.one Гомер Симпсон  "));
        done()
    });

    it('should undefined if no extras', function (done) {
        assert.equal(undefined, extractor.extractExtras("Гомер Симпсон guest@chest.one"));
        done()
    });

    it('should extract extra with space between plus and number', function (done) {
        assert.equal("+4", extractor.extractExtras("guest@chest.one + 4 Гомер Симпсон  "));
        done()
    });

    it('should extract email', function (done) {
        assert.equal("guest@chest.one", extractor.extractEmail("Гомер Симпсон guest@chest.one +4"));
        assert.equal("guest@chest.one", extractor.extractEmail("Гомер Симпсон guest@chest.one second@chest.one +4"));
        assert.equal("second@chest.one", extractor.extractEmail("Гомер Симпсон @guechest.one second@chest.one +4"));
        done()
    });

    it('should extract email with line break', function (done) {
        assert.equal("guest@chest.one", extractor.extractEmail("guest@chest.one\\n+79139139139"));
        assert.equal("guest@chest.one", extractor.extractEmail("+79139139139\\nguest@chest.one"));
        done()
    });

    it('should undefined if no email', function (done) {
        assert.equal(undefined, extractor.extractEmail("Гомер Симпсон +4"));
        done()
    });

    it('should extract name', function (done) {
        assert.equal("Гомер Симпсон", extractor.extractName("Гомер Симпсон guest@chest.one +4"));
        assert.equal("Гомер Симпсон", extractor.extractName("Гомер Симпсон"));
        assert.equal("Гомер Симпсон", extractor.extractName("Гомер Симпсон +4"));
        done()
    });

    it('should extract phone number', function (done) {
        assert.equal("+79139139139", extractor.extractPhoneNumber("Гомер Симпсон +4 +79139139139 guest@chest.one"));
        done()
    });

    it('should extract phone number with line break', function (done) {
        assert.equal("+79139139139", extractor.extractPhoneNumber("guest@chest.one\\n+79139139139"));
        assert.equal("+79139139139", extractor.extractPhoneNumber("+79139139139\\nguest@chest.one"));
        done()
    });

    it('should undefined if no phone number', function (done) {
        assert.equal(undefined, extractor.extractPhoneNumber("Гомер Симпсон +4 guest@chest.one"));
        done()
    });

    it('should extract greeting', function (done) {
        assert.equal("Гомер Симпсон", extractor.extractGreeting("Гомер Симпсон"));
        done()
    });

    it('should extract greeting with extras', function (done) {
        assert.equal("Гомер Симпсон", extractor.extractGreeting("Гомер Симпсон +4"));
        assert.equal("Гомер Симпсон и Мардж Симпсон", extractor.extractGreeting("Гомер Симпсон и Мардж Симпсон +1"));
        done()
    });
});
