import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/ui/ImageWithFallback';
import { Package, Truck, Coins, Check, X } from 'lucide-react';

export function SellPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    fullAddress: '',
    apartmentFloor: '',
    landmark: '',
    pickupDate: '',
    timeWindow: '',
    itemTypes: [] as string[],
    bagSize: '',
    itemCount: '',
    notesForDriver: '',
    payoutMethod: '',
    cannotListAction: '',
    donationChoice: '',
    agreeTerms: false,
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (name: string, value: string) => {
    if (name === 'itemTypes') {
      const currentItems = formData.itemTypes;
      const newItems = currentItems.includes(value)
        ? currentItems.filter(item => item !== value)
        : [...currentItems, value];
      setFormData({ ...formData, itemTypes: newItems });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-light mb-4">Pickup Scheduled!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for joining the My Cercle family! We'll contact you shortly to confirm your pickup time.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '',
                phoneNumber: '',
                email: '',
                fullAddress: '',
                apartmentFloor: '',
                landmark: '',
                pickupDate: '',
                timeWindow: '',
                itemTypes: [],
                bagSize: '',
                itemCount: '',
                notesForDriver: '',
                payoutMethod: '',
                cannotListAction: '',
                donationChoice: '',
                agreeTerms: false,
              });
            }}
            className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors"
          >
            SCHEDULE ANOTHER PICKUP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-light mb-6 tracking-wide">
            Welcome to the My Cercle Family!
          </h1>
          <p className="text-lg text-gray-600">
            Turn your pre-loved fashion into cash. It's simple, sustainable, and rewarding.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-light mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-black text-white rounded-full flex items-center justify-center">
                <Package size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg mb-3">Step 1: Gather Your Items</h3>
              <p className="text-sm text-gray-600">
                Collect your pre-loved clothing, bags, and accessories that fit in one or more of our clean out bags.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-black text-white rounded-full flex items-center justify-center">
                <Truck size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg mb-3">Step 2: Schedule Free Pickup</h3>
              <p className="text-sm text-gray-600">
                Fill out the form below and order your clean out bag. We'll pick up from your doorstep.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-black text-white rounded-full flex items-center justify-center">
                <Coins size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg mb-3">Step 3: Get Paid</h3>
              <p className="text-sm text-gray-600">
                Earn money when your items sell. Choose cash or store credit for 10% extra!
              </p>
            </div>
          </div>
        </section>

        {/* What We Accept */}
        <section className="mb-20 bg-gray-50 -mx-4 px-4 md:mx-0 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light mb-8">What We Accept</h2>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check size={20} className="flex-shrink-0 mt-0.5" />
                    <span>Women's Clothing & Shoes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={20} className="flex-shrink-0 mt-0.5" />
                    <span>Kids' Clothing & Shoes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={20} className="flex-shrink-0 mt-0.5" />
                    <span>Handbags, Wallets, Belts, Scarves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={20} className="flex-shrink-0 mt-0.5" />
                    <span>Designer & Luxury Items (subject to authentication)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-4 md:flex-shrink-0">
                <div className="w-40">
                  <div className="aspect-[4/5] bg-white mb-2 overflow-hidden border border-gray-200">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1768693602418-260d828b878d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGZvbGRlZCUyMGNsb3RoZXMlMjBvcmdhbml6ZWR8ZW58MXx8fHwxNzcwMjE4OTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Good Condition"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-center font-medium flex items-center justify-center gap-1.5">
                    <Check size={16} className="text-green-600" />
                    Good Condition
                  </p>
                </div>
                <div className="w-40">
                  <div className="aspect-[4/5] bg-white mb-2 overflow-hidden border border-gray-200">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1724155594107-95c0f5a12b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW1hZ2VkJTIwd29ybiUyMGNsb3RoZXMlMjB0ZWFyfGVufDF8fHx8MTc3MDIxODkyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Not Accepted"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-center font-medium flex items-center justify-center gap-1.5">
                    <X size={16} className="text-red-600" />
                    Not Accepted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Pickup Form */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-light mb-3">Schedule Your Free Pickup</h2>
            <p className="text-gray-600">Fill out the form below and we'll contact you to confirm the pickup time.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">1. Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Address */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">2. Pickup Address</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullAddress" className="block text-sm mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    id="fullAddress"
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="apartmentFloor" className="block text-sm mb-2">
                    Apartment/Floor *
                  </label>
                  <input
                    type="text"
                    id="apartmentFloor"
                    name="apartmentFloor"
                    value={formData.apartmentFloor}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="landmark" className="block text-sm mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">3. Pickup Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="pickupDate" className="block text-sm mb-2">
                    Preferred Pickup Date *
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-3">Preferred Time Window *</label>
                  <div className="space-y-2">
                    {['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 5 PM)', 'Evening (5 PM - 8 PM)'].map((time) => (
                      <label key={time} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="timeWindow"
                          value={time}
                          checked={formData.timeWindow === time}
                          onChange={handleInputChange}
                          required
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Items for Pickup */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">4. Items for Pickup (Check all that apply)</h3>
              <div className="space-y-2">
                {[
                  "Women's Clothing/Shoes",
                  "Men's Clothing/Shoes",
                  "Kids' Clothing/Shoes",
                  'Bags & Wallets',
                  'Accessories (Belts, Scarves, etc.)',
                  'Luxury/Designer Items'
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.itemTypes.includes(item)}
                      onChange={() => handleCheckboxChange('itemTypes', item)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clean Out Bag Order */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-2">5. Clean Out Bag Order</h3>
              <p className="text-sm text-gray-600 mb-4">Each bag holds up to 30 items</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="bagSize" className="block text-sm mb-2">
                    Number of bags *
                  </label>
                  <input
                    type="number"
                    id="bagSize"
                    name="bagSize"
                    value={formData.bagSize}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="Enter number of bags"
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">The clean-out bag fee is a non-refundable commitment fee.</p>
                </div>
                <div>
                  <label htmlFor="itemCount" className="block text-sm mb-2">
                    Actual number of items you're sending *
                  </label>
                  <input
                    type="number"
                    id="itemCount"
                    name="itemCount"
                    value={formData.itemCount}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Notes for Driver */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">6. Notes for the Driver (Optional)</h3>
              <div>
                <label htmlFor="notesForDriver" className="block text-sm mb-2">
                  Special Instructions
                </label>
                <textarea
                  id="notesForDriver"
                  name="notesForDriver"
                  value={formData.notesForDriver}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder='e.g., "Call upon arrival," "Security code," etc.'
                  className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>
            </div>

            {/* Payout Method */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">7. Payout Method</h3>
              <div className="space-y-2">
                {[
                  'Vodafone Cash',
                  'Instapay',
                  'My Cercle Credit (Get 10% extra!)'
                ].map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payoutMethod"
                      value={method}
                      checked={formData.payoutMethod === method}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* If Item Can't Be Listed */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-lg mb-4">8. If an item can't be listed:</h3>
              <p className="text-xs text-gray-600 mb-3">You will receive the items as pictures to be able to decide</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cannotListAction"
                    value="return"
                    checked={formData.cannotListAction === 'return'}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Return to me (A return delivery fee applies)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cannotListAction"
                    value="donate"
                    checked={formData.cannotListAction === 'donate'}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Donate to our community:</span>
                </label>
                
                {formData.cannotListAction === 'donate' && (
                  <div className="ml-6 space-y-2 mt-2">
                    {[
                      'Doulab Saada (for children)',
                      'Ma\'adi Security & Doormen Families'
                    ].map((charity) => (
                      <label key={charity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="donationChoice"
                          value={charity}
                          checked={formData.donationChoice === charity}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{charity}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-gray-50 p-6 text-xs text-gray-600 space-y-3">
              <p>
                <strong>Pricing Policy:</strong> Final pricing is set by My Cercle based on brand, condition, and market value. Sellers earn 70% for items sold over 300 EGP, and 50% for items sold at 300 EGP or less. Designer items go through a different process via our authentication consultant at 7% commission fee.
              </p>
              <p>
                <strong>Listing Window:</strong> Items are listed for a 90-day period. Before this period ends, we will contact you to decide if you'd like them returned or to continue listing.
              </p>
              <p>
                <strong>Return Fee:</strong> A small return delivery fee applies for any returned items (both declined and unsold). This fee will be deducted from your earnings or invoiced separately.
              </p>
              <p>
                <strong>Bag Fee:</strong> The clean-out bag fee is a non-refundable commitment fee.
              </p>
              <p>
                <strong>Personal Information Protection:</strong> Your personal information is protected according to our privacy policies.
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                required
                className="mt-1 w-4 h-4 flex-shrink-0"
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                I confirm that my items are in good condition and from recognizable brands. I agree to the terms.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 hover:bg-gray-800 transition-colors"
            >
              SCHEDULE PICKUP
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
