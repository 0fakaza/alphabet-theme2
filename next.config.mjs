/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/v1/create-qr-code/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/turnuvalar", destination: "/tournaments", permanent: true },
      { source: "/hesabim", destination: "/account", permanent: true },
      { source: "/hesabim/bildirimler", destination: "/account/notifications", permanent: true },
      { source: "/hesabim/sinirlar", destination: "/account/limits", permanent: true },
      { source: "/hesabim/cuzdanlarim", destination: "/account/wallets", permanent: true },
      { source: "/hesabim/bonuslarim", destination: "/account/bonuses", permanent: true },
      { source: "/hesabim/gecmis-islemlerim", destination: "/account/transaction-history", permanent: true },
      { source: "/hesabim/hesap-hareketlerim", destination: "/account/account-activity", permanent: true },
      { source: "/hesabim/istatistikler", destination: "/account/statistics", permanent: true },
      { source: "/hesabim/is-ortakligi", destination: "/account/affiliate", permanent: true },
      { source: "/hesabim/kyc", destination: "/account/kyc", permanent: true },
      { source: "/hesabim/iki-asimali-dogrulama", destination: "/account/two-factor-auth", permanent: true },
      { source: "/hesabim/bonus-talep", destination: "/account/bonus-request", permanent: true },
      { source: "/hesabim/arama-talep", destination: "/account/callback-request", permanent: true },
      { source: "/odul-merkezi/gorev-merkezi", destination: "/rewards-center/task-center", permanent: true },
      { source: "/odul-merkezi/odul-yagmuru", destination: "/rewards-center/reward-rain", permanent: true },
      { source: "/odul-merkezi/sans-carki", destination: "/rewards-center/lucky-wheel", permanent: true },
      { source: "/odul-merkezi/market", destination: "/rewards-center/market", permanent: true },
      { source: "/is-ortakligi", destination: "/partnership", permanent: true },
      { source: "/casino/saglayicilar", destination: "/casino/providers", permanent: true },
      { source: "/saglayicilar", destination: "/casino/providers", permanent: true },
    ]
  },
}

export default nextConfig
