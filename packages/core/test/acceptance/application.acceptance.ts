import {expect} from '@loopback/testlab';
import {Constructor, Provider, inject} from '@loopback/context';

import {Application} from '../../src';

describe('Bootstrapping the application', () => {
  context('with user-defined components', () => {
    it('binds all user-defined components to the application context', () => {
      class AuditComponent {}
      const app = new Application();
      app.component(AuditComponent);
      const componentKeys = app.find('components.*').map(b => b.key);
      expect(componentKeys).to.containEql('components.AuditComponent');

      const componentInstance = app.getSync('components.AuditComponent');
      expect(componentInstance).to.be.instanceOf(AuditComponent);
    });

    it('registers all providers from components', () => {
      class FooProvider {
        value() {
          return 'bar';
        }
      }

      class FooComponent {
        providers = {foo: FooProvider};
      }
      const app = new Application();
      app.component(FooComponent);
      const value = app.getSync('foo');
      expect(value).to.equal('bar');
    });

    it('injects component dependencies', () => {
      class ConfigComponent {
        providers = {
          greetBriefly: class HelloProvider {
            value() {
              return true;
            }
          },
        };
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

      class GreetingComponent {
        providers: {
          greeting: Constructor<Provider<string>>;
        };

        constructor(@inject('greetBriefly') greetBriefly: boolean) {
          this.providers = {
            greeting: greetBriefly
              ? BriefGreetingProvider
              : LongGreetingProvider,
          };
        }
      }
      const app = new Application();
      app.component(ConfigComponent);
      app.component(GreetingComponent);

      expect(app.getSync('greeting')).to.equal('Hi!');
    });
  });
});
