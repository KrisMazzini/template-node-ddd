import type { UsersRepository } from '../../application/repositories/users-repository'
import type { User } from '../../enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
	public items: User[] = []

	async create(user: User) {
		this.items.push(user)
	}

	async findByEmail(email: string) {
		return this.items.find(item => item.email === email) ?? null
	}
}
