interface Metric {
  label: string;
  value: string;
}

interface CompanyMetricsProps {
  employeeCount: number;
  foundedYear: number;
  headquarters: string;
  industry: string;
}

export default function CompanyMetrics({
  employeeCount,
  foundedYear,
  headquarters,
  industry,
}: CompanyMetricsProps) {
  const metrics: Metric[] = [
    {
      label: "Industry",
      value: industry,
    },
    {
      label: "Founded",
      value: String(foundedYear),
    },
    {
      label: "Employees",
      value: employeeCount.toLocaleString(),
    },
    {
      label: "Headquarters",
      value: headquarters,
    },
  ];

  return (
    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map(({ label, value }) => (
        <div
          key={label}
          className="bg-gray-50 rounded-lg border border-gray-200 p-4"
        >
          <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-gray-900">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
