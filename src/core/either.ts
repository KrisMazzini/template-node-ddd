/**
 * This class is used to represent a failed result
 */
export class Left<L, R> {
	readonly value: L

	constructor(value: L) {
		this.value = value
	}

	isRight(): this is Right<L, R> {
		return false
	}

	isLeft(): this is Left<L, R> {
		return true
	}
}

/**
 * This class is used to represent a successful result
 */
export class Right<L, R> {
	readonly value: R

	constructor(value: R) {
		this.value = value
	}

	isRight(): this is Right<L, R> {
		return true
	}

	isLeft(): this is Left<L, R> {
		return false
	}
}

export type Either<L, R> = Left<L, R> | Right<L, R>

/**
 * Creates a new Left instance
 * @example
 * ```typescript
 * const result = left('error')
 * ```
 * @param value - The value to create the Left instance with
 */
export const left = <L, R>(value: L): Either<L, R> => {
	return new Left(value)
}

/**
 * Creates a new Right instance
 * @example
 * ```typescript
 * const result = right(10)
 * ```
 * @param value - The value to create the Right instance with
 */
export const right = <L, R>(value: R): Either<L, R> => {
	return new Right(value)
}
