import type { User } from '../auth/auth.types';
import type { Meeting } from '$lib/features/meetings/meetings.types';
import type { AttendanceRecord, AttendanceStats } from '$lib/features/attendance/attendance.types';
import type { MeetingNote } from '$lib/features/notes/notes.types';

export const mockUser: User = {
	id: 'usr_001',
	name: 'Sari Dewi, S.Pd.',
	nig: '198501012010012001',
	phone: '081234567890',
	subjects: ['Matematika', 'IPA'],
	title: 'Ibu'
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

function daysFromNow(days: number): Date {
	const d = new Date();
	d.setDate(d.getDate() + days);
	return d;
}

function dateAt(y: number, m: number, d: number, h: number, min: number): Date {
	return new Date(y, m, d, h, min);
}

export const mockMeetings: Meeting[] = [
	{
		id: 'mtg_001',
		title: 'Rapat Koordinasi Kurikulum Semester Ganjil 2026/2027',
		description:
			'Pembahasan penyusunan kurikulum semester ganjil, pembagian tugas mengajar, dan penyesuaian jadwal pelajaran.',
		date: daysFromNow(0),
		startTime: dateAt(year, month, today.getDate(), 13, 0),
		endTime: dateAt(year, month, today.getDate(), 15, 0),
		location: 'Ruang Guru SMPN 1 Sukamaju',
		organizer: 'Drs. Ahmad Hidayat, M.Pd.',
		status: 'mendatang',
		agenda: [
			'Pembukaan dan sambutan Kepala Sekolah',
			'Evaluasi kurikulum semester genap lalu',
			'Penyusunan jadwal pelajaran semester ganjil',
			'Pembagian tugas mengajar dan wali kelas',
			'Tanya jawab dan penutup'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'belum_konfirmasi' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' },
			{ userId: 'usr_004', name: 'Eko Prasetyo, S.Pd.', status: 'izin' },
			{ userId: 'usr_005', name: 'Dewi Lestari, S.Pd.', status: 'belum_konfirmasi' }
		]
	},
	{
		id: 'mtg_002',
		title: 'Rapat Persiapan Penilaian Tengah Semester',
		description:
			'Koordinasi penyusunan soal PTS, jadwal pelaksanaan, dan pembagian tugas pengawas ujian.',
		date: daysFromNow(3),
		startTime: dateAt(year, month, today.getDate() + 3, 9, 0),
		endTime: dateAt(year, month, today.getDate() + 3, 11, 30),
		location: 'Aula Utama SMPN 1 Sukamaju',
		organizer: 'Dra. Siti Nurhaliza, M.Pd.',
		status: 'mendatang',
		agenda: [
			'Pembentukan panitia PTS',
			'Penyusunan jadwal ujian',
			'Pembagian tugas pengawas',
			'Pembahasan kisi-kisi soal',
			'Teknis pelaksanaan dan tata tertib'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'belum_konfirmasi' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'belum_konfirmasi' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' },
			{ userId: 'usr_005', name: 'Dewi Lestari, S.Pd.', status: 'belum_konfirmasi' }
		]
	},
	{
		id: 'mtg_003',
		title: 'Rapat Pembahasan Program Ekstrakurikuler',
		description: 'Perencanaan dan evaluasi program ekstrakurikuler untuk semester ganjil.',
		date: daysFromNow(7),
		startTime: dateAt(year, month, today.getDate() + 7, 14, 0),
		endTime: dateAt(year, month, today.getDate() + 7, 16, 0),
		location: 'Ruang Rapat Lantai 2',
		organizer: 'Hendra Gunawan, S.Pd.',
		status: 'mendatang',
		agenda: [
			'Evaluasi ekskul semester lalu',
			'Pengajuan program ekskul baru',
			'Penjadwalan kegiatan ekskul',
			'Anggaran dan fasilitas',
			'Pembina ekskul dan tanggung jawab'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'belum_konfirmasi' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_006', name: 'Agus Setiawan, S.Pd.', status: 'hadir' }
		]
	},
	{
		id: 'mtg_004',
		title: 'Rapat Evaluasi Kedisiplinan Siswa',
		description:
			'Pembahasan kasus kedisiplinan, evaluasi tata tertib, dan rencana pembinaan siswa.',
		date: daysFromNow(-2),
		startTime: dateAt(year, month, today.getDate() - 2, 10, 0),
		endTime: dateAt(year, month, today.getDate() - 2, 12, 0),
		location: 'Ruang BK SMPN 1 Sukamaju',
		organizer: 'Drs. Bambang Widodo',
		status: 'selesai',
		agenda: [
			'Laporan kasus kedisiplinan bulan ini',
			'Evaluasi tata tertib sekolah',
			'Rencana pembinaan siswa bermasalah',
			'Koordinasi dengan orang tua/wali',
			'Program pencegahan pelanggaran'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'hadir' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' },
			{ userId: 'usr_004', name: 'Eko Prasetyo, S.Pd.', status: 'tidak_hadir' }
		]
	},
	{
		id: 'mtg_005',
		title: 'Rapat Persiapan Penerimaan Peserta Didik Baru',
		description: 'Koordinasi panitia PPDB, sosialisasi, dan teknis pelaksanaan pendaftaran.',
		date: daysFromNow(-5),
		startTime: dateAt(year, month, today.getDate() - 5, 8, 30),
		endTime: dateAt(year, month, today.getDate() - 5, 11, 0),
		location: 'Aula Utama SMPN 1 Sukamaju',
		organizer: 'Drs. Ahmad Hidayat, M.Pd.',
		status: 'selesai',
		agenda: [
			'Pembentukan panitia PPDB',
			'Penyusunan jadwal pendaftaran',
			'Teknis verifikasi berkas',
			'Sosialisasi ke SD/MI',
			'Anggaran dan logistik PPDB'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'hadir' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'izin' },
			{ userId: 'usr_005', name: 'Dewi Lestari, S.Pd.', status: 'hadir' }
		]
	},
	{
		id: 'mtg_006',
		title: 'Rapat Koordinasi Wali Kelas',
		description:
			'Pembahasan perkembangan siswa, laporan akademik, dan komunikasi dengan orang tua.',
		date: daysFromNow(-10),
		startTime: dateAt(year, month, today.getDate() - 10, 13, 30),
		endTime: dateAt(year, month, today.getDate() - 10, 15, 0),
		location: 'Ruang Guru SMPN 1 Sukamaju',
		organizer: 'Dra. Siti Nurhaliza, M.Pd.',
		status: 'selesai',
		agenda: [
			'Laporan perkembangan siswa per kelas',
			'Identifikasi siswa bermasalah akademik',
			'Program remedial dan pengayaan',
			'Jadwal pembagian rapor',
			'Komunikasi dengan orang tua/wali'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'hadir' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' }
		]
	},
	{
		id: 'mtg_007',
		title: 'Rapat Sosialisasi Kurikulum Merdeka',
		description:
			'Penjelasan implementasi Kurikulum Merdeka, proyek P5, dan perubahan metode pembelajaran.',
		date: daysFromNow(-15),
		startTime: dateAt(year, month, today.getDate() - 15, 9, 0),
		endTime: dateAt(year, month, today.getDate() - 15, 12, 0),
		location: 'Aula Utama SMPN 1 Sukamaju',
		organizer: 'Drs. Ahmad Hidayat, M.Pd.',
		status: 'selesai',
		agenda: [
			'Pengantar Kurikulum Merdeka',
			'Konsep Proyek Penguatan Profil Pelajar Pancasila (P5)',
			'Perubahan metode penilaian',
			'Pelatihan modul ajar',
			'Diskusi dan tanya jawab'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'hadir' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' },
			{ userId: 'usr_004', name: 'Eko Prasetyo, S.Pd.', status: 'hadir' },
			{ userId: 'usr_005', name: 'Dewi Lestari, S.Pd.', status: 'hadir' }
		]
	},
	{
		id: 'mtg_008',
		title: 'Rapat Persiapan Peringatan Hari Guru',
		description: 'Perencanaan acara peringatan Hari Guru Nasional dan apresiasi guru berprestasi.',
		date: daysFromNow(14),
		startTime: dateAt(year, month, today.getDate() + 14, 10, 0),
		endTime: dateAt(year, month, today.getDate() + 14, 12, 0),
		location: 'Ruang Rapat Lantai 2',
		organizer: 'Hendra Gunawan, S.Pd.',
		status: 'mendatang',
		agenda: [
			'Pembentukan panitia peringatan',
			'Konsep acara dan susunan kegiatan',
			'Pemilihan guru berprestasi',
			'Anggaran dan konsumsi',
			'Undangan dan publikasi'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'belum_konfirmasi' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'belum_konfirmasi' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' }
		]
	},
	{
		id: 'mtg_009',
		title: 'Rapat Evaluasi Ujian Semester Genap',
		description: 'Analisis hasil ujian semester genap dan rencana tindak lanjut perbaikan.',
		date: daysFromNow(-20),
		startTime: dateAt(year, month, today.getDate() - 20, 13, 0),
		endTime: dateAt(year, month, today.getDate() - 20, 15, 30),
		location: 'Ruang Guru SMPN 1 Sukamaju',
		organizer: 'Dra. Siti Nurhaliza, M.Pd.',
		status: 'selesai',
		agenda: [
			'Presentasi hasil ujian per mata pelajaran',
			'Analisis nilai dan ketuntasan belajar',
			'Identifikasi materi yang perlu perbaikan',
			'Rencana program remedial',
			'Evaluasi proses ujian'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'izin' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_003', name: 'Rina Wati, S.Pd.', status: 'hadir' }
		]
	},
	{
		id: 'mtg_010',
		title: 'Rapat Koordinasi Kegiatan Study Tour',
		description: 'Perencanaan study tour kelas 8 ke museum dan tempat bersejarah di kota.',
		date: daysFromNow(-25),
		startTime: dateAt(year, month, today.getDate() - 25, 9, 0),
		endTime: dateAt(year, month, today.getDate() - 25, 11, 0),
		location: 'Ruang Rapat Lantai 2',
		organizer: 'Agus Setiawan, S.Pd.',
		status: 'selesai',
		agenda: [
			'Penentuan tujuan study tour',
			'Penyusunan jadwal dan rute',
			'Pembagian tugas pendamping',
			'Perizinan dan asuransi',
			'Biaya dan pembayaran siswa'
		],
		attendees: [
			{ userId: 'usr_001', name: 'Sari Dewi, S.Pd.', status: 'tidak_hadir' },
			{ userId: 'usr_002', name: 'Budi Santoso, S.Pd.', status: 'hadir' },
			{ userId: 'usr_006', name: 'Agus Setiawan, S.Pd.', status: 'hadir' }
		]
	}
];

export const mockAttendanceRecords: AttendanceRecord[] = mockMeetings
	.filter((m) => m.status === 'selesai')
	.map((m) => {
		const attendee = m.attendees.find((a) => a.userId === 'usr_001');
		return {
			date: m.date,
			meetingId: m.id,
			meetingTitle: m.title,
			status: (attendee?.status as AttendanceRecord['status']) || 'belum_konfirmasi'
		};
	});

export const mockAttendanceStats: AttendanceStats = (() => {
	const records = mockAttendanceRecords;
	const total = records.length;
	const hadir = records.filter((r) => r.status === 'hadir').length;
	const izin = records.filter((r) => r.status === 'izin' || r.status === 'sakit').length;
	const sakit = records.filter((r) => r.status === 'sakit').length;
	const tidakHadir = records.filter((r) => r.status === 'tidak_hadir').length;
	return {
		totalMeetings: total,
		hadir,
		izin,
		sakit,
		tidakHadir,
		percentage: total > 0 ? Math.round((hadir / total) * 100) : 0
	};
})();

export const mockNotes: MeetingNote[] = [
	{
		id: 'note_001',
		meetingId: 'mtg_004',
		meetingTitle: 'Rapat Evaluasi Kedisiplinan Siswa',
		date: daysFromNow(-2),
		author: 'Drs. Bambang Widodo',
		content: `**Pembukaan**
Rapat dibuka oleh Kepala Sekolah pada pukul 10.00 WIB. Hadir 15 guru dan staf BK.

**Laporan Kasus Kedisiplinan**
Selama bulan ini tercatat 12 kasus pelanggaran tata tertib:
- 5 kasus keterlambatan berulang
- 3 kasus seragam tidak lengkap
- 2 kasus penggunaan HP saat pelajaran
- 2 kasus tidak mengerjakan tugas

**Evaluasi Tata Tertib**
Disepakati bahwa tata tertib saat ini sudah cukup baik, namun perlu penegasan sanksi yang lebih konsisten. Beberapa usulan:
1. Sistem poin pelanggaran untuk memudahkan pemantauan
2. Surat peringatan bertahap (SP1, SP2, SP3)
3. Pembinaan khusus untuk siswa dengan poin tinggi

**Rencana Pembinaan**
- Konseling individual untuk siswa bermasalah
- Libatkan orang tua melalui panggilan dan pertemuan
- Program mentoring oleh guru wali kelas

**Penutup**
Rapat ditutup pukul 12.00 WIB. Tindak lanjut akan dievaluasi pada rapat berikutnya.`
	},
	{
		id: 'note_002',
		meetingId: 'mtg_005',
		meetingTitle: 'Rapat Persiapan Penerimaan Peserta Didik Baru',
		date: daysFromNow(-5),
		author: 'Drs. Ahmad Hidayat, M.Pd.',
		content: `**Pembentukan Panitia PPDB**
Ketua Panitia: Drs. Ahmad Hidayat, M.Pd.
Sekretaris: Rina Wati, S.Pd.
Bendahara: Dewi Lestari, S.Pd.
Seksi Pendaftaran: Budi Santoso, S.Pd. dan tim
Seksi Verifikasi: Sari Dewi, S.Pd. dan tim

**Jadwal PPDB**
- Pendaftaran online: 1 - 14 Juli 2026
- Verifikasi berkas: 15 - 18 Juli 2026
- Pengumuman: 20 Juli 2026
- Daftar ulang: 21 - 23 Juli 2026

**Teknis Verifikasi**
Berkas yang diverifikasi: ijazah SD/MI, akta kelahiran, kartu keluarga, pas foto 3x4 (4 lembar), dan surat keterangan sehat.

**Sosialisasi**
Akan dilakukan kunjungan ke 8 SD/MI di kecamatan Sukamaju pada minggu ke-4 Juni. Materi sosialisasi berupa brosur dan presentasi.

**Anggaran**
Total anggaran PPDB: Rp 15.000.000 (sumber: dana BOS). Rincian terlampir.`
	},
	{
		id: 'note_003',
		meetingId: 'mtg_007',
		meetingTitle: 'Rapat Sosialisasi Kurikulum Merdeka',
		date: daysFromNow(-15),
		author: 'Drs. Ahmad Hidayat, M.Pd.',
		content: `**Pengantar Kurikulum Merdeka**
Kurikulum Merdeka menekankan pembelajaran yang berpusat pada siswa, pengembangan karakter Profil Pelajar Pancasila, dan fleksibilitas dalam metode pengajaran.

**Proyek P5 (Projek Penguatan Profil Pelajar Pancasila)**
Setiap semester, siswa wajib mengikuti minimal 1 projek P5 dengan tema:
- Semester Ganjil: "Gaya Hidup Berkelanjutan"
- Semester Genap: "Kearifan Lokal"

**Perubahan Metode Penilaian**
- Penilaian formatif lebih ditekankan daripada sumatif
- Portofolio dan projek sebagai instrumen utama
- Rubrik penilaian disusun per mata pelajaran

**Pelatihan Modul Ajar**
Seluruh guru wajib menyusun modul ajar berbasis diferensiasi. Pelatihan akan dilaksanakan pada tanggal 5-7 Juli 2026 oleh narasumber dari Dinas Pendidikan.

**Diskusi**
Beberapa guru menyampaikan kekhawatiran terkait kesiapan infrastruktur digital. Akan diadakan pelatihan tambahan untuk penggunaan platform digital.`
	},
	{
		id: 'note_004',
		meetingId: 'mtg_006',
		meetingTitle: 'Rapat Koordinasi Wali Kelas',
		date: daysFromNow(-10),
		author: 'Dra. Siti Nurhaliza, M.Pd.',
		content: `**Laporan Perkembangan Siswa**
- Kelas 7: Rata-rata kehadiran 95%, 3 siswa perlu perhatian khusus (nilai di bawah KKM)
- Kelas 8: Rata-rata kehadiran 92%, 5 siswa dengan catatan kedisiplinan
- Kelas 9: Rata-rata kehadiran 97%, persiapan ujian akhir berjalan baik

**Identifikasi Siswa Bermasalah**
Tercatat 8 siswa yang memerlukan perhatian ekstra:
- 4 siswa dengan nilai akademik rendah
- 3 siswa dengan masalah kedisiplinan
- 1 siswa dengan masalah sosial (bullying)

**Program Remedial**
- Kelas tambahan setiap Sabtu untuk siswa di bawah KKM
- Pendampingan oleh guru BK untuk siswa bermasalah
- Peer tutoring oleh siswa berprestasi

**Jadwal Pembagian Rapor**
Pembagian rapor direncanakan pada tanggal 28 Juni 2026. Wali kelas diminta menyiapkan laporan per siswa paling lambat 25 Juni 2026.

**Komunikasi dengan Orang Tua**
Disepakati untuk mengadakan pertemuan orang tua per kelas pada minggu ke-3 Juni untuk membahas perkembangan anak.`
	},
	{
		id: 'note_005',
		meetingId: 'mtg_009',
		meetingTitle: 'Rapat Evaluasi Ujian Semester Genap',
		date: daysFromNow(-20),
		author: 'Dra. Siti Nurhaliza, M.Pd.',
		content: `**Hasil Ujian Per Mata Pelajaran**
- Matematika: Rata-rata 72, ketuntasan 78%
- IPA: Rata-rata 75, ketuntasan 82%
- Bahasa Indonesia: Rata-rata 80, ketuntasan 88%
- Bahasa Inggris: Rata-rata 68, ketuntasan 72%
- IPS: Rata-rata 77, ketuntasan 85%

**Analisis Ketuntasan**
Mata pelajaran dengan ketuntasan terendah adalah Bahasa Inggris (72%) dan Matematika (78%). Perlu strategi khusus untuk meningkatkan hasil pada kedua mapel ini.

**Materi yang Perlu Perbaikan**
- Matematika: Aljabar dan Geometri
- Bahasa Inggris: Reading comprehension dan grammar
- IPA: Konsep fisika dasar

**Program Remedial**
- Remedial untuk siswa yang belum tuntas (maksimal 2 kali)
- Kelas pengayaan untuk siswa yang sudah tuntas
- Penambahan jam latihan soal

**Evaluasi Proses Ujian**
Secara umum pelaksanaan ujian berjalan lancar. Catatan: perlu perbaikan sistem CBT (Computer Based Test) karena sempat terjadi kendala server pada hari ke-2.`
	}
];
