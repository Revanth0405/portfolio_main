/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  BrainCircuit, 
  Terminal,
  ChevronRight,
  User,
  Briefcase,
  Cpu,
  Trophy,
  Download,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";

const PROJECTS = [
  {
    title: "AI Data Scientist",
    repo: "ai-datascientist",
    description: "Advanced data analysis and machine learning implementation for predictive modeling.",
    tech: ["Python", "Pandas", "Scikit-Learn", "Jupyter"],
    link: "https://github.com/Revanth0405/ai-datascientist"
  },
  {
    title: "Connectify",
    repo: "Connectify",
    description: "A full-stack social networking platform built with modern web technologies.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://github.com/Revanth0405/Connectify"
  },
  {
    title: "Palmistry AI",
    repo: "palmistry",
    description: "Computer vision project for palm reading and analysis using image processing.",
    tech: ["Python", "OpenCV", "TensorFlow"],
    link: "https://github.com/Revanth0405/palmistry"
  },
  {
    title: "E-Commerce Platform",
    repo: "ecommerce",
    description: "Scalable e-commerce solution with product management and checkout flow.",
    tech: ["Java", "Spring Boot", "MySQL", "React"],
    link: "https://github.com/Revanth0405/ecommerce"
  },
  {
    title: "News Project",
    repo: "news-project",
    description: "Real-time news aggregator with category filtering and search capabilities.",
    tech: ["React", "NewsAPI", "Tailwind CSS"],
    link: "https://github.com/Revanth0405/news-project"
  },
  {
    title: "Wikipedia Downloader",
    repo: "Wikipedia-Downloader",
    description: "Utility tool to download and parse Wikipedia articles for offline use.",
    tech: ["Python", "BeautifulSoup", "Requests"],
    link: "https://github.com/Revanth0405/Wikipedia-Downloader"
  }
];

const SKILLS = [
  { name: "Full Stack", icon: <Code2 className="w-5 h-5" />, items: ["Java", "Spring Boot", "React", "Node.js", "MERN Stack"] },
  { name: "Data Science", icon: <Database className="w-5 h-5" />, items: ["Python", "Pandas", "NumPy", "Scikit-Learn"] },
  { name: "AI & DevOps", icon: <BrainCircuit className="w-5 h-5" />, items: ["Agentic AI", "LLMs", "Docker", "CI/CD Pipelines", "Kubernetes"] },
  { name: "Tools", icon: <Terminal className="w-5 h-5" />, items: ["Git", "Jenkins", "Jupyter", "VS Code", "Postman"] }
];

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "Digital Specialist Engineer at Infosys",
    "Full Stack Developer",
    "AI Integration",
    "DevOps"
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-white font-medium min-h-[1.5em] inline-block">
      {text}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [leetcodeStats, setLeetcodeStats] = useState<{ totalSolved: number } | null>(null);

  useEffect(() => {
    const fetchLeetcode = async () => {
      // Try multiple APIs for redundancy
      const endpoints = [
        "https://leetcode-api-faisalshohag.vercel.app/truthbreaker",
        "https://alfa-leetcode-api.onrender.com/truthbreaker"
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          
          // Handle different API response structures
          const solved = data.totalSolved || data.solvedProblem || data.total_solved;
          
          if (solved) {
            setLeetcodeStats({ totalSolved: solved });
            return; // Exit if successful
          }
        } catch (err) {
          console.warn(`Failed to fetch from ${url}`, err);
        }
      }
      
      // Fallback if all APIs fail
      setLeetcodeStats({ totalSolved: 300 });
    };
    fetchLeetcode();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black">R</div>
            <span>REVANTH.</span>
          </motion.div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
            {["Work", "About", "Skills", "Resume", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-500 transition-colors">{item}</a>
            ))}
          </div>
          <motion.a 
            href="mailto:balabhadrunirevanth@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-orange-500 hover:text-white transition-all"
          >
            Hire Me
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] border border-white/20 rounded-full text-white/60">
              Available for immediate work
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-8">
              BALABHADRUNI <br />
              <span className="text-orange-500">REVANTH</span>
            </h1>
            <div className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 font-light leading-relaxed mb-10 h-16 md:h-12 flex items-center justify-center">
              <TypingEffect />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a 
                href="#work"
                whileHover={{ y: -5 }}
                className="px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-widest text-sm rounded-lg flex items-center gap-2"
              >
                View Projects <ChevronRight className="w-4 h-4" />
              </motion.a>
              <div className="flex gap-2">
                <a href="https://github.com/Revanth0405" target="_blank" className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/revanth-balabhadruni-b55056245/" target="_blank" className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.leetcode.com/u/truthbreaker" target="_blank" className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group relative">
                  <Trophy className="w-5 h-5" />
                  {leetcodeStats && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-[8px] font-bold px-1 rounded-full">
                      {leetcodeStats.totalSolved}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-orange-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Stats/Experience Bar */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Digital Specialist Engineer</h3>
              <p className="text-sm text-white/40">Currently working at Infosys as a Full Stack Java Developer.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Real-time Experience</h3>
              <p className="text-sm text-white/40">Proven track record of delivering end-to-end software solutions.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">AI Specialist</h3>
              <p className="text-sm text-white/40">Expertise in Agentic AI and data-driven decision systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Selected Works</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">PROJECTS.</h2>
            </div>
            <p className="max-w-md text-white/40 text-sm leading-relaxed">
              A collection of my work spanning from full-stack applications to complex data science models and AI agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, showAllProjects ? PROJECTS.length : 3).map((project, index) => (
              <motion.div
                key={project.repo}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: (index % 3) * 0.1, duration: 0.5 }
                  },
                  hover: {
                    y: -12,
                    boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.2)",
                    borderColor: "rgba(249, 115, 22, 0.5)",
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }
                }}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="group relative bg-[#111] border border-white/5 rounded-2xl p-8 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={project.link} target="_blank" className="text-orange-500"><ExternalLink className="w-5 h-5" /></a>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-medium text-white/60 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* Decorative background element */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all" />
              </motion.div>
            ))}
          </div>

          {!showAllProjects && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-16 text-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllProjects(true)}
                className="px-10 py-4 border border-white/10 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                Show More Projects
              </motion.button>
            </motion.div>
          )}

          {showAllProjects && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 text-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllProjects(false)}
                className="px-10 py-4 border border-white/10 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                Show Less
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">TECHNICAL STACK.</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((skill, idx) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-black border border-white/5 hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-orange-500 mb-6">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                <ul className="space-y-3">
                  {skill.items.map(item => (
                    <li key={item} className="text-white/40 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] bg-[#111] rounded-3xl border border-white/10 overflow-hidden relative group">
              {/* 
                Note: Replace the URL below with your actual photo URL or upload your photo 
                to the project and use the local path (e.g., /my-photo.jpg)
              */}
              <img 
                src="me.jpeg" 
                alt="Revanth Balabhadruni" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <p className="text-orange-500 font-bold text-xl">Revanth Balabhadruni</p>
                <p className="text-white/60 text-sm">Digital Specialist Engineer @ Infosys</p>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-6 bg-orange-500 rounded-2xl shadow-2xl shadow-orange-500/20"
            >
              <p className="text-black font-black text-4xl leading-none">DSE</p>
              <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest mt-1">Infosys Role</p>
            </motion.div>
          </div>

          <div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">The Story</span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-none">BUILDING THE <br /> FUTURE OF TECH.</h2>
            <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
              <p>
                I am currently working as a <span className="text-white font-medium">Digital Specialist Engineer at Infosys</span>, 
                where I specialize in Full Stack Java development. My role involves architecting robust enterprise solutions 
                and ensuring seamless integration between front-end experiences and back-end logic.
              </p>
              <p>
                Beyond my core role, I am deeply invested in the evolution of software engineering. I am actively 
                mastering <span className="text-white font-medium">AI Systems</span> and <span className="text-white font-medium">DevOps</span> 
                to build more intelligent, automated, and resilient applications.
              </p>
              <p>
                What differentiates me is my absolute commitment to the work. I am immediately available and 
                possess the technical depth to handle both front-end aesthetics and complex back-end systems, 
                now enhanced with modern AI and deployment practices.
              </p>
            </div>
            
            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-white">10+</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Projects Shipped</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">{leetcodeStats?.totalSolved || "300"}+</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">LeetCode Problems</p>
              </div>
              <div className="w-[1px] h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Availability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Curriculum Vitae</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">RESUME.</h2>
          </div>
          
          <div className="max-w-3xl mx-auto bg-[#111] border border-white/10 rounded-3xl p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-orange-500/10 transition-colors">
              <FileText className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <p className="text-xl text-white/60 mb-10 leading-relaxed">
                Looking for a detailed overview of my technical expertise, professional experience, and academic background? 
                Download my full resume below.
              </p>
              
              <motion.a 
                href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" 
                download="Revanth_Balabhadruni_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-10 py-5 bg-orange-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all"
              >
                <Download className="w-5 h-5" />
                Download Resume PDF
              </motion.a>
              
              <p className="mt-6 text-white/20 text-[10px] uppercase tracking-[0.2em]">
                PDF Format • 124 KB
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-orange-500">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-12">LET'S TALK.</h2>
          <p className="text-black/60 text-xl md:text-2xl max-w-2xl mx-auto font-medium mb-16">
            Ready to bring your next big idea to life? I'm just a message away.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <a 
              href="mailto:balabhadrunirevanth@gmail.com" 
              className="group flex items-center gap-4 text-black text-2xl md:text-4xl font-bold hover:opacity-70 transition-opacity"
            >
              <Mail className="w-8 h-8 md:w-12 md:h-12" />
              <span>Email Me</span>
            </a>
            <div className="hidden md:block w-2 h-2 bg-black rounded-full" />
            <a 
              href="https://github.com/Revanth0405" 
              target="_blank"
              className="group flex items-center gap-4 text-black text-2xl md:text-4xl font-bold hover:opacity-70 transition-opacity"
            >
              <Github className="w-8 h-8 md:w-12 md:h-12" />
              <span>GitHub</span>
            </a>
            <div className="hidden md:block w-2 h-2 bg-black rounded-full" />
            <a 
              href="https://www.leetcode.com/u/truthbreaker" 
              target="_blank"
              className="group flex items-center gap-4 text-black text-2xl md:text-4xl font-bold hover:opacity-70 transition-opacity"
            >
              <Trophy className="w-8 h-8 md:w-12 md:h-12" />
              <span>LeetCode</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            © 2026 Revanth Balabhadruni. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/revanth-balabhadruni-b55056245/" target="_blank" className="text-white/40 hover:text-orange-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/Revanth0405" target="_blank" className="text-white/40 hover:text-orange-500 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.leetcode.com/u/truthbreaker" target="_blank" className="text-white/40 hover:text-orange-500 transition-colors"><Trophy className="w-5 h-5" /></a>
            <a href="mailto:balabhadrunirevanth@gmail.com" className="text-white/40 hover:text-orange-500 transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
