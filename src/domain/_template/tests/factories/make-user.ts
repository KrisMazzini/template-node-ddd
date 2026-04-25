import { faker } from '@faker-js/faker'
import type { EntityArgs } from '@/core/entities/entity'

import { User, type UserProps } from '../../enterprise/entities/user'

export function makeUser(
	override: Partial<UserProps> = {},
	args: Partial<EntityArgs> = {}
) {
	return User.create(
		{
			name: faker.person.fullName(),
			email: faker.internet.email(),
			passwordHash: faker.internet.password(),
			...override,
		},
		args
	)
}
