import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function CheckinLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#1a0a0a] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        </main>
      }>
      <LoginForm />
    </Suspense>
  );
}
