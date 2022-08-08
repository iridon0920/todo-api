/**
 * メールアドレス全体の最大文字数
 */
import { HttpException, HttpStatus } from '@nestjs/common'

const EMAIL_TOTAL_LENGTH_LIMIT = 256
/**
 * メールアドレスのローカル部分の最大文字数
 */
const EMAIL_LOCAL_LENGTH_LIMIT = 64
/**
 * メールアドレスのドメイン部分の最大文字数
 */
const EMAIL_DOMAIN_LENGTH_LIMIT = 253

export class Email {
  private readonly value: string
  private readonly regax = new RegExp(
    '^[a-zA-Z0-9_+-]+(\\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\\.)+[a-zA-Z]{2,}$',
  )

  constructor(value: string) {
    this.checkValue(value)
    this.value = value
  }

  toString() {
    return this.value
  }

  private checkValue(value: string) {
    if (!this.regax.test(value)) {
      throw new HttpException(
        'メールアドレスの形式が正しくありません。',
        HttpStatus.BAD_REQUEST,
      )
    }
    if (value.length > EMAIL_TOTAL_LENGTH_LIMIT) {
      throw new HttpException(
        `メールアドレスの長さは${EMAIL_TOTAL_LENGTH_LIMIT}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    const splitValue = value.split('@')
    if (splitValue[0].length > EMAIL_LOCAL_LENGTH_LIMIT) {
      throw new HttpException(
        `メールアドレスのローカル部分の長さは${EMAIL_LOCAL_LENGTH_LIMIT}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
    if (splitValue[1].length > EMAIL_DOMAIN_LENGTH_LIMIT) {
      throw new HttpException(
        `メールアドレスのドメイン部分の長さは${EMAIL_DOMAIN_LENGTH_LIMIT}文字以内にしてください。`,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
