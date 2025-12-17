export type TimeRange = "30m" | "2h" | "24h";

interface Props {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export function TimeRangeSelector({ value, onChange }: Props) {
  return (
    <div>
      <button onClick={() => onChange("30m")}>30m</button>
      <button onClick={() => onChange("2h")}>2h</button>
      <button onClick={() => onChange("24h")}>24h</button>
    </div>
  );
}
