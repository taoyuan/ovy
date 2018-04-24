import {Constructor, Provider, BoundValue} from '@loopback/context';
import {Server} from './server';
import {Application} from './application';

/**
 * A map of name/class pairs for binding providers
 */
export interface ProviderMap {
  [key: string]: Constructor<Provider<BoundValue>>;
}

/**
 * A component declares a set of artifacts so that they cane be contributed to
 * an application as a group
 */
export interface Component {
  /**
   * A map of name/class pairs for binding providers
   */
  providers?: ProviderMap;
  /**
   * A map of name/class pairs for servers
   */
  servers?: {
    [name: string]: Constructor<Server>;
  };

  /**
   * Other properties
   */
  // tslint:disable-next-line:no-any
  [prop: string]: any;
}

/**
 * Mount a component to an Application.
 *
 * @export
 * @param {Application} app
 * @param {Component} component
 */
export function mountComponent(app: Application, component: Component) {
  if (component.providers) {
    for (const providerKey in component.providers) {
      app.bind(providerKey).toProvider(component.providers[providerKey]);
    }
  }

  if (component.servers) {
    for (const serverKey in component.servers) {
      app.server(component.servers[serverKey], serverKey);
    }
  }
}
