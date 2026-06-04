const PATTERN =
  "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0' stroke='%23E5E0D8' stroke-width='1'/%3E%3C/svg%3E\")";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{ backgroundImage: PATTERN, backgroundSize: "40px 40px" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 pt-16 pb-8 text-center sm:pt-24">
        <h1 className="font-display text-[40px] font-bold leading-[1.05] text-primary sm:text-[64px]">
          Sewa rumah itu stressful.
          <br />
          <span className="italic text-accent">Harga wajarnya, tidak.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-secondary">
          Ketik area yang kamu incar — kami kasih tahu harga wajarnya.
        </p>
      </div>
    </section>
  );
}
