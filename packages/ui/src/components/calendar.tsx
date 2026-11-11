"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent,
} from "react";
import { cn } from "../lib/cn";

type PlainDate = {
  year: number;
  month: number;
  day: number;
};

export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function parseCalendarDate(value: string): PlainDate | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return undefined;
  }
  return { day, month, year };
}

export function isValidCalendarDate(value: string): boolean {
  return parseCalendarDate(value) !== undefined;
}

function toCalendarDate({ day, month, year }: PlainDate): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function toUtcDate(value: string): Date {
  const parsed = parseCalendarDate(value);
  if (!parsed) throw new RangeError(`Invalid calendar date: ${value}`);
  return new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day, 12));
}

function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function addDays(value: string, amount: number): string {
  const date = toUtcDate(value);
  date.setUTCDate(date.getUTCDate() + amount);
  return toCalendarDate({
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  });
}

function addMonths(value: string, amount: number): string {
  const parsed = parseCalendarDate(value)!;
  const monthIndex = parsed.year * 12 + (parsed.month - 1) + amount;
  const year = Math.floor(monthIndex / 12);
  const month = (((monthIndex % 12) + 12) % 12) + 1;
  return toCalendarDate({
    day: Math.min(parsed.day, daysInMonth(year, month)),
    month,
    year,
  });
}

function startOfMonth(value: string): string {
  const parsed = parseCalendarDate(value)!;
  return toCalendarDate({ ...parsed, day: 1 });
}

function endOfMonth(value: string): string {
  const parsed = parseCalendarDate(value)!;
  return toCalendarDate({
    ...parsed,
    day: daysInMonth(parsed.year, parsed.month),
  });
}

function dayOfWeek(value: string): WeekStart {
  return toUtcDate(value).getUTCDay() as WeekStart;
}

function todayInTimeZone(timeZone: string): string {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat("en-CA", {
      day: "2-digit",
      month: "2-digit",
      timeZone,
      year: "numeric",
    }).formatToParts(new Date());
  } catch {
    throw new RangeError(`Invalid IANA time zone: ${timeZone}`);
  }
  const value = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  return `${value.year}-${value.month}-${value.day}`;
}

export function formatCalendarDate(
  value: string,
  locale: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
  return new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: "UTC",
  }).format(toUtcDate(value));
}

function requireValidDate(value: string | undefined, name: string) {
  if (value && !isValidCalendarDate(value)) {
    throw new RangeError(
      `${name} must use the YYYY-MM-DD calendar-date format.`,
    );
  }
}

function clampDate(value: string, min?: string, max?: string): string {
  if (min && value < min) return min;
  if (max && value > max) return max;
  return value;
}

export type CalendarProps = Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange" | "value"
> & {
  /** Gregorian civil date in strict YYYY-MM-DD form; it is not an instant. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Month shown initially when there is no selection, in YYYY-MM-DD form. */
  initialMonth?: string;
  onMonthChange?: (firstDayOfMonth: string) => void;
  locale?: string;
  /** Determines "today" only; civil-date values do not shift across zones. */
  timeZone?: string;
  weekStartsOn?: WeekStart;
  min?: string;
  max?: string;
  disabledDate?: (value: string) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
};

export function Calendar({
  className,
  defaultValue = "",
  disabled = false,
  disabledDate,
  initialMonth,
  label = "Choose a date",
  locale = "en-US",
  max,
  min,
  onMonthChange,
  onValueChange,
  readOnly = false,
  ref,
  timeZone = "UTC",
  value,
  weekStartsOn = 0,
  ...props
}: CalendarProps) {
  requireValidDate(value, "value");
  requireValidDate(defaultValue, "defaultValue");
  requireValidDate(initialMonth, "initialMonth");
  requireValidDate(min, "min");
  requireValidDate(max, "max");
  if (min && max && min > max) {
    throw new RangeError("min must not be after max.");
  }

  const today = todayInTimeZone(timeZone);
  const initialDate = clampDate(
    value || defaultValue || initialMonth || today,
    min,
    max,
  );
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialDate));
  const [focusedDate, setFocusedDate] = useState(initialDate);
  const gridId = useId();
  const headingId = `${gridId}-heading`;
  const announcementId = `${gridId}-announcement`;
  const dayRefs = useRef(new Map<string, HTMLButtonElement>());
  const shouldFocusDay = useRef(false);

  useEffect(() => {
    if (!value) return;
    const clampedValue = clampDate(value, min, max);
    setFocusedDate(clampedValue);
    setVisibleMonth(startOfMonth(clampedValue));
  }, [max, min, value]);

  useEffect(() => {
    if (!shouldFocusDay.current) return;
    dayRefs.current.get(focusedDate)?.focus();
    shouldFocusDay.current = false;
  }, [focusedDate, visibleMonth]);

  const monthLabel = useMemo(
    () =>
      formatCalendarDate(visibleMonth, locale, {
        month: "long",
        year: "numeric",
      }),
    [locale, visibleMonth],
  );
  const weekdayLabels = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const day = addDays("2024-01-07", (weekStartsOn + index) % 7);
        return {
          long: formatCalendarDate(day, locale, { weekday: "long" }),
          short: formatCalendarDate(day, locale, { weekday: "short" }),
        };
      }),
    [locale, weekStartsOn],
  );
  const dates = useMemo(() => {
    const offset = (dayOfWeek(visibleMonth) - weekStartsOn + 7) % 7;
    const gridStart = addDays(visibleMonth, -offset);
    return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  }, [visibleMonth, weekStartsOn]);

  const isUnavailable = (date: string) =>
    Boolean((min && date < min) || (max && date > max) || disabledDate?.(date));

  const changeMonth = (nextMonth: string, focusDate?: string) => {
    setVisibleMonth(startOfMonth(nextMonth));
    onMonthChange?.(startOfMonth(nextMonth));
    if (focusDate) {
      shouldFocusDay.current = true;
      setFocusedDate(clampDate(focusDate, min, max));
    }
  };

  const moveFocus = (nextDate: string) => {
    const clampedDate = clampDate(nextDate, min, max);
    shouldFocusDay.current = true;
    setFocusedDate(clampedDate);
    if (clampedDate < visibleMonth || clampedDate > endOfMonth(visibleMonth)) {
      changeMonth(clampedDate);
    }
  };

  const handleDayKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    date: string,
  ) => {
    let nextDate: string | undefined;
    switch (event.key) {
      case "ArrowLeft":
        nextDate = addDays(date, -1);
        break;
      case "ArrowRight":
        nextDate = addDays(date, 1);
        break;
      case "ArrowUp":
        nextDate = addDays(date, -7);
        break;
      case "ArrowDown":
        nextDate = addDays(date, 7);
        break;
      case "Home":
        nextDate = addDays(date, -((dayOfWeek(date) - weekStartsOn + 7) % 7));
        break;
      case "End":
        nextDate = addDays(
          date,
          6 - ((dayOfWeek(date) - weekStartsOn + 7) % 7),
        );
        break;
      case "PageUp":
        nextDate = addMonths(date, event.shiftKey ? -12 : -1);
        break;
      case "PageDown":
        nextDate = addMonths(date, event.shiftKey ? 12 : 1);
        break;
      default:
        return;
    }
    event.preventDefault();
    moveFocus(nextDate);
  };

  const previousMonth = addMonths(visibleMonth, -1);
  const nextMonth = addMonths(visibleMonth, 1);
  const previousDisabled =
    disabled || Boolean(min && endOfMonth(previousMonth) < min);
  const nextDisabled =
    disabled || Boolean(max && startOfMonth(nextMonth) > max);
  const selectedAnnouncement = selectedValue
    ? `Selected ${formatCalendarDate(selectedValue, locale, { dateStyle: "full" })}`
    : "No date selected";

  return (
    <div
      aria-disabled={disabled || undefined}
      aria-label={label}
      aria-readonly={readOnly || undefined}
      className={cn(
        "w-fit max-w-full rounded-xl border border-mar-border bg-mar-card p-3 font-mar-sans text-mar-text",
        disabled && "opacity-60",
        className,
      )}
      ref={ref}
      role="group"
      {...props}
    >
      <div className="mb-3 grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2">
        <button
          aria-label="Previous month"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-mar-border bg-mar-card text-lg hover:bg-mar-surface disabled:cursor-not-allowed disabled:opacity-50"
          disabled={previousDisabled}
          onClick={() => changeMonth(previousMonth)}
          type="button"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <h2
          aria-atomic="true"
          aria-live="polite"
          className="text-center text-base font-semibold"
          id={headingId}
        >
          {monthLabel}
        </h2>
        <button
          aria-label="Next month"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-mar-border bg-mar-card text-lg hover:bg-mar-surface disabled:cursor-not-allowed disabled:opacity-50"
          disabled={nextDisabled}
          onClick={() => changeMonth(nextMonth)}
          type="button"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div aria-live="polite" className="sr-only" id={announcementId}>
        {selectedAnnouncement}
      </div>
      <table
        aria-describedby={announcementId}
        aria-labelledby={headingId}
        className="border-separate border-spacing-0.5"
        role="grid"
      >
        <thead>
          <tr>
            {weekdayLabels.map((weekday) => (
              <th
                abbr={weekday.long}
                className="h-8 w-10 text-center text-xs font-semibold text-mar-muted"
                key={weekday.long}
                scope="col"
              >
                {weekday.short.slice(0, 2)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }, (_, rowIndex) => (
            <tr key={dates[rowIndex * 7]}>
              {dates.slice(rowIndex * 7, rowIndex * 7 + 7).map((date) => {
                const unavailable = isUnavailable(date);
                const selected = date === selectedValue;
                const outside = startOfMonth(date) !== visibleMonth;
                const parsed = parseCalendarDate(date)!;
                return (
                  <td
                    aria-selected={selected}
                    className="p-0 text-center"
                    key={date}
                    role="gridcell"
                  >
                    <button
                      aria-current={date === today ? "date" : undefined}
                      aria-disabled={unavailable || readOnly || undefined}
                      aria-label={`${formatCalendarDate(date, locale, { dateStyle: "full" })}${selected ? ", selected" : ""}`}
                      className={cn(
                        "inline-flex size-10 items-center justify-center rounded-lg text-sm transition-colors duration-[var(--marisma-duration-fast)] hover:bg-mar-surface",
                        outside && "text-mar-muted opacity-70",
                        selected &&
                          "bg-mar-primary font-semibold text-mar-on-primary hover:bg-mar-primary-hover",
                        unavailable &&
                          "cursor-not-allowed line-through opacity-45",
                      )}
                      data-outside={outside || undefined}
                      onClick={() => {
                        if (disabled || readOnly || unavailable) return;
                        if (value === undefined) setInternalValue(date);
                        onValueChange?.(date);
                      }}
                      onFocus={() => setFocusedDate(date)}
                      onKeyDown={(event) => handleDayKeyDown(event, date)}
                      ref={(node) => {
                        if (node) dayRefs.current.set(date, node);
                        else dayRefs.current.delete(date);
                      }}
                      tabIndex={date === focusedDate && !disabled ? 0 : -1}
                      type="button"
                    >
                      {parsed.day}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
