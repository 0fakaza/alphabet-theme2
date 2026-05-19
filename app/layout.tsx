import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import "./style/main.scss"

import { ThemeProvider } from "@/components/theme-provider"
import { AccountPanelProvider } from "@/components/providers/account-panel-provider"
import { MobileMenuProvider } from "@/components/providers/mobile-menu-provider"
import { LoginModalProvider } from "@/components/providers/login-modal-provider"
import { RegisterModalProvider } from "@/components/providers/register-modal-provider"
import { ForgotPasswordModalProvider } from "@/components/providers/forgot-password-modal-provider"
import { WalletModalProvider } from "@/components/providers/wallet-modal-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils";
import Header from "@/components/header"
import Footer from "@/components/footer"
import TopBanner from "@/components/top-banner"
import BottomBar from "@/components/bottom-bar"
import { MobileMenu } from "@/components/mobile-menu"
import { LoginModal } from "@/components/login-modal"
import { RegisterModal } from "@/components/register-modal"
import { ForgotPasswordModal } from "@/components/forgot-password-modal"
import { WalletModal } from "@/components/wallet-modal"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body className="bg-background-body">
        <ThemeProvider>
          <TooltipProvider>
          <AuthProvider>
          <LoginModalProvider>
            <RegisterModalProvider>
              <ForgotPasswordModalProvider>
                <WalletModalProvider>
                  <AccountPanelProvider>
                    <MobileMenuProvider>
                      <TopBanner />
                      <Header />
                      <MobileMenu />
                      <div className="pb-10 md:pb-0">
                        {children}
                      </div>
                      <Footer />
                      <BottomBar />
                      <LoginModal />
                      <RegisterModal />
                      <ForgotPasswordModal />
                      <WalletModal />
                      <Toaster
                        position="bottom-center"
                        closeButton
                        toastOptions={{
                          classNames: {
                            toast: "!bg-background-elements !border !border-element-border !shadow-xl !rounded-2xl",
                            title: "!text-text-title !font-semibold",
                            description: "!text-text-subtext",
                            closeButton: "!bg-background-modal !border-element-border !text-icon hover:!text-text-main",
                            success: "!text-green-400",
                          },
                        }}
                      />
                    </MobileMenuProvider>
                  </AccountPanelProvider>
                </WalletModalProvider>
              </ForgotPasswordModalProvider>
            </RegisterModalProvider>
          </LoginModalProvider>
          </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
