# System Integration Patterns for Components

When building systems out of advanced components, communication is key. Here are the top integration patterns:

## 1. API Gateways
Acts as a single entry point for a group of components, handling cross-cutting concerns like authentication, rate limiting, and routing.

## 2. Event-Driven Architecture (EDA)
Components communicate asynchronously via message brokers (e.g., Kafka, RabbitMQ). This decouples producers of events from consumers, driving high availability.

## 3. Service Mesh
A dedicated infrastructure layer for facilitating service-to-service communications, offering advanced routing, observability, and security features without modifying the component code.
