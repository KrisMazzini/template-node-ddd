import { UseCaseError } from '@/core/errors/use-case-error'

export class UserAlreadyExistsError extends UseCaseError {
	constructor(message: string) {
		super(message, 'USER_ALREADY_EXISTS', 409)
	}
}
