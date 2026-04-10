import React from "react";
// ❌ Note: The 'hero' image import is removed since the image block is gone.
// import hero from "../assets/about.png";

const AboutUs = () => {
  return (
    // Main section with consistent brand background
    <section className="bg-[#f5e6d3] py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        {/* 1. HEADER (No Change) */}
        <header className="text-center mb-10">
          <h2 className="text-red-900 text-base font-bold uppercase tracking-[0.3em] mb-4 border-b-2 border-red-900 inline-block px-4 pb-1">
            ABOUT ALLREDZ
          </h2>
          <h1 className="text-black font-extrabold text-4xl sm:text-6xl leading-tight">
            The Science of Spice,{" "}
            <span className="text-red-800">Mastered.</span>
          </h1>
        </header>

        {/* ⭐️ 2. NEW BRANDED FEATURE SECTION (Replaces Image) ⭐️ */}
        <div className="mb-20">
          <h3 className="text-center text-3xl font-bold text-red-900 mb-8">
            The Allredz Difference: Engineered for Excellence
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Feature Card 1: Precision */}
            <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-red-800 text-center">
              <span className="text-4xl text-red-800 font-extrabold block mb-2">
                🔬
              </span>
              <p className="font-bold text-lg text-red-900">
                Scientific Precision
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Chemical engineering principles ensure perfect blend ratios
                every time.
              </p>
            </div>

            {/* Feature Card 2: Purity */}
            <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-red-800 text-center">
              <span className="text-4xl text-red-800 font-extrabold block mb-2">
                ✅
              </span>
              <p className="font-bold text-lg text-red-900">
                Zero Adulteration
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Guaranteed 100% pure spices, laboratory-tested for safety and
                quality.
              </p>
            </div>

            {/* Feature Card 3: Potency */}
            <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-red-800 text-center">
              <span className="text-4xl text-red-800 font-extrabold block mb-2">
                ⚡
              </span>
              <p className="font-bold text-lg text-red-900">Maximum Potency</p>
              <p className="text-sm text-gray-600 mt-1">
                Advanced milling and packaging locks in freshness and intense
                flavor.
              </p>
            </div>

            {/* Feature Card 4: Origin */}
            <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-red-800 text-center">
              <span className="text-4xl text-red-800 font-extrabold block mb-2">
                🇮🇳
              </span>
              <p className="font-bold text-lg text-red-900">
                Authentic Sourcing
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Deep roots in Maharashtra ensuring the most authentic Indian
                taste.
              </p>
            </div>
          </div>
        </div>
        {/* ⭐️ END OF NEW BRANDED FEATURE SECTION ⭐️ */}

        {/* 3. Content Block: Founder, Brand Focus, and Products (No change) */}
        <div className="grid md:grid-cols-3 gap-10 text-gray-800">
          {/* Column 1: Founder's Story & Expertise */}
          <div className="space-y-6 md:col-span-1 border-r md:border-r-[3px] border-red-400/50 md:pr-8">
            <h3 className="text-2xl font-bold text-red-800 border-b pb-2">
              Driven by Expertise
            </h3>

            {/* Founder Box with Icon and Local Detail */}
            <div className="bg-red-900 text-white p-4 rounded-lg shadow-xl flex items-start">
              <svg
                className="w-8 h-8 mr-3 mt-1 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div>
                <p className="font-extrabold text-xl mb-1">
                  Samad Sayyad - Founder
                </p>
                <p className="text-sm italic border-t border-white/50 pt-2">
                  Hailing from **Beed, Maharashtra**, Samad Sayyad (Chemical
                  Engineer & former Assistant Manager) applies scientific
                  precision to the ancient art of spice blending, ensuring
                  unparalleled consistency and purity in every **Allredz**
                  product.
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed">
              His unique professional background is the secret behind
              **Allredz**'s superior quality. We don't just mix spices; we
              **engineer the perfect flavor profile**, making premium cooking
              effortless for you. Our roots in Maharashtra strengthen our
              commitment to authentic Indian flavors.
            </p>
          </div>

          {/* Column 2: Core Philosophy & Purity */}
          <div className="space-y-6 md:col-span-1">
            <h3 className="text-2xl font-bold text-red-800 border-b pb-2">
              The Allredz Philosophy
            </h3>
            <p className="text-base leading-relaxed">
              At **Allredz**, **purity is non-negotiable**. Using cutting-edge
              quality control paired with **traditional sourcing**, we promise
              spices that are guaranteed:
            </p>

            {/* Feature List (Purity Focus) */}
            <ul className="space-y-3">
              <li className="flex items-center text-black font-semibold">
                <span className="text-red-800 mr-3 text-lg font-extrabold">
                  ✓
                </span>{" "}
                **100% Zero Adulteration**
              </li>
              <li className="flex items-center text-black font-semibold">
                <span className="text-red-800 mr-3 text-lg font-extrabold">
                  ✓
                </span>{" "}
                Farm-to-Packet **Maximum Potency**
              </li>
              <li className="flex items-center text-black font-semibold">
                <span className="text-red-800 mr-3 text-lg font-extrabold">
                  ✓
                </span>{" "}
                Finely Milled for **Perfect Texture**
              </li>
            </ul>

            <blockquote className="border-l-4 border-yellow-600 pl-4 italic text-red-900 font-medium bg-white p-3 rounded-md shadow-inner">
              "Experience the difference that science and passion bring to
              flavor."
            </blockquote>
          </div>

          {/* Column 3: Product Range & Accessibility */}
          <div className="space-y-6 md:col-span-1 border-l md:border-l-[3px] border-red-400/50 md:pl-8">
            <h3 className="text-2xl font-bold text-red-800 border-b pb-2">
              Our Signature Masalas
            </h3>

            <p className="text-base leading-relaxed">
              **Allredz** is dedicated to perfecting the **core flavors** of
              Indian cuisine, ensuring you get restaurant-quality taste at home.
              Our signature range includes:
            </p>

            {/* Product List Box */}
            <div className="p-4 bg-white rounded-lg shadow-md border-t-2 border-red-700">
              <p className="text-lg font-extrabold text-red-900 mb-2 uppercase tracking-wide">
                The Essential Allredz Trio:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2 text-gray-700">
                <li className="font-medium">**Chicken & Meat Masala**</li>
                <li className="font-medium">
                  **Garam Masala** (The Essential Blend)
                </li>
                <li className="font-medium">**Biryani Masala** (Grade A)</li>
              </ul>
              <p className="text-sm mt-3 pt-3 border-t">
                Available in **50g** and **100g** packs, engineered for
                convenience and flavor lock.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
