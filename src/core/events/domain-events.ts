/** biome-ignore-all lint/complexity/noStaticOnlyClass: Domain Events is a static class */

import type { AggregateRoot } from '../entities/aggregate-root'
import type { UniqueEntityId } from '../entities/value-objects/unique-entity-id'

import type { DomainEvent } from './domain-event'

// biome-ignore lint/suspicious/noExplicitAny: Callback can be any type of event
type DomainEventCallback = (event: any) => void

export class DomainEvents {
	private static handlersMap: Map<string, DomainEventCallback[]> = new Map()
	private static markedAggregates: AggregateRoot<unknown>[] = []

	public static markAggregateForDispatch(aggregate: AggregateRoot<unknown>) {
		const aggregateFound = !!DomainEvents.findMarkedAggregateById(aggregate.id)

		if (!aggregateFound) {
			DomainEvents.markedAggregates.push(aggregate)
		}
	}

	private static dispatchAggregateEvents(aggregate: AggregateRoot<unknown>) {
		for (const event of aggregate.domainEvents) {
			DomainEvents.dispatch(event)
		}
	}

	private static removeAggregateFromMarkedDispatchList(
		aggregate: AggregateRoot<unknown>
	) {
		const index = DomainEvents.markedAggregates.findIndex(a =>
			a.equals(aggregate)
		)

		DomainEvents.markedAggregates.splice(index, 1)
	}

	private static findMarkedAggregateById(
		id: UniqueEntityId
	): AggregateRoot<unknown> | undefined {
		return DomainEvents.markedAggregates.find(aggregate =>
			aggregate.id.equals(id)
		)
	}

	public static dispatchEventsForAggregate(id: UniqueEntityId) {
		const aggregate = DomainEvents.findMarkedAggregateById(id)

		if (aggregate) {
			DomainEvents.dispatchAggregateEvents(aggregate)
			aggregate.clearEvents()
			DomainEvents.removeAggregateFromMarkedDispatchList(aggregate)
		}
	}

	public static register(
		callback: DomainEventCallback,
		eventClassName: string
	) {
		const handlers = DomainEvents.handlersMap.get(eventClassName) ?? []
		handlers.push(callback)
		DomainEvents.handlersMap.set(eventClassName, handlers)
	}

	public static clearHandlers() {
		DomainEvents.handlersMap.clear()
	}

	public static clearMarkedAggregates() {
		DomainEvents.markedAggregates = []
	}

	private static dispatch(event: DomainEvent) {
		const eventClassName = event.constructor.name
		const handlers = DomainEvents.handlersMap.get(eventClassName)

		if (handlers) {
			for (const handler of handlers) {
				handler(event)
			}
		}
	}
}
