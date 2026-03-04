

# Custom Booking System with Scarcity Slots

## Why Custom
The current Google Calendar iframe doesn't allow programmatic control over slot availability patterns. To enforce "no slots before 12:30pm", "2 per day max", and rotating weekly patterns, we need a custom booking UI.

## Slot Algorithm

A deterministic function generates available slots per day using a seeded pseudo-random approach based on the date, so slots look different week-to-week but are consistent for all visitors on the same day:

- **No slots before 12:30pm** - all slots are afternoon/evening only
- **Exactly 2 slots per day** - picked from a pool of 5 possible times (12:30, 13:30, 14:30, 15:30, 16:30)
- **Week rotation** - the seed uses `weekNumber % 4` so the pattern repeats every 4 weeks but varies within
- **Weekends blocked** - no Saturday/Sunday slots
- **Past dates blocked**

Example output for a given week:
- Monday: 13:30, 15:30
- Tuesday: 12:30, 16:30
- Wednesday: 14:30, 15:30
- Thursday: 12:30, 13:30
- Friday: 14:30, 16:30

## What Gets Built

### `src/utils/booking-slots.ts`
Deterministic slot generator function. No randomness at runtime - uses date-based seed so all visitors see the same slots.

### Updated `BookingDialog.tsx`
Replaces the Google Calendar iframe with:
1. A calendar date picker (using existing shadcn Calendar component)
2. Available time slots shown as buttons below the calendar
3. A booking form (Name, Email, Phone, Message) shown after selecting a slot
4. Submit stores to existing Supabase `bookings` table (or creates one if missing)
5. Confirmation state with selected date/time

### Supabase
Uses existing booking infrastructure. Booked slots are checked against the database so the same slot can't be double-booked.

## Files

```
Created:  src/utils/booking-slots.ts
Modified: src/components/BookingDialog.tsx
```

