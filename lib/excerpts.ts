const excerpts = [
  "The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the alphabet at least once. Typing exercises help us master keyboard layouts and improve our communication skills.",
  "In the depths of winter, I finally learned that there was in me an invincible summer. The trees swayed gently in the evening breeze. Nature reminds us of the cycles of life and the resilience within all living things.",
  "Technology is best when it brings people together. The future of computing lies in understanding human connections and building bridges. Innovation thrives when we collaborate and share knowledge across boundaries.",
  "Writing is thinking on paper. Every word we type, every sentence we compose, shapes our thoughts and communicates our ideas. The act of writing clarifies our thinking and helps us understand ourselves better.",
  "The journey of a thousand miles begins with a single step. Progress happens gradually, one moment at a time. Patience and persistence are the keys to achieving our long-term goals and aspirations.",
  "Code is like humor. When you have to explain it, it's bad. The best solutions are elegant and immediately understandable. Clear code speaks for itself and requires no additional documentation to convey its purpose.",
  "In the quiet moments between keystrokes, ideas take shape. Focus and concentration create the space for creativity to flourish. Deep work requires us to eliminate distractions and embrace the flow state.",
  "Practice makes perfect. Every repetition strengthens neural pathways, building muscle memory and skill. Consistent effort over time transforms beginners into experts through dedicated training.",
  "The internet has become a vast repository of human knowledge. We can learn anything, connect with anyone, and explore endless possibilities. This digital age presents unprecedented opportunities for growth and discovery.",
  "Keyboard shortcuts save time and keep our hands on the keys. Efficiency comes from understanding the tools at our disposal. Mastering the fundamentals enables us to work faster and more effectively in any environment.",
];

export function getRandomExcerpt() {
  return excerpts[Math.floor(Math.random() * excerpts.length)];
}

export { excerpts };

