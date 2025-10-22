import React, { useState } from 'react';
import { Calculator, TrendingDown, Download, FileText } from 'lucide-react';

const MonthlyPaymentCalculator = () => {
  const [vehiclePrice, setVehiclePrice] = useState(19138.00);
  const [tradeIn, setTradeIn] = useState(1000.00);
  const [hstRate, setHstRate] = useState(13);
  const [licenceFee, setLicenceFee] = useState(42.00);
  const [downPayment, setDownPayment] = useState(10000.00);
  const [registrationFee, setRegistrationFee] = useState(169.00);
  const [annualRate, setAnnualRate] = useState(7.99);
  const [months, setMonths] = useState(60);

  // New scenario comparison variables
  const [scenarioAInterestRate, setScenarioAInterestRate] = useState(7.99);
  const [scenarioADownPayment, setScenarioADownPayment] = useState(0);
  const [scenarioALumpsum, setScenarioALumpsum] = useState(10000);

  const [scenarioBInterestRate, setScenarioBInterestRate] = useState(8.49);
  const [scenarioBDownPayment, setScenarioBDownPayment] = useState(3000);
  const [scenarioBLumpsum, setScenarioBLumpsum] = useState(7000);

  // Scenario C variables (Pay in full: GIC + PLC)
  const [scenarioCGicAmount, setScenarioCGicAmount] = useState(10000);
  const [scenarioCGicOpportunityCost, setScenarioCGicOpportunityCost] = useState(2.5);
  const [scenarioCPlcInterestRate, setScenarioCPlcInterestRate] = useState(9.21);
  const [scenarioCInsuranceSavings, setScenarioCInsuranceSavings] = useState(2500);

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
  
  // Comparison with bi-weekly (using SAME loan amount for fair comparison)
  const biweeklyRate = annualRate / 100 / 26;
  const biweeklyPayments = 130; // 26 payments/year × 5 years
  const biweeklyPayment = totalLoanAmount * (biweeklyRate * Math.pow(1 + biweeklyRate, biweeklyPayments)) / 
                          (Math.pow(1 + biweeklyRate, biweeklyPayments) - 1);
  const biweeklyTotalPaid = biweeklyPayment * biweeklyPayments;
  const biweeklyTotalInterest = biweeklyTotalPaid - totalLoanAmount;

  // Constants for scenario comparison
  const INITIAL_PERIOD_MONTHS = 6;
  const INITIAL_PERIOD_BIWEEKLY_PAYMENTS = 13; // 6 months * 26 payments/year / 12 months = 13 payments
  const REMAINING_BIWEEKLY_PAYMENTS = 130 - INITIAL_PERIOD_BIWEEKLY_PAYMENTS; // 117 remaining payments

  // Scenario A Calculations (Zero down, 7.99%, $10k lumpsum after 6 months)
  const scenarioAAmountFinanced = totalPurchasePrice - scenarioADownPayment;
  const scenarioATotalLoanAmount = scenarioAAmountFinanced + registrationFee;
  const scenarioABiweeklyRate = scenarioAInterestRate / 100 / 26;

  // Calculate initial 13 bi-weekly payments
  const scenarioAInitialPayment = scenarioATotalLoanAmount * (scenarioABiweeklyRate * Math.pow(1 + scenarioABiweeklyRate, 130)) /
                                   (Math.pow(1 + scenarioABiweeklyRate, 130) - 1);

  // Balance after 13 payments
  let scenarioABalance = scenarioATotalLoanAmount;
  for (let i = 0; i < INITIAL_PERIOD_BIWEEKLY_PAYMENTS; i++) {
    const interestPayment = scenarioABalance * scenarioABiweeklyRate;
    const principalPayment = scenarioAInitialPayment - interestPayment;
    scenarioABalance -= principalPayment;
  }

  // Apply lumpsum payment
  const scenarioABalanceAfterLumpsum = scenarioABalance - scenarioALumpsum;

  // Calculate remaining payments for reduced balance
  const scenarioARemainingPayment = scenarioABalanceAfterLumpsum * (scenarioABiweeklyRate * Math.pow(1 + scenarioABiweeklyRate, REMAINING_BIWEEKLY_PAYMENTS)) /
                                    (Math.pow(1 + scenarioABiweeklyRate, REMAINING_BIWEEKLY_PAYMENTS) - 1);

  const scenarioATotalPaid = (scenarioAInitialPayment * INITIAL_PERIOD_BIWEEKLY_PAYMENTS) +
                             scenarioALumpsum +
                             (scenarioARemainingPayment * REMAINING_BIWEEKLY_PAYMENTS);
  const scenarioATotalInterest = scenarioATotalPaid - scenarioATotalLoanAmount;

  // Scenario B Calculations ($3k down, 8.49%, $7k lumpsum after 6 months)
  const scenarioBAmountFinanced = totalPurchasePrice - scenarioBDownPayment;
  const scenarioBTotalLoanAmount = scenarioBAmountFinanced + registrationFee;
  const scenarioBBiweeklyRate = scenarioBInterestRate / 100 / 26;

  // Calculate initial 13 bi-weekly payments
  const scenarioBInitialPayment = scenarioBTotalLoanAmount * (scenarioBBiweeklyRate * Math.pow(1 + scenarioBBiweeklyRate, 130)) /
                                   (Math.pow(1 + scenarioBBiweeklyRate, 130) - 1);

  // Balance after 13 payments
  let scenarioBBalance = scenarioBTotalLoanAmount;
  for (let i = 0; i < INITIAL_PERIOD_BIWEEKLY_PAYMENTS; i++) {
    const interestPayment = scenarioBBalance * scenarioBBiweeklyRate;
    const principalPayment = scenarioBInitialPayment - interestPayment;
    scenarioBBalance -= principalPayment;
  }

  // Apply lumpsum payment
  const scenarioBBalanceAfterLumpsum = scenarioBBalance - scenarioBLumpsum;

  // Calculate remaining payments for reduced balance
  const scenarioBRemainingPayment = scenarioBBalanceAfterLumpsum * (scenarioBBiweeklyRate * Math.pow(1 + scenarioBBiweeklyRate, REMAINING_BIWEEKLY_PAYMENTS)) /
                                    (Math.pow(1 + scenarioBBiweeklyRate, REMAINING_BIWEEKLY_PAYMENTS) - 1);

  const scenarioBTotalPaid = (scenarioBInitialPayment * INITIAL_PERIOD_BIWEEKLY_PAYMENTS) +
                             scenarioBLumpsum +
                             (scenarioBRemainingPayment * REMAINING_BIWEEKLY_PAYMENTS);
  const scenarioBTotalInterest = scenarioBTotalPaid - scenarioBTotalLoanAmount;

  // Scenario C Calculations (Pay in Full: GIC + PLC)
  // No contract registration fee since paying in full (not financing with dealership)
  const scenarioCTotalPurchasePrice = totalPurchasePrice; // Same base amount

  // GIC opportunity cost over 5 years
  const scenarioCGicFutureValue = scenarioCGicAmount * Math.pow(1 + scenarioCGicOpportunityCost / 100, 5);
  const scenarioCGicOpportunityCostTotal = scenarioCGicFutureValue - scenarioCGicAmount;

  // PLC financing for remaining amount
  const scenarioCPlcAmount = scenarioCTotalPurchasePrice - scenarioCGicAmount;
  const scenarioCPlcBiweeklyRate = scenarioCPlcInterestRate / 100 / 26;
  const scenarioCPlcBiweeklyPayment = scenarioCPlcAmount * (scenarioCPlcBiweeklyRate * Math.pow(1 + scenarioCPlcBiweeklyRate, 130)) /
                                       (Math.pow(1 + scenarioCPlcBiweeklyRate, 130) - 1);
  const scenarioCPlcTotalPaid = scenarioCPlcBiweeklyPayment * 130;
  const scenarioCPlcInterestPaid = scenarioCPlcTotalPaid - scenarioCPlcAmount;

  // Total cost for Scenario C (including opportunity cost, minus insurance savings)
  const scenarioCTotalCost = scenarioCGicAmount + scenarioCGicOpportunityCostTotal + scenarioCPlcTotalPaid - scenarioCInsuranceSavings;
  const scenarioCEffectiveInterest = scenarioCGicOpportunityCostTotal + scenarioCPlcInterestPaid - scenarioCInsuranceSavings;

  // DEALERSHIP'S ORIGINAL OFFER (for separate comparison)
  const dealershipDownPayment = 3042.00;
  const dealershipLoanAmount = 17664.94;
  const dealershipBiweeklyPayment = 165.04;
  const dealershipTotalInterest = 3789.66;

  // Opportunity cost calculations
  const extraDownPayment = downPayment - 3042.00;
  const opportunityRate = 0.025;
  const yearsForOpportunityCost = months / 12;
  const futureValue = extraDownPayment * Math.pow(1 + opportunityRate, yearsForOpportunityCost);
  const interestEarned = futureValue - extraDownPayment;
  const grossSavings = 3789.66 - totalInterest;
  const netSavings = grossSavings - interestEarned;

  // Download as CSV
  const downloadCSV = () => {
    const csvContent = [
      ['Nissan Kick Payment Calculator Report'],
      ['Generated on', new Date().toLocaleDateString()],
      [],
      ['VEHICLE DETAILS'],
      ['Sales Price', vehiclePrice.toFixed(2)],
      ['Trade-in Allowance', tradeIn.toFixed(2)],
      ['Net Vehicle Price', netPrice.toFixed(2)],
      ['H.S.T (13%)', hstAmount.toFixed(2)],
      ['Licence Fee', licenceFee.toFixed(2)],
      ['Total Purchase Price', totalPurchasePrice.toFixed(2)],
      [],
      ['FINANCING DETAILS - YOUR PLAN'],
      ['Down Payment', downPayment.toFixed(2)],
      ['Amount Financed', amountFinanced.toFixed(2)],
      ['Contract Registration Fee', registrationFee.toFixed(2)],
      ['Total Loan Amount', totalLoanAmount.toFixed(2)],
      ['Annual Interest Rate', annualRate + '%'],
      ['Loan Term (Months)', months],
      ['Monthly Interest Rate', (monthlyRate * 100).toFixed(6) + '%'],
      ['Monthly Payment', monthlyPayment.toFixed(2)],
      ['Total Amount Paid', totalPaid.toFixed(2)],
      ['Total Interest Paid', totalInterest.toFixed(2)],
      [],
      ['DEALERSHIP OFFER'],
      ['Down Payment', '3042.00'],
      ['Payment Amount', '165.04 (bi-weekly)'],
      ['Number of Payments', '130'],
      ['Total Interest Paid', '3789.66'],
      ['Total Amount Paid', '21454.60'],
      [],
      ['SAVINGS ANALYSIS'],
      ['Interest Saved (Dealership - Your Plan)', (3789.66 - totalInterest).toFixed(2)],
      [],
      ['OPPORTUNITY COST'],
      ['Extra Down Payment', extraDownPayment.toFixed(2)],
      ['Investment Rate', '2.5% annually'],
      ['Potential Interest Earned (5 years)', interestEarned.toFixed(2)],
      ['Net Savings (After Opportunity Cost)', netSavings.toFixed(2)],
      [],
      ['SCENARIO COMPARISON WITH INSURANCE IMPACT'],
      [],
      ['SCENARIO A (Finance with Dealership)'],
      ['Down Payment', scenarioADownPayment.toFixed(2)],
      ['Interest Rate', scenarioAInterestRate + '%'],
      ['Lumpsum after 6 months', scenarioALumpsum.toFixed(2)],
      ['Total Interest Paid', scenarioATotalInterest.toFixed(2)],
      ['Total Paid (Financing)', scenarioATotalPaid.toFixed(2)],
      ['Extra Insurance Cost', scenarioCInsuranceSavings.toFixed(2)],
      ['TOTAL COST (with Insurance)', (scenarioATotalPaid + scenarioCInsuranceSavings).toFixed(2)],
      [],
      ['SCENARIO C (Pay in Full: GIC + PLC)'],
      ['GIC Amount', scenarioCGicAmount.toFixed(2)],
      ['GIC Opportunity Cost Rate', scenarioCGicOpportunityCost + '%'],
      ['GIC Opportunity Cost Total', scenarioCGicOpportunityCostTotal.toFixed(2)],
      ['PLC Financed Amount', scenarioCPlcAmount.toFixed(2)],
      ['PLC Interest Rate', scenarioCPlcInterestRate + '%'],
      ['PLC Bi-weekly Payment', scenarioCPlcBiweeklyPayment.toFixed(2)],
      ['PLC Total Paid', scenarioCPlcTotalPaid.toFixed(2)],
      ['PLC Interest Paid', scenarioCPlcInterestPaid.toFixed(2)],
      ['Insurance Savings', scenarioCInsuranceSavings.toFixed(2)],
      ['TOTAL COST (GIC + PLC - Insurance)', scenarioCTotalCost.toFixed(2)],
      [],
      ['COMPARISON'],
      ['Scenario A Total Cost', (scenarioATotalPaid + scenarioCInsuranceSavings).toFixed(2)],
      ['Scenario C Total Cost', scenarioCTotalCost.toFixed(2)],
      ['Savings with Scenario C', Math.abs((scenarioATotalPaid + scenarioCInsuranceSavings) - scenarioCTotalCost).toFixed(2)],
      ['Winner', scenarioCTotalCost < (scenarioATotalPaid + scenarioCInsuranceSavings) ? 'Scenario C' : 'Scenario A']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car_payment_calculator.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download as PDF (using browser print)
  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold">Nissan Kick - Monthly Payment Plan (BEST OPTION)</h1>
        </div>
        
        {/* Download Buttons */}
        <div className="flex gap-3">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">HST Rate (%)</label>
            <input
              type="number"
              value={hstRate}
              onChange={(e) => setHstRate(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Licence Fee</label>
            <input
              type="number"
              value={licenceFee}
              onChange={(e) => setLicenceFee(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={annualRate}
              onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Contract Registration Fee</label>
            <input
              type="number"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              step="0.01"
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
        <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Frequency Comparison</h2>
        
        <p className="text-sm text-gray-600 mb-4 italic">
          Comparing payment schedules for the SAME loan amount (${totalLoanAmount.toFixed(2)}):
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-blue-50 border-2 border-blue-400 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-3 text-lg">Monthly Payments</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-bold">${monthlyPayment.toFixed(2)}/month</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Payments:</span>
                <span className="font-bold">{months} payments</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Frequency:</span>
                <span className="font-bold">12 per year</span>
              </div>
              <div className="flex justify-between">
                <span>Compounding:</span>
                <span className="font-bold">Monthly (12x/year)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-300">
                <span>Total Interest:</span>
                <span className="font-bold text-blue-700">${totalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="font-bold">${totalPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-purple-50 border-2 border-purple-400 rounded-lg">
            <h3 className="font-bold text-purple-800 mb-3 text-lg">Bi-Weekly Payments</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Payment Amount:</span>
                <span className="font-bold">${biweeklyPayment.toFixed(2)}/bi-weekly</span>
              </div>
              <div className="flex justify-between">
                <span>Number of Payments:</span>
                <span className="font-bold">{biweeklyPayments} payments</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Frequency:</span>
                <span className="font-bold">26 per year</span>
              </div>
              <div className="flex justify-between">
                <span>Compounding:</span>
                <span className="font-bold">Bi-weekly (26x/year)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-purple-300">
                <span>Total Interest:</span>
                <span className="font-bold text-purple-700">${biweeklyTotalInterest.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="font-bold">${biweeklyTotalPaid.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 border-2 border-amber-400 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-amber-900">Payment Frequency Impact:</span>
                <span className="font-bold text-lg">${Math.abs(biweeklyTotalInterest - totalInterest).toFixed(2)} difference</span>
              </div>
              <p className="text-sm text-amber-800">
                {biweeklyTotalInterest < totalInterest ? (
                  <>
                    <strong>Bi-weekly payments save ${(totalInterest - biweeklyTotalInterest).toFixed(2)}</strong> because you make 26 payments/year 
                    (equivalent to 13 monthly payments), paying down principal faster and reducing total interest.
                  </>
                ) : (
                  <>
                    <strong>Monthly payments save ${(biweeklyTotalInterest - totalInterest).toFixed(2)}</strong> in this scenario. 
                    The difference between payment frequencies is minimal at this rate and term.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Financing Strategy Comparison */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-400 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-purple-800 flex items-center gap-2">
          🎯 Finance Strategy Comparison: Which Option Saves More?
        </h2>

        <p className="text-sm text-gray-700 mb-6 bg-white p-4 rounded border-l-4 border-purple-400">
          <strong>Your Dilemma:</strong> Should you put zero down with 7.99% interest and pay $10k after 6 months,
          or put $3k down with 8.49% interest and pay $7k after 6 months? Let's find out which saves more money!
        </p>

        {/* Input Controls for Scenarios */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-purple-300">
          <h3 className="font-semibold text-purple-700 mb-3">Adjust Scenario Variables</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Scenario A Controls */}
            <div className="p-3 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold text-red-700 mb-2">Scenario A (Zero Down)</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600">Interest Rate (%)</label>
                  <input
                    type="number"
                    value={scenarioAInterestRate}
                    onChange={(e) => setScenarioAInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600">Down Payment</label>
                  <input
                    type="number"
                    value={scenarioADownPayment}
                    onChange={(e) => setScenarioADownPayment(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    step="100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600">Lumpsum After 6 Months</label>
                  <input
                    type="number"
                    value={scenarioALumpsum}
                    onChange={(e) => setScenarioALumpsum(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    step="100"
                  />
                </div>
              </div>
            </div>

            {/* Scenario B Controls */}
            <div className="p-3 bg-blue-50 rounded border border-blue-300">
              <h4 className="font-semibold text-blue-700 mb-2">Scenario B ($3k Down)</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600">Interest Rate (%)</label>
                  <input
                    type="number"
                    value={scenarioBInterestRate}
                    onChange={(e) => setScenarioBInterestRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600">Down Payment</label>
                  <input
                    type="number"
                    value={scenarioBDownPayment}
                    onChange={(e) => setScenarioBDownPayment(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    step="100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600">Lumpsum After 6 Months</label>
                  <input
                    type="number"
                    value={scenarioBLumpsum}
                    onChange={(e) => setScenarioBLumpsum(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    step="100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Excel-Style Calculation Tables */}
        <div className="mb-6">
          <h3 className="font-bold text-purple-800 mb-4 text-lg">📊 Step-by-Step Excel Calculations</h3>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Scenario A Excel Table */}
            <div className="overflow-x-auto border-2 border-red-300 rounded-lg shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-red-600">
                    <th className="border border-gray-300 px-2 py-2 text-white font-bold w-8">Row</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-white font-bold">Scenario A Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-white font-bold w-24">Formula</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-white font-bold w-32">Amount</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="bg-red-100">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center">1</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold" colSpan="3">
                      SCENARIO A: ZERO DOWN + 7.99% + $10K LUMPSUM
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">2</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan="3"></td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">3</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Down Payment</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">Input</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">${scenarioADownPayment.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">4</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Total Loan Amount</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">=D8-D3+D12</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">${scenarioATotalLoanAmount.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">5</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Annual Interest Rate</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">Input</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{scenarioAInterestRate.toFixed(2)}%</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">6</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Bi-weekly Rate</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">=D5/100/26</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{(scenarioABiweeklyRate * 100).toFixed(6)}%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">7</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan="3"></td>
                  </tr>
                  <tr className="bg-green-100 border-2 border-green-500">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">8</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold text-green-800">
                      Initial Bi-weekly Payment
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-green-800 font-bold">=PMT(D6,130,-D4)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-green-800">
                      ${scenarioAInitialPayment.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">9</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Payments for 6 months</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">13 payments</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{INITIAL_PERIOD_BIWEEKLY_PAYMENTS}</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">10</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold">Balance after 6 months</td>
                    <td className="border border-gray-300 px-3 py-2 text-orange-700 font-semibold">Amortization</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold">${scenarioABalance.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">11</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Lumpsum Payment</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">Input</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-purple-600 font-bold">${scenarioALumpsum.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">12</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold">New Balance</td>
                    <td className="border border-gray-300 px-3 py-2 text-purple-700 font-semibold">=D10-D11</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold">${scenarioABalanceAfterLumpsum.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">13</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan="3"></td>
                  </tr>
                  <tr className="bg-blue-100 border-2 border-blue-500">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">14</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold text-blue-800">
                      New Bi-weekly Payment
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-blue-800 font-bold">=PMT(D6,117,-D12)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-blue-800">
                      ${scenarioARemainingPayment.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-red-100">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">15</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold text-red-700">Total Interest Paid</td>
                    <td className="border border-gray-300 px-3 py-2 text-red-700 font-semibold">Complex calc</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-red-700 text-base">
                      ${scenarioATotalInterest.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scenario B Excel Table */}
            <div className="overflow-x-auto border-2 border-blue-300 rounded-lg shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600">
                    <th className="border border-gray-300 px-2 py-2 text-white font-bold w-8">Row</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-white font-bold">Scenario B Description</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-white font-bold w-24">Formula</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-white font-bold w-32">Amount</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="bg-blue-100">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center">1</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold" colSpan="3">
                      SCENARIO B: $3K DOWN + 8.49% + $7K LUMPSUM
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">2</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan="3"></td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">3</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Down Payment</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">Input</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">${scenarioBDownPayment.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">4</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Total Loan Amount</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">=D8-D3+D12</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">${scenarioBTotalLoanAmount.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">5</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Annual Interest Rate</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">Input</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{scenarioBInterestRate.toFixed(2)}%</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">6</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Bi-weekly Rate</td>
                    <td className="border border-gray-300 px-3 py-2 text-green-700 font-semibold">=D5/100/26</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{(scenarioBBiweeklyRate * 100).toFixed(6)}%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">7</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan="3"></td>
                  </tr>
                  <tr className="bg-green-100 border-2 border-green-500">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">8</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold text-green-800">
                      Initial Bi-weekly Payment
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-green-800 font-bold">=PMT(D6,130,-D4)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-green-800">
                      ${scenarioBInitialPayment.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">9</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Payments for 6 months</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">13 payments</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{INITIAL_PERIOD_BIWEEKLY_PAYMENTS}</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">10</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold">Balance after 6 months</td>
                    <td className="border border-gray-300 px-3 py-2 text-yellow-700 font-semibold">Amortization</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold">${scenarioBBalance.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">11</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">Lumpsum Payment</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">Input</td>
                    <td className="border border-gray-300 px-3 py-2 text-right text-indigo-600 font-bold">${scenarioBLumpsum.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">12</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold">New Balance</td>
                    <td className="border border-gray-300 px-3 py-2 text-indigo-700 font-semibold">=D10-D11</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold">${scenarioBBalanceAfterLumpsum.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">13</td>
                    <td className="border border-gray-300 px-3 py-2" colSpan="3"></td>
                  </tr>
                  <tr className="bg-purple-100 border-2 border-purple-500">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">14</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold text-purple-800">
                      New Bi-weekly Payment
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-purple-800 font-bold">=PMT(D6,117,-D12)</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-purple-800">
                      ${scenarioBRemainingPayment.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-blue-100">
                    <td className="border border-gray-300 px-2 py-2 font-bold text-center bg-gray-100">15</td>
                    <td className="border border-gray-300 px-3 py-2 font-bold text-blue-700">Total Interest Paid</td>
                    <td className="border border-gray-300 px-3 py-2 text-blue-700 font-semibold">Complex calc</td>
                    <td className="border border-gray-300 px-3 py-2 text-right font-bold text-blue-700 text-base">
                      ${scenarioBTotalInterest.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Scenario A Details */}
          <div className="p-5 bg-red-50 border-2 border-red-400 rounded-lg">
            <h3 className="font-bold text-red-800 mb-4 text-lg flex items-center gap-2">
              🅰️ Scenario A: Zero Down + 7.99%
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white rounded border border-red-200">
                <h4 className="font-semibold text-gray-700 mb-2">Initial Setup</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-semibold">${scenarioADownPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Loan Amount:</span>
                    <span className="font-semibold">${scenarioATotalLoanAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-semibold">{scenarioAInterestRate}%</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-red-200">
                <h4 className="font-semibold text-gray-700 mb-2">First 6 Months (13 payments)</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Bi-weekly Payment:</span>
                    <span className="font-semibold">${scenarioAInitialPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Balance:</span>
                    <span className="font-semibold">${scenarioABalance.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-red-200">
                <h4 className="font-semibold text-gray-700 mb-2">After Lumpsum Payment</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Lumpsum Payment:</span>
                    <span className="font-semibold text-green-600">${scenarioALumpsum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Balance:</span>
                    <span className="font-semibold">${scenarioABalanceAfterLumpsum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Bi-weekly Payment:</span>
                    <span className="font-semibold">${scenarioARemainingPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Payments:</span>
                    <span className="font-semibold">{REMAINING_BIWEEKLY_PAYMENTS}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-100 rounded border-2 border-red-400">
                <h4 className="font-bold text-red-700 mb-2">Total Costs</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total Amount Paid:</span>
                    <span className="font-bold">${scenarioATotalPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total Interest:</span>
                    <span className="font-bold text-red-700 text-lg">${scenarioATotalInterest.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scenario B Details */}
          <div className="p-5 bg-blue-50 border-2 border-blue-400 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-4 text-lg flex items-center gap-2">
              🅱️ Scenario B: $3k Down + 8.49%
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white rounded border border-blue-200">
                <h4 className="font-semibold text-gray-700 mb-2">Initial Setup</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-semibold">${scenarioBDownPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Loan Amount:</span>
                    <span className="font-semibold">${scenarioBTotalLoanAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-semibold">{scenarioBInterestRate}%</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-blue-200">
                <h4 className="font-semibold text-gray-700 mb-2">First 6 Months (13 payments)</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Bi-weekly Payment:</span>
                    <span className="font-semibold">${scenarioBInitialPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Balance:</span>
                    <span className="font-semibold">${scenarioBBalance.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-blue-200">
                <h4 className="font-semibold text-gray-700 mb-2">After Lumpsum Payment</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Lumpsum Payment:</span>
                    <span className="font-semibold text-green-600">${scenarioBLumpsum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Balance:</span>
                    <span className="font-semibold">${scenarioBBalanceAfterLumpsum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Bi-weekly Payment:</span>
                    <span className="font-semibold">${scenarioBRemainingPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining Payments:</span>
                    <span className="font-semibold">{REMAINING_BIWEEKLY_PAYMENTS}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-100 rounded border-2 border-blue-400">
                <h4 className="font-bold text-blue-700 mb-2">Total Costs</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total Amount Paid:</span>
                    <span className="font-bold">${scenarioBTotalPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total Interest:</span>
                    <span className="font-bold text-blue-700 text-lg">${scenarioBTotalInterest.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Declaration */}
        <div className={`p-6 rounded-lg border-2 ${
          scenarioATotalInterest < scenarioBTotalInterest
            ? 'bg-gradient-to-r from-green-100 to-green-50 border-green-500'
            : 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-500'
        }`}>
          <h3 className={`font-bold text-xl mb-4 flex items-center gap-2 ${
            scenarioATotalInterest < scenarioBTotalInterest ? 'text-green-800' : 'text-yellow-800'
          }`}>
            🏆 THE WINNER: {scenarioATotalInterest < scenarioBTotalInterest ? 'Scenario A (Zero Down)' : 'Scenario B ($3k Down)'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-white rounded border border-gray-300">
              <div className="text-center">
                <div className="text-sm text-gray-600">Interest Difference</div>
                <div className="text-2xl font-bold text-purple-700">
                  ${Math.abs(scenarioATotalInterest - scenarioBTotalInterest).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {scenarioATotalInterest < scenarioBTotalInterest ? 'Scenario A saves' : 'Scenario B saves'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded border border-gray-300">
              <div className="text-center">
                <div className="text-sm text-gray-600">Down Payment Difference</div>
                <div className="text-2xl font-bold text-orange-700">
                  ${Math.abs(scenarioADownPayment - scenarioBDownPayment).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {scenarioADownPayment < scenarioBDownPayment ? 'A pays less upfront' : 'B pays less upfront'}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded border border-gray-300">
              <div className="text-center">
                <div className="text-sm text-gray-600">Total Cash Difference</div>
                <div className="text-2xl font-bold text-indigo-700">
                  ${Math.abs((scenarioATotalPaid + scenarioADownPayment) - (scenarioBTotalPaid + scenarioBDownPayment)).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {(scenarioATotalPaid + scenarioADownPayment) < (scenarioBTotalPaid + scenarioBDownPayment) ? 'A saves total' : 'B saves total'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border border-gray-300">
            <h4 className="font-semibold text-gray-800 mb-2">💡 Economic Analysis:</h4>
            <p className="text-sm text-gray-700">
              {scenarioATotalInterest < scenarioBTotalInterest ? (
                <>
                  <strong>Scenario A is the better choice!</strong> Even with zero down payment and the same interest rate initially,
                  you save <strong>${(scenarioBTotalInterest - scenarioATotalInterest).toFixed(2)}</strong> in total interest.
                  The larger lumpsum payment of ${scenarioALumpsum.toFixed(2)} after 6 months more than compensates for the smaller down payment.
                </>
              ) : (
                <>
                  <strong>Scenario B is the better choice!</strong> The combination of a larger down payment and the ability to make
                  a lumpsum payment results in <strong>${(scenarioATotalInterest - scenarioBTotalInterest).toFixed(2)}</strong> less total interest,
                  despite the higher interest rate of {scenarioBInterestRate}%.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Scenario Formula Reference */}
        <div className="mt-6 p-6 bg-purple-50 border-2 border-purple-300 rounded-lg">
          <h3 className="font-bold text-purple-800 mb-4 text-lg">🧮 Scenario Calculation Formulas Reference</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Formulas */}
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 mb-3">Essential PMT Formulas</h4>

              <div className="p-3 bg-white rounded border border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">1. Initial Bi-weekly Payment (Row 8):</p>
                <code className="block bg-gray-100 p-2 rounded text-xs font-mono">=PMT(rate, nper, -pv)</code>
                <div className="text-xs text-gray-600 mt-1">
                  <div><strong>rate:</strong> Bi-weekly interest rate (Annual Rate ÷ 100 ÷ 26)</div>
                  <div><strong>nper:</strong> Total number of bi-weekly payments (130)</div>
                  <div><strong>pv:</strong> Present value (Total Loan Amount)</div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">2. Balance After 6 Months (Row 10):</p>
                <code className="block bg-gray-100 p-2 rounded text-xs font-mono">Amortization Schedule Loop</code>
                <div className="text-xs text-gray-600 mt-1">
                  For each of 13 payments:<br/>
                  Interest = Balance × Bi-weekly Rate<br/>
                  Principal = Payment - Interest<br/>
                  New Balance = Old Balance - Principal
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">3. New Payment After Lumpsum (Row 14):</p>
                <code className="block bg-gray-100 p-2 rounded text-xs font-mono">=PMT(rate, 117, -new_balance)</code>
                <div className="text-xs text-gray-600 mt-1">
                  <div><strong>rate:</strong> Same bi-weekly rate</div>
                  <div><strong>117:</strong> Remaining payments (130 - 13)</div>
                  <div><strong>new_balance:</strong> Balance after lumpsum (Row 12)</div>
                </div>
              </div>
            </div>

            {/* Specific Examples */}
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 mb-3">Current Calculation Examples</h4>

              <div className="p-3 bg-red-50 rounded border border-red-300">
                <p className="text-sm font-semibold text-red-700 mb-2">Scenario A (Zero Down) Examples:</p>
                <div className="text-xs font-mono space-y-1">
                  <div>Bi-weekly Rate: {scenarioAInterestRate}% ÷ 100 ÷ 26 = {(scenarioABiweeklyRate * 100).toFixed(6)}%</div>
                  <div>Initial Payment: PMT({(scenarioABiweeklyRate * 100).toFixed(6)}%, 130, -{scenarioATotalLoanAmount.toFixed(2)})</div>
                  <div>Result: ${scenarioAInitialPayment.toFixed(2)}</div>
                  <div className="mt-2 pt-2 border-t border-red-200">
                    After Lumpsum: PMT({(scenarioABiweeklyRate * 100).toFixed(6)}%, 117, -{scenarioABalanceAfterLumpsum.toFixed(2)})
                  </div>
                  <div>Result: ${scenarioARemainingPayment.toFixed(2)}</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded border border-blue-300">
                <p className="text-sm font-semibold text-blue-700 mb-2">Scenario B ($3k Down) Examples:</p>
                <div className="text-xs font-mono space-y-1">
                  <div>Bi-weekly Rate: {scenarioBInterestRate}% ÷ 100 ÷ 26 = {(scenarioBBiweeklyRate * 100).toFixed(6)}%</div>
                  <div>Initial Payment: PMT({(scenarioBBiweeklyRate * 100).toFixed(6)}%, 130, -{scenarioBTotalLoanAmount.toFixed(2)})</div>
                  <div>Result: ${scenarioBInitialPayment.toFixed(2)}</div>
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    After Lumpsum: PMT({(scenarioBBiweeklyRate * 100).toFixed(6)}%, 117, -{scenarioBBalanceAfterLumpsum.toFixed(2)})
                  </div>
                  <div>Result: ${scenarioBRemainingPayment.toFixed(2)}</div>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded border border-green-300">
                <p className="text-sm font-semibold text-green-700 mb-2">Key Constants:</p>
                <div className="text-xs font-mono space-y-1">
                  <div>6 months = 13 bi-weekly payments</div>
                  <div>Remaining payments = 130 - 13 = 117</div>
                  <div>26 bi-weekly periods per year</div>
                  <div>Total term = 5 years = 130 payments</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white rounded border border-purple-300">
            <h4 className="font-semibold text-purple-800 mb-2">💡 Excel Implementation Tips:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>• Use <code className="bg-gray-100 px-1 rounded">PMT(rate, nper, pv, [fv], [type])</code> function for payment calculations</div>
              <div>• Create an amortization table to track balance changes over the first 13 payments</div>
              <div>• Remember: PMT returns negative values, so use negative present value or multiply result by -1</div>
              <div>• Use absolute references ($) when copying formulas across cells</div>
              <div>• The "Complex calc" for total interest includes all payments minus principal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Cost Impact Analysis */}
      <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-400 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-emerald-900 flex items-center gap-2">
          🛡️ Insurance Cost Impact: Scenario A vs Scenario C (Pay in Full)
        </h2>

        <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-sm text-yellow-900">
            <strong>Key Insight:</strong> Financing any amount requires full insurance coverage, costing an additional
            <strong> ${(scenarioCInsuranceSavings / 5).toFixed(2)}/year</strong> for 5 years =
            <strong> ${scenarioCInsuranceSavings.toFixed(2)} total</strong>.
            Paying in full allows basic insurance, making Scenario C potentially more attractive despite higher interest rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scenario A */}
          <div className="p-6 bg-white border-2 border-red-400 rounded-lg shadow-md">
            <h3 className="font-bold text-red-800 mb-4 text-lg flex items-center gap-2">
              📊 Scenario A (Previous Winner)
              <span className="text-xs font-normal text-gray-600">(Finance with Dealership)</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-red-50 rounded border border-red-200">
                <div className="font-semibold text-red-700 mb-2">Financing Details:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span className="font-mono">${scenarioADownPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate:</span>
                    <span className="font-mono">{scenarioAInterestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lumpsum (after 6 mo):</span>
                    <span className="font-mono">${scenarioALumpsum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Initial Bi-weekly Payment:</span>
                    <span className="font-mono">${scenarioAInitialPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>After Lumpsum Payment:</span>
                    <span className="font-mono">${scenarioARemainingPayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-red-300">
                <div className="font-semibold text-gray-800 mb-2">Cost Breakdown:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Total Loan Amount:</span>
                    <span className="font-mono">${scenarioATotalLoanAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Interest Paid:</span>
                    <span className="font-mono text-red-600">${scenarioATotalInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                    <span className="font-semibold">Total Paid (Financing):</span>
                    <span className="font-mono font-semibold">${scenarioATotalPaid.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-100 rounded border-2 border-red-500">
                <div className="font-bold text-red-800 mb-2">Insurance Cost Impact:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Extra Insurance Cost:</span>
                    <span className="font-mono text-red-700 font-bold">+${scenarioCInsuranceSavings.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-600 italic mt-1">
                    (Full insurance required for financed vehicles)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-200 rounded-lg border-2 border-red-600">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-900">TOTAL COST:</span>
                  <span className="font-bold text-xl text-red-900">
                    ${(scenarioATotalPaid + scenarioCInsuranceSavings).toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-red-800 mt-1">
                  (Financing + Insurance)
                </div>
              </div>
            </div>
          </div>

          {/* Scenario C */}
          <div className="p-6 bg-white border-2 border-emerald-500 rounded-lg shadow-md">
            <h3 className="font-bold text-emerald-800 mb-4 text-lg flex items-center gap-2">
              🏆 Scenario C (Pay in Full)
              <span className="text-xs font-normal text-gray-600">(GIC + PLC)</span>
            </h3>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200">
                <div className="font-semibold text-emerald-700 mb-2">Payment Strategy:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Total Purchase Price:</span>
                    <span className="font-mono">${scenarioCTotalPurchasePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>From GIC (Emergency Fund):</span>
                    <span className="font-mono">${scenarioCGicAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GIC Opportunity Cost ({scenarioCGicOpportunityCost}%):</span>
                    <span className="font-mono text-orange-600">+${scenarioCGicOpportunityCostTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-emerald-200 pt-1 mt-1">
                    <span>Financed via PLC:</span>
                    <span className="font-mono">${scenarioCPlcAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PLC Interest Rate:</span>
                    <span className="font-mono">{scenarioCPlcInterestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs italic">(CIBC Prime 4.7% + 4.51%)</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between">
                    <span>PLC Bi-weekly Payment:</span>
                    <span className="font-mono">${scenarioCPlcBiweeklyPayment.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-emerald-300">
                <div className="font-semibold text-gray-800 mb-2">Cost Breakdown:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>PLC Total Paid:</span>
                    <span className="font-mono">${scenarioCPlcTotalPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PLC Interest Paid:</span>
                    <span className="font-mono text-orange-600">${scenarioCPlcInterestPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GIC Opportunity Cost:</span>
                    <span className="font-mono text-orange-600">${scenarioCGicOpportunityCostTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                    <span className="font-semibold">Effective Interest Cost:</span>
                    <span className="font-mono font-semibold text-orange-700">
                      ${(scenarioCPlcInterestPaid + scenarioCGicOpportunityCostTotal).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-100 rounded border-2 border-emerald-500">
                <div className="font-bold text-emerald-800 mb-2">Insurance Savings:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Insurance Savings:</span>
                    <span className="font-mono text-emerald-700 font-bold">-${scenarioCInsuranceSavings.toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-gray-600 italic mt-1">
                    (Basic insurance sufficient - no financing)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-200 rounded-lg border-2 border-emerald-600">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-900">TOTAL COST:</span>
                  <span className="font-bold text-xl text-emerald-900">
                    ${scenarioCTotalCost.toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-emerald-800 mt-1">
                  (GIC + PLC - Insurance Savings)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Winner Declaration */}
        <div className="mt-6 p-5 bg-white rounded-lg border-4 border-emerald-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-lg text-emerald-900 mb-2">💰 Bottom Line Comparison:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-red-50 rounded border border-red-300">
                  <div className="text-gray-600 text-xs mb-1">Scenario A Total Cost:</div>
                  <div className="font-bold text-red-700 text-lg">
                    ${(scenarioATotalPaid + scenarioCInsuranceSavings).toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded border border-emerald-300">
                  <div className="text-gray-600 text-xs mb-1">Scenario C Total Cost:</div>
                  <div className="font-bold text-emerald-700 text-lg">
                    ${scenarioCTotalCost.toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 rounded border-2 border-yellow-500">
                  <div className="text-gray-600 text-xs mb-1">You Save with Scenario C:</div>
                  <div className="font-bold text-yellow-900 text-lg">
                    ${Math.abs((scenarioATotalPaid + scenarioCInsuranceSavings) - scenarioCTotalCost).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg border-2 border-emerald-400">
            <p className="text-sm font-semibold text-emerald-900">
              {scenarioCTotalCost < (scenarioATotalPaid + scenarioCInsuranceSavings) ? (
                <>
                  ✅ <strong>Scenario C (Pay in Full) WINS!</strong> Even though the PLC interest rate ({scenarioCPlcInterestRate}%)
                  is higher than Scenario A ({scenarioAInterestRate}%), the insurance savings of ${scenarioCInsuranceSavings.toFixed(2)}
                  make paying in full the better choice. You save <strong>${Math.abs((scenarioATotalPaid + scenarioCInsuranceSavings) - scenarioCTotalCost).toFixed(2)}</strong>
                  overall by avoiding the full insurance requirement.
                </>
              ) : (
                <>
                  ⚠️ <strong>Scenario A is still better!</strong> Despite the insurance savings, the lower interest rate
                  in Scenario A ({scenarioAInterestRate}% vs {scenarioCPlcInterestRate}%) makes it the more cost-effective option.
                </>
              )}
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-300">
            <h5 className="font-semibold text-blue-900 mb-2 text-sm">📝 Key Takeaways:</h5>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Financing requires full insurance: <strong>+${scenarioCInsuranceSavings.toFixed(2)}</strong> over 5 years</li>
              <li>PLC has higher interest ({scenarioCPlcInterestRate}%) but no contract registration fee when paying in full</li>
              <li>GIC opportunity cost: <strong>${scenarioCGicOpportunityCostTotal.toFixed(2)}</strong> over 5 years at {scenarioCGicOpportunityCost}%</li>
              <li>Total effective interest for Scenario C: <strong>${scenarioCEffectiveInterest.toFixed(2)}</strong> (after insurance savings)</li>
            </ul>
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

      {/* Dealership Offer Comparison */}
      <div className="mt-8 p-6 bg-red-50 border-2 border-red-400 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-red-800">📊 Dealership's Original Offer (What They Wanted You to Pay)</h2>
        
        <div className="bg-white p-5 rounded-lg border-2 border-red-300 mb-4">
          <h3 className="font-bold text-gray-800 mb-3">Dealership's Original Offer:</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Down Payment:</span>
              <span className="font-semibold">$3,042.00</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Loan Amount:</span>
              <span className="font-semibold">$17,664.94</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Payment Frequency:</span>
              <span className="font-semibold">Bi-weekly</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Payment Amount:</span>
              <span className="font-semibold text-red-600">$165.04</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Number of Payments:</span>
              <span className="font-semibold">130 (5 years)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold">7.99%</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Compounding:</span>
              <span className="font-semibold">Bi-weekly (26x/year)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600"></span>
              <span className="font-semibold"></span>
            </div>
            <div className="flex justify-between pt-2 col-span-2 border-t-2 border-red-300">
              <span className="font-bold text-red-700">Total Interest Paid:</span>
              <span className="font-bold text-red-700 text-lg">$3,789.66</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="font-bold">Total Amount Paid:</span>
              <span className="font-bold">$21,454.60</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border-2 border-green-400 mb-4">
          <h3 className="font-bold text-green-800 mb-3">Your Smart Plan (Monthly + Higher Down Payment):</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Down Payment:</span>
              <span className="font-semibold text-green-700">${downPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Loan Amount:</span>
              <span className="font-semibold">${totalLoanAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Payment Frequency:</span>
              <span className="font-semibold">Monthly</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Payment Amount:</span>
              <span className="font-semibold text-green-600">${monthlyPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Number of Payments:</span>
              <span className="font-semibold">{months} (5 years)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold">7.99%</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600">Compounding:</span>
              <span className="font-semibold">Monthly (12x/year)</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1">
              <span className="text-gray-600"></span>
              <span className="font-semibold"></span>
            </div>
            <div className="flex justify-between pt-2 col-span-2 border-t-2 border-green-400">
              <span className="font-bold text-green-700">Total Interest Paid:</span>
              <span className="font-bold text-green-700 text-lg">${totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="font-bold">Total Amount Paid:</span>
              <span className="font-bold">${totalPaid.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Savings Breakdown */}
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-lg border-2 border-green-500">
          <h3 className="font-bold text-green-900 mb-4 text-lg">💰 YOUR TOTAL SAVINGS</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded border border-green-300">
              <span className="text-gray-700">Savings from Higher Down Payment:</span>
              <span className="font-bold text-green-700 text-lg">${(3042.00 - downPayment) < 0 ? (downPayment - 3042.00).toFixed(2) : '0.00'}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white rounded border border-green-300">
              <span className="text-gray-700">Savings from Monthly Compounding:</span>
              <span className="font-bold text-green-700 text-lg">${(3789.66 - totalInterest).toFixed(2)}</span>
            </div>
            
            <div className="p-4 bg-green-600 text-white rounded-lg border-2 border-green-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">TOTAL INTEREST SAVED:</span>
                <span className="font-bold text-2xl">${(dealershipTotalInterest - totalInterest).toFixed(2)}</span>
              </div>
              <div className="text-sm text-green-100 text-right font-mono">
                ${dealershipTotalInterest.toFixed(2)} (Dealership) - ${totalInterest.toFixed(2)} (Your Plan) = ${(dealershipTotalInterest - totalInterest).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity Cost Analysis */}
        <div className="bg-gradient-to-r from-orange-100 to-yellow-50 p-6 rounded-lg border-2 border-orange-400 mt-6">
          <h3 className="font-bold text-orange-900 mb-4 text-lg">📊 Opportunity Cost Analysis</h3>
          
          <div className="space-y-3">
            {(() => {
              // Calculate opportunity cost
              const extraDownPayment = downPayment - 3042.00;
              const opportunityRate = 0.025; // 2.5% annual interest
              const years = 5;
              
              // Compound interest formula: A = P(1 + r)^t
              const futureValue = extraDownPayment * Math.pow(1 + opportunityRate, years);
              const interestEarned = futureValue - extraDownPayment;
              
              // Net savings after opportunity cost
              const grossSavings = dealershipTotalInterest - totalInterest;
              const netSavings = grossSavings - interestEarned;
              
              return (
                <>
                  <div className="p-4 bg-white rounded border border-orange-300">
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>What if you invested the extra down payment instead?</strong>
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Extra Down Payment:</span>
                        <span className="font-semibold">${extraDownPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment Rate:</span>
                        <span className="font-semibold">2.5% annually</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment Period:</span>
                        <span className="font-semibold">{yearsForOpportunityCost} years</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-orange-200">
                        <span className="font-bold text-gray-700">Potential Interest Earned:</span>
                        <span className="font-bold text-orange-700">${interestEarned.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500 text-right font-mono mt-1">
                        ${extraDownPayment.toFixed(2)} × (1.025)^{yearsForOpportunityCost} - ${extraDownPayment.toFixed(2)} = ${interestEarned.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-600 text-white rounded-lg border-2 border-blue-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">NET SAVINGS (After Opportunity Cost):</span>
                      <span className="font-bold text-2xl">${netSavings.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-blue-100 font-mono">
                      <div className="text-right">
                        ${grossSavings.toFixed(2)} (Interest Saved) - ${interestEarned.toFixed(2)} (Lost Investment Income) = ${netSavings.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-300">
                    <p className="text-sm text-blue-900">
                      <strong>Analysis:</strong> Even after accounting for the opportunity cost of ${interestEarned.toFixed(2)} 
                      (what your extra ${extraDownPayment.toFixed(2)} could have earned at 2.5% annually), you still save 
                      a net <strong>${netSavings.toFixed(2)}</strong> by choosing your payment plan over the dealership's offer. 
                      {netSavings > 0 ? ' This is still a smart financial move! 🎯' : ' However, you might want to reconsider your down payment amount. 💭'}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-300">
          <p className="text-sm text-blue-900">
            <strong>Bottom Line:</strong> By putting down ${downPayment.toFixed(2)} instead of $3,042.00 
            and choosing monthly payments with monthly compounding, you save <strong>${(3789.66 - totalInterest).toFixed(2)}</strong> in 
            interest charges over 5 years! That's money in your pocket! 🎉
          </p>
        </div>
      </div>

      {/* Amortization Schedule Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-400 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-indigo-800 flex items-center gap-2">
          📋 Amortization Schedule: First 6 Months (Educational)
        </h2>

        <p className="text-sm text-gray-700 mb-6 bg-white p-4 rounded border-l-4 border-indigo-400">
          <strong>Educational Purpose:</strong> This shows exactly how we calculated the "Balance after 6 months"
          in both scenarios. Each payment is broken down into interest and principal components, demonstrating
          how the balance decreases over time.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Scenario A Amortization */}
          <div className="overflow-x-auto border-2 border-red-300 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-red-600">
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Payment #</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Payment Amount</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Interest</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Principal</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="bg-red-100">
                  <td className="border border-gray-300 px-2 py-2 font-bold text-center" colSpan="5">
                    SCENARIO A: Zero Down + 7.99% + $10K Lumpsum
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-gray-300 px-2 py-2 text-center font-semibold">0</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">Initial</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold">${scenarioATotalLoanAmount.toFixed(2)}</td>
                </tr>
                {(() => {
                  let balance = scenarioATotalLoanAmount;
                  const rows = [];
                  for (let i = 1; i <= INITIAL_PERIOD_BIWEEKLY_PAYMENTS; i++) {
                    const interestPayment = balance * scenarioABiweeklyRate;
                    const principalPayment = scenarioAInitialPayment - interestPayment;
                    balance -= principalPayment;

                    rows.push(
                      <tr key={i} className={i === INITIAL_PERIOD_BIWEEKLY_PAYMENTS ? "bg-yellow-100 border-2 border-yellow-500" : "hover:bg-gray-50"}>
                        <td className="border border-gray-300 px-2 py-2 text-center">{i}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">${scenarioAInitialPayment.toFixed(2)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right text-red-600">${interestPayment.toFixed(2)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right text-green-600">${principalPayment.toFixed(2)}</td>
                        <td className={`border border-gray-300 px-2 py-2 text-right font-semibold ${i === INITIAL_PERIOD_BIWEEKLY_PAYMENTS ? 'text-yellow-700 font-bold' : ''}`}>${balance.toFixed(2)}</td>
                      </tr>
                    );
                  }
                  return rows;
                })()}
                <tr className="bg-purple-100 border-2 border-purple-400">
                  <td className="border border-gray-300 px-2 py-2 text-center font-bold">Lumpsum</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold text-purple-700">${scenarioALumpsum.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold text-purple-700">${scenarioALumpsum.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold text-purple-700">${scenarioABalanceAfterLumpsum.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Scenario B Amortization */}
          <div className="overflow-x-auto border-2 border-blue-300 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600">
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Payment #</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Payment Amount</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Interest</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Principal</th>
                  <th className="border border-gray-300 px-2 py-2 text-white font-bold text-xs">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                <tr className="bg-blue-100">
                  <td className="border border-gray-300 px-2 py-2 font-bold text-center" colSpan="5">
                    SCENARIO B: $3K Down + 8.49% + $7K Lumpsum
                  </td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-2 py-2 text-center font-semibold">0</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">Initial</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold">${scenarioBTotalLoanAmount.toFixed(2)}</td>
                </tr>
                {(() => {
                  let balance = scenarioBTotalLoanAmount;
                  const rows = [];
                  for (let i = 1; i <= INITIAL_PERIOD_BIWEEKLY_PAYMENTS; i++) {
                    const interestPayment = balance * scenarioBBiweeklyRate;
                    const principalPayment = scenarioBInitialPayment - interestPayment;
                    balance -= principalPayment;

                    rows.push(
                      <tr key={i} className={i === INITIAL_PERIOD_BIWEEKLY_PAYMENTS ? "bg-yellow-100 border-2 border-yellow-500" : "hover:bg-gray-50"}>
                        <td className="border border-gray-300 px-2 py-2 text-center">{i}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right">${scenarioBInitialPayment.toFixed(2)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right text-red-600">${interestPayment.toFixed(2)}</td>
                        <td className="border border-gray-300 px-2 py-2 text-right text-green-600">${principalPayment.toFixed(2)}</td>
                        <td className={`border border-gray-300 px-2 py-2 text-right font-semibold ${i === INITIAL_PERIOD_BIWEEKLY_PAYMENTS ? 'text-yellow-700 font-bold' : ''}`}>${balance.toFixed(2)}</td>
                      </tr>
                    );
                  }
                  return rows;
                })()}
                <tr className="bg-indigo-100 border-2 border-indigo-400">
                  <td className="border border-gray-300 px-2 py-2 text-center font-bold">Lumpsum</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold text-indigo-700">${scenarioBLumpsum.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 py-2 text-center">-</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold text-indigo-700">${scenarioBLumpsum.toFixed(2)}</td>
                  <td className="border border-gray-300 px-2 py-2 text-right font-bold text-indigo-700">${scenarioBBalanceAfterLumpsum.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational Explanation */}
        <div className="mt-6 p-4 bg-white rounded border border-indigo-300">
          <h4 className="font-semibold text-indigo-800 mb-3">🎓 How Amortization Works:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Each Payment Breakdown:</h5>
              <ul className="space-y-1">
                <li>• <strong>Interest</strong> = Current Balance × Bi-weekly Rate</li>
                <li>• <strong>Principal</strong> = Payment Amount - Interest</li>
                <li>• <strong>New Balance</strong> = Old Balance - Principal</li>
                <li>• Early payments have more interest, less principal</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-2">Key Observations:</h5>
              <ul className="space-y-1">
                <li>• Payment #13 shows the exact 6-month balance</li>
                <li>• Higher interest rate means more interest per payment</li>
                <li>• Lumpsum payment goes 100% toward principal</li>
                <li>• This creates the new starting balance for remaining payments</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-indigo-50 rounded border border-indigo-200">
            <p className="text-sm text-indigo-800">
              <strong>💡 Excel Tip:</strong> You can recreate this table using formulas like:
              <code className="block mt-1 font-mono text-xs bg-white p-1 rounded">
                Interest: =D2*$B$6 | Principal: =E2-F2 | Balance: =G2-F2
              </code>
              Where D2=balance, B6=bi-weekly rate, E2=payment amount
            </p>
          </div>
        </div>

        {/* Amortization Formula Reference */}
        <div className="mt-6 p-6 bg-white border-2 border-indigo-300 rounded-lg">
          <h3 className="font-bold text-indigo-800 mb-4 text-lg">📋 Amortization Schedule Excel Formulas</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column Setup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-indigo-700 mb-3">Excel Column Setup</h4>

              <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Column Headers (Row 1):</p>
                <div className="text-xs font-mono space-y-1">
                  <div><strong>A1:</strong> Payment #</div>
                  <div><strong>B1:</strong> Payment Amount</div>
                  <div><strong>C1:</strong> Interest</div>
                  <div><strong>D1:</strong> Principal</div>
                  <div><strong>E1:</strong> Remaining Balance</div>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Constants Setup:</p>
                <div className="text-xs font-mono space-y-1">
                  <div><strong>G1:</strong> Loan Amount = {scenarioATotalLoanAmount.toFixed(2)}</div>
                  <div><strong>G2:</strong> Annual Rate = {scenarioAInterestRate}%</div>
                  <div><strong>G3:</strong> Bi-weekly Rate = =G2/100/26</div>
                  <div><strong>G4:</strong> Payment = =PMT(G3,130,-G1)</div>
                </div>
              </div>
            </div>

            {/* Row Formulas */}
            <div className="space-y-4">
              <h4 className="font-semibold text-indigo-700 mb-3">Row-by-Row Formulas</h4>

              <div className="p-3 bg-green-50 rounded border border-green-300">
                <p className="text-sm font-semibold text-gray-700 mb-2">Initial Row (Row 2):</p>
                <div className="text-xs font-mono space-y-1">
                  <div><strong>A2:</strong> 0</div>
                  <div><strong>B2:</strong> "Initial"</div>
                  <div><strong>C2:</strong> "-"</div>
                  <div><strong>D2:</strong> "-"</div>
                  <div><strong>E2:</strong> =$G$1 (Initial loan amount)</div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded border border-yellow-300">
                <p className="text-sm font-semibold text-gray-700 mb-2">Payment Rows (Row 3 onwards):</p>
                <div className="text-xs font-mono space-y-1">
                  <div><strong>A3:</strong> =A2+1</div>
                  <div><strong>B3:</strong> =$G$4 (Fixed payment amount)</div>
                  <div><strong>C3:</strong> =E2*$G$3 (Interest = Prev Balance × Rate)</div>
                  <div><strong>D3:</strong> =B3-C3 (Principal = Payment - Interest)</div>
                  <div><strong>E3:</strong> =E2-D3 (New Balance = Old Balance - Principal)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Specific Examples */}
          <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Scenario A Example */}
            <div className="p-4 bg-red-50 rounded border border-red-300">
              <h4 className="font-semibold text-red-700 mb-3">Scenario A Example (Zero Down):</h4>
              <div className="text-xs font-mono space-y-2">
                <div className="p-2 bg-white rounded">
                  <div><strong>Constants:</strong></div>
                  <div>G1: {scenarioATotalLoanAmount.toFixed(2)}</div>
                  <div>G2: {scenarioAInterestRate}%</div>
                  <div>G3: {(scenarioABiweeklyRate * 100).toFixed(6)}%</div>
                  <div>G4: ${scenarioAInitialPayment.toFixed(2)}</div>
                </div>

                <div className="p-2 bg-white rounded">
                  <div><strong>Payment 1 Calculation:</strong></div>
                  <div>C3: ={scenarioATotalLoanAmount.toFixed(2)}*{(scenarioABiweeklyRate * 100).toFixed(6)}% = ${(scenarioATotalLoanAmount * scenarioABiweeklyRate).toFixed(2)}</div>
                  <div>D3: =${scenarioAInitialPayment.toFixed(2)}-${(scenarioATotalLoanAmount * scenarioABiweeklyRate).toFixed(2)} = ${(scenarioAInitialPayment - (scenarioATotalLoanAmount * scenarioABiweeklyRate)).toFixed(2)}</div>
                  <div>E3: =${scenarioATotalLoanAmount.toFixed(2)}-${(scenarioAInitialPayment - (scenarioATotalLoanAmount * scenarioABiweeklyRate)).toFixed(2)} = ${(scenarioATotalLoanAmount - (scenarioAInitialPayment - (scenarioATotalLoanAmount * scenarioABiweeklyRate))).toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Scenario B Example */}
            <div className="p-4 bg-blue-50 rounded border border-blue-300">
              <h4 className="font-semibold text-blue-700 mb-3">Scenario B Example ($3k Down):</h4>
              <div className="text-xs font-mono space-y-2">
                <div className="p-2 bg-white rounded">
                  <div><strong>Constants:</strong></div>
                  <div>G1: {scenarioBTotalLoanAmount.toFixed(2)}</div>
                  <div>G2: {scenarioBInterestRate}%</div>
                  <div>G3: {(scenarioBBiweeklyRate * 100).toFixed(6)}%</div>
                  <div>G4: ${scenarioBInitialPayment.toFixed(2)}</div>
                </div>

                <div className="p-2 bg-white rounded">
                  <div><strong>Payment 1 Calculation:</strong></div>
                  <div>C3: ={scenarioBTotalLoanAmount.toFixed(2)}*{(scenarioBBiweeklyRate * 100).toFixed(6)}% = ${(scenarioBTotalLoanAmount * scenarioBBiweeklyRate).toFixed(2)}</div>
                  <div>D3: =${scenarioBInitialPayment.toFixed(2)}-${(scenarioBTotalLoanAmount * scenarioBBiweeklyRate).toFixed(2)} = ${(scenarioBInitialPayment - (scenarioBTotalLoanAmount * scenarioBBiweeklyRate)).toFixed(2)}</div>
                  <div>E3: =${scenarioBTotalLoanAmount.toFixed(2)}-${(scenarioBInitialPayment - (scenarioBTotalLoanAmount * scenarioBBiweeklyRate)).toFixed(2)} = ${(scenarioBTotalLoanAmount - (scenarioBInitialPayment - (scenarioBTotalLoanAmount * scenarioBBiweeklyRate))).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Tips */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded border border-indigo-400">
            <h4 className="font-semibold text-indigo-800 mb-3">🚀 Advanced Excel Tips:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Formula Tips:</h5>
                <ul className="space-y-1">
                  <li>• Use <strong>absolute references</strong> ($G$3) for rates and constants</li>
                  <li>• <strong>Copy formulas down</strong> for all 13 payments</li>
                  <li>• Add <strong>conditional formatting</strong> to highlight payment #13</li>
                  <li>• Use <strong>ROUND function</strong> for clean currency display</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Validation:</h5>
                <ul className="space-y-1">
                  <li>• <strong>Sum all interest</strong> to verify total interest cost</li>
                  <li>• <strong>Sum all principal</strong> should equal loan amount</li>
                  <li>• <strong>Final balance</strong> should be close to zero</li>
                  <li>• <strong>Payment #13 balance</strong> = 6-month balance</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded border border-indigo-200">
              <p className="text-sm text-indigo-800">
                <strong>💡 Pro Tip:</strong> Create a second section for the lumpsum payment by adding a row where:
                <code className="block mt-1 font-mono text-xs">
                  Lumpsum Row: Payment = ${scenarioALumpsum.toFixed(2)} | Interest = 0 | Principal = ${scenarioALumpsum.toFixed(2)} | New Balance = E15-${scenarioALumpsum.toFixed(2)}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg border-2 border-gray-400">
        <h3 className="font-bold text-gray-800 mb-3">Summary</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✅ <strong>Monthly payment:</strong> ${monthlyPayment.toFixed(2)} for {months} months</li>
          <li>✅ <strong>Total interest:</strong> ${totalInterest.toFixed(2)} (with monthly compounding)</li>
          <li>✅ <strong>You save:</strong> ${(3789.66 - totalInterest).toFixed(2)} vs dealership offer</li>
          <li>✅ <strong>Down payment:</strong> ${downPayment.toFixed(2)} reduces your loan significantly</li>
        </ul>
      </div>
    </div>
  );
};

export default MonthlyPaymentCalculator;