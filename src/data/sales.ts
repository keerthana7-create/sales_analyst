/**
 * Sales Analytics Data Layer
 * Contains realistic structured sales records for 2022, 2023, and 2024.
 * Designed to easily interface with or be replaced by an external REST/GraphQL API.
 */

export interface MonthlySalesRecord {
  month: string;
  monthIndex: number;
  sales: number;
  orders: number;
  growthYoY?: number;
}

export interface CategorySalesRecord {
  category: string;
  sales: number;
  percentage?: number;
  color: string;
}

export interface YearDataset {
  year: number;
  totalSales: number;
  totalOrders: number;
  monthlySales: MonthlySalesRecord[];
  categorySales: CategorySalesRecord[];
}

export type SelectedYear = '2022' | '2023' | '2024' | 'all';

// Category color tokens matching an executive, accessible palette
export const CATEGORY_COLORS: Record<string, string> = {
  Electronics: '#2563EB', // Blue 600
  Clothing: '#0D9488', // Teal 600
  'Home & Furniture': '#D97706', // Amber 600
  Beauty: '#8B5CF6', // Purple 500
  Sports: '#E11D48', // Rose 600
};

export const SALES_DATA_BY_YEAR: Record<number, YearDataset> = {
  2022: {
    year: 2022,
    totalSales: 432500,
    totalOrders: 3840,
    monthlySales: [
      { month: 'Jan', monthIndex: 1, sales: 28400, orders: 250 },
      { month: 'Feb', monthIndex: 2, sales: 26100, orders: 232 },
      { month: 'Mar', monthIndex: 3, sales: 31200, orders: 280 },
      { month: 'Apr', monthIndex: 4, sales: 29800, orders: 265 },
      { month: 'May', monthIndex: 5, sales: 33500, orders: 295 },
      { month: 'Jun', monthIndex: 6, sales: 35100, orders: 310 },
      { month: 'Jul', monthIndex: 7, sales: 34200, orders: 302 },
      { month: 'Aug', monthIndex: 8, sales: 36800, orders: 326 },
      { month: 'Sep', monthIndex: 9, sales: 38400, orders: 340 },
      { month: 'Oct', monthIndex: 10, sales: 41200, orders: 368 },
      { month: 'Nov', monthIndex: 11, sales: 48900, orders: 435 },
      { month: 'Dec', monthIndex: 12, sales: 49000, orders: 437 },
    ],
    categorySales: [
      { category: 'Electronics', sales: 148500, color: CATEGORY_COLORS['Electronics'] },
      { category: 'Clothing', sales: 108200, color: CATEGORY_COLORS['Clothing'] },
      { category: 'Home & Furniture', sales: 86500, color: CATEGORY_COLORS['Home & Furniture'] },
      { category: 'Beauty', sales: 51900, color: CATEGORY_COLORS['Beauty'] },
      { category: 'Sports', sales: 37400, color: CATEGORY_COLORS['Sports'] },
    ],
  },
  2023: {
    year: 2023,
    totalSales: 564200,
    totalOrders: 4920,
    monthlySales: [
      { month: 'Jan', monthIndex: 1, sales: 34500, orders: 305, growthYoY: 21.5 },
      { month: 'Feb', monthIndex: 2, sales: 32800, orders: 290, growthYoY: 25.7 },
      { month: 'Mar', monthIndex: 3, sales: 39100, orders: 342, growthYoY: 25.3 },
      { month: 'Apr', monthIndex: 4, sales: 38400, orders: 335, growthYoY: 28.9 },
      { month: 'May', monthIndex: 5, sales: 43200, orders: 380, growthYoY: 29.0 },
      { month: 'Jun', monthIndex: 6, sales: 45600, orders: 398, growthYoY: 29.9 },
      { month: 'Jul', monthIndex: 7, sales: 44800, orders: 390, growthYoY: 31.0 },
      { month: 'Aug', monthIndex: 8, sales: 48200, orders: 420, growthYoY: 31.0 },
      { month: 'Sep', monthIndex: 9, sales: 51500, orders: 450, growthYoY: 34.1 },
      { month: 'Oct', monthIndex: 10, sales: 54900, orders: 478, growthYoY: 33.3 },
      { month: 'Nov', monthIndex: 11, sales: 64500, orders: 560, growthYoY: 31.9 },
      { month: 'Dec', monthIndex: 12, sales: 66800, orders: 572, growthYoY: 36.3 },
    ],
    categorySales: [
      { category: 'Electronics', sales: 198000, color: CATEGORY_COLORS['Electronics'] },
      { category: 'Clothing', sales: 142000, color: CATEGORY_COLORS['Clothing'] },
      { category: 'Home & Furniture', sales: 107200, color: CATEGORY_COLORS['Home & Furniture'] },
      { category: 'Beauty', sales: 67800, color: CATEGORY_COLORS['Beauty'] },
      { category: 'Sports', sales: 49200, color: CATEGORY_COLORS['Sports'] },
    ],
  },
  2024: {
    year: 2024,
    totalSales: 718600,
    totalOrders: 6180,
    monthlySales: [
      { month: 'Jan', monthIndex: 1, sales: 44200, orders: 385, growthYoY: 28.1 },
      { month: 'Feb', monthIndex: 2, sales: 42600, orders: 370, growthYoY: 29.9 },
      { month: 'Mar', monthIndex: 3, sales: 51200, orders: 442, growthYoY: 30.9 },
      { month: 'Apr', monthIndex: 4, sales: 49800, orders: 430, growthYoY: 29.7 },
      { month: 'May', monthIndex: 5, sales: 56400, orders: 486, growthYoY: 30.6 },
      { month: 'Jun', monthIndex: 6, sales: 59300, orders: 510, growthYoY: 30.0 },
      { month: 'Jul', monthIndex: 7, sales: 57800, orders: 495, growthYoY: 29.0 },
      { month: 'Aug', monthIndex: 8, sales: 62500, orders: 535, growthYoY: 29.7 },
      { month: 'Sep', monthIndex: 9, sales: 66900, orders: 574, growthYoY: 29.9 },
      { month: 'Oct', monthIndex: 10, sales: 71400, orders: 612, growthYoY: 30.1 },
      { month: 'Nov', monthIndex: 11, sales: 82900, orders: 710, growthYoY: 28.5 },
      { month: 'Dec', monthIndex: 12, sales: 73600, orders: 631, growthYoY: 10.2 },
    ],
    categorySales: [
      { category: 'Electronics', sales: 254800, color: CATEGORY_COLORS['Electronics'] },
      { category: 'Clothing', sales: 179500, color: CATEGORY_COLORS['Clothing'] },
      { category: 'Home & Furniture', sales: 136200, color: CATEGORY_COLORS['Home & Furniture'] },
      { category: 'Beauty', sales: 86400, color: CATEGORY_COLORS['Beauty'] },
      { category: 'Sports', sales: 61700, color: CATEGORY_COLORS['Sports'] },
    ],
  },
};

export interface MultiYearMonthlyRecord {
  month: string;
  monthIndex: number;
  sales: number; // Combined or current view
  sales2022: number;
  sales2023: number;
  sales2024: number;
  totalOrders: number;
}

export interface KPIStats {
  totalSales: number;
  averageMonthlySales: number;
  highestMonth: {
    month: string;
    year?: number;
    sales: number;
  };
  totalRecordsCount: number;
  totalOrders: number;
  thresholdExceededCount: number;
  thresholdExceededPercentage: number;
  thresholdSalesAmount: number;
}

/**
 * Returns processed data for a given year or 'all' years.
 */
export function getSalesData(year: SelectedYear) {
  if (year !== 'all') {
    const numericYear = parseInt(year, 10);
    return SALES_DATA_BY_YEAR[numericYear] || SALES_DATA_BY_YEAR[2024];
  }

  // Combined dataset for all years
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const combinedMonthlySales: MultiYearMonthlyRecord[] = months.map((month, index) => {
    const s22 = SALES_DATA_BY_YEAR[2022].monthlySales[index].sales;
    const s23 = SALES_DATA_BY_YEAR[2023].monthlySales[index].sales;
    const s24 = SALES_DATA_BY_YEAR[2024].monthlySales[index].sales;
    const o22 = SALES_DATA_BY_YEAR[2022].monthlySales[index].orders;
    const o23 = SALES_DATA_BY_YEAR[2023].monthlySales[index].orders;
    const o24 = SALES_DATA_BY_YEAR[2024].monthlySales[index].orders;

    return {
      month,
      monthIndex: index + 1,
      sales: s22 + s23 + s24,
      sales2022: s22,
      sales2023: s23,
      sales2024: s24,
      totalOrders: o22 + o23 + o24,
    };
  });

  // Aggregate category sales across all years
  const categoryMap = new Map<string, number>();
  [2022, 2023, 2024].forEach((yr) => {
    SALES_DATA_BY_YEAR[yr].categorySales.forEach((cat) => {
      categoryMap.set(cat.category, (categoryMap.get(cat.category) || 0) + cat.sales);
    });
  });

  const totalAllSales = Array.from(categoryMap.values()).reduce((a, b) => a + b, 0);

  const combinedCategorySales: CategorySalesRecord[] = Array.from(categoryMap.entries()).map(([category, sales]) => ({
    category,
    sales,
    percentage: Number(((sales / totalAllSales) * 100).toFixed(1)),
    color: CATEGORY_COLORS[category] || '#64748B',
  }));

  const totalOrders = Object.values(SALES_DATA_BY_YEAR).reduce((acc, curr) => acc + curr.totalOrders, 0);

  return {
    year: 'all' as const,
    totalSales: totalAllSales,
    totalOrders,
    monthlySales: combinedMonthlySales,
    categorySales: combinedCategorySales,
  };
}

/**
 * Calculates KPIs based on current dataset and optional threshold.
 */
export function calculateKPIs(
  monthlySales: { month: string; sales: number; year?: number }[],
  threshold: number = 0,
  isAllYears: boolean = false
): KPIStats {
  const totalSales = monthlySales.reduce((acc, curr) => acc + curr.sales, 0);
  const totalRecordsCount = isAllYears ? 36 : monthlySales.length; // 36 monthly records for 3 years or 12 for 1 year
  const averageMonthlySales = monthlySales.length > 0 ? Math.round(totalSales / monthlySales.length) : 0;

  let highestMonth = {
    month: monthlySales[0]?.month || 'N/A',
    sales: monthlySales[0]?.sales || 0,
  };

  monthlySales.forEach((item) => {
    if (item.sales > highestMonth.sales) {
      highestMonth = {
        month: item.month,
        sales: item.sales,
      };
    }
  });

  const exceededMonths = threshold > 0 ? monthlySales.filter((item) => item.sales >= threshold) : [];
  const thresholdExceededCount = exceededMonths.length;
  const thresholdExceededPercentage = monthlySales.length > 0 ? (thresholdExceededCount / monthlySales.length) * 100 : 0;
  const thresholdSalesAmount = exceededMonths.reduce((sum, item) => sum + item.sales, 0);

  return {
    totalSales,
    averageMonthlySales,
    highestMonth,
    totalRecordsCount,
    totalOrders: 0, // Injected from dataset
    thresholdExceededCount,
    thresholdExceededPercentage,
    thresholdSalesAmount,
  };
}
