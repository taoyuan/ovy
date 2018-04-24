"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const context_1 = require("@loopback/context");
const src_1 = require("../../src");
describe('Bootstrapping the application', () => {
    context('with user-defined components', () => {
        it('binds all user-defined components to the application context', () => {
            class AuditComponent {
            }
            const app = new src_1.Application();
            app.component(AuditComponent);
            const componentKeys = app.find('components.*').map(b => b.key);
            testlab_1.expect(componentKeys).to.containEql('components.AuditComponent');
            const componentInstance = app.getSync('components.AuditComponent');
            testlab_1.expect(componentInstance).to.be.instanceOf(AuditComponent);
        });
        it('registers all providers from components', () => {
            class FooProvider {
                value() {
                    return 'bar';
                }
            }
            class FooComponent {
                constructor() {
                    this.providers = { foo: FooProvider };
                }
            }
            const app = new src_1.Application();
            app.component(FooComponent);
            const value = app.getSync('foo');
            testlab_1.expect(value).to.equal('bar');
        });
        it('injects component dependencies', () => {
            class ConfigComponent {
                constructor() {
                    this.providers = {
                        greetBriefly: class HelloProvider {
                            value() {
                                return true;
                            }
                        },
                    };
                }
            }
            class BriefGreetingProvider {
                value() {
                    return 'Hi!';
                }
            }
            class LongGreetingProvider {
                value() {
                    return 'Hello!';
                }
            }
            let GreetingComponent = class GreetingComponent {
                constructor(greetBriefly) {
                    this.providers = {
                        greeting: greetBriefly
                            ? BriefGreetingProvider
                            : LongGreetingProvider,
                    };
                }
            };
            GreetingComponent = __decorate([
                __param(0, context_1.inject('greetBriefly')),
                __metadata("design:paramtypes", [Boolean])
            ], GreetingComponent);
            const app = new src_1.Application();
            app.component(ConfigComponent);
            app.component(GreetingComponent);
            testlab_1.expect(app.getSync('greeting')).to.equal('Hi!');
        });
    });
});
//# sourceMappingURL=application.acceptance.js.map