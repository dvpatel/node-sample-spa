/**
 * map lables to friendly name.
 */
export class LabelMappingModel {

    /**
     * Label maping ;
     */
    public static getMap(): Map<string, string> {

        const map = new Map<string, string>();

        map['reportDate'] = 'Reporting Date';
        map['grossProfit'] = 'Gross Profit';
        map['costOfRevenue'] = 'Cost of Revenue';
        map['operatingRevenue'] = 'Operating Revenue';
        map['totalRevenue'] = 'Total Revenue';
        map['operatingIncome'] = 'Operating Income';
        map['netIncome'] = 'Net Income';
        map['researchAndDevelopment'] = 'Research and Development';
        map['operatingExpense'] = 'Operating Expense';
        map['currentAssets'] = 'Current Assets';
        map['totalAssets'] = 'Total Assets';
        map['totalLiabilities'] = 'Total Liabilities';
        map['currentCash'] = 'Current Cash';
        map['currentDebt'] = 'Current Debt';
        map['totalCash'] = 'Total Cash';
        map['totalDebt'] = 'Total Debt';
        map['shareholderEquity'] = 'Shareholder Equity';
        map['cashChange'] = 'Cash Change';
        map['cashFlow'] = 'Cash Flow';
        map['operatingGainsLosses'] = 'Operating Gains / Losses';

        return map ;
    }

}
