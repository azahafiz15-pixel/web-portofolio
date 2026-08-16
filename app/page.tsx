"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, Mail, Phone, ExternalLink, ArrowRight, Download, Menu, X, ChevronRight, Briefcase, GraduationCap, Award } from 'lucide-react';

// ==========================================
// DATA DRIVEN CONTENT (Extracted purely from CV)
// ==========================================
const cvData = {
  name: "Muhammad Hafidz",
  role: "Electrical Engineer | Automation | IoT",
  about: "Mahasiswa S1 Teknik Elektro dengan pengalaman di bidang teknis dan operasional. Memiliki dasar dalam instalasi dan pemeliharaan kelistrikan, elektronika dasar, otomasi industri, mikrokontroler, dan IoT. Memiliki pengalaman praktik kerja sebagai teknisi listrik dan magang sebagai teknisi prasarana di PT Kereta Api Indonesia (Persero). Terbiasa bekerja secara teliti, mengikuti prosedur kerja, melakukan dokumentasi, serta berkolaborasi dalam tim.",
  contact: {
    phone: "+62 895-3644-57315",
    wa: "62895364457315",
    email: "azahafiz15@gmail.com"
  },
  education: [
    { period: "2022 - 2026", degree: "S1", major: "Jurusan Teknik Elektro" },
    { period: "2019 - 2022", degree: "SMK", major: "Jurusan Instalasi Tenaga Listrik" }
  ],
  experience: [
    { year: "2025", company: "PT. Kereta Api Indonesia (Persero)", role: "Teknisi Prasarana", desc: ["Mendukung kegiatan pemeriksaan dan pemeliharaan prasarana sesuai prosedur kerja dan arahan teknisi.", "Mendukung pelaksanaan pekerjaan teknis dan penanganan kebutuhan pemeliharaan di lapangan.", "Melakukan dokumentasi serta pekerjaan administratif yang berkaitan dengan kegiatan teknis."] },
    { year: "2022", company: "PT. Idola Cahaya Semesta", role: "Staff Gudang", desc: ["Melakukan pelabelan harga dan barcode pada produk berdasarkan data.", "Memastikan proses pelabelan dilakukan secara teliti sesuai informasi produk."] },
    { year: "2021", company: "PT. Idola Cahaya Semesta", role: "Teknisi Listrik", desc: ["Mendukung kegiatan teknis dan pekerjaan pemeliharaan sesuai arahan teknisi.", "Membantu dokumentasi dan pekerjaan administratif yang berkaitan dengan kegiatan teknis."] }
  ],
  skills: {
    soft: ["Adaptability", "Leadership", "Problem Solving", "Communication", "Teamwork", "Ketelitian"],
    technical: ["Instalasi Listrik", "Pemeliharaan Kelistrikan", "Otomasi Industri", "Troubleshooting Dasar", "Mikrokontroler IoT"]
  },
  certifications: [
    { year: "2025", title: "Uji Kompetensi - Otomasi Industri", org: "BNSP" },
    { year: "2025", title: "Uji Kompetensi - Elektronika Dasar", org: "BNSP" },
    { year: "2023", title: "Seminar - Google Trends and E-commerce", org: "Komdigi" },
    { year: "2022", title: "Seminar - Pemrograman PLC Sneider", org: "PT Inovasi Kita Bersama" }
  ],
  projects: [
    { title: "Sistem Penyiraman Tanaman Otomatis Berbasis IoT Menggunakan Multisensor", type: "Tugas Akhir", desc: ["Mengintegrasikan sensor soil moisture dan DHT22 untuk memantau kondisi lingkungan tanaman.", "Menggunakan pompa sebagai aktuator penyiraman dan mengimplementasikan monitoring berbasis IoT."] }
  ]
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 text-white"
    >
      <div className="overflow-hidden">
        <motion.h1 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-light tracking-widest uppercase"
        >
          {cvData.name.split(' ')[0]}
        </motion.h1>
      </div>
    </motion.div>
  );
};

const Navbar = ({ toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tighter dark:text-white">
          {cvData.name.split(' ').map(n => n[0]).join('')}.<span className="text-blue-600">CV</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            {isDark ? <Sun size={18} className="text-zinc-300" /> : <Moon size={18} className="text-zinc-600" />}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
            {isDark ? <Sun size={18} className="text-zinc-300" /> : <Moon size={18} className="text-zinc-600" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm md:text-base font-medium tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4">
            {cvData.role}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6">
            {cvData.name}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
            Professional portfolio & resume showcasing expertise in electrical engineering, automation, and IoT solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Let's Talk <ArrowRight size={18} />
            </a>
            <a href="#experience" className="w-full sm:w-auto px-8 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
              Explore Work <ChevronRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const allSkills = [...cvData.skills.technical, ...cvData.skills.soft];
  
  return (
    <div className="py-10 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800/50 overflow-hidden flex whitespace-nowrap relative">
      <motion.div 
        className="flex gap-10 min-w-full"
        animate={{ x: [0, -1035] }} // Arbitrary width for loop
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...allSkills, ...allSkills, ...allSkills].map((skill, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-light text-zinc-400 dark:text-zinc-500">{skill}</span>
            <span className="text-blue-500">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Tentang <br/><span className="text-zinc-400 dark:text-zinc-600">Saya.</span></h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {cvData.about}
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-4 font-semibold">Pendidikan</h3>
                <div className="space-y-6">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1"><GraduationCap size={20} className="text-blue-500" /></div>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">{edu.major}</p>
                        <p className="text-sm text-zinc-500">{edu.degree} | {edu.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-widest text-zinc-400 mb-4 font-semibold">Sertifikasi & Pelatihan</h3>
                <div className="space-y-6">
                  {cvData.certifications.slice(0,3).map((cert, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1"><Award size={20} className="text-blue-500" /></div>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white leading-tight">{cert.title}</p>
                        <p className="text-sm text-zinc-500 mt-1">{cert.org} | {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-900/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Pengalaman <span className="text-zinc-400 dark:text-zinc-600">Kerja</span></h2>
          <p className="text-zinc-600 dark:text-zinc-400">Jejak karir dan peran profesional yang pernah saya jalani.</p>
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 dark:before:via-zinc-700 before:to-transparent">
          {cvData.experience.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-zinc-950 bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                <Briefcase size={16} />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white">{exp.role}</h3>
                  <span className="text-xs font-medium px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full w-fit">
                    {exp.year}
                  </span>
                </div>
                <h4 className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-4">{exp.company}</h4>
                <ul className="list-disc list-outside ml-4 text-zinc-600 dark:text-zinc-400 text-sm space-y-2">
                  {exp.desc.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">Proyek <span className="text-zinc-400 dark:text-zinc-600">Teknis</span></h2>
          <p className="text-zinc-600 dark:text-zinc-400">Implementasi keterampilan dalam proyek dunia nyata.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cvData.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden"
            >
              {/* Decorative background gradient */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
              
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                {project.type}
              </span>
              
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 pr-10 leading-snug">
                {project.title}
              </h3>
              
              <div className="space-y-3 mb-8 relative z-10">
                {project.desc.map((desc, i) => (
                  <p key={i} className="text-zinc-600 dark:text-zinc-400">
                    {desc}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-3 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300">IoT</span>
                <span className="px-3 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300">Sensors</span>
                <span className="px-3 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-300">Automation</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Pesan berhasil disimulasikan. Dalam environment produksi, ini akan terhubung ke API backend.");
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Mari <br/>Berkolaborasi.</h2>
            <p className="text-zinc-400 text-lg max-w-md mb-12">
              Tertarik untuk mendiskusikan peluang kerja, proyek, atau sekadar bertukar wawasan di bidang kelistrikan dan IoT? Silakan hubungi saya.
            </p>

            <div className="space-y-6">
              <a href={`mailto:${cvData.contact.email}`} className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">Email</p>
                  <p className="text-lg font-medium group-hover:text-blue-400 transition-colors">{cvData.contact.email}</p>
                </div>
              </a>
              
              <a href={`https://wa.me/${cvData.contact.wa}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 mb-1">WhatsApp</p>
                  <p className="text-lg font-medium group-hover:text-green-400 transition-colors">{cvData.contact.phone}</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950/50 p-8 md:p-10 rounded-3xl border border-zinc-800 backdrop-blur-sm"
          >
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Nama Lengkap</label>
                  <input type="text" required className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Email</label>
                  <input type="email" required className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Pesan</label>
                <textarea required rows={5} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Ceritakan tentang proyek Anda..."></textarea>
              </div>
              <button type="submit" className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                Kirim Pesan <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 py-8 border-t border-zinc-900">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
      <p>© {new Date().getFullYear()} {cvData.name}. All rights reserved.</p>
      <p>Designed with standard web technologies.</p>
    </div>
  </footer>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true); // Default dark theme for premium feel
  const mousePosition = useMousePosition();

  // Smooth scroll styles
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Apply theme
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen text-zinc-900 bg-white dark:bg-zinc-950 transition-colors duration-300 selection:bg-blue-500/30 font-sans`}>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Custom Cursor (Hidden on mobile) */}
          <motion.div
            className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-blue-500 pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-500 pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
            }}
            transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
          />

          <Navbar toggleTheme={toggleTheme} isDark={isDark} />
          
          <main>
            <Hero />
            <Marquee />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}