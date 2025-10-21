# 🚗 Car Payment Calculator with Financing Strategy Comparison

A comprehensive React-based calculator for analyzing car financing options with detailed Excel-style calculations and multiple scenario comparisons.

## 🎯 Features

### 📊 Main Payment Calculator
- **Excel-style interface** with row numbers and formulas
- **Monthly vs Bi-weekly payment comparison**
- **PMT formula calculations** with transparent breakdowns
- **Real-time updates** as you adjust variables
- **Professional formatting** matching Excel spreadsheets

### 🔀 Financing Strategy Comparison
- **Two-scenario analysis** for complex financing decisions
- **6-month payment period** with lumpsum payment options
- **Different interest rates and down payments**
- **Step-by-step Excel calculations** showing:
  - Initial bi-weekly payment calculations
  - Balance tracking after 6 months
  - Lumpsum payment application
  - Recalculated payments for remaining term
  - Total interest comparison

### 📈 Advanced Analysis
- **Opportunity cost calculations** (investment alternatives)
- **Dealership offer comparison**
- **Total savings breakdown**
- **Winner determination** with detailed explanations

### 📋 Export Capabilities
- **CSV download** with complete calculation breakdown
- **PDF export** via browser print
- **Formula reference** for Excel implementation

## 🚀 Use Cases

### Primary Scenario
Compare financing strategies when dealership offers:
- **Option A**: Zero down payment, 7.99% interest, $10k lumpsum after 6 months
- **Option B**: $3,000 down payment, 8.49% interest, $7k lumpsum after 6 months

### Educational Purpose
- Learn loan amortization calculations
- Understand compound interest impact
- Master Excel PMT formulas
- Analyze opportunity costs

## 🛠️ Technical Stack

- **React 18** with Vite for fast development
- **Tailwind CSS** for professional styling
- **Lucide React** for icons
- **Responsive design** for all screen sizes

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd car_calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🧮 Excel Formula Reference

The calculator implements these key Excel formulas:

### Monthly Payment Calculation
```excel
=PMT(annual_rate/12, months, -loan_amount)
```

### Bi-weekly Payment Calculation
```excel
=PMT(annual_rate/26, 130, -loan_amount)
```

### Balance After N Payments
```excel
For each payment:
Interest = Balance × (Rate/Periods)
Principal = Payment - Interest
New_Balance = Old_Balance - Principal
```

### Scenario Comparison Formulas
- **Initial Payment**: `=PMT(rate/26, 130, -total_loan)`
- **Balance After 6 Months**: Amortization loop for 13 payments
- **New Payment**: `=PMT(rate/26, 117, -balance_after_lumpsum)`

## 📱 Usage

1. **Adjust Variables**: Modify vehicle price, down payment, interest rates
2. **View Calculations**: See step-by-step Excel-style breakdowns
3. **Compare Scenarios**: Analyze different financing strategies
4. **Export Results**: Download CSV or print PDF
5. **Make Decision**: Use winner analysis for optimal choice

## 🎨 Interface Highlights

- **Color-coded sections** for different calculation phases
- **Excel-style row numbers** and formula display
- **Real-time updates** across all sections
- **Professional table formatting**
- **Mobile-responsive design**

## 💡 Key Benefits

- **Transparent Calculations**: Every step is visible and explained
- **Educational Value**: Learn financial formulas and concepts
- **Decision Support**: Clear winner determination with reasoning
- **Excel Integration**: Copy formulas directly to spreadsheets
- **Professional Output**: Suitable for sharing with financial advisors

## 🔧 Development

Built with modern React patterns:
- Functional components with hooks
- Real-time state management
- Responsive Tailwind styling
- Modular component structure

## 📄 License

Open source project for educational and personal use.

---

**Perfect for**: Car buyers, finance students, loan analysis, dealership negotiations, and financial education.