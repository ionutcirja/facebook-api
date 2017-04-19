import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import init from './';

chai.use(sinonChai);

describe('Facebook api interface: init', () => {
    const sandbox = sinon.sandbox.create();
    let insertNodeSpy;
    let fbInitSpy;
    let fbScriptEl;
    const scriptEl = {
        id: 'facebook-jssdk',
        src: '//connect.facebook.net/en/all.js',
    };
    const fbOptions = {
        language: 'en',
        cookieEnabled: true,
        xfbmlEnabled: false,
        version: '2',
    };

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        insertNodeSpy = sandbox.spy();
        fbInitSpy = sandbox.spy();
        fbScriptEl = {
            parentNode: {
                insertBefore: insertNodeSpy,
            },
        };
        window.FB = {
            init: fbInitSpy,
        };
        sandbox.stub(document, 'createElement');
        document.createElement.withArgs('div').returns({});
        document.createElement.withArgs('script').returns({});

        sandbox.stub(document, 'getElementsByTagName').returns([fbScriptEl]);
        sandbox.stub(document, 'getElementById').returns();
        sandbox.stub(document.body, 'appendChild');
    });

    it('should create a fb root element, load fb sdk, add a listener for sdk loading complete and', () => {
        init('123', fbOptions);
        expect(document.createElement.args[0][0]).to.equal('div');
        expect(document.body.appendChild.args[0][0]).to.eql({ id: 'fb-root' });

        expect(document.getElementsByTagName).to.have.been.calledWith('script');
        expect(document.createElement.args[1][0]).to.equal('script');
        expect(insertNodeSpy).to.have.been.calledWith(scriptEl, fbScriptEl);

        expect(typeof window.fbAsyncInit).to.equal('function');
        window.fbAsyncInit();
        expect(window.FB.init).to.have.been.calledWith({
            appId: '123',
            xfbml: false,
            cookie: true,
            version: 'v2',
        });
    });

    it('should resolve a promise when fb loading is complete', () => {
        const promise = init('123', fbOptions);
        window.fbAsyncInit();
        return promise.then(() => {
            expect(true).to.equal(true);
        });
    });
});
