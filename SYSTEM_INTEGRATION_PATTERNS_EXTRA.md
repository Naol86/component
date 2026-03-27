### API Gateway + Message Bus (Addendum)

Pattern summary:
- Use an API Gateway to accept and validate external requests, then publish work to a message bus for asynchronous processing. This decouples request handling from long-running processing.

Guidance:
- Ensure idempotency by including an idempotency key in messages when retries are possible.
- Use exponential backoff with jitter for retries and cap max retries to avoid infinite loops.
- Propagate tracing headers and a correlation ID from the gateway through the message bus into downstream services to support observability.

Recommended metrics:
- Request-to-ack latency
- Message retries count
- Processing success/failure rate

Observability:
- Propagate correlation IDs and trace headers; collect spans and logs to link end-to-end workflows.
