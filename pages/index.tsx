import { Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function Home() {
  return (
    <div className={`${montserrat.className} ${roboto.className}`}>
      <h1 className="font-montserrat text-4xl font-bold">Hello World</h1>
      <p className="font-roboto text-lg">
        This is a sample text with Roboto font.
      </p>
    </div>
  );
}
