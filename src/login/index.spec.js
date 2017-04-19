import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import login from './';

chai.use(sinonChai);

describe('Facebook api interface: login', () => {
	const sandbox = sinon.sandbox.create();

	afterEach(() => {
		sandbox.restore();
	});

	it('should reject a promise if the response does not contain a authResponse property', () => {
		global.window.FB = {
			login: sandbox.stub().callsArgWith(0, {}),
		};

		return login('permission').then().catch(() => {
			expect(true).to.equal(true);
		});
	});

	it('should resolve a promise if the response contains a authResponse property', () => {
		global.window.FB = {
			login: sandbox.stub().callsArgWith(0, { authResponse: { accessToken: '123' } }),
		};

		return login('permission').then((data) => {
			expect(data).to.eql({ token: '123' });
		});
	});
});
