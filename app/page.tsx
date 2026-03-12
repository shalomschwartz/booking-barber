import { BookingProvider } from "@/context/BookingContext";
import { BookingFlow } from "@/components/BookingFlow";

export default function HomePage() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  );
}
