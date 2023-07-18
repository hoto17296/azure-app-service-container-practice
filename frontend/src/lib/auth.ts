import { useState, useEffect } from 'react'

interface AuthMeResponse {
  user_id: string
  user_claims: { typ: string; val: string }[]
}

export interface UserInfo {
  userId: string
  name: string
}

/**
 * Azure App Service の組み込み Azure AD 認証のトークンストアからログイン中ユーザの情報を取得する Hooks
 * 参考： https://learn.microsoft.com/ja-jp/azure/app-service/configure-authentication-oauth-tokens
 */
export function getUserInfo(): UserInfo | undefined {
  const [userInfo, setUserInfo] = useState<UserInfo>()
  useEffect(() => {
    async function fetchUserInfo() {
      const res = await fetch('/.auth/me', { redirect: 'manual' })
      if (res.redirected) {
        location.href = res.url
        return setUserInfo(undefined)
      }
      if (!res.ok) throw new Error()
      const body = (await res.json())[0] as AuthMeResponse
      const userId = body.user_id
      const userClaims: { [typ: string]: string } = {}
      body.user_claims.forEach((a) => (userClaims[a.typ] = a.val))
      setUserInfo({
        userId: userId,
        name: userClaims.name,
      })
    }
    fetchUserInfo()
  }, [])
  return userInfo
}
