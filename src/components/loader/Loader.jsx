import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="h-screen flex gap-3 items-center justify-center bg-gradient-to-b from-[#55b9f7] via-[#098afa] to-[#025bf6]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-full bg-white"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;

