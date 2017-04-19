import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import share from './';

chai.use(sinonChai);

describe('Facebook api interface: share', () => {
    const sandbox = sinon.sandbox.create();
    let uiSpy;

    beforeEach(() => {
        uiSpy = sandbox.spy();
        window.FB = {
            ui: uiSpy,
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call fb ui method with the proper params', () => {
        const shareOptions = {
            url: 'http://localhost',
            image: 'img.jpg',
            title: 'title',
            info: 'some title',
        };
        share(shareOptions);
        expect(window.FB.ui).to.have.been.calledWith({
            method: 'feed',
            link: shareOptions.url,
            picture: shareOptions.image,
            name: shareOptions.title,
            description: shareOptions.info,
        });
    });
});
