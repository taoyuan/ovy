/**
 * Defines the requirements to implement a Server for LoopBack applications:
 * start() : Promise<void>
 * stop() : Promise<void>
 * It is recommended that each Server implementation creates its own child
 * Context, which inherits from the parent Application context. This way,
 * any Server-specific bindings will remain local to the Server instance,
 * and will avoid polluting its parent module scope.
 *
 * @export
 * @interface Server
 */
export interface Server {
  /**
   * Start the server
   */
  start(): Promise<void>;
  /**
   * Stop the server
   */
  stop(): Promise<void>;
}
