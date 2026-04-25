import type { CryptoService } from '../../application/services/crypto-service'

export class FakeCryptoService implements CryptoService {
	async hash(plain: string) {
		return plain.concat('-hashed')
	}

	async compare(plain: string, hash: string) {
		return plain.concat('-hashed') === hash
	}
}
