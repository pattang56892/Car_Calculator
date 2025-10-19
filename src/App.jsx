import React, { useState } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';

const MonthlyPaymentCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState(19138.00);
  const [tradeIn, setTradeIn] = useState(1000.00);
  const [hstRate, setHstRate] = useState(13);
  const [licenceFee, setLicenceFee] = useState(42.00);
  const [downPayment, setDownPayment] = useState(10000.00);
  const [registrationFee, setRegistrationFee] = useState(169.00);
  const [annualRate, setAnnualRate] = useState(7.99);
  const [months, setMonths] = useState(60);
  
  // Step-by-step calculations
  const netPrice = vehiclePrice - tradeIn;
  const hstAmount = netPrice * (hstRate / 100);
  const totalPurchasePrice = netPrice + hstAmount + licenceFee;
  const amountFinanced = totalPurchasePrice - downPayment;
  const totalLoanAmount = amountFinanced + registrationFee;
  
  // Monthly payment calculations
  const monthlyRate = annualRate / 100 / 12;
  
  // PMT formula
  const monthlyPayment = totalLoanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                         (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalPaid = monthlyPayment * months;
  const totalInterest = totalPaid - totalLoanAmount;
  
  // Comparison with bi-weekly
  const biweeklyRate = annualRate / 100 / 26;
  const biweeklyPayments = 130;
  const biweeklyPayment = totalLoanAmount * (biweeklyRate * Math.pow(1 + biweeklyRate, biweeklyPayments)) / 
                          (Math.pow(1 + biweeklyRate, biweeklyPayments) - 1);
  const biweeklyTotalPaid = biweeklyPayment * biweeklyPayments;
  const biweeklyTotalInterest = biweeklyTotalPaid - totalLoanAmount;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white">
      <div className="mb-6 flex items-center gap-3">
        <Calculator className="w-8 h-8 text-green-600" />
        <h1 className="text-2xl font-bold">Nissan Kick - Monthly Payment Plan (BEST OPTION)</h1>
      </div>

      {/* Success Alert */}
      <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded flex gap-3">
        <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-green-800">Smart Move! Monthly Compounding Saves You Money</p>
          <p className="text-sm text-green-700 mt-1">
            With monthly compounding (12x/year) instead of bi-weekly (26x/year), you'll save <strong>${(biweeklyTotalInterest - totalInterest).toFixed(2)}</strong> in interest over 5 years!
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Adjust Variables</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Vehicle Price</label>
            <input
              type="number"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Trade-In</label>
            <input
              type="number"
              value={tradeIn}
              onChange={(e) => setTradeIn(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Down Payment</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Loan Term (Months)</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Excel-Style Table */}
      <div className="overflow-x-auto border-2 border-gray-300 rounded-lg shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-green-600">
              <th className="border border-gray-300 px-3 py-2 text-white font-bold w-12">Row</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-white font-bold">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-white font-bold w-32">Formula</th>
              <th className="border border-gray-300 px-4 py-2 text-right text-white font-bold w-40">Amount</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            <tr className="bg-yellow-100">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center">1</td>
              <td className="border border-gray-300 px-4 py-3 font-bold" colSpan="3">
                NISSAN KICK - MONTHLY PAYMENT BREAKDOWN - OCT 2025
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">2</td>
              <td className="border border-gray-300 px-4 py-3" colSpan="3"></td>
            </tr>
            <tr className="bg-blue-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">3</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Sales Price</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right">${vehiclePrice.toFixed(2)}</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">4</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Trade-in Allowance</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right">${tradeIn.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">5</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Net Vehicle Price</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D3-D4</td>
              <td className="border border-gray-300 px-4 py-3 text-right font-semibold">${netPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">6</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">H.S.T (13%)</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D5*13%</td>
              <td className="border border-gray-300 px-4 py-3 text-right">${hstAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">7</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Licence Fee</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right">${licenceFee.toFixed(2)}</td>
            </tr>
            <tr className="bg-green-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">8</td>
              <td className="border border-gray-300 px-4 py-3 font-bold">Total Purchase Price</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D5+D6+D7</td>
              <td className="border border-gray-300 px-4 py-3 text-right font-bold">${totalPurchasePrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">9</td>
              <td className="border border-gray-300 px-4 py-3" colSpan="3"></td>
            </tr>
            <tr className="bg-orange-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">10</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Less: Down Payment</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right text-red-600 font-bold">${downPayment.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">11</td>
              <td className="border border-gray-300 px-4 py-3 font-bold">Amount Financed</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D8-D10</td>
              <td className="border border-gray-300 px-4 py-3 text-right font-bold">${amountFinanced.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">12</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Contract Registration Fee</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right">${registrationFee.toFixed(2)}</td>
            </tr>
            <tr className="bg-purple-50 border-2 border-purple-400">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">13</td>
              <td className="border border-gray-300 px-4 py-3 font-bold text-purple-700">Total Loan Amount</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-bold">=D11+D12</td>
              <td className="border border-gray-300 px-4 py-3 text-right font-bold text-purple-700 text-lg">${totalLoanAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">14</td>
              <td className="border border-gray-300 px-4 py-3" colSpan="3"></td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">15</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Annual Interest Rate</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right">{annualRate.toFixed(2)}%</td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">16</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Loan Term (Months)</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Input</td>
              <td className="border border-gray-300 px-4 py-3 text-right">{months}</td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">17</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Compounding Frequency</td>
              <td className="border border-gray-300 px-4 py-3 text-gray-600">Monthly = 12</td>
              <td className="border border-gray-300 px-4 py-3 text-right">12 per year</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">18</td>
              <td className="border border-gray-300 px-4 py-3" colSpan="3"></td>
            </tr>
            <tr className="bg-green-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">19</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Monthly Interest Rate</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D15/100/12</td>
              <td className="border border-gray-300 px-4 py-3 text-right">{(monthlyRate * 100).toFixed(6)}%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">20</td>
              <td className="border border-gray-300 px-4 py-3" colSpan="3"></td>
            </tr>
            <tr className="bg-green-100 border-4 border-green-500">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">21</td>
              <td className="border border-gray-300 px-4 py-3 font-bold text-green-800 text-base">
                MONTHLY PAYMENT
              </td>
              <td className="border border-gray-300 px-4 py-3 text-green-800 font-bold">=PMT(D19,D16,-D13)</td>
              <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-800 text-2xl">
                ${monthlyPayment.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">22</td>
              <td className="border border-gray-300 px-4 py-3" colSpan="3"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">23</td>
              <td className="border border-gray-300 px-4 py-3 font-semibold">Total Amount Paid</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D21*D16</td>
              <td className="border border-gray-300 px-4 py-3 text-right">${totalPaid.toFixed(2)}</td>
            </tr>
            <tr className="bg-green-50">
              <td className="border border-gray-300 px-3 py-3 font-bold text-center bg-gray-100">24</td>
              <td className="border border-gray-300 px-4 py-3 font-bold text-green-700">Total Interest Paid</td>
              <td className="border border-gray-300 px-4 py-3 text-green-700 font-semibold">=D23-D13</td>
              <td className="border border-gray-300 px-4 py-3 text-right font-bold text-green-700 text-lg">
                ${totalInterest.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Comparison Section */}
      <div className="mt-8 p-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Comparison: Monthly vs Bi-Weekly</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-green-50 border-2 border-green-400 rounded-lg">
            <h3 className="font-bold text-green-800 mb-3 text-lg flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Monthly Payments (BEST)
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-bold">${monthlyPayment.toFixed(2)}/month</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Payments:</span>
                <span className="font-bold">{months}</span>
              </div>
              <div className="flex justify-between">
                <span>Compounding:</span>
                <span className="font-bold">Monthly (12x/year)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-green-300">
                <span>Total Interest:</span>
                <span className="font-bold text-green-700">${totalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="font-bold">${totalPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-red-50 border-2 border-red-400 rounded-lg">
            <h3 className="font-bold text-red-800 mb-3 text-lg">Bi-Weekly Payments (WORSE)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-bold">${biweeklyPayment.toFixed(2)}/bi-weekly</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Payments:</span>
                <span className="font-bold">{biweeklyPayments}</span>
              </div>
              <div className="flex justify-between">
                <span>Compounding:</span>
                <span className="font-bold">Bi-weekly (26x/year)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-red-300">
                <span>Total Interest:</span>
                <span className="font-bold text-red-700">${biweeklyTotalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="font-bold">${biweeklyTotalPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold text-green-900 text-lg">YOUR SAVINGS with Monthly Plan:</span>
            <span className="font-bold text-green-700 text-2xl">${(biweeklyTotalInterest - totalInterest).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Key Formula Reference */}
      <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-300 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-4 text-lg">Key Excel Formulas Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-mono">
          <div>
            <p className="text-gray-700 font-sans mb-1">Net Vehicle Price (D5):</p>
            <code className="block bg-white p-2 rounded">=D3-D4</code>
          </div>
          <div>
            <p className="text-gray-700 font-sans mb-1">HST Amount (D6):</p>
            <code className="block bg-white p-2 rounded">=D5*13%</code>
          </div>
          <div>
            <p className="text-gray-700 font-sans mb-1">Total Purchase Price (D8):</p>
            <code className="block bg-white p-2 rounded">=D5+D6+D7</code>
          </div>
          <div>
            <p className="text-gray-700 font-sans mb-1">Amount Financed (D11):</p>
            <code className="block bg-white p-2 rounded">=D8-D10</code>
          </div>
          <div>
            <p className="text-gray-700 font-sans mb-1">Total Loan Amount (D13):</p>
            <code className="block bg-white p-2 rounded">=D11+D12</code>
          </div>
          <div>
            <p className="text-gray-700 font-sans mb-1">Monthly Rate (D19):</p>
            <code className="block bg-white p-2 rounded">=D15/100/12</code>
          </div>
          <div className="md:col-span-2">
            <p className="text-green-700 font-sans mb-1 font-bold">Monthly Payment (D21) - THE KEY FORMULA:</p>
            <code className="block bg-green-100 p-3 rounded font-bold text-base border-2 border-green-400">=PMT(D19, D16, -D13)</code>
            <p className="text-xs text-gray-600 mt-2 font-sans">
              With actual values: <code className="bg-white px-2 py-1 rounded">=PMT(7.99%/12, 60, -10706.94)</code>
            </p>
            <p className="text-xs text-gray-600 mt-1 font-sans">
              This calculates: <strong>${monthlyPayment.toFixed(2)}</strong> per month
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-700 font-sans mb-1">Total Interest Paid (D24):</p>
            <code className="block bg-white p-2 rounded">=D23-D13</code>
            <p className="text-xs text-gray-600 mt-1 font-sans">
              Or directly: <code className="bg-white px-2 py-1 rounded">=(D21*D16)-D13</code>
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg border-2 border-gray-400">
        <h3 className="font-bold text-gray-800 mb-3">Summary</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ <strong>Monthly payment:</strong> ${monthlyPayment.toFixed(2)} for {months} months</li>
          <li>✅ <strong>Total interest:</strong> ${totalInterest.toFixed(2)} (with monthly compounding)</li>
          <li>✅ <strong>You save:</strong> ${(biweeklyTotalInterest - totalInterest).toFixed(2)} compared to bi-weekly compounding</li>
          <li>✅ <strong>Down payment:</strong> ${downPayment.toFixed(2)} reduces your loan significantly</li>
        </ul>
      </div>
    </div>
  );
};

export default MonthlyPaymentCalculator;