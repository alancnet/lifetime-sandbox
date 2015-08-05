export default function(Language) {
    describe('Query Language - ' + Language.name, () => {
        it('asMessage returns the original string', () => {
            let testText = 'Hello World!';
            var instance = new Language(testText);
            expect(instance.asMessage()).toEqual(testText);
        });
    });
}