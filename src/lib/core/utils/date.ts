import { format, isToday as isTodayFn, isAfter, isBefore, startOfDay } from 'date-fns';
import { id } from 'date-fns/locale';

export function formatDate(date: Date | string, formatStr: string = 'EEEE, d MMMM yyyy'): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return format(d, formatStr, { locale: id });
}

export function formatTime(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return format(d, 'HH:mm');
}

export function formatTimeRange(start: Date | string, end: Date | string): string {
	return `${formatTime(start)} - ${formatTime(end)}`;
}

export function formatShortDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return format(d, 'd MMM', { locale: id });
}

export function formatFullDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return format(d, 'd MMMM yyyy', { locale: id });
}

export function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 11) return 'Selamat pagi';
	if (hour < 15) return 'Selamat siang';
	if (hour < 18) return 'Selamat sore';
	return 'Selamat malam';
}

export function isToday(date: Date | string): boolean {
	const d = typeof date === 'string' ? new Date(date) : date;
	return isTodayFn(d);
}

export function isUpcoming(date: Date | string): boolean {
	const d = typeof date === 'string' ? new Date(date) : date;
	return isAfter(startOfDay(d), startOfDay(new Date()));
}

export function isPast(date: Date | string): boolean {
	const d = typeof date === 'string' ? new Date(date) : date;
	return isBefore(startOfDay(d), startOfDay(new Date()));
}
