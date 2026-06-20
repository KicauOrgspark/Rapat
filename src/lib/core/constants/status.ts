export const AttendanceStatus = {
	HADIR: 'hadir',
	IZIN: 'izin',
	SAKIT: 'sakit',
	TIDAK_HADIR: 'tidak_hadir',
	BELUM_KONFIRMASI: 'belum_konfirmasi'
} as const;

export type AttendanceStatusType = (typeof AttendanceStatus)[keyof typeof AttendanceStatus];

export const MeetingStatus = {
	MENDATANG: 'mendatang',
	BERLANGSUNG: 'berlangsung',
	SELESAI: 'selesai',
	DIBATALKAN: 'dibatalkan'
} as const;

export type MeetingStatusType = (typeof MeetingStatus)[keyof typeof MeetingStatus];

export const attendanceStatusColors: Record<AttendanceStatusType, string> = {
	hadir: 'bg-success text-on-primary',
	izin: 'bg-warning text-on-primary',
	sakit: 'bg-accent-amber text-on-primary',
	tidak_hadir: 'bg-error text-on-primary',
	belum_konfirmasi: 'bg-surface-card text-muted'
};

export const meetingStatusColors: Record<MeetingStatusType, string> = {
	mendatang: 'bg-primary text-on-primary',
	berlangsung: 'bg-accent-teal text-on-primary',
	selesai: 'bg-surface-card text-ink',
	dibatalkan: 'bg-error text-on-primary'
};

export const attendanceStatusLabels: Record<AttendanceStatusType, string> = {
	hadir: 'Hadir',
	izin: 'Izin',
	sakit: 'Sakit',
	tidak_hadir: 'Tidak Hadir',
	belum_konfirmasi: 'Belum Konfirmasi'
};

export const meetingStatusLabels: Record<MeetingStatusType, string> = {
	mendatang: 'Mendatang',
	berlangsung: 'Berlangsung',
	selesai: 'Selesai',
	dibatalkan: 'Dibatalkan'
};
