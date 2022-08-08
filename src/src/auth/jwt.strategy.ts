import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from './constants'
import { JwtAuthResult } from '../dto/request/auth/jwt-auth-result'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // JWTをAuthorization Headerから抽出する
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWTの期限が切れていたら401エラーを自動でレスポンスする。
      ignoreExpiration: false,
      // JWTの検証に使う秘密鍵の指定
      secretOrKey: jwtConstants.secret,
    })
  }

  /**
   * JWTの認証が通った場合、このメソッドにJWTからデコードしたJSONを渡して呼び出す。
   *
   * このメソッドの戻り値はControllerの@Request()デコレータが付いたパラメータオブジェクトのuserプロパティに入る
   */
  async validate(payload: {
    userId: string
    email: string
  }): Promise<JwtAuthResult> {
    return { userId: payload.userId, email: payload.email }
  }
}
