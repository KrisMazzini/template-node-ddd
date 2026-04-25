/**
 * This class is used to represent an error that occurred in an Entity
 */
export abstract class EntityError extends Error {
	/**
	 *
	 * @param message - The error message
	 * @param code - The error code
	 * @param statusCode - The HTTP status code
	 * @example
	 * ```typescript
	 * const error = new EntityError('Invalid amount', 'INVALID_AMOUNT', 400)
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
