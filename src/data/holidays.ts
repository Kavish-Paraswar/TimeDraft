export interface Holiday {
  name: string;
  date: string;
  type: "national" | "regional" | "festival";
  color?: string;
}
export interface HolidayProvider {
  getHolidays(year: number): Holiday[];
}
const FIXED_HOLIDAYS: (Omit<Holiday, "date"> & {
  month: number;
  day: number;
})[] = [
  { name: "New Year", month: 1, day: 1, type: "national", color: "#FFD700" },
  {
    name: "Republic Day",
    month: 1,
    day: 26,
    type: "national",
    color: "#FF9933",
  },
  {
    name: "Mahavir Jayanti",
    month: 4,
    day: 14,
    type: "festival",
    color: "#FF6B35",
  },
  {
    name: "Good Friday",
    month: 4,
    day: 18,
    type: "national",
    color: "#8B4513",
  },
  { name: "Labour Day", month: 5, day: 1, type: "national", color: "#E63946" },
  {
    name: "Independence Day",
    month: 8,
    day: 15,
    type: "national",
    color: "#138808",
  },
  {
    name: "Gandhi Jayanti",
    month: 10,
    day: 2,
    type: "national",
    color: "#FF9933",
  },
  { name: "Christmas", month: 12, day: 25, type: "national", color: "#C41E3A" },
];
const VARIABLE_HOLIDAYS: Record<number, Holiday[]> = {
  2024: [
    { name: "Holi", date: "03-25", type: "festival", color: "#FF69B4" },
    { name: "Ram Navami", date: "04-17", type: "festival", color: "#FF8C00" },
    { name: "Eid ul-Fitr", date: "04-10", type: "festival", color: "#00BCD4" },
    {
      name: "Buddha Purnima",
      date: "05-23",
      type: "festival",
      color: "#FFD700",
    },
    { name: "Eid ul-Adha", date: "06-17", type: "festival", color: "#00BCD4" },
    {
      name: "Raksha Bandhan",
      date: "08-19",
      type: "festival",
      color: "#FF69B4",
    },
    { name: "Janmashtami", date: "08-26", type: "festival", color: "#6A0DAD" },
    { name: "Navratri", date: "10-03", type: "festival", color: "#FF4500" },
    { name: "Dussehra", date: "10-12", type: "festival", color: "#FF6B35" },
    { name: "Diwali", date: "11-01", type: "festival", color: "#FFD700" },
    {
      name: "Guru Nanak Jayanti",
      date: "11-15",
      type: "festival",
      color: "#FF8C00",
    },
  ],
  2025: [
    { name: "Holi", date: "03-14", type: "festival", color: "#FF69B4" },
    { name: "Ram Navami", date: "04-06", type: "festival", color: "#FF8C00" },
    { name: "Eid ul-Fitr", date: "03-31", type: "festival", color: "#00BCD4" },
    {
      name: "Buddha Purnima",
      date: "05-12",
      type: "festival",
      color: "#FFD700",
    },
    { name: "Eid ul-Adha", date: "06-07", type: "festival", color: "#00BCD4" },
    {
      name: "Raksha Bandhan",
      date: "08-09",
      type: "festival",
      color: "#FF69B4",
    },
    { name: "Janmashtami", date: "08-16", type: "festival", color: "#6A0DAD" },
    { name: "Navratri", date: "09-22", type: "festival", color: "#FF4500" },
    { name: "Dussehra", date: "10-02", type: "festival", color: "#FF6B35" },
    { name: "Diwali", date: "10-20", type: "festival", color: "#FFD700" },
    {
      name: "Guru Nanak Jayanti",
      date: "11-05",
      type: "festival",
      color: "#FF8C00",
    },
  ],
  2026: [
    { name: "Holi", date: "03-03", type: "festival", color: "#FF69B4" },
    { name: "Ram Navami", date: "03-27", type: "festival", color: "#FF8C00" },
    { name: "Eid ul-Fitr", date: "03-20", type: "festival", color: "#00BCD4" },
    {
      name: "Buddha Purnima",
      date: "05-31",
      type: "festival",
      color: "#FFD700",
    },
    { name: "Eid ul-Adha", date: "05-27", type: "festival", color: "#00BCD4" },
    {
      name: "Raksha Bandhan",
      date: "08-28",
      type: "festival",
      color: "#FF69B4",
    },
    { name: "Janmashtami", date: "09-04", type: "festival", color: "#6A0DAD" },
    { name: "Navratri", date: "10-11", type: "festival", color: "#FF4500" },
    { name: "Dussehra", date: "10-21", type: "festival", color: "#FF6B35" },
    { name: "Diwali", date: "11-08", type: "festival", color: "#FFD700" },
    {
      name: "Guru Nanak Jayanti",
      date: "11-24",
      type: "festival",
      color: "#FF8C00",
    },
  ],
};
export class IndianHolidayProvider implements HolidayProvider {
  getHolidays(year: number): Holiday[] {
    const fixed: Holiday[] = FIXED_HOLIDAYS.map(
      (h): Holiday => ({
        name: h.name,
        date: `${String(h.month).padStart(2, "0")}-${String(h.day).padStart(2, "0")}`,
        type: h.type,
        color: h.color,
      }),
    );
    const variable = VARIABLE_HOLIDAYS[year] || VARIABLE_HOLIDAYS[2025];
    return [...fixed, ...variable];
  }
}
export const defaultHolidayProvider: HolidayProvider =
  new IndianHolidayProvider();
export function getHolidayMap(year: number): Map<string, Holiday> {
  const holidays = defaultHolidayProvider.getHolidays(year);
  const map = new Map<string, Holiday>();
  holidays.forEach((h) => map.set(`${year}-${h.date}`, h));
  return map;
}
