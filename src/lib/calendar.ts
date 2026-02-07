// Calendar utilities for generating .ics files and Google Calendar links

interface GameEvent {
    date: string; // e.g., "Feb 7"
    time: string; // e.g., "7:00 PM"
    opponent: string;
    location: string;
    isHome: boolean;
    playerName?: string;
}

/**
 * Parse a date string like "Feb 7" with time "7:00 PM" into a Date object
 * Assumes current year or next year if date has passed
 */
function parseGameDateTime(dateStr: string, timeStr: string): Date {
    const months: Record<string, number> = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const [monthStr, dayStr] = dateStr.split(' ');
    const month = months[monthStr] ?? 0;
    const day = parseInt(dayStr, 10);

    // Parse time like "7:00 PM" or "2:00 PM"
    const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    let hours = 0;
    let minutes = 0;

    if (timeMatch) {
        hours = parseInt(timeMatch[1], 10);
        minutes = parseInt(timeMatch[2], 10);
        const isPM = timeMatch[3].toUpperCase() === 'PM';

        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
    }

    const now = new Date();
    let year = now.getFullYear();

    // If the date appears to be in the past, assume next year
    const testDate = new Date(year, month, day);
    if (testDate < now) {
        year++;
    }

    return new Date(year, month, day, hours, minutes);
}

/**
 * Format date for ICS file (YYYYMMDDTHHmmss format)
 */
function formatICSDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

/**
 * Generate an ICS file content for a game
 */
export function generateICS(game: GameEvent): string {
    const startDate = parseGameDateTime(game.date, game.time);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hour game duration

    const title = game.isHome
        ? `🏒 vs ${game.opponent}`
        : `🏒 @ ${game.opponent}`;

    const description = `Hockey game${game.playerName ? ` - Watch ${game.playerName} play!` : ''}`;

    const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//MyHockeyBio//Game Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${formatICSDate(startDate)}`,
        `DTEND:${formatICSDate(endDate)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${game.location}`,
        `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@myhockeybio.com`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n');

    return ics;
}

/**
 * Trigger download of an ICS file
 */
export function downloadICS(game: GameEvent): void {
    const icsContent = generateICS(game);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `game-vs-${game.opponent.replace(/\s+/g, '-').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Generate a Google Calendar link for a game
 */
export function getGoogleCalendarLink(game: GameEvent): string {
    const startDate = parseGameDateTime(game.date, game.time);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

    const formatGoogleDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const title = encodeURIComponent(
        game.isHome ? `🏒 vs ${game.opponent}` : `🏒 @ ${game.opponent}`
    );
    const details = encodeURIComponent(
        `Hockey game${game.playerName ? ` - Watch ${game.playerName} play!` : ''}`
    );
    const location = encodeURIComponent(game.location);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${details}&location=${location}`;
}
