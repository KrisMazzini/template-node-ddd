import { makeUser } from '../../tests/factories/make-user'
import { InMemoryUsersRepository } from '../../tests/repositories/in-memory-users-repository'
import { FakeCryptoService } from '../../tests/services/fake-crypto-service'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register-use-case'

let usersRepository: InMemoryUsersRepository
let cryptoService: FakeCryptoService
let sut: RegisterUseCase

describe('Use Case: Register', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		cryptoService = new FakeCryptoService()
		sut = new RegisterUseCase(usersRepository, cryptoService)
	})

	it('should be able to register a new user', async () => {
		const result = await sut.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: '123456',
		})

		expect(result.isRight()).toBe(true)
		expect(result.value).toEqual({
			user: expect.objectContaining({
				name: 'John Doe',
				email: 'john.doe@example.com',
			}),
		})

		expect(usersRepository.items.length).toBe(1)
	})

	it('should hash user password upon registration', async () => {
		const result = await sut.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: '123456',
		})

		const passwordHash = result.isRight()
			? result.value.user.passwordHash
			: null

		expect(passwordHash).toBe('123456-hashed')
	})

	it('should not be able to register twice with the same email', async () => {
		usersRepository.items.push(makeUser({ email: 'john.doe@example.com' }))

		const result = await sut.execute({
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: '123456',
		})

		expect(result.isLeft()).toBe(true)
		expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
	})
})
