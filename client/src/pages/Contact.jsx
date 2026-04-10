import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here (e.g., API call)
    console.log("Form submitted:", formData);
    setSubmitStatus(
      "Thank you for your message! We will get back to you soon.",
    );
    // Clear the form
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Clear the status message after a few seconds
    setTimeout(() => {
      setSubmitStatus("");
    }, 5000);
  };

  return (
    <>
      <div className="min-h-screen bg-[#f5e6d3] py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          {/* Main Heading Section */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-red-900 tracking-tight sm:text-5xl">
              Get in Touch
            </h2>
            <p className=" max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              We'd love to hear from you. Please fill out the form below or
              reach out to us directly.
            </p>
          </div>

          {/* Responsive Grid Container for Desktop */}
          {/* On large screens, this creates a 2-column layout with the form on the left and info/map on the right */}
          {/* On mobile, the content will stack in a single column */}
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Contact Form Section */}
            <div className="lg:order-1">
              <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a message
                </h3>
                {submitStatus && (
                  <div className="mb-4 text-center py-2 px-4 rounded-md text-sm font-medium bg-green-100 text-green-800">
                    {submitStatus}
                  </div>
                )}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information & Map Section */}
            <div className="mt-8 lg:mt-0 lg:order-2">
              <h3 className="text-2xl font-bold text-red-900">
                Company Information
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Feel free to connect with us through any of the following
                channels.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-gray-500" />
                  <span className="text-gray-700">
                    Allredz Masale, Main Road,Gate No-01 A/P:Chaklamba,
                    Tal.Georai,Dist.Beed,431130(Maharashtra)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-gray-500" />
                  <span className="text-gray-700">+91 7755988986</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-gray-500" />
                  <span className="text-gray-700">
                    support@allredz.com <br />
                    www.allredz.com
                  </span>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-xl">
                <h3 className="sr-only">Our Location</h3>
                <iframe
                  title="Google Map of Spices Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.116664536696!2d144.96305781531698!3d-37.81421797975141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x6a05e55e00311d4d!2sSpices%20of%20India%20Pty%20Ltd!5e0!3m2!1sen!2sau!4v1678253198086!5m2!1sen!2sau"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
