import { Entity, type EntityArgs } from '@/core/entities/entity'

export interface UserProps {
	name: string
	email: string
	passwordHash: string
}

export class User extends Entity<UserProps> {
	get name() {
		return this.props.name
	}

	get email() {
		return this.props.email
	}

	get passwordHash() {
		return this.props.passwordHash
	}

	set name(value: string) {
		this.props.name = value
		this.touch()
	}

	set email(value: string) {
		this.props.email = value
		this.touch()
	}

	set passwordHash(value: string) {
		this.props.passwordHash = value
		this.touch()
	}

	static create(props: UserProps, args?: EntityArgs) {
		return new User(props, args)
	}
}
