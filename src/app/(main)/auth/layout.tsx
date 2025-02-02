import SignInPage from "./signin/page";
export default function AuthLayout() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-light">
        <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
          <SignInPage/>
        </div>
      </div>
    );
  }