"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun, Mail, Phone, ExternalLink, ArrowRight, Download, Menu, X, ChevronRight, Briefcase, GraduationCap, MapPin } from 'lucide-react';

// Data CV Muhammad Hafidz dalam Bahasa Indonesia
const CV_DATA = {
  name: "Muhammad Hafidz",
  role: "Mahasiswa S1 Teknik Elektro",
  email: "azahafiz15@gmail.com",
  phone: "+62 895-3644-57315",
  about: "Mahasiswa S1 Teknik Elektro dengan pengalaman di bidang teknis dan operasional. Memiliki dasar dalam instalasi dan pemeliharaan kelistrikan, elektronika dasar, otomasi industri, mikrokontroler, dan IoT. Memiliki pengalaman praktik kerja sebagai teknisi listrik dan magang sebagai teknisi prasarana di PT Kereta Api Indonesia (Persero). Terbiasa bekerja secara teliti, mengikuti prosedur kerja, melakukan dokumentasi, serta berkolaborasi dalam tim.",
  skills: [
    "Instalasi Kelistrikan", "Pemeliharaan Dasar", "Otomasi Industri", 
    "Troubleshooting", "Mikrokontroler & IoT", "Adaptibilitas", 
    "Kepemimpinan", "Penyelesaian Masalah", "Komunikasi", "Kerjasama Tim", "Ketelitian"
  ],
  experience: [
    {
      year: "2025",
      company: "PT. Kereta Api Indonesia (Persero)",
      role: "Teknisi Prasarana",
      desc: "Mendukung kegiatan pemeriksaan dan pemeliharaan prasarana sesuai prosedur kerja dan arahan teknisi. Mendukung pelaksanaan pekerjaan teknis dan penanganan kebutuhan pemeliharaan di lapangan. Melakukan dokumentasi serta pekerjaan administratif yang berkaitan dengan kegiatan teknis."
    },
    {
      year: "2022",
      company: "PT. Idola Cahaya Semesta",
      role: "Staff Gudang",
      desc: "Melakukan pelabelan harga dan barcode pada produk berdasarkan data. Memastikan proses pelabelan dilakukan secara teliti sesuai informasi produk."
    },
    {
      year: "2021",
      company: "PT. Idola Cahaya Semesta",
      role: "Teknisi Listrik",
      desc: "Mendukung kegiatan teknis dan pekerjaan pemeliharaan sesuai arahan teknisi. Membantu dokumentasi dan pekerjaan administratif yang berkaitan dengan kegiatan teknis."
    }
  ],
  education: [
    {
      year: "2022 - 2026",
      school: "Strata 1 (S1)",
      major: "Jurusan Teknik Elektro"
    },
    {
      year: "2019 - 2022",
      school: "Sekolah Menengah Kejuruan (SMK)",
      major: "Jurusan Instalasi Tenaga Listrik"
    }
  ],
  certifications: [
    { year: "2025", title: "Uji Kompetensi BNSP - Otomasi Industri" },
    { year: "2025", title: "Uji Kompetensi BNSP - Elektronika Dasar" },
    { year: "2022", title: "Seminar PT Inovasi Kita Bersama - Pemrograman PLC Schneider" },
    { year: "2023", title: "Seminar Komdigi - Google Trends and E-commerce" }
  ],
  projects: [
    {
      title: "Sistem Penyiraman Tanaman Otomatis Berbasis IoT Menggunakan Multisensor",
      category: "Tugas Akhir / Proyek Utama",
      tech: ["IoT", "Sensor", "Otomasi"],
      desc: "Mengintegrasikan sensor soil moisture dan DHT22 untuk memantau kondisi lingkungan tanaman secara real-time. Menggunakan pompa sebagai aktuator penyiraman otomatis dan mengimplementasikan sistem monitoring berbasis web/IoT."
    }
  ]
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'a' || 
          (e.target as HTMLElement).tagName.toLowerCase() === 'button' ||
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'white' : 'transparent',
          borderColor: isHovering ? 'transparent' : 'white',
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 1000);
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950 transition-opacity duration-1000 ${exit ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center w-full max-w-md px-8"
      >
        <div className="mb-8 overflow-hidden">
          <motion.h1 
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter text-white"
          >
            M. Hafidz
          </motion.h1>
        </div>
        <div className="h-[2px] w-full bg-zinc-800 relative overflow-hidden rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            style={{ width: `${progress}%` }}
            layout
            transition={{ type: "tween", ease: "linear" }}
          />
        </div>
        <div className="mt-4 flex justify-between text-zinc-400 text-sm font-mono uppercase tracking-widest">
          <span>Memuat Portofolio</span>
          <span>{progress}%</span>
        </div>
      </motion.div>
    </div>
  );
};

const Navigation = ({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Pendidikan', href: '#education' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Kontak', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" onClick={(e) => handleNavClick(e, '#home')} className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
          MH<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Ganti Tema"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark) || true;
      
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className={`min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans transition-colors duration-300 selection:bg-zinc-300 dark:selection:bg-zinc-800`}>
      <CustomCursor />
      <Navigation toggleTheme={toggleTheme} isDark={isDark} />

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-2 mb-6"
              >
                <span className="h-[1px] w-8 bg-zinc-400 dark:bg-zinc-600"></span>
                <span className="text-sm font-mono tracking-wider uppercase text-zinc-600 dark:text-zinc-400">Halo, Saya</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6"
              >
                {CV_DATA.name}.<br />
                <span className="text-zinc-400 dark:text-zinc-600">{CV_DATA.role}</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed"
              >
                Memiliki dasar kuat dalam instalasi kelistrikan, otomasi industri, dan IoT. 
                Berkomitmen untuk memberikan solusi teknis yang akurat dan dapat diandalkan.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}); }}
                  className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <span>Hubungi Saya</span>
                  <ArrowRight size={18} />
                </a>
                <a 
                  href="#about"
                  onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}); }}
                  className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-full font-medium flex items-center space-x-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span>Eksplorasi Profil</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MARQUEE SECTION */}
        <div className="py-10 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 overflow-hidden flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="flex items-center space-x-12 text-2xl md:text-4xl font-bold uppercase tracking-wider"
          >
            {[...CV_DATA.skills.slice(0,5), ...CV_DATA.skills.slice(0,5), ...CV_DATA.skills.slice(0,5)].map((skill, index) => (
              <React.Fragment key={index}>
                <span>{skill}</span>
                <span className="text-zinc-500">•</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Tentang Saya.</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {CV_DATA.about}
                </p>
                <div className="space-y-4 text-zinc-600 dark:text-zinc-400 mt-8">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-5 h-5" />
                    <span>{CV_DATA.email}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5" />
                    <span>{CV_DATA.phone}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-8">Keahlian & Kompetensi</h3>
                <div className="flex flex-wrap gap-3">
                  {CV_DATA.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-16">
                  <h3 className="text-2xl font-bold mb-8">Sertifikasi & Pelatihan</h3>
                  <div className="space-y-4">
                    {CV_DATA.certifications.map((cert, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                        <span className="font-mono text-sm text-zinc-500 w-16">{cert.year}</span>
                        <span className="font-medium">{cert.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION */}
        <section id="experience" className="py-32 bg-zinc-100 dark:bg-zinc-900/50">
          <div className="container mx-auto px-6 md:px-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-20 tracking-tight text-center"
            >
              Perjalanan Karir & Pendidikan.
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Experience */}
              <div>
                <div className="flex items-center space-x-3 mb-10">
                  <Briefcase className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Pengalaman Kerja & Magang</h3>
                </div>
                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-300 dark:before:via-zinc-700 before:to-transparent">
                  {CV_DATA.experience.map((exp, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative pl-8 md:pl-0"
                    >
                      <div className="md:w-1/2 md:pr-12 md:text-right md:ml-auto">
                        <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-zinc-900 dark:bg-white border-4 border-zinc-100 dark:border-zinc-900 -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
                        <span className="font-mono text-sm text-zinc-500 mb-1 block">{exp.year}</span>
                        <h4 className="text-xl font-bold">{exp.role}</h4>
                        <span className="text-zinc-600 dark:text-zinc-400 block mb-3">{exp.company}</span>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div id="education">
                <div className="flex items-center space-x-3 mb-10">
                  <GraduationCap className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Pendidikan Formal</h3>
                </div>
                <div className="space-y-12">
                  {CV_DATA.education.map((edu, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                    >
                      <span className="font-mono text-sm text-zinc-500 mb-2 block">{edu.year}</span>
                      <h4 className="text-xl font-bold mb-1">{edu.major}</h4>
                      <span className="text-zinc-600 dark:text-zinc-400">{edu.school}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-32">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Karya & Proyek.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mb-16">
                Beberapa implementasi teknis dan tugas akhir yang pernah dikerjakan.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
              {CV_DATA.projects.map((project, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 md:p-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-zinc-200 dark:bg-zinc-800 mb-6">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed text-lg">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-sm font-mono px-3 py-1 bg-white dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                      <span className="text-zinc-400 dark:text-zinc-600 font-mono text-sm uppercase tracking-widest">
                        Ilustrasi Proyek
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 bg-zinc-950 text-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-zinc-800/50 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6"
              >
                Mari Berkolaborasi.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 text-lg md:text-xl"
              >
                Tertarik untuk bekerja sama atau mendiskusikan peluang proyek terkait? Jangan ragu untuk menghubungi saya.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800"
              >
                <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>
                <a href={`mailto:${CV_DATA.email}`} className="flex items-center space-x-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-white group-hover:text-zinc-900 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm text-zinc-500 mb-1">Email</span>
                    <span className="font-medium text-lg break-all">{CV_DATA.email}</span>
                  </div>
                </a>

                <a href={`https://wa.me/${CV_DATA.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group">
                  <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-white group-hover:text-zinc-900 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm text-zinc-500 mb-1">Telepon / WhatsApp</span>
                    <span className="font-medium text-lg">{CV_DATA.phone}</span>
                  </div>
                </a>
                
                <div className="pt-4">
                  <p className="text-sm text-zinc-500 italic">
                    *Alamat spesifik disembunyikan untuk menjaga privasi profesional.
                  </p>
                </div>
              </motion.div>

              <motion.form 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  alert("Fitur simulasi: Pesan Anda berhasil dikirim!");
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">Nama Lengkap</label>
                  <input type="text" id="name" required className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">Alamat Email</label>
                  <input type="email" id="email" required className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors" placeholder="nama@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">Pesan</label>
                  <textarea id="message" required rows={4} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors resize-none" placeholder="Tuliskan pesan atau keperluan Anda..."></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-zinc-950 font-bold rounded-xl px-4 py-4 flex justify-center items-center space-x-2 hover:bg-zinc-200 transition-colors mt-4">
                  <span>Kirim Pesan</span>
                  <ArrowRight size={18} />
                </button>
              </motion.form>
            </div>
          </div>

          <div className="container mx-auto px-6 md:px-12 mt-32 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
            <p>© {new Date().getFullYear()} {CV_DATA.name}. Hak cipta dilindungi.</p>
            <p className="mt-2 md:mt-0">Dirancang & Dibangun dengan React & Tailwind</p>
          </div>
        </section>
      </main>
    </div>
  );
}