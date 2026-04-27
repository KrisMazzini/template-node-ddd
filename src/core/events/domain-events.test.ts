import { DomainEvents } from '@/core/events/domain-events'

import { AggregateRoot } from '../entities/aggregate-root'
import type { UniqueEntityId } from '../entities/value-objects/unique-entity-id'
import type { DomainEvent } from '../events/domain-event'

class CustomAggregateCreated implements DomainEvent {
	public occurredAt: Date
	private aggregate: CustomAggregate

	constructor(aggregate: CustomAggregate) {
		this.aggregate = aggregate
		this.occurredAt = new Date()
	}

	public getAggregateId(): UniqueEntityId {
		return this.aggregate.id
	}
}

class CustomAggregate extends AggregateRoot<null> {
	static create() {
		const aggregate = new CustomAggregate(null)

		aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

		return aggregate
	}
}

describe('Core: Domain Events', () => {
	it('should be able to dispatch and listen to events', async () => {
		const callbackSpy = vi.fn()

		// Subscriber created (listening to the "custom aggregate created" event)
		DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

		// Aggregate created but not persisted to the database
		const aggregate = CustomAggregate.create()

		// The event was created but not dispatched
		expect(aggregate.domainEvents).toHaveLength(1)

		// When the transaction is persisted to the database, the event is dispatched
		DomainEvents.dispatchEventsForAggregate(aggregate.id)

		// Subscriber listens to the event
		expect(callbackSpy).toHaveBeenCalled()

		// The event was dispatched and the aggregate has no more events
		expect(aggregate.domainEvents).toHaveLength(0)
	})
})
