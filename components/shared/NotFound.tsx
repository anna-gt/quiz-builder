import Link from 'next/link';
import { Button } from './Button';

interface NotFoundProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

export function NotFound({ 
  title = "Not Found", 
  message = "The requested resource could not be found.",
  showHomeButton = true 
}: NotFoundProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        {showHomeButton && (
          <Link href="/">
            <Button variant="primary">
              Back to Home
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}