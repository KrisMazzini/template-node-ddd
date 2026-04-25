import { type Either, left, right } from '@/core/either'

import { User } from '../../enterprise/entities/user'
import type { UsersRepository } from '../repositories/users-repository'
import type { CryptoService } from '../services/crypto-service'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

type RegisterUseCaseRequest = {
	name: string
	email: string
	password: string
}

type RegisterUseCaseResponse = Either<
	UserAlreadyExistsError,
	{
		user: User
	}
>

export class RegisterUseCase {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly cryptoService: CryptoService
	) {}

	async execute({
		name,
		email,
		password,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const existingUser = await this.usersRepository.findByEmail(email)

		if (existingUser) {
			return left(new UserAlreadyExistsError(email))
		}

		const passwordHash = await this.cryptoService.hash(password)

		const user = User.create({
			name,
			email,
			passwordHash,
		})

		await this.usersRepository.create(user)

		return right({
			user,
		})
	}
}
