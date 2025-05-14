import React from 'react';
import { BarChart2, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <BarChart2 className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-lg font-bold">EduAnalytics</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Helping public schools improve educational outcomes through data analytics and evidence-based decision making.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Research Papers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">Data Sources</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">API</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href="mailto:info@eduanalytics.org" className="text-gray-300 hover:text-white transition">
                  info@eduanalytics.org
                </a>
              </li>
              <li className="flex items-center">
                <Github className="h-5 w-5 text-gray-400 mr-2" />
                <a href="https://github.com/eduanalytics" className="text-gray-300 hover:text-white transition">
                  github.com/eduanalytics
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EduAnalytics. Open source educational data platform.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              Made with ❤️ for public education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;