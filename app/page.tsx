// File: app/page.tsx
import { useState, useEffect } from 'react';
import { generateText } from 'ai';
import { xai } from '@ai-sdk/xai';
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Owl Carousel for coverflow effect
  useEffect(() => {
    if (typeof window !== 'undefined' && window.jQuery) {
      const $ = window.jQuery;
      $('.owl-carousel').owlCarousel({
        center: true,
        items: 3,
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      });
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { text } = await generateText({
        model: xai('grok-3'),
        system: 'You are a friendly assistant providing concise, accurate answers.',
        prompt: input,
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error: Unable to fetch response. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>3D Coverflow Chatbot</title>
        <meta name="description" content="A revolutionary chatbot with stunning 3D coverflow effects" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />
      </Head>
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" />

      <div className="main-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="owl-carousel owl-banner">
                <div className="item">
                  <img src="https://via.placeholder.com/800x600?text=Mountain+Landscape" alt="Mountain Landscape" />
                  <div className="header-text">
                    <h2>Mountain Landscape</h2>
                    <p>Majestic peaks covered in snow during golden hour</p>
                  </div>
                </div>
                {/* Add more carousel items as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Discover 3D Coverflow</h2>
                <p>A revolutionary way to showcase your visual content with stunning 3D effects and seamless interactions</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-item">
                <img src="https://via.placeholder.com/100?text=Icon" alt="3D Coverflow" />
                <h4>3D Coverflow</h4>
                <p>Transform your image galleries into immersive 3D experiences</p>
                <div className="icon-tags">
                  <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Responsive</span>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="service-text">
                <h3>Elevate Your Gallery Experience</h3>
                <p>3D Coverflow is brought to you by TemplateMo. Transform the way you present images with our cutting-edge 3D coverflow technology...</p>
                <ul>
                  <li>Smooth 3D transitions with hardware acceleration</li>
                  <li>Touch-enabled navigation for mobile devices</li>
                  <li>Customizable autoplay and timing controls</li>
                  <li>Keyboard navigation support</li>
                  <li>Reflection effects for added depth</li>
                </ul>
                <a href="#contact" className="main-button">Start Your Project</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="section contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Get In Touch</h2>
                <p>Have a question? Chat with our AI assistant to create something amazing together.</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-info">
                <h4>Let's Connect</h4>
                <p>We're here to help bring your vision to life...</p>
                <ul>
                  <li><i className="fa fa-envelope"></i> <span>Email: hello@3dcoverflow.com</span></li>
                  <li><i className="fa fa-phone"></i> <span>Phone: +1 (555) 123-4567</span></li>
                  <li><i className="fa fa-map-marker"></i> <span>Address: 123 Design Street, San Francisco, CA 94102</span></li>
                  <li><i className="fa fa-clock-o"></i> <span>Business Hours: Monday - Friday: 9:00 AM - 6:00 PM PST</span></li>
                </ul>
                <h4>Follow Us</h4>
                <ul className="social-icons">
                  <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                  <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="chatbot">
                <div className="chat-window h-96 overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-lg ${
                        msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-green-100'
                      } max-w-[70%]`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="text-center text-gray-500">Thinking...</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <textarea
                    className="flex-1 p-2 border rounded-lg resize-none"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={handleSend}
                    disabled={isLoading}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p>© 2025 3D Coverflow. All rights reserved. | Designed by TemplateMo</p>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="scroll-top"><i className="fa fa-chevron-up"></i></a>
    </>
  );
}
