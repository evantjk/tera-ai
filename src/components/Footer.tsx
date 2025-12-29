import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deep-matte-charcoal border-t border-off-white-bone/10 relative z-50">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-heading text-off-white-bone mb-4">TERA</h3>
            <p className="text-base text-off-white-bone/70">
              Your WhatsApp AI Personal Assistant
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-heading text-off-white-bone mb-4">Contact</h4>
            <p className="text-base text-off-white-bone/70 mb-2">
              charles@hellotera.ai
            </p>
            <p className="text-base text-off-white-bone/70 mb-2">
              +60 13-733 6001
            </p>
            <p className="text-base text-off-white-bone/70">
              Petaling Jaya, Selangor
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-heading text-off-white-bone mb-4">Follow Us</h4>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/company/tera-your-personal-ai-assistant/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base text-off-white-bone/70 hover:text-muted-terracotta transition-colors duration-300"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-off-white-bone/10">
          <p className="text-sm text-off-white-bone/50 text-center">
            © {new Date().getFullYear()} TERA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}