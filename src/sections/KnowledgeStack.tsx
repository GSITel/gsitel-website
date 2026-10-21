"use client";



import angularIcon from "@/assets/apps-icon/ANGULAR.png";

import bootstrapIcon from "@/assets/apps-icon/BOOTSTRAP.png";

import firebaseIcon from "@/assets/apps-icon/FIREBASE.png";

import flutterIcon from "@/assets/apps-icon/FLUTTER.png";

import gitIcon from "@/assets/apps-icon/GIT.png";

import githubIcon from "@/assets/apps-icon/GITHUB.png";

import htmlIcon from "@/assets/apps-icon/HTML5.png";

import javaIcon from "@/assets/apps-icon/JAVA.png";

import javascriptIcon from "@/assets/apps-icon/JAVASCRIPT.png";

import jiraIcon from "@/assets/apps-icon/JIRA.png";

import kotlinIcon from "@/assets/apps-icon/KOTLIN.png";

import mongoIcon from "@/assets/apps-icon/MONGO DB.png";

import nodeIcon from "@/assets/apps-icon/NODE JS.png";

import npmIcon from "@/assets/apps-icon/NPM.png";

import pythonIcon from "@/assets/apps-icon/PYTHON.png";

import reactIcon from "@/assets/apps-icon/REACT.png";

import redisIcon from "@/assets/apps-icon/REDIS.png";

import reduxIcon from "@/assets/apps-icon/REDUX.png";

import stripeIcon from "@/assets/apps-icon/STRIPE.png";

import swiftIcon from "@/assets/apps-icon/SWIFT.png";

import tailwindIcon from "@/assets/apps-icon/TAILWIND.png";

import typescriptIcon from "@/assets/apps-icon/TYPESCRIPT.png";

import ubuntuIcon from "@/assets/apps-icon/UBUNTU.png";

import vueIcon from "@/assets/apps-icon/VUE JS.png";

import type { SiteMode } from "@/lib/siteMode";

import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

import Image, { type StaticImageData } from "next/image";



type ToolIcon = { name: string; icon: StaticImageData };



type ToolCategory = { title: string; tools: ToolIcon[] };



const softwareCategories: ToolCategory[] = [

  {

    title: "Frontend",

    tools: [

      { name: "React", icon: reactIcon },

      { name: "Angular", icon: angularIcon },

      { name: "Vue", icon: vueIcon },

      { name: "Tailwind", icon: tailwindIcon },

      { name: "Bootstrap", icon: bootstrapIcon },

      { name: "HTML5", icon: htmlIcon },

    ],

  },

  {

    title: "Backend & datos",

    tools: [

      { name: "Node", icon: nodeIcon },

      { name: "Python", icon: pythonIcon },

      { name: "Java", icon: javaIcon },

      { name: "MongoDB", icon: mongoIcon },

      { name: "Redis", icon: redisIcon },

      { name: "Firebase", icon: firebaseIcon },

    ],

  },

  {

    title: "Mobile & lenguajes",

    tools: [

      { name: "Flutter", icon: flutterIcon },

      { name: "Swift", icon: swiftIcon },

      { name: "Kotlin", icon: kotlinIcon },

      { name: "TypeScript", icon: typescriptIcon },

      { name: "JavaScript", icon: javascriptIcon },

      { name: "Redux", icon: reduxIcon },

    ],

  },

  {

    title: "DevOps & producto",

    tools: [

      { name: "GitHub", icon: githubIcon },

      { name: "Git", icon: gitIcon },

      { name: "Jira", icon: jiraIcon },

      { name: "NPM", icon: npmIcon },

      { name: "Ubuntu", icon: ubuntuIcon },

      { name: "Stripe", icon: stripeIcon },

    ],

  },

];



const softwareCapabilities = [

  "Web apps",

  "Dashboards",

  "APIs",

  "Automatización",

  "Pagos",

  "Mobile",

  "Cloud",

  "Integraciones",

];



const ToolPill = ({ name, icon, index }: ToolIcon & { index: number }) => (

  <motion.div

    className="group inline-flex cursor-default items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-3 py-2 shadow-sm backdrop-blur transition-colors hover:border-[#62dff3]/70 hover:bg-white hover:shadow-[0_10px_25px_rgba(4,19,39,0.2)]"

    title={name}

    initial={{ opacity: 0, y: 10, scale: 0.92 }}

    whileInView={{ opacity: 1, y: 0, scale: 1 }}

    viewport={{ once: true, amount: 0.5 }}

    transition={{ duration: 0.42, delay: index * 0.045 }}

    whileHover={{ y: -4, scale: 1.04 }}

    whileTap={{ scale: 0.98 }}

  >

    <Image

      src={icon}

      alt={name}

      width={22}

      height={22}

      loading="lazy"

      className="h-5 w-5 object-contain transition-transform duration-500 group-hover:rotate-[7deg] group-hover:scale-110"

    />

    <span className="text-[11px] font-bold text-[#071425]/85">{name}</span>

  </motion.div>

);



const CategoryRow = ({
  title,
  tools,
  index,
  reduceMotion,
}: ToolCategory & { index: number; reduceMotion: boolean }) => (

  <motion.div
    className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.13]"
    initial={{ opacity: 0, y: 28, rotateX: 5 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{
      duration: 0.62,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    }}
    whileHover={{ y: -6 }}
  >

    <motion.div
      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      animate={reduceMotion ? undefined : { x: ["0%", "430%"] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        repeatDelay: 2 + index * 0.5,
        ease: "easeInOut",
      }}
    />

    <h3 className="relative mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/70">

      {title}

    </h3>

    <div className="relative flex flex-wrap gap-2">

      {tools.map((tool, toolIndex) => (

        <ToolPill key={tool.name} {...tool} index={toolIndex} />

      ))}

    </div>

  </motion.div>

);



export const KnowledgeStack = ({ mode: _mode }: { mode: SiteMode }) => {

  const reduceMotion = useHydratedReducedMotion();

  return (

    <section

      id="conocimientos"

      className="quiet-section quiet-section-dark knowledge-stack-bg relative w-full overflow-hidden section-shell"

    >

      <div className="pointer-events-none absolute inset-0 knowledge-stack-shine" />

      <div className="pointer-events-none absolute inset-0 grid-fine opacity-20" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#eaeefe]/55" />



      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <motion.div
            className="max-w-xl"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >

            <p className="section-eyebrow-dark">Capacidades técnicas</p>

            <h2 className="section-title-dark">

              Tecnología al servicio del producto

            </h2>

            <p className="section-desc-dark">

              Elegimos las herramientas según el producto, sus integraciones y su evolución.

            </p>

            <a

              href="#contacto"

              className="mt-6 inline-flex rounded-full border border-white/50 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0b1d3a] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"

            >

              Consultar una necesidad técnica

            </a>

          </motion.div>



          <motion.div
            className="w-full lg:max-w-xl"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/55">

              Lo convertimos en

            </p>

            <div className="flex flex-wrap gap-2">

              {softwareCapabilities.map((item, index) => (

                <motion.span

                  key={item}

                  className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur"

                  initial={{ opacity: 0, scale: 0.8 }}

                  whileInView={{ opacity: 1, scale: 1 }}

                  viewport={{ once: true }}

                  transition={{ delay: 0.18 + index * 0.055 }}

                  whileHover={{
                    y: -3,
                    backgroundColor: "rgba(255,255,255,0.24)",
                  }}

                >

                  {item}

                </motion.span>

              ))}

            </div>

          </motion.div>

        </div>



        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {softwareCategories.map((category, index) => (

            <CategoryRow
              key={category.title}
              {...category}
              index={index}
              reduceMotion={!!reduceMotion}
            />

          ))}

        </div>

      </div>

    </section>

  );

};


