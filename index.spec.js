import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as fb from './';

chai.use(sinonChai);

describe('Facebook api interface', () => {
	const sandbox = sinon.sandbox.create();

	afterEach(() => {
		sandbox.restore();
	});

	describe('init', () => {
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
			fb.init('123', fbOptions);
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
			const promise = fb.init('123', fbOptions);
			window.fbAsyncInit();
			return promise.then(() => {
				expect(true).to.equal(true);
			});
		});
	});

	describe('login', () => {
		it('should reject a promise if the response does not contain a authResponse property', () => {
			global.window.FB = {
				login: sandbox.stub().callsArgWith(0, {}),
			};

			return fb.login('permission').then().catch(() => {
				expect(true).to.equal(true);
			});
		});

		it('should resolve a promise if the response contains a authResponse property', () => {
			global.window.FB = {
				login: sandbox.stub().callsArgWith(0, { authResponse: { accessToken: '123' } }),
			};

			return fb.login('permission').then((data) => {
				expect(data).to.eql({ token: '123' });
			});
		});
	});

	describe('share', () => {
		let uiSpy;

		beforeEach(() => {
			uiSpy = sandbox.spy();
			window.FB = {
				ui: uiSpy,
			};
		});

		it('should call fb ui method with the proper params', () => {
			const shareOptions = {
				url: 'http://localhost',
				image: 'img.jpg',
				title: 'title',
				info: 'some title',
			};
			fb.share(shareOptions);
			expect(window.FB.ui).to.have.been.calledWith({
				method: 'feed',
				link: shareOptions.url,
				picture: shareOptions.image,
				name: shareOptions.title,
				description: shareOptions.info,
			});
		});
	});
});
