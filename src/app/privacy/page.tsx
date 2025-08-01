"use client";

import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors duration-200 mb-4 inline-block"
            >
              ← Back to YoutLoop
            </Link>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: January 8, 2024</p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Introduction
              </h2>
              <p>
                YoutLoop (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
                respects your privacy and is committed to protecting your
                personal data. This privacy policy explains how we handle any
                personal information when you use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Information We Collect
              </h2>
              <p>We collect minimal information to provide our service:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Browser local storage data for saving your preferences</li>
                <li>YouTube video IDs that you input for looping</li>
                <li>Basic usage data through client-side analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                How We Use Your Information
              </h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Save your video looping preferences locally</li>
                <li>Improve our website functionality</li>
                <li>Analyze usage patterns to enhance user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Third-Party Services
              </h2>
              <p>
                We use YouTube&apos;s API services to provide video playback
                functionality. Your interaction with YouTube content is subject
                to the{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-gray-300"
                >
                  YouTube Terms of Service
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Data Storage
              </h2>
              <p>
                All preferences and settings are stored locally in your browser.
                We don&apos;t maintain any servers or databases with user
                information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Clear your local storage data at any time</li>
                <li>Use the service without saving any preferences</li>
                <li>Request information about what data is stored locally</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:youtloop2025@gmail.com"
                  className="text-white underline hover:text-gray-300"
                >
                  youtloop2025@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
