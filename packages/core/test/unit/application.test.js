"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/core
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const context_1 = require("@loopback/context");
const src_1 = require("../../src");
describe('Application', () => {
    describe('component binding', () => {
        let app;
        class MyComponent {
        }
        beforeEach(givenApp);
        it('binds a component', () => {
            app.component(MyComponent);
            testlab_1.expect(findKeysByTag(app, 'component')).to.containEql('components.MyComponent');
        });
        it('binds a component with custom name', () => {
            app.component(MyComponent, 'my-component');
            testlab_1.expect(findKeysByTag(app, 'component')).to.containEql('components.my-component');
        });
        function givenApp() {
            app = new src_1.Application();
        }
    });
    describe('server binding', () => {
        it('defaults to constructor name', () => __awaiter(this, void 0, void 0, function* () {
            const app = new src_1.Application();
            const binding = app.server(FakeServer);
            testlab_1.expect(Array.from(binding.tags)).to.containEql('server');
            const result = yield app.getServer(FakeServer.name);
            testlab_1.expect(result.constructor.name).to.equal(FakeServer.name);
        }));
        it('allows custom name', () => __awaiter(this, void 0, void 0, function* () {
            const app = new src_1.Application();
            const name = 'customName';
            app.server(FakeServer, name);
            const result = yield app.getServer(name);
            testlab_1.expect(result.constructor.name).to.equal(FakeServer.name);
        }));
        it('allows binding of multiple servers as an array', () => __awaiter(this, void 0, void 0, function* () {
            const app = new src_1.Application();
            const bindings = app.servers([FakeServer, AnotherServer]);
            testlab_1.expect(Array.from(bindings[0].tags)).to.containEql('server');
            testlab_1.expect(Array.from(bindings[1].tags)).to.containEql('server');
            const fakeResult = yield app.getServer(FakeServer);
            testlab_1.expect(fakeResult.constructor.name).to.equal(FakeServer.name);
            const AnotherResult = yield app.getServer(AnotherServer);
            testlab_1.expect(AnotherResult.constructor.name).to.equal(AnotherServer.name);
        }));
    });
    describe('start', () => {
        it('starts all injected servers', () => __awaiter(this, void 0, void 0, function* () {
            const app = new src_1.Application();
            app.component(FakeComponent);
            yield app.start();
            const server = yield app.getServer(FakeServer);
            testlab_1.expect(server).to.not.be.null();
            testlab_1.expect(server.running).to.equal(true);
            yield app.stop();
        }));
        it('does not attempt to start poorly named bindings', () => __awaiter(this, void 0, void 0, function* () {
            const app = new src_1.Application();
            app.component(FakeComponent);
            // The app.start should not attempt to start this binding.
            app.bind('foo.servers').to({});
            yield app.start();
            yield app.stop();
        }));
    });
    function findKeysByTag(ctx, tag) {
        return ctx.findByTag(tag).map(binding => binding.key);
    }
});
class FakeComponent {
    constructor() {
        this.servers = {
            FakeServer,
            FakeServer2: FakeServer,
        };
    }
}
class FakeServer extends context_1.Context {
    constructor() {
        super();
        this.running = false;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.running = true;
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.running = false;
        });
    }
}
class AnotherServer extends FakeServer {
}
//# sourceMappingURL=application.test.js.map