/**
 * This class is used to represent an error that occurred in an Use Case
 */
export abstract class UseCaseError extends Error {
	/**
	 *
	 * @param message - The error message
	 * @param code - The error code
	 * @param statusCode - The HTTP status code
	 * @example
	 * ```typescript
	 * const error = new UseCaseError('User not found', 'USER_NOT_FOUND', 404)
	 * ```
	 */
	constructor(
		public readonly message: string,
		public readonly code: string,
		public readonly statusCode: number
	) {
		super(message)
	}
}
