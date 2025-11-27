import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Droplet, Sun, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function JewelryCareGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Sparkles className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Jewelry Care Guide</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Keep your precious jewelry sparkling for generations with proper care and maintenance.
        </p>
      </div>

      {/* Gold Care */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-amber-500" />
            Gold Jewelry Care
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Do's
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm ml-7">
              <li>• Clean with warm soapy water and soft brush monthly</li>
              <li>• Store separately in soft pouches to prevent scratches</li>
              <li>• Remove before swimming, showering, or exercising</li>
              <li>• Polish with jewelry cloth regularly</li>
              <li>• Get professional cleaning yearly</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm ml-7">
              <li>• Avoid harsh chemicals, bleach, chlorine</li>
              <li>• Don't wear while applying perfume, lotion, hairspray</li>
              <li>• Never store with other jewelry (prevents tangling)</li>
              <li>• Avoid impact with hard surfaces</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Silver Care */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Silver Jewelry Care</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700 text-sm"><strong>Tarnish Prevention:</strong> Store in airtight containers with anti-tarnish strips. Wear regularly (natural oils prevent tarnishing).</p>
          <p className="text-gray-700 text-sm"><strong>Cleaning:</strong> Use silver polish or baking soda paste. Rinse thoroughly and dry completely.</p>
          <p className="text-gray-700 text-sm"><strong>Storage:</strong> Keep away from moisture, rubber, latex. Use individual cloth pouches.</p>
        </CardContent>
      </Card>

      {/* Diamond Care */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-blue-500" />
            Diamond & Gemstone Care
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700 text-sm"><strong>Cleaning:</strong> Soak in warm water with mild detergent for 20 minutes. Use soft toothbrush for crevices. Pat dry with lint-free cloth.</p>
          <p className="text-gray-700 text-sm"><strong>Inspection:</strong> Check settings every 6 months to ensure stones are secure.</p>
          <p className="text-gray-700 text-sm"><strong>Protection:</strong> Remove during heavy physical activities. Diamonds can chip if hit at wrong angle.</p>
        </CardContent>
      </Card>

      {/* Storage Tips */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-500" />
            Storage Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Ideal Storage</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Separate compartments for each piece</li>
                <li>• Soft fabric-lined jewelry box</li>
                <li>• Cool, dry place away from sunlight</li>
                <li>• Anti-tarnish strips for silver</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Travel Storage</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Use travel jewelry organizer</li>
                <li>• Wrap delicate pieces in soft cloth</li>
                <li>• Keep in carry-on luggage</li>
                <li>• Take photos before traveling (insurance)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Services */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader>
          <CardTitle>Professional Maintenance Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-800">We offer lifetime maintenance services for jewelry purchased from Jewelcart:</p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Free cleaning (every 6 months)</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Complimentary inspection</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Minor repairs (first year free)</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Professional polishing</li>
          </ul>
          <p className="text-gray-700 text-sm"><strong>Contact:</strong> support@jewelcart.com | +91 98765 43210</p>
        </CardContent>
      </Card>
    </div>
  );
}
