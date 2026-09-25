export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[74rem] py-5 text-center text-[0.78rem] leading-relaxed text-haze">
      Built for teaching. All messages are recreations of real scam patterns. Report scams at{' '}
      <a
        href="https://www.scamwatch.gov.au/report-a-scam"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan underline decoration-cyan/50 underline-offset-2 hover:decoration-cyan"
      >
        scamwatch.gov.au
      </a>
      .
    </footer>
  );
}
