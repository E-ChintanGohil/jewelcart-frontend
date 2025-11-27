import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, CheckCircle, Shield, FileText } from 'lucide-react';

export default function Certifications() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Award className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Authenticity</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Every piece of jewelry comes with proper certification and documentation to guarantee quality and authenticity.
        </p>
      </div>

      {/* BIS Hallmark */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-amber-500" />
            BIS Hallmarking (Gold & Silver)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm">
            All our gold and silver jewelry is BIS hallmarked as per mandatory regulations by the Government of India.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">What is BIS Hallmark?</h4>
              <p className="text-gray-700 text-sm">
                Bureau of Indian Standards (BIS) hallmark is a government certification that guarantees the purity of precious metals. It includes purity grade, BIS logo, jeweler's identification mark, and year of marking.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Purity Standards</h4>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li><strong>22K Gold:</strong> 916 (91.6% pure)</li>
                <li><strong>18K Gold:</strong> 750 (75% pure)</li>
                <li><strong>14K Gold:</strong> 585 (58.5% pure)</li>
                <li><strong>Silver:</strong> 925 Sterling (92.5% pure)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diamond Certificates */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-500" />
            Diamond Certification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 text-sm">
            All diamonds above 0.30 carats come with certification from internationally recognized gemological institutes.
          </p>
          <div className="space-y-3">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-semibold text-blue-900 mb-1">GIA (Gemological Institute of America)</h4>
              <p className="text-blue-800 text-sm">World's most respected diamond grading authority. Provides detailed 4Cs analysis.</p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-semibold text-green-900 mb-1">IGI (International Gemological Institute)</h4>
              <p className="text-green-800 text-sm">Global leader in diamond certification with strict grading standards.</p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h4 className="font-semibold text-purple-900 mb-1">SGL (Solitaire Gemological Laboratories)</h4>
              <p className="text-purple-800 text-sm">India's premier gem certification lab with international recognition.</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg mt-4">
            <h4 className="font-semibold text-gray-900 mb-2">Certificate Includes:</h4>
            <ul className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Carat weight</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Color grade</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Clarity grade</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Cut grade</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Measurements</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Proportions</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Polish & Symmetry</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-600" /> Fluorescence</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Other Gemstones */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Colored Gemstone Certification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-700 text-sm">
            Precious colored gemstones (rubies, sapphires, emeralds) above specified values come with certificates from recognized labs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Certificate Details</h4>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>• Gemstone type and variety</li>
                <li>• Weight in carats</li>
                <li>• Origin (if determinable)</li>
                <li>• Treatment disclosure</li>
                <li>• Color and clarity assessment</li>
              </ul>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Certifying Labs</h4>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>• GIA (Gemological Institute of America)</li>
                <li>• GRS (Gem Research Swisslab)</li>
                <li>• Gubelin</li>
                <li>• IGI India</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Documents */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Additional Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm mb-4">Every purchase includes:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <FileText className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Invoice</h4>
              <p className="text-gray-700 text-xs">GST-compliant purchase invoice</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Warranty Card</h4>
              <p className="text-gray-700 text-xs">Lifetime service warranty</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Shield className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Authenticity Certificate</h4>
              <p className="text-gray-700 text-xs">Company authenticity guarantee</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification */}
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100">
        <CardHeader>
          <CardTitle>Certificate Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-gray-800">You can verify the authenticity of certificates:</p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <span><strong>BIS Hallmark:</strong> Visit www.bis.gov.in for verification</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <span><strong>Diamond Certificates:</strong> Use certificate number on GIA/IGI/SGL websites</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <span><strong>Jewelcart Verification:</strong> Email verify@jewelcart.com with certificate details</span>
            </li>
          </ul>
          <p className="text-gray-700 text-sm mt-4"><strong>Questions?</strong> Contact support@jewelcart.com | +91 98765 43210</p>
        </CardContent>
      </Card>
    </div>
  );
}
