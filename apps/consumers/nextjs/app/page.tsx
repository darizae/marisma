import { ComponentFixture } from "./component-fixture";

export default function Page() {
  return (
    <main className="min-h-screen bg-mar-surface p-8 font-mar-sans text-mar-text">
      <div className="mx-auto grid max-w-xl gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Next.js component fixture</h1>
          <p className="mt-3 text-base text-mar-muted">
            Button, Input, Dialog, Checkbox, Select, and DateField render on the
            server and remain interactive after hydration.
          </p>
        </div>
        <ComponentFixture />
      </div>
    </main>
  );
}
