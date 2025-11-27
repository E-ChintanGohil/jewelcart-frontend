import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ruler, Hand, AlertCircle } from 'lucide-react';

export default function SizeGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Ruler className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find your perfect fit with our comprehensive jewelry sizing guide.
        </p>
      </div>

      {/* Ring Size */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Hand className="h-6 w-6 text-amber-500" />
            Ring Size Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">India (mm)</th>
                  <th className="p-3 text-left">US Size</th>
                  <th className="p-3 text-left">UK Size</th>
                  <th className="p-3 text-left">Diameter (mm)</th>
                  <th className="p-3 text-left">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [10, 5, 'J', 15.7, 49.3],
                  [11, 5.5, 'K', 16.1, 50.6],
                  [12, 6, 'L', 16.5, 51.9],
                  [13, 6.5, 'M', 16.9, 53.1],
                  [14, 7, 'N', 17.3, 54.4],
                  [15, 7.5, 'O', 17.7, 55.7],
                  [16, 8, 'P', 18.1, 57.0],
                  [17, 8.5, 'Q', 18.5, 58.3],
                  [18, 9, 'R', 19.0, 59.5],
                  [19, 9.5, 'S', 19.4, 60.8],
                  [20, 10, 'T', 19.8, 62.1]
                ].map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{row[0]}</td>
                    <td className="p-3">{row[1]}</td>
                    <td className="p-3">{row[2]}</td>
                    <td className="p-3">{row[3]}</td>
                    <td className="p-3">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How to Measure Ring Size at Home</h4>
            <ol className="space-y-2 text-blue-800 text-sm list-decimal list-inside">
              <li>Wrap a strip of paper/string around your finger</li>
              <li>Mark where it overlaps</li>
              <li>Measure length in mm with ruler</li>
              <li>Find corresponding size in "Circumference" column</li>
            </ol>
            <p className="text-blue-800 text-sm mt-2"><strong>Tip:</strong> Measure at end of day when fingers are largest. Not sure? Contact us for a free ring sizer!</p>
          </div>
        </CardContent>
      </Card>

      {/* Bracelet & Necklace Sizing */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bracelet & Necklace Length Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Bracelet Sizes</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Size</th>
                    <th className="p-2 text-left">Wrist (inches)</th>
                    <th className="p-2 text-left">Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2">XS</td><td className="p-2">5.5-6"</td><td className="p-2">6.5-7"</td></tr>
                  <tr className="border-b"><td className="p-2">S</td><td className="p-2">6-6.5"</td><td className="p-2">7-7.5"</td></tr>
                  <tr className="border-b"><td className="p-2">M</td><td className="p-2">6.5-7"</td><td className="p-2">7.5-8"</td></tr>
                  <tr className="border-b"><td className="p-2">L</td><td className="p-2">7-7.5"</td><td className="p-2">8-8.5"</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Necklace Lengths</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li><strong>14-16":</strong> Choker (sits at collarbone)</li>
                <li><strong>18":</strong> Princess (base of neck)</li>
                <li><strong>20-24":</strong> Matinee (above bust)</li>
                <li><strong>28-36":</strong> Opera (at bust level)</li>
                <li><strong>36"+:</strong> Rope (below bust)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact for Help */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            Need Help with Sizing?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-800">Not sure about your size? We're here to help!</p>
          <div className="space-y-2 text-gray-700 text-sm">
            <p><strong>Free Ring Sizer:</strong> Request a complimentary ring sizer kit (delivered in 2-3 days)</p>
            <p><strong>Video Consultation:</strong> Book a free video call with our jewelry expert</p>
            <p><strong>Contact:</strong> sizing@jewelcart.com | +91 98765 43210</p>
            <p><strong>Complimentary Resizing:</strong> First resize free within 30 days of purchase</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
