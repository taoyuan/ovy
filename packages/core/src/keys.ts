import {BindingKey} from '@loopback/context';
import {Application} from './application';

/**
 * Namespace for core binding keys
 */
export namespace CoreBindings {
  // application
  /**
   * Binding key for application instance itself
   */
  export const APPLICATION_INSTANCE = BindingKey.create<Application>(
    'application.instance',
  );

  /**
   * Binding key for application configuration
   */
  export const APPLICATION_CONFIG = BindingKey.create<object>(
    'application.config',
  );

  // server
  /**
   * Binding key for servers
   */
  export const SERVERS = 'servers';
}
