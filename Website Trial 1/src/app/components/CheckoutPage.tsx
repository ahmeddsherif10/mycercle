import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, Banknote } from 'lucide-react';

interface CheckoutPageProps {
  total: number;
  onComplete: () => void;
  onBack: () => void;
}

export function CheckoutPage({ total, onComplete, onBack }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Cart</span>
        </button>

        <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-8 text-center">
          CHECKOUT
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-medium mb-4">CONTACT INFORMATION</h2>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-medium mb-4">SHIPPING ADDRESS</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm mb-2">
                        Zip Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-lg font-medium mb-4">PAYMENT METHOD</h2>
                
                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <CreditCard size={24} />
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border-2 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Banknote size={24} />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </button>
                </div>

                {/* Credit Card Fields - Only show when card is selected */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required={paymentMethod === 'card'}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required={paymentMethod === 'card'}
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required={paymentMethod === 'card'}
                          placeholder="123"
                          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3">
                      <Lock size={16} />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                )}

                {/* Cash on Delivery Message - Only show when COD is selected */}
                {paymentMethod === 'cod' && (
                  <div className="bg-amber-50 border border-amber-200 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-medium">
                      <Banknote size={18} />
                      <span>Cash on Delivery Selected</span>
                    </div>
                    <p className="text-sm text-amber-800">
                      You will pay in cash when your order is delivered. Please have the exact amount ready.
                    </p>
                    <p className="text-sm text-amber-800">
                      Total amount to pay: <span className="font-medium">EGP {Math.round(total)}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-4 hover:bg-gray-800 transition-colors"
              >
                {paymentMethod === 'card' ? 'PLACE ORDER' : 'CONFIRM ORDER (PAY ON DELIVERY)'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 md:p-8 sticky top-4">
              <h2 className="text-lg font-medium mb-4">ORDER SUMMARY</h2>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>
                    <span className="text-xs">EGP</span> {Math.round(total - (total > 200 ? 0 : 15))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{total > 200 ? 'FREE' : <><span className="text-xs">EGP</span> 15</>}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 text-lg font-medium">
                  <span>Total</span>
                  <span>
                    <span className="text-xs">EGP</span> {Math.round(total)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-gray-600 border-t border-gray-200 pt-4">
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Free returns within 14 days</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Authenticity guaranteed on all designer items</span>
                </div>
                <div className="flex gap-2">
                  <span>✓</span>
                  <span>Carbon-neutral shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
