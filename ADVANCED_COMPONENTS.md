# Advanced Component Architectures

## 1. Micro-Frontends
Just as backend systems have been broken down into microservices, the frontend can be divided into micro-frontends. This allows different teams to own specific pieces of the user interface (like a shopping cart or user profile) end-to-end.

## 2. Web Components
Modern UI frameworks are increasingly relying on Web Components—a suite of different technologies allowing you to create reusable custom elements that are framework-agnostic.

## 3. Containerization and Orchestration
In modern CBSD, a component is often packaged as a Docker container. Kubernetes serves as the ultimate Component Orchestrator, managing the lifecycle, scaling, and routing of these independent units across clusters.

### Lifecycle & Isolation

Best practices:
- Initialize local state lazily to avoid unnecessary work at mount.
- Avoid shared mutable singletons across components; prefer injected services or context providers with clear lifecycle.
- Document side-effect boundaries and keep side-effects localized to effect hooks or service layers.

Testing guidance:
- Stub external dependencies when unit-testing component logic.
- Use lifecycle hooks to assert transitions (mount -> update -> unmount) rather than relying solely on snapshot tests.

Example effect pattern (illustrative placeholder):

```javascript
// Pseudocode: subscribe/unsubscribe pattern
useEffect(() => {
	const handle = externalService.subscribe(data => setState(data));
	return () => externalService.unsubscribe(handle);
}, [externalService]);
```

Explanation: ensure cleanup runs on unmount and when dependencies change; mock `externalService` during tests to assert subscribe/unsubscribe interactions.
