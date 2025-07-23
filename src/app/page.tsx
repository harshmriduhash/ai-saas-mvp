"use client";
import { useState } from "react";
import styles from "./page.module.css";

const steps = [
  "Enter your startup idea",
  "AI validates your idea",
  "Landing page generated & deployed",
  "GTM plan created",
  "Book intro call",
  "Track growth metrics"
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState("");
  const [validation, setValidation] = useState<string | null>(null);
  const [lpUrl, setLpUrl] = useState<string | null>(null);
  const [gtm, setGtm] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [bookingUrl, setBookingUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Placeholder handlers for each step
  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setValidation(null);
    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      setValidation(data.summary || data.error || "No response");
      setStep(1);
    } catch (err) {
      setValidation("Validation failed. Try again.");
    }
    setLoading(false);
  };

  const handleValidationContinue = async () => {
    setLoading(true);
    setLpUrl(null);
    try {
      const res = await fetch("/api/lp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      setLpUrl(data.url || "https://your-landing-page.vercel.app");
      setStep(2);
    } catch (err) {
      setLpUrl("https://your-landing-page.vercel.app");
      setStep(2);
    }
    setLoading(false);
  };

  const handleLpContinue = async () => {
    setLoading(true);
    setGtm(null);
    try {
      const res = await fetch("/api/gtm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const data = await res.json();
      setGtm(data.plan || data.error || "No plan generated.");
      setStep(3);
    } catch (err) {
      setGtm("GTM plan failed. Try again.");
      setStep(3);
    }
    setLoading(false);
  };

  const handleGtmContinue = async () => {
    setLoading(true);
    setBookingUrl(null);
    try {
      const res = await fetch("/api/booking", { method: "POST" });
      const data = await res.json();
      setBookingUrl(data.url || "https://calendly.com/your-link");
      setStep(4);
    } catch (err) {
      setBookingUrl("https://calendly.com/your-link");
      setStep(4);
    }
    setLoading(false);
  };

  const handleBookingContinue = async () => {
    setLoading(true);
    setMetrics(null);
    try {
      const res = await fetch("/api/metrics");
      const data = await res.json();
      setMetrics(data);
      setStep(5);
    } catch (err) {
      setMetrics({ users: 0, signups: 0, calls: 0 });
      setStep(5);
    }
    setLoading(false);
  };

  return (
    <div className={styles.page} style={{ minHeight: "100vh", justifyContent: "center" }}>
      <main className={styles.main} style={{ maxWidth: 420, width: "100%" }}>
        <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>AI SaaS Startup Teammate</h1>
        <p style={{ color: "#888", fontSize: 16, marginBottom: 24 }}>Validate, launch, and grow your idea in minutes.</p>
        <ol style={{ marginBottom: 32, color: "#aaa", fontSize: 14 }}>
          {steps.map((s, i) => (
            <li key={i} style={{ opacity: step === i ? 1 : 0.5, fontWeight: step === i ? 600 : 400 }}>{s}</li>
          ))}
        </ol>
        {/* Step 0: Idea input */}
        {step === 0 && (
          <form onSubmit={handleIdeaSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <textarea
              required
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="Describe your startup idea..."
              className={styles.textarea}
            />
            <button type="submit" className={styles.primary} disabled={loading}>
              {loading ? "Validating..." : "Validate Idea"}
            </button>
          </form>
        )}
        {/* Step 1: Validation */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fafafa", borderRadius: 8, padding: 16, fontSize: 15 }}>{validation}</div>
            <button className={styles.primary} onClick={handleValidationContinue} disabled={loading}>
              {loading ? "Building LP..." : "Continue to Landing Page"}
            </button>
          </div>
        )}
        {/* Step 2: LP */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fafafa", borderRadius: 8, padding: 16, fontSize: 15 }}>
              Landing page deployed: <a href={lpUrl!} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3" }}>{lpUrl}</a>
            </div>
            <button className={styles.primary} onClick={handleLpContinue} disabled={loading}>
              {loading ? "Planning GTM..." : "Continue to GTM Plan"}
            </button>
          </div>
        )}
        {/* Step 3: GTM */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fafafa", borderRadius: 8, padding: 16, fontSize: 15 }}>{gtm}</div>
            <button className={styles.primary} onClick={handleGtmContinue} disabled={loading}>
              {loading ? "Getting Calendly..." : "Book Intro Call"}
            </button>
          </div>
        )}
        {/* Step 4: Booking */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <a href={bookingUrl!} target="_blank" rel="noopener noreferrer" className={styles.primary} style={{ textAlign: "center" }}>
              Book a call on Calendly
            </a>
            <button className={styles.secondary} onClick={handleBookingContinue} disabled={loading}>
              {loading ? "Loading metrics..." : "View Metrics Dashboard"}
            </button>
          </div>
        )}
        {/* Step 5: Metrics */}
        {step === 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#fafafa", borderRadius: 8, padding: 16, fontSize: 15 }}>
              <b>Growth Metrics</b>
              <ul style={{ marginTop: 8 }}>
                <li>Users: {metrics?.users}</li>
                <li>Signups: {metrics?.signups}</li>
                <li>Calls Booked: {metrics?.calls}</li>
              </ul>
            </div>
            <button className={styles.primary} onClick={() => setStep(0)}>
              Start New Idea
            </button>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
          MVP by AI SaaS Teammate
        </a>
      </footer>
    </div>
  );
}
