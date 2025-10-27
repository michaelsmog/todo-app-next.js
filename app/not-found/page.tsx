import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <Link href="/" className="text-blue-500 underline">
        Back to Home
      </Link>
    </div>
  );
}
