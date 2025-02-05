import Button from "@/components/Shared/Button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href={".."}>
            {" "}
            <Button className="px-5 py-2.5 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
              Go Back
            </Button>
          </Link>

          <Link href={"/"}>
            <Button className="px-5 py-2.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Go home page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
