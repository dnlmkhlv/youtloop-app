"use client";

import Link from "next/link";

export default function Terms() {
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
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-gray-400">Last updated: January 8, 2024</p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using YoutLoop (&quot;the Service&quot;), you
                accept and agree to be bound by the terms and conditions
                outlined in this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Service Description
              </h2>
              <p>
                YoutLoop is a web application that allows users to loop YouTube
                videos with custom start and end points. The service is provided
                &quot;as is&quot; and is subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. YouTube Content
              </h2>
              <p>
                Our service integrates with YouTube&apos;s API services. By
                using YoutLoop, you also agree to be bound by{" "}
                <a
                  href="https://www.youtube.com/t/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-gray-300"
                >
                  YouTube&apos;s Terms of Service
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. User Responsibilities
              </h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Use the service in compliance with all applicable laws</li>
                <li>
                  Not attempt to circumvent, disable, or interfere with the
                  service
                </li>
                <li>
                  Not use the service for any illegal or unauthorized purpose
                </li>
                <li>
                  Respect YouTube&apos;s terms of service and content policies
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Intellectual Property
              </h2>
              <p>
                All rights, title, and interest in and to the Service (excluding
                YouTube content) are and will remain the exclusive property of
                YoutLoop and its licensors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Disclaimer of Warranties
              </h2>
              <p>
                The service is provided on an &quot;as is&quot; and &quot;as
                available&quot; basis. YoutLoop makes no warranties, expressed
                or implied, and hereby disclaims all warranties, including
                without limitation:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Uninterrupted or error-free service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                In no event shall YoutLoop be liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                out of or relating to your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users of any changes by updating the &quot;Last
                updated&quot; date of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                9. Contact Information
              </h2>
              <p>
                For any questions about these Terms of Service, please contact
                us at{" "}
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
